import React, { useCallback, useMemo, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { isBefore, isDate, isWithinInterval } from "date-fns"
import {
  getStorefrontProductId,
  arrayRemoveArray,
  getProductId,
  makePostRequest,
} from "../../utils"
import {
  getNextShipment,
  changeSubscriptionDate,
  addToNextBox,
  accountApplyCoupon,
} from "../../api/marketApi"
import { shopifyClient } from "../../api/shopifyClient"
import {
  fetchProductIdsFromCollection,
  fetchProductsFromCollection,
  fetchWeeklyOffers,
} from "../../api/storefrontApi"
import ModalAddToNext from "../containers/ModalAddToNext"
import { WeeklyOffers } from "../components/WeeklyOffers"
import { YourNextShipment } from "../components/YourNextShipment"
import { MembersFavorites } from "../components/MembersFavorites"
import {
  ADD_TO_NEXT_CHECKOUT_ID_QUERY,
  CROSS_SELL_PRODUCT_DEFAULT_COLLECTION,
  WEEKLY_OFFER_PRODUCT_PREVIEW_ID,
  MEMBERS_FAVORITES_COLLECTION_HANDLE,
  MEMBERS_FAVORITES_PRODUCTS_LIMIT,
  CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION,
  PORTAL_SURVEY_THANKS,
  PRODUCT_METAFIELD_KEY_SUBSCRIPTION_MONTHLY,
} from "../../const"
import { useQuery, useAsyncState } from "../../hooks"
import CrossSellProductsModalContainer from "../containers/CrossSellProductsModalContainer"
import AccountPDPContainer from "../containers/AccountPDPContainer"
import AccountNextShipmentEditContainer from "../containers/AccountNextShipmentEditContainer"
import { Notification, Modal, SurveyPopup } from "../../rUI"
import segment from "../../integrations/segment"
import useActionPostpone from "../hooks/useActionPostpone"

let timeoutID = null
const TIMEOUT_DURATION = 10000

const prepareDate = (value) =>
  (Boolean(value) && isDate(new Date(value)) && new Date(value)) || new Date(0)

const shipmentChangeSubscriptionDate = (newDate) =>
  changeSubscriptionDate(newDate).then(() => getNextShipment())

const shipmentAddItems = (lineItems, subscribe) => {
  return subscribe
    ? shopifyClient.checkout
        .create({
          lineItems: [
            {
              variantId: lineItems.variantId,
              quantity: lineItems.quantity,
              customAttributes: [
                {
                  key: CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION,
                  value: PRODUCT_METAFIELD_KEY_SUBSCRIPTION_MONTHLY,
                },
              ],
            },
          ],
        })
        .then((checkout) => addToNextBox(checkout?.id))
        .then(() => getNextShipment())
    : shopifyClient.checkout
        .create({
          lineItems: [
            {
              variantId: lineItems.variantId,
              quantity: lineItems.quantity,
            },
          ],
        })
        .then((checkout) => addToNextBox(checkout?.id))
        .then(() => getNextShipment())
}

const fetchFilteredWeeklyOffers = () =>
  fetchWeeklyOffers().then(({ collection }) => {
    return collection?.products?.filter(({ expiryDate, startDate }) => {
      const start = prepareDate(startDate?.value)
      const end = prepareDate(expiryDate?.value)

      // Have to check that start less than end otherwise hide offer
      if (isBefore(end, start)) {
        return false
      }

      return isWithinInterval(new Date(), { start, end })
    })
  })

const fetchCrossSellProductIds = (shipment) =>
  fetchProductIdsFromCollection(
    CROSS_SELL_PRODUCT_DEFAULT_COLLECTION,
    100
  ).then((ids) => {
    if (!ids?.length) {
      return null
    }

    const shipmentItemIds = shipment?.items?.map(({ productID }) =>
      getStorefrontProductId(productID)
    )

    return arrayRemoveArray(ids, shipmentItemIds)
  })

export function PageSubscription() {
  const location = useLocation()

  const [currentProductSubscription, setCurrentProductSubscription] = useState()
  const [currentPDP, setCurrentPDP] = useState()
  const [notification, setNotification] = useState(false)
  const [notificationText, setNotificationText] = useState(null)
  const [error, setError] = useState(false)
  const [serveyID, setServeyID] = useState(1)
  const [showServey, setShowServey] = useState(false)
  const [showThanks, setShowThanks] = useState(false)

  const [
    shipmentState,
    reqGetNextShipment,
    reqChangeShipmentDate,
    reqShipmentAddItems,
  ] = useAsyncState(
    getNextShipment,
    shipmentChangeSubscriptionDate,
    shipmentAddItems
  )

  const [offersState, reqFetchFilteredWeeklyOffers] = useAsyncState(
    fetchFilteredWeeklyOffers
  )
  const [productsState, reqFetchCollectionProducts] = useAsyncState(
    fetchProductsFromCollection
  )
  const [crossSellProductIdsState, reqCrossSellProductIds] = useAsyncState(
    fetchCrossSellProductIds
  )
  const [accountApplyCouponState, reqAccountApplyCoupon] =
    useAsyncState(accountApplyCoupon)

  const query = useQuery()
  const navigate = useNavigate()
  const addToNextCheckoutId = query.get(ADD_TO_NEXT_CHECKOUT_ID_QUERY)

  const pdpId = query.get(WEEKLY_OFFER_PRODUCT_PREVIEW_ID)

  const filteredWeeklyOffers = useMemo(() => {
    const shipment = shipmentState.data
    const offers = offersState.data

    if (!shipment || !shipment.items?.length) {
      return offers
    }

    const shipmentItemsIds = shipment.items.map(({ productID }) =>
      getStorefrontProductId(productID)
    )

    return offers?.filter((offer) => shipmentItemsIds.indexOf(offer.id) === -1)
  }, [shipmentState, offersState])

  const filteredMembersFavorites = useMemo(() => {
    const shipment = shipmentState.data
    const products = productsState.data

    if (!shipment || !shipment.items?.length) {
      return products
    }

    const shipmentItemsIds = shipment.items.map(({ productID }) =>
      getStorefrontProductId(productID)
    )

    const filtered = products?.filter(
      (product) => shipmentItemsIds.indexOf(product.id) === -1
    )
    if (filtered?.length > MEMBERS_FAVORITES_PRODUCTS_LIMIT) {
      filtered.length = MEMBERS_FAVORITES_PRODUCTS_LIMIT
    }
    return filtered
  }, [shipmentState, productsState])

  const handleModalClose = useCallback(() => {
    query.delete(ADD_TO_NEXT_CHECKOUT_ID_QUERY)
    navigate(`${location.pathname}?${query.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDateChanged = useCallback(
    (newDate) => {
      reqChangeShipmentDate(newDate)
        .then(reqCrossSellProductIds)
        .then(() => {
          showNotification("success")
        })
        .catch(() => {
          setServeyID(1)
          setShowServey(true)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shipmentState.data]
  )

  const closeServeyPopup = (eventName) => {
    setShowServey(false)
    segment.track(eventName)
  }

  const handleServeyReason = (eventName, reasonObj) => {
    setShowServey(false)
    segment.track(eventName, reasonObj)
    setShowThanks(true)
  }

  const handleThanksClose = () => {
    setShowThanks(false)
  }

  const handlePromoSubmit = useCallback((couponCode) => {
    reqAccountApplyCoupon(couponCode).then(() => {
      segment.track("S2-Portal add promo success")
      showNotification(
        "success",
        "Discount Applied! You order has been updated."
      )
      reqGetNextShipment()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleViewProductDetails = useCallback((subscription) => {
    document.body.style.overflow = "hidden"
    setCurrentProductSubscription(subscription)
  }, [])

  const handleCloseProductDetailsPopup = useCallback(() => {
    document.body.style.overflow = "auto"
    setCurrentProductSubscription(null)
  }, [])

  const handleChangeSubscriptionItem = useCallback(() => {
    reqGetNextShipment()
    handleCloseProductDetailsPopup()
    segment.track("S2-Portal update item success")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRemoveSubscriptionItem = useCallback(() => {
    reqGetNextShipment()
    handleCloseProductDetailsPopup()
    setServeyID(2)
    setShowServey(true)
    segment.track("S2-Portal remove item success")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleShipmentCrossSellModalAdd = useCallback(
    (items, subscribe = false) => {
      reqShipmentAddItems(items, subscribe)
      handleShipmentCrossSellModalClose()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleShipmentCrossSellModalClose = useCallback(() => {
    setServeyID(1)
    setShowServey(true)
    crossSellProductIdsState.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePDPOpen = useCallback(({ productId }) => {
    document.body.style.overflow = "hidden"
    segment.track("S2-Product View Details Clicked", { page: "subscription" })
    setCurrentPDP(productId)
  }, [])

  const handlePDPClose = useCallback(() => {
    document.body.style.overflow = "auto"
    setCurrentPDP(null)
  }, [])

  const handlePDPSubmit = useCallback(() => {
    reqGetNextShipment()
    handlePDPClose()
    reqFetchFilteredWeeklyOffers().then(() => {
      showNotification("success")
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlePDPClose, showNotification])

  const addToNextBoxOnly = () => {
    segment.track("S2-Clicks Add To Next Box Only Button")
    reqGetNextShipment()
    reqFetchFilteredWeeklyOffers().then(() => {
      showNotification("success")
    })
  }

  const addSubscription = () => {
    segment.track("S2-Clicks Subscription Purchase Button")
    reqGetNextShipment()
    reqFetchFilteredWeeklyOffers().then(() => {
      showNotification("success")
    })
  }

  const buyItNow = (productId, variantId, quantity) => {
    // WARNING:
    // purchase: 1st subscription: Base this account has multiple subscriptions to the same plan.
    // To avoid accidental duplicate subscriptions or changes, a short delay is required, please wait 60 seconds and then try again.
    segment.track("S2-Clicks One-Time Purchase Button")
    makePostRequest(`${process.env.PERCHE_API_URL}/v2/purchase`, {
      checkout: {
        demo: false, // switch to true if you wish to test the API without real purchase
        deferred: false,
        lineItems: [
          {
            intervalType: "",
            productID: parseInt(getProductId(productId), 10),
            quantity,
            variantID: parseInt(variantId.split("/").pop(), 10),
          },
        ],
      },
    })
      .then(() => {
        reqGetNextShipment()
        reqFetchFilteredWeeklyOffers().then(() => {
          showNotification("success")
        })
      })
      .catch((ex) => {
        reqGetNextShipment()
        reqFetchFilteredWeeklyOffers().then(() => {
          console.error(ex)
          setError(true)
        })
      })
  }

  const showNotification = useCallback((status, text) => {
    setNotification(status)
    setNotificationText(text)
    timeoutID = setTimeout(() => {
      closeNotification()
    }, TIMEOUT_DURATION)
    window.scrollTo({ top: 0, left: 0 })
  }, [])

  const closeNotification = () => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    setNotification(false)
    setNotificationText(null)
  }

  useActionPostpone(shipmentState, reqGetNextShipment)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
    reqGetNextShipment()
    reqFetchFilteredWeeklyOffers()
    reqFetchCollectionProducts(MEMBERS_FAVORITES_COLLECTION_HANDLE, 100)
    if (location?.state?.redirected) {
      showNotification("success")
      window.history.replaceState({}, document.title)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {error && (
        <Modal
          header={"Error"}
          children={"Unexpected error has occurred. Please try again later."}
          onCloseClick={() => setError(false)}
        />
      )}

      {notification ? (
        <Notification
          type={notification}
          text={notificationText}
          onClick={closeNotification}
        />
      ) : null}

      <YourNextShipment
        loading={shipmentState.loading}
        error={shipmentState.error}
        shipment={shipmentState.data}
        promoState={accountApplyCouponState}
        onDateChanged={handleDateChanged}
        onViewProductDetails={handleViewProductDetails}
        onPromoSubmit={handlePromoSubmit}
      />

      <WeeklyOffers
        loading={offersState.loading}
        offers={filteredWeeklyOffers}
        hasNextShipment={Boolean(shipmentState.data)}
        shipment={shipmentState.data}
        pdpId={pdpId}
        onSubscribe={addSubscription}
        onAddToNextBoxOnly={addToNextBoxOnly}
        onBuyItNow={buyItNow}
      />

      <MembersFavorites
        loading={productsState.loading}
        products={filteredMembersFavorites}
        onViewDetailsClick={handlePDPOpen}
      />

      {addToNextCheckoutId && (
        <ModalAddToNext
          checkoutId={addToNextCheckoutId}
          onClose={handleModalClose}
        />
      )}

      {crossSellProductIdsState.data && (
        <CrossSellProductsModalContainer
          productIds={crossSellProductIdsState.data}
          onSubscribe={(items) => handleShipmentCrossSellModalAdd(items, true)}
          onClose={handleShipmentCrossSellModalClose}
          onAddToNextBoxOnly={(items) =>
            handleShipmentCrossSellModalAdd(items, false)
          }
        />
      )}

      {currentProductSubscription && (
        <AccountNextShipmentEditContainer
          item={currentProductSubscription}
          onClose={handleCloseProductDetailsPopup}
          onRemove={handleRemoveSubscriptionItem}
          onUpdate={handleChangeSubscriptionItem}
        />
      )}

      {currentPDP && (
        <AccountPDPContainer
          productId={currentPDP}
          onSubmit={handlePDPSubmit}
          onClose={handlePDPClose}
          onBuyNow={handlePDPClose}
        />
      )}

      {showServey && (
        <SurveyPopup
          eventCode={serveyID}
          onReasonSelected={handleServeyReason}
          onCloseClick={closeServeyPopup}
        />
      )}

      {showThanks && (
        <Modal
          header={PORTAL_SURVEY_THANKS.title}
          children={PORTAL_SURVEY_THANKS.description}
          onCloseClick={handleThanksClose}
        />
      )}
    </>
  )
}
