import React, { useEffect, useCallback, useState, useMemo } from "react"
import PropTypes from "prop-types"
import { useRecurly } from "@recurly/react-recurly"
import { isEmptyObject, noop } from "../../utils"
import { AccountSection } from "../components/AccountSection"
import { AccountDetailsRow } from "../components/AccountDetailsRow"
import { CreditCardForm } from "./CreditCardForm"
import { withLoading } from "../../hocs/withLoading"
import ModalWindow from "../../rUI/ModalWindow"
import imgAccountPaypal from "../images/account-paypal.png"
import imgAccountCreditCard from "../images/account-credit-card.png"
import { Skeleton } from "../../rUI"
import { PAYMENT_METHOD_CARD, PAYMENT_METHOD_PAYPAL } from "../../const"
import segment from "../../integrations/segment"
import CheckoutPayPalForm from "../../page-checkout-react/components/CheckoutPaymentForm/CheckoutPayPalForm"

const DEFAULT_VALUE = "N/A"

const POPUP_FORMS = {
  CREDIT_CARD: "credit-card",
  PAYPAL: "paypal",
}

const RECURLY_BILLING_TYPE = {
  CREDIT_CARD: "credit_card",
  PAYPAL: "paypal_billing_agreement",
}

PaymentDetailsComponent.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    defaultAddress: PropTypes.shape({
      address1: PropTypes.string,
      apt: PropTypes.string,
      city: PropTypes.string,
      province: PropTypes.string,
      zip: PropTypes.string,
    }),
  }),
  billingInfo: PropTypes.shape({
    cardType: PropTypes.string,
    expMonth: PropTypes.number,
    expYear: PropTypes.number,
    firstSix: PropTypes.string,
    lastFour: PropTypes.string,
    lastTwo: PropTypes.string,
    object: PropTypes.string,
    billingAgreementID: PropTypes.string,
  }),
  loading: PropTypes.bool,
  onCardChange: PropTypes.func,
  onPayPalChange: PropTypes.func,
  error: PropTypes.node,
}

function PaymentDetailsComponent({
  profile,
  loading,
  billingInfo,
  error,
  onCardChange = noop,
  onPayPalChange = noop,
  ...props
}) {
  const recurly = useRecurly()

  const [formShown, setFormShown] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [recurlyLoading, setRecurlyLoading] = useState(false)

  const currentPaymentMethod = useMemo(() => {
    if (isEmptyObject(billingInfo)) {
      return
    }

    const recurlyPaymentMethod = billingInfo.object

    if (recurlyPaymentMethod === RECURLY_BILLING_TYPE.CREDIT_CARD) {
      return PAYMENT_METHOD_CARD
    }

    if (recurlyPaymentMethod === RECURLY_BILLING_TYPE.PAYPAL) {
      return PAYMENT_METHOD_PAYPAL
    }
  }, [billingInfo])

  const handleClosePopup = useCallback(
    () => setFormShown(false),
    [setFormShown]
  )

  const handleSubmitCreditCard = useCallback(
    (formData, formRef) => {
      setFormLoading(true)
      setRecurlyLoading(true)

      recurly.token(formRef.current, (err, { id: token }) => {
        if (err) {
          console.error(err)
        } else {
          onCardChange({ ...formData, token }, formShown)
        }

        setRecurlyLoading(false)
      })
    },
    [recurly, onCardChange, formShown]
  )

  const handleSubmitPayPal = useCallback(
    ({ id: token }) => {
      onPayPalChange({ token }, formShown)
      handleClosePopup()
    },
    [onPayPalChange, handleClosePopup, formShown]
  )

  const conditionnalyShowForm = useCallback(
    (flag, FormComponent, props) =>
      formShown === flag && (
        <FormComponent
          key={flag}
          profile={profile}
          onSubmit={
            flag === POPUP_FORMS.CREDIT_CARD
              ? handleSubmitCreditCard
              : handleSubmitPayPal
          }
          onCancel={handleClosePopup}
          disabled={formLoading}
          error={error}
          {...props}
        />
      ),
    [
      formShown,
      profile,
      handleSubmitCreditCard,
      handleSubmitPayPal,
      handleClosePopup,
      formLoading,
      error,
    ]
  )

  const trackMixpanelClick = useCallback(
    (formType) => {
      // trackEvent(TYPE_MIXPANEL, `S2-${formType} Edit Button Clicked`)
      segment.track(`S2-${formType} Edit Button Clicked`)
      setFormShown(formType)
    },
    [setFormShown]
  )

  useEffect(() => {
    if (formShown && formLoading && !recurlyLoading && !loading && !error) {
      handleClosePopup()
      setFormLoading(false)
    }
  }, [formShown, formLoading, recurlyLoading, loading, handleClosePopup, error])

  return (
    <AccountSection
      title="Payment details"
      loading={loading}
      error={error}
      {...props}
    >
      <AccountDetailsRow
        icon={<img src={imgAccountCreditCard} alt="Credit Card (default)" />}
        title="Credit Card (default)"
        onAction={() => trackMixpanelClick(POPUP_FORMS.CREDIT_CARD)}
        disabled={loading || formLoading || recurlyLoading}
      >
        {currentPaymentMethod === PAYMENT_METHOD_CARD
          ? `${billingInfo.cardType} ****${billingInfo.lastFour}`
          : DEFAULT_VALUE}
      </AccountDetailsRow>

      <AccountDetailsRow
        icon={<img src={imgAccountPaypal} alt="PayPal" />}
        title="PayPal"
        onAction={() => trackMixpanelClick(POPUP_FORMS.PAYPAL)}
        disabled={loading || formLoading || recurlyLoading}
      >
        {currentPaymentMethod === PAYMENT_METHOD_PAYPAL
          ? billingInfo.billingAgreementID
          : DEFAULT_VALUE}
      </AccountDetailsRow>

      <ModalWindow
        appElement={"#MainContent"}
        fullScreen={true}
        centerVertically={true}
        open={Boolean(formShown)}
        children={conditionnalyShowForm(
          POPUP_FORMS.CREDIT_CARD,
          CreditCardForm,
          {
            disabled: formLoading || recurlyLoading,
          }
        )}
        onCloseModal={handleClosePopup}
      />

      {conditionnalyShowForm(POPUP_FORMS.PAYPAL, CheckoutPayPalForm, {
        onPay: handleSubmitPayPal,
        onPayError: console.error,
        onPayCancel: handleClosePopup,
      })}
    </AccountSection>
  )
}

export const PaymentDetails = withLoading(
  PaymentDetailsComponent,
  <Skeleton style={{ height: "290px", margin: "5px 0 50px" }} />
)
