import React, { useCallback, useLayoutEffect, useState } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import {
  noop,
  encodeId,
  sanitizeStorefrontId,
  deepMerge,
  getUrlParameter,
} from "../../utils"
import { trackEvent } from "../../integrations/tracker"

import {
  CHECKOUT_SMS_MARKETING_NOTIFICATION_ATTRIBUTES,
  CHECKOUT_SMS_NOTIFICATION_ATTRIBUTES,
  FREE_SHIPPING_AMOUNT,
  NO_TRIAL_SHIPPING_PROVINCE_CODE,
} from "../../const"
import { validateAddress } from "../../api/smartystreets"
import usePromoCodes from "../hooks/usePromoCodes"
import CheckoutLoginModalContainer from "./CheckoutLoginModalContainer"
import { STATES_MAP } from "../../states"
import {
  fetchCheckoutCrossSellProductIds,
  fetchProduct,
} from "../../api/storefrontApi"
import {
  checkoutLoadById,
  checkoutUpdateById,
  createCheckoutUser,
} from "../../api/marketApi"
import {
  asyncStateSetter,
  useAsyncState,
  useCheckoutPaymentMethodsState,
} from "../../hooks"
import CheckoutLoginErrorModalContainer from "./CheckoutLoginErrorModalContainer"
import CheckoutS1HaveAccountModal from "../components/CheckoutS1HaveAccountModal"
import Checkout from "../components/Checkout"
import CheckoutUnfortunatelyShippingModal from "../components/CheckoutUnfortunatelyShippingModal"
import { Loader } from "../../rUI/icons/Loader"
import { purchaseCheckoutCreate } from "../../api/marketApiV2"
import useIsTrialCheckout from "../../hooks/useIsTrialCheckout"
import mixpanel from "../../integrations/mixpanel"

const checkoutValidateAddress = (checkout) =>
  validateAddress(checkout?.shippingAddress).then((isValid) => {
    if (isValid) {
      return checkout
    }

    return Promise.reject({
      data: {
        zip: ["Zip is not valid"],
      },
    })
  })

const checkoutCreateUser = (checkout) =>
  createCheckoutUser({
    email: checkout.email,
    firstName: checkout.shippingAddress.firstname,
    lastName: checkout.shippingAddress.lastname,
    phone: checkout.shippingAddress.phone,
    shippingAddress: {
      address1: checkout.shippingAddress.address,
      apt: checkout.shippingAddress.address2,
      city: checkout.shippingAddress.city,
      country: checkout.shippingAddress.country,
      province: STATES_MAP[checkout.shippingAddress.state],
      zip: checkout.shippingAddress.zip,
    },
    smsMarketingNotification:
      checkout[CHECKOUT_SMS_MARKETING_NOTIFICATION_ATTRIBUTES],
    smsNotification: checkout[CHECKOUT_SMS_NOTIFICATION_ATTRIBUTES],
  }).then(() => checkout)

CheckoutContainer.propTypes = {
  checkoutId: PropTypes.string.isRequired,
  onComplete: PropTypes.func,
}

function CheckoutContainer({ checkoutId, onComplete = noop }) {
  const [checkoutUpdates, setCheckoutUpdates] = useState({})
  const [
    checkoutState,
    setCheckout,
    reqCheckoutById,
    reqCheckoutUpdateById,
    reqCheckoutValidateAddress,
    reqCheckoutCreateUser,
  ] = useAsyncState(
    asyncStateSetter,
    checkoutLoadById,
    checkoutUpdateById,
    checkoutValidateAddress,
    checkoutCreateUser
  )
  const paymentMethodState = useCheckoutPaymentMethodsState(checkoutState.data)
  const [payError, setPayError] = useState(null)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadingCrossSell, setLoadingCrossSell] = useState(false)
  const [addCrossSellLoading, setAddCrossSellLoading] = useState(false)
  const [crossSellProductIds, setCrossSellProductIds] = useState(null)
  const [currentCrossSellProduct, setCurrentCrossSellProduct] = useState(null)
  const [showUnfortunatelyShippingModal, setShowUnfortunatelyShippingModal] =
    useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showLoginErrorModal, setShowLoginErrorModal] = useState(false)
  const [showS1AccountModal, setShowS1AccountModal] = useState(false)

  const { data: checkout } = checkoutState

  const currentCrossSellProductId = crossSellProductIds
    ? crossSellProductIds[0]
    : null

  const isTrial = useIsTrialCheckout(checkout)
  const promoCodesState = usePromoCodes(checkout, setCheckout)

  const handleCheckoutChange = useCallback(
    (updates) => {
      setCheckout({
        ...checkout,
        ...updates,
      })

      setCheckoutUpdates((oldValue) => deepMerge(oldValue, updates))
    },
    [checkout, setCheckout]
  )

  const handleShipping = useCallback(
    (checkout) => {
      setLoading(true)
      setCheckoutUpdates({})

      reqCheckoutUpdateById(checkout.id, checkoutUpdates)
        .then((checkout) => {
          const { shippingAddress } = checkout

          const bannedAreas =
            isTrial &&
            NO_TRIAL_SHIPPING_PROVINCE_CODE.indexOf(shippingAddress.state) > -1

          if (bannedAreas) {
            setShowUnfortunatelyShippingModal(true)
            return Promise.reject()
          }

          return checkout
        })
        .then((checkout) => reqCheckoutValidateAddress(checkout))
        .then((checkout) => reqCheckoutCreateUser(checkout))
        .then(() => {
          setStep(2)
          mixpanel.track("addressAdded")
        })
        .catch(({ code }) => {
          if (code === "ACCOUNT_EXIST") {
            setShowLoginModal(true)
          } else if (code === "ACCOUNT_EXISTS_IN_OLD_STORE") {
            setShowS1AccountModal(true)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [
      checkoutUpdates,
      isTrial,
      reqCheckoutCreateUser,
      reqCheckoutUpdateById,
      reqCheckoutValidateAddress,
    ]
  )

  const handleOnPayError = useCallback((error) => {
    console.error(error)

    setLoading(false)
    setPayError(
      "There was a problem with your payment. Please try again with a different credit or debit card."
    )
  }, [])

  const handleOnPay = useCallback(
    (token) => {
      setLoading(true)
      setPayError(null)

      purchaseCheckoutCreate(checkout.id, {
        token: token.id,
      })
        .then(() => onComplete(checkout))
        .catch((error) => handleOnPayError(error))
    },
    [checkout, onComplete, handleOnPayError]
  )

  const handleCloseErrorPopup = () => {
    setPayError(null)
  }

  const handleOnAddCrossSellProduct = useCallback(
    ({ product, variant }) => {
      if (addCrossSellLoading) {
        return
      }

      setAddCrossSellLoading(true)

      const updates = {
        items: [
          ...checkout.items,
          {
            id: sanitizeStorefrontId(variant?.id),
            quantity: 1,
          },
        ],
      }

      reqCheckoutUpdateById(checkout.id, updates)
        .then(() => {
          setCrossSellProductIds(
            crossSellProductIds.filter(
              (p) => encodeId(p) !== encodeId(product.id)
            )
          )
        })
        .finally(() => {
          setAddCrossSellLoading(false)
        })
    },
    [checkout, addCrossSellLoading, reqCheckoutUpdateById, crossSellProductIds]
  )

  const handleUnfortunatelyShippingModalOrderNow = useCallback(() => {
    window.location = "/"
  }, [])

  const handleUnfortunatelyShippingModalClose = useCallback(() => {
    setShowUnfortunatelyShippingModal(false)
  }, [])

  const handleCheckoutLoginModalClose = useCallback(() => {
    setShowLoginModal(false)
  }, [])

  const handleCheckoutLoginModalError = useCallback(() => {
    setShowLoginModal(false)
    setShowLoginErrorModal(true)
  }, [])

  const handleCheckoutLoginErrorModalClose = useCallback(() => {
    setShowLoginErrorModal(false)
  }, [])

  const handleCloseS1HaveAccountModal = useCallback(() => {
    setShowS1AccountModal(false)
  }, [])

  useLayoutEffect(() => {
    if (!checkoutId) {
      return
    }

    const mixpanelId = getUrlParameter("did")
    if (mixpanelId) {
      mixpanel.identify(mixpanelId)
    }
    trackEvent("Checkout Started")

    reqCheckoutById(checkoutId)
  }, [checkoutId, reqCheckoutById])

  useLayoutEffect(() => {
    if (!checkout || loadingCrossSell) {
      return
    }
    fetchCheckoutCrossSellProductIds(checkout)
      .then(setCrossSellProductIds)
      .finally(() => setLoadingCrossSell(true))
  }, [checkout, loadingCrossSell])

  useLayoutEffect(() => {
    if (currentCrossSellProductId) {
      fetchProduct(currentCrossSellProductId).then(setCurrentCrossSellProduct)
    } else {
      setCurrentCrossSellProduct(null)
    }
  }, [currentCrossSellProductId])

  if (!checkout) {
    return (
      <LoaderLayout>
        <StyledLoader />
      </LoaderLayout>
    )
  }

  return (
    <>
      <Checkout
        isTrial={isTrial}
        freeShippingAmount={FREE_SHIPPING_AMOUNT}
        step={step}
        checkoutState={checkoutState}
        recurlyKeyId={process.env.RECURLY_KEY}
        loading={loading}
        crossSellProduct={currentCrossSellProduct}
        payError={payError}
        onCheckoutChange={handleCheckoutChange}
        onCloseErrorPopup={handleCloseErrorPopup}
        addCrossSellLoading={addCrossSellLoading}
        promoCodesState={promoCodesState}
        paymentMethodState={paymentMethodState}
        onStep={setStep}
        onShipping={handleShipping}
        onPay={handleOnPay}
        onPayError={handleOnPayError}
        onAddPromo={promoCodesState.apply}
        onRemovePromo={promoCodesState.remove}
        onAddCrossSellProduct={handleOnAddCrossSellProduct}
      />

      {showUnfortunatelyShippingModal && (
        <CheckoutUnfortunatelyShippingModal
          onOrderNowClick={handleUnfortunatelyShippingModalOrderNow}
          onCloseClick={handleUnfortunatelyShippingModalClose}
        />
      )}

      {showLoginModal && (
        <CheckoutLoginModalContainer
          onError={handleCheckoutLoginModalError}
          onClose={handleCheckoutLoginModalClose}
        />
      )}

      {showLoginErrorModal && (
        <CheckoutLoginErrorModalContainer
          onClose={handleCheckoutLoginErrorModalClose}
        />
      )}

      {showS1AccountModal && (
        <CheckoutS1HaveAccountModal
          email={checkout?.email}
          onCloseClick={handleCloseS1HaveAccountModal}
        />
      )}
    </>
  )
}

const LoaderLayout = styled.div`
  height: 40vh;
  display: flex;
  justify-content: center;
`

const StyledLoader = styled(Loader)`
  height: 100%;
`

export default CheckoutContainer
