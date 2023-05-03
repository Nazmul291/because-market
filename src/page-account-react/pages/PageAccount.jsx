import React, { useState, useEffect, useCallback } from "react"
import { Elements, RecurlyProvider } from "@recurly/react-recurly"
import { useCustomerContext } from "../containers/CustomerContext"
import { PageTitle } from "../components/PageTitle"
import { AccountDetails } from "../components/AccountDetails"
import { PaymentDetails } from "../components/PaymentDetails"
import { GetNewTrialBlock } from "../components/GetNewTrialBlock"
import { SubscriptionDetails } from "../components/SubscriptionDetails"
import { AbsorbencyIssuesBlock } from "../components/AbsorbencyIssuesBlock"
import {
  loadUsingDataLoadingState,
  getStorefrontProductId,
  arrayRemoveArray,
  emptyArray,
} from "../../utils"
import { useDataLoadingState, useAsyncState } from "../../hooks"
import {
  getBillingInfo,
  getSubscriptions,
  updateBillingToken,
  changeSubscriptionDate,
  addToNextBox,
} from "../../api/marketApi"
import { shopifyClient } from "../../api/shopifyClient"
import {
  fetchProductIdsFromCollection,
  fetchProductNameWithSpecificVariant,
} from "../../api/storefrontApi"
import { initBrightbackPrecancel } from "../../integrations/brightback"
import AccountAdjustSubscriptionEditContainer from "../containers/AccountAdjustSubscriptionEditContainer"
import { Notification, Modal, SurveyPopup } from "../../rUI"
import {
  CROSS_SELL_PRODUCT_DEFAULT_COLLECTION,
  PORTAL_SURVEY_THANKS,
  CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION,
  PRODUCT_METAFIELD_KEY_SUBSCRIPTION_MONTHLY,
} from "../../const"
import CrossSellProductsModalContainer from "../containers/CrossSellProductsModalContainer"
import segment from "../../integrations/segment"

let timeoutID = null
const TIMEOUT_DURATION = 10000

const fetchSubscriptions = () =>
  getSubscriptions().then((subscriptions) =>
    Promise.all(
      subscriptions.map((subscription) =>
        fetchProductNameWithSpecificVariant(
          subscription.productID,
          subscription.variantID
        ).then((product) => ({
          subscription,
          ...product,
          state: subscription.state,
          currentPeriodEndsAt: subscription.currentPeriodEndsAt,
          subscriptionID: subscription.id,
        }))
      )
    )
  )

const fetchSubscriptionDateChange = (newDate) =>
  changeSubscriptionDate(newDate).then(() => fetchSubscriptions())

const fetchSubscriptionAddItems = (lineItems, subscribe) => {
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
        .then(() => fetchSubscriptions())
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
        .then(() => fetchSubscriptions())
}

const fetchCrossSellProductIds = (excludeProductIds = []) =>
  fetchProductIdsFromCollection(
    CROSS_SELL_PRODUCT_DEFAULT_COLLECTION,
    100
  ).then((ids) => {
    if (!ids?.length) {
      return null
    }

    return arrayRemoveArray(
      ids,
      excludeProductIds.map((id) => getStorefrontProductId(id))
    )
  })

export function PageAccount() {
  const [billingInfo, setBillingInfo] = useState({})
  const [billingInfoState, setBillingInfoState] = useDataLoadingState()
  const [currentSubscriptionProduct, setCurrentSubscriptionProduct] =
    useState(null)
  const [notification, setNotification] = useState(false)
  const [error, setError] = useState(false)
  const [showServey, setShowServey] = useState(false)
  const [showThanks, setShowThanks] = useState(false)
  const [crossSellProductIdsState, reqCrossSellProductIds] = useAsyncState(
    fetchCrossSellProductIds
  )
  const [
    subscriptionsState,
    reqSubscription,
    reqSubscriptionDateChange,
    reqSubscriptionAddItems,
  ] = useAsyncState(
    fetchSubscriptions,
    fetchSubscriptionDateChange,
    fetchSubscriptionAddItems
  )

  const {
    profile,
    loading: profileLoading,
    profileUpdate: profileUpdate,
    profileLoadingError,
  } = useCustomerContext()

  const subscriptions = subscriptionsState.data || emptyArray

  const handleBillingTokenChange = useCallback(
    ({ token }, formType) => {
      loadUsingDataLoadingState(
        () => updateBillingToken(token),
        { ...billingInfoState, loaded: false, error: false },
        setBillingInfo,
        setBillingInfoState
      )

      if (billingInfoState.loaded) {
        if (billingInfoState.error) {
          setError(true)
        } else {
          segment.track(`S2 ${formType} change success`)
          showNotification("success")
        }
      }
    },
    [billingInfoState, setBillingInfo, setBillingInfoState, showNotification]
  )

  const handleCloseProductDetailsPopup = useCallback(() => {
    setCurrentSubscriptionProduct(null)
    document.body.style.overflow = "auto"
  }, [setCurrentSubscriptionProduct])

  const handleRemoveSubscriptionItemChange = useCallback(() => {
    handleCloseProductDetailsPopup(null)
    reqSubscription()
  }, [handleCloseProductDetailsPopup, reqSubscription])

  const handleChangeShippingDate = useCallback(
    (newDate) => {
      reqSubscriptionDateChange(newDate)
        .then(() => {
          segment.track("S2 change data success")
          showNotification("success")
          return reqCrossSellProductIds(
            subscriptions?.map((subscription) => subscription.id)
          )
        })
        .catch((e) => {
          console.error(e)
          setShowServey(true)
        })
    },
    [
      subscriptions,
      reqSubscriptionDateChange,
      showNotification,
      reqCrossSellProductIds,
    ]
  )

  const handleShipmentCrossSellModalAdd = useCallback(
    (items, subscribe = false) => {
      reqSubscriptionAddItems(items, subscribe)
      handleShipmentCrossSellModalClose()
    },
    [reqSubscriptionAddItems, handleShipmentCrossSellModalClose]
  )

  const handleShipmentCrossSellModalClose = useCallback(() => {
    setShowServey(true)
    crossSellProductIdsState.reset()
  }, [crossSellProductIdsState])

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

  const handleCancelBrightback = async () => {
    segment.track("S2-Cancel Account Button Clicked")
    const firstSub = subscriptions[0]
    try {
      const precancelUrl = await initBrightbackPrecancel(
        firstSub?.subscriptionID || "",
        profile,
        subscriptions
      )
      window.location.href = precancelUrl
    } catch (e) {
      console.error(`Error in Brightback precancel request, error: ${e}`)
    }
  }

  const showNotification = useCallback((status) => {
    setNotification(status)
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
  }

  const handleProfileChanged = (profile, formType) => {
    profileUpdate(profile)
      .then(() => {
        segment.track(`S2 ${formType} change success`)
        showNotification("success")
      })
      .catch((ex) => {
        // ACCOUNT_ALREADY_BEEN_TAKEN
        // INTERNAL_SERVER_ERROR
        setError(ex)
      })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
    reqSubscription()
    segment.track("S2-Account Page Loaded")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadUsingDataLoadingState(
      getBillingInfo,
      billingInfoState,
      setBillingInfo,
      setBillingInfoState
    )
  }, [billingInfoState, setBillingInfo, setBillingInfoState])

  return (
    <>
      {error && (
        <Modal
          header={"Error"}
          children={
            error.code === "ACCOUNT_ALREADY_BEEN_TAKEN"
              ? "Duplicated email address"
              : "Unexpected error has occurred. Please try again later."
          }
          onCloseClick={() => setError(false)}
        />
      )}

      {notification ? (
        <Notification type={notification} onClick={closeNotification} />
      ) : null}

      <PageTitle>My Account</PageTitle>
      <AccountDetails
        profile={profile}
        loading={profileLoading}
        onChange={handleProfileChanged}
        error={
          profileLoadingError
            ? "An error happend due to loading your personal information. Please try to refresh the page."
            : null
        }
      />

      <RecurlyProvider publicKey={process.env.RECURLY_KEY}>
        <Elements>
          <PaymentDetails
            profile={profile}
            billingInfo={billingInfo}
            loading={billingInfoState.loading}
            onCardChange={handleBillingTokenChange}
            onPayPalChange={handleBillingTokenChange}
            error={
              billingInfoState.error
                ? "An error happend due to loading your billing information. Please try to refresh the page."
                : null
            }
          />
        </Elements>
      </RecurlyProvider>

      <SubscriptionDetails
        subscriptions={subscriptions}
        loading={subscriptionsState.loading}
        error={
          subscriptionsState.error
            ? "An error happend due to loading your current subscription information. Please try to refresh the page."
            : null
        }
        onCancel={handleCancelBrightback}
        onEdit={setCurrentSubscriptionProduct}
        onDateChanged={handleChangeShippingDate}
      />

      <AbsorbencyIssuesBlock />

      <GetNewTrialBlock />

      {currentSubscriptionProduct && (
        <AccountAdjustSubscriptionEditContainer
          item={currentSubscriptionProduct.subscription}
          onClose={handleCloseProductDetailsPopup}
          onUpdate={handleRemoveSubscriptionItemChange}
          onRemove={handleRemoveSubscriptionItemChange}
        />
      )}

      {crossSellProductIdsState.data && (
        <CrossSellProductsModalContainer
          productIds={crossSellProductIdsState.data}
          onClose={handleShipmentCrossSellModalClose}
          onSubscribe={(items) => handleShipmentCrossSellModalAdd(items, true)}
          onAddToNextBoxOnly={(items) =>
            handleShipmentCrossSellModalAdd(items, false)
          }
        />
      )}

      {showServey && (
        <SurveyPopup
          eventCode={1}
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
