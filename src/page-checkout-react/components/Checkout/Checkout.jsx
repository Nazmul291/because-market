import React, { useCallback, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import CheckoutItems from "../CheckoutItems"
import CheckoutTimeline from "../CheckoutTimeline"
import CheckoutShippingAddressForm from "../CheckoutShippingAddressForm"
import { noop } from "../../../utils"
import CheckoutPaymentForm from "../CheckoutPaymentForm"
import CheckoutFreeShippingCard from "../CheckoutFreeShippingCard"
import CheckoutAddPromo from "../CheckoutAddPromo"
import { NO_TRIAL_SHIPPING_PROVINCE_CODE } from "../../../const"
import CheckoutSatisfactionCard from "../CheckoutSatisfactionCard"
import CheckoutCrossSellProductCard from "../CheckoutCrossSellProductCard"
import Modal from "../../../rUI/Modal"
import CheckoutCard from "../../../rUI/CheckoutCard"
import Button from "../../../rUI/Button"
import CheckoutTitle from "./CheckoutTitle"

const calcShippingPrice = (totalAmount, freeShippingAmount) =>
  totalAmount >= freeShippingAmount ? 0 : freeShippingAmount - totalAmount

const calcHasSubscriptionItem = (checkout) =>
  checkout?.lineItems?.find((item) =>
    item?.customAttributes.find(({ key }) => key === "subscription")
  )

Checkout.propTypes = {
  checkoutState: PropTypes.object,
  step: PropTypes.number,
  loading: PropTypes.bool,
  recurlyKeyId: PropTypes.string,
  freeShippingAmount: PropTypes.number,
  crossSellProduct: PropTypes.object,
  payError: PropTypes.string,
  addCrossSellLoading: PropTypes.bool,
  isTrial: PropTypes.bool,
  promoCodesState: PropTypes.object,
  paymentMethodState: PropTypes.object,
  onCloseErrorPopup: PropTypes.func,
  onStep: PropTypes.func,
  onShipping: PropTypes.func,
  onPay: PropTypes.func,
  onPayError: PropTypes.func,
  onAddPromo: PropTypes.func,
  onRemovePromo: PropTypes.func,
  onAddCrossSellProduct: PropTypes.func,
  onCheckoutChange: PropTypes.func,
}

function Checkout({
  checkoutState = {},
  step = 1,
  loading,
  recurlyKeyId,
  freeShippingAmount = 0,
  crossSellProduct = null,
  payError = null,
  addCrossSellLoading = false,
  isTrial = false,
  promoCodesState = null,
  paymentMethodState = null,
  onCloseErrorPopup = noop,
  onStep = noop,
  onShipping = noop,
  onPay = noop,
  onPayError = noop,
  onAddPromo = noop,
  onRemovePromo = noop,
  onAddCrossSellProduct = noop,
  onCheckoutChange = noop,
}) {
  const { data: checkout, error: checkoutErrors } = checkoutState
  const [mobileNext, setMobileNext] = useState(false)
  const toFreeShippingPriceAmount = useMemo(
    () => calcShippingPrice(checkout.subtotal * 100, freeShippingAmount),
    [checkout, freeShippingAmount]
  )
  const { shippingAddress = {} } = checkout

  const addressWarning = useMemo(() => {
    if (
      isTrial ||
      !NO_TRIAL_SHIPPING_PROVINCE_CODE.includes(shippingAddress?.provinceCode)
    ) {
      return null
    }

    return "Delivery to Alaska/Hawaii may have increased shipping fees."
  }, [isTrial, shippingAddress])

  const hasSubscription = useMemo(
    () => calcHasSubscriptionItem(checkout),
    [checkout]
  )

  const isShowFreeShipping = toFreeShippingPriceAmount > 0

  const handleOnStep = useCallback(
    (next) => {
      if (next < step) {
        onStep(next)
      }
    },
    [step, onStep]
  )

  const handleOnClickMobile = useCallback(() => {
    setMobileNext(true)
  }, [])

  const currentStepForm =
    step === 1 ? (
      <CheckoutShippingAddressForm
        loading={loading}
        checkout={checkout}
        checkoutErrors={checkoutErrors}
        addressWarning={addressWarning}
        onChange={onCheckoutChange}
        onShipping={onShipping}
      />
    ) : (
      <CheckoutPaymentForm
        checkout={checkout}
        recurlyKeyId={recurlyKeyId}
        loading={loading}
        paymentMethodState={paymentMethodState}
        isTrial={isTrial}
        onPay={onPay}
        onPayError={onPayError}
      />
    )

  return (
    <div className="container">
      <div className="row column_row">
        <CollLayout
          className="col-lg-5 col-md-5 col-sm-12"
          mhidden={mobileNext}
        >
          {!payError ? null : (
            <Modal
              header={"Error"}
              children={payError}
              onCloseClick={onCloseErrorPopup}
            />
          )}

          {isTrial || !isShowFreeShipping ? null : (
            <CheckoutFreeShippingCardLayout
              amount={toFreeShippingPriceAmount}
            />
          )}

          <CheckoutItems checkout={checkout} isTrial={isTrial} />

          {isTrial || !crossSellProduct ? null : (
            <CheckoutCrossSellProductCard
              product={crossSellProduct}
              loading={addCrossSellLoading}
              onAdd={onAddCrossSellProduct}
            />
          )}

          {isTrial ? null : (
            <CheckoutAddPromo
              value={promoCodesState?.value}
              loading={promoCodesState?.loading}
              error={promoCodesState?.error}
              coupons={checkout?.coupons}
              onChange={onAddPromo}
              onRemove={onRemovePromo}
            />
          )}

          {isTrial || !hasSubscription ? null : <CheckoutSatisfactionCard />}

          <MobileButtonLayout
            className="container mobile_btn_container d-block d-sm-none"
            data-is-trial-checkout={isTrial}
          >
            <div className="row">
              <div className="col-sm-12 d-block d-sm-none">
                <Button
                  className="btn btn-lg"
                  style={{ width: "100%" }}
                  onClick={handleOnClickMobile}
                >
                  Continue to Shipping
                </Button>
              </div>
            </div>
          </MobileButtonLayout>
        </CollLayout>
        <CollLayout
          className="col-lg-7 col-md-7 col-sm-12"
          mhidden={!mobileNext}
        >
          <CheckoutCard>
            <TimelineLayout>
              <CheckoutTimeline step={step} onStep={handleOnStep} />
            </TimelineLayout>
            <FormBodyLayout>
              <StyledCheckoutTitle step={step} />
              {currentStepForm}
            </FormBodyLayout>
          </CheckoutCard>
        </CollLayout>
      </div>
    </div>
  )
}

const CollLayout = styled.div`
  display: block;

  @media (max-width: 575px) {
    margin-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    min-height: 100vh;
    display: ${(props) => (props.mhidden ? "none" : "block")};
  }
`

const CheckoutFreeShippingCardLayout = styled(CheckoutFreeShippingCard)`
  font-size: 18px;
`

const TimelineLayout = styled.div`
  padding-top: 25px;
`

const FormBodyLayout = styled.div`
  padding: 25px 30px;
`

const StyledCheckoutTitle = styled(CheckoutTitle)`
  margin-bottom: 20px;
`

const MobileButtonLayout = styled.div`
  display: none;

  @media (max-width: 575px) {
    position: fixed;
    bottom: 0;
    display: block;
    padding: 15px;
    background-color: #fff;
    z-index: 10000;

    &[data-is-trial-checkout="true"] {
      position: relative;
      z-index: 0;
    }
  }
`

export default Checkout
