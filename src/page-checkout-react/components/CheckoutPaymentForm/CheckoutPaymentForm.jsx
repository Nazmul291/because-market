import React, { useMemo, useState, useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { Elements, RecurlyProvider } from "@recurly/react-recurly"
import { PAYMENT_METHOD_CARD, PAYMENT_METHOD_PAYPAL } from "../../../const"
import { noop } from "../../../utils"
import ppImg from "../../../rUI/img/logo-paypal.png"
import NotifyCard from "../../../rUI/NotifyCard"
import CheckoutCardForm from "./CheckoutCardForm"
import CheckoutPayPalForm from "./CheckoutPayPalForm"
import CheckoutTrialNotify from "./CheckoutTrialNotify"

const renderPaymentMethod = ({ method, currentPaymentMethod, onChange }) => {
  switch (method) {
    case PAYMENT_METHOD_PAYPAL:
      return (
        <PaymentMethodItem key={PAYMENT_METHOD_PAYPAL}>
          <input
            type="radio"
            id="paypal"
            name="pay_type"
            value={PAYMENT_METHOD_PAYPAL}
            checked={currentPaymentMethod === PAYMENT_METHOD_PAYPAL}
            onChange={onChange}
          />
          <PaymentMethodItemLabel htmlFor="paypal">
            <PaymentMethodPPImage src={ppImg} alt="paypal logo" />
          </PaymentMethodItemLabel>
        </PaymentMethodItem>
      )
    case PAYMENT_METHOD_CARD:
    default:
      return (
        <PaymentMethodItem key={PAYMENT_METHOD_CARD}>
          <input
            type="radio"
            id="ccard"
            name="pay_type"
            value={PAYMENT_METHOD_CARD}
            checked={currentPaymentMethod === PAYMENT_METHOD_CARD}
            onChange={onChange}
          />
          <PaymentMethodItemLabel htmlFor="ccard">
            Use Credit or Debit Card
          </PaymentMethodItemLabel>
        </PaymentMethodItem>
      )
  }
}

CheckoutPaymentForm.propTypes = {
  checkout: PropTypes.object.isRequired,
  recurlyKeyId: PropTypes.string.isRequired,
  paymentMethodState: PropTypes.object.isRequired,
  isTrial: PropTypes.bool,
  loading: PropTypes.bool,
  onPay: PropTypes.func,
  onPayError: PropTypes.func,
}

function CheckoutPaymentForm({
  checkout,
  recurlyKeyId,
  paymentMethodState,
  isTrial = false,
  loading = false,
  onPay = noop,
  onPayError = noop,
}) {
  const [currentPaymentMethod, setCurrentPaymentMethod] =
    useState(PAYMENT_METHOD_CARD)
  const { data: paymentMethods = [] } = paymentMethodState

  const handleMethodChange = useCallback(({ target: { value } }) => {
    setCurrentPaymentMethod(value)
  }, [])

  const handlePayPalCancel = useCallback(() => {
    setCurrentPaymentMethod(PAYMENT_METHOD_CARD)
  }, [])

  const handlePayPalError = useCallback(
    (error) => {
      onPayError(error)
      setCurrentPaymentMethod(PAYMENT_METHOD_CARD)
    },
    [onPayError]
  )

  const notify = useMemo(
    () => (!isTrial ? null : <CheckoutTrialNotify checkout={checkout} />),
    [isTrial, checkout]
  )

  const paymentForm = useMemo(() => {
    switch (currentPaymentMethod) {
      case PAYMENT_METHOD_PAYPAL:
        return (
          <CheckoutPayPalForm
            loading={loading}
            notify={notify}
            onPay={onPay}
            onPayError={handlePayPalError}
            onPayCancel={handlePayPalCancel}
          />
        )
      case PAYMENT_METHOD_CARD:
      default:
        return (
          <CheckoutCardForm
            checkout={checkout}
            loading={loading}
            notify={notify}
            onPay={onPay}
            onPayError={onPayError}
          />
        )
    }
  }, [
    currentPaymentMethod,
    checkout,
    loading,
    notify,
    onPay,
    handlePayPalError,
    handlePayPalCancel,
    onPayError,
  ])

  return (
    <>
      <NotifyCard>
        <PaymentMethodLayout>
          {paymentMethods?.map((method) =>
            renderPaymentMethod({
              method,
              currentPaymentMethod,
              onChange: handleMethodChange,
            })
          )}
        </PaymentMethodLayout>
      </NotifyCard>

      <RecurlyProvider publicKey={recurlyKeyId}>
        <Elements>{paymentForm}</Elements>
      </RecurlyProvider>
    </>
  )
}

const PaymentMethodLayout = styled.div`
  font-size: 16px;
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1;

  @media (max-width: 575px) {
    flex-direction: column;
    align-items: start;
    gap: 18px;
  }
`

const PaymentMethodItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const PaymentMethodItemLabel = styled.label`
  margin-bottom: 0;

  @media (max-width: 575px) {
    font-size: 14px;
    font-weight: normal;
  }
`

const PaymentMethodPPImage = styled.img`
  width: 120px;

  @media (max-width: 575px) {
    height: 20px !important; // fix global tag style issue
    width: auto;
  }
`

export default CheckoutPaymentForm
