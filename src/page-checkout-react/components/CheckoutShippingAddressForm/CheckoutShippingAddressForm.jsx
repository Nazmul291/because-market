/* eslint-disable react/no-multi-comp */
import React, { useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import ReactInputMask from "react-input-mask"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import { isEmptyObject, noop } from "../../../utils"
import { STATES } from "../../../states"
import Input from "../../../rUI/Input"
import InputAddress from "../../../rUI/InputAddress"
import InputSelect from "../../../rUI/InputSelect"
import Button from "../../../rUI/Button"
import FormRow from "../../../rUI/FormRow"
import FormColumn from "../../../rUI/FormColumn"
import InputEmail from "../../../rUI/InputEmail"
import {
  CHECKOUT_SMS_NOTIFICATION_ATTRIBUTES,
  CHECKOUT_SMS_MARKETING_NOTIFICATION_ATTRIBUTES,
} from "../../../const"
import secureImg from "../../../rUI/img/secure-checkout-logo.png"
import sslImg from "../../../rUI/img/ssl-logo.png"
import { CHECKOUT_SHIPPING_ADDRESS_FIELDS } from "./const"
import { trackEvent } from "../../../integrations/tracker"

const calcErrors = (checkoutErrors) => {
  if (!checkoutErrors?.data) {
    return {}
  }

  return (
    Object.entries(checkoutErrors.data).reduce((acc, [field, messages]) => {
      acc[field] = Array.isArray(messages)
        ? messages[0]
        : messages ?? "Please verify this field"
      return acc
    }, {}) || {}
  )
}

const calcIsValid = (errors) =>
  !errors || !Object.values(errors).some((value) => value !== null)

const CONTACT_FIELDS = ["email"]

const REQUIRED_FIELDS_ERRORS = {
  firstname: "First name is required.",
  lastname: "Last name is required.",
  email: "Email is required.",
  phone: "Phone is required.",
  default: "Please verify this field",
}

const createHandlerFor = (field, checkout, onChange, errors, setErrors) => {
  const currentValue = checkout[field]

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useCallback(
    ({ target: { value } }) => {
      setErrors({
        ...errors,
        [field]: null,
      })

      onChange({
        [field]: value,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentValue, errors, onChange]
  )
}

const createHandlerForShippingAddress = (
  field,
  shippingAddress,
  onChange,
  errors,
  setErrors
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useCallback(
    ({ target: { value } }) => {
      setErrors({
        ...errors,
        [field]: null,
      })

      onChange({
        shippingAddress: {
          ...shippingAddress,
          country: "US",
          [field]: value,
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shippingAddress, errors, onChange]
  )
}

function validate(checkout) {
  const validateFieldList = (obj, fields, errors) =>
    fields.reduce((acc, item) => {
      if (obj && !obj[item]) {
        acc[item] = errors[item] || errors.default
      }

      return acc
    }, {})

  const addressErrors = validateFieldList(
    checkout?.shippingAddress,
    CHECKOUT_SHIPPING_ADDRESS_FIELDS,
    REQUIRED_FIELDS_ERRORS
  )

  if (!isEmptyObject(addressErrors)) {
    return addressErrors
  }

  return validateFieldList(checkout, CONTACT_FIELDS, REQUIRED_FIELDS_ERRORS)
}

InputPhone.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

function InputPhone({ value, onChange, ...props }) {
  const handleOnChange = useCallback(
    (e) => {
      const targetValue = (e.target.value || "").replace(/\D/g, "")
      onChange({ target: { value: targetValue } })
    },
    [onChange]
  )

  return (
    <ReactInputMask
      mask="999-999-9999"
      maskChar=""
      value={value}
      onChange={handleOnChange}
    >
      {(inputProps) => <Input {...inputProps} {...props} />}
    </ReactInputMask>
  )
}

CheckoutShippingAddressForm.propTypes = {
  loading: PropTypes.bool,
  checkout: PropTypes.object,
  checkoutErrors: PropTypes.array,
  addressWarning: PropTypes.node,
  onChange: PropTypes.func,
  onShipping: PropTypes.func,
}

function CheckoutShippingAddressForm({
  loading = false,
  checkout = {},
  checkoutErrors = null,
  addressWarning = null,
  onChange = noop,
  onShipping = noop,
}) {
  const [errors, setErrors] = useState(calcErrors(checkoutErrors))
  const isValid = calcIsValid(errors)
  const isSmsNotify = checkout && checkout[CHECKOUT_SMS_NOTIFICATION_ATTRIBUTES]
  const isSmsNotifyMarketing =
    checkout && checkout[CHECKOUT_SMS_MARKETING_NOTIFICATION_ATTRIBUTES]
  const isDisabledButton = !isValid || loading
  const { shippingAddress = {} } = checkout

  const handleChangeFirstName = createHandlerForShippingAddress(
    "firstname",
    shippingAddress,
    onChange,
    errors,
    setErrors
  )

  const handleChangeLastName = createHandlerForShippingAddress(
    "lastname",
    shippingAddress,
    onChange,
    errors,
    setErrors
  )

  const handleChangeEmail = createHandlerFor(
    "email",
    checkout,
    onChange,
    errors,
    setErrors
  )

  const handleChangePhone = createHandlerForShippingAddress(
    "phone",
    shippingAddress,
    onChange,
    errors,
    setErrors
  )

  const handleChangeAddress = createHandlerForShippingAddress(
    "address",
    shippingAddress,
    onChange,
    errors,
    setErrors
  )

  const handleChangeAddress2 = createHandlerForShippingAddress(
    "address2",
    shippingAddress,
    onChange,
    errors,
    setErrors
  )

  const handleChangeCity = createHandlerForShippingAddress(
    "city",
    shippingAddress,
    onChange,
    errors,
    setErrors
  )

  const handleState = createHandlerForShippingAddress(
    "state",
    shippingAddress,
    onChange,
    errors,
    setErrors
  )

  const handleChangeZip = createHandlerForShippingAddress(
    "zip",
    shippingAddress,
    onChange,
    errors,
    setErrors
  )

  const handleAddressSelect = useCallback(
    ({ street_line, city, state, zipcode: zip }) => {
      setErrors({
        ...errors,
        address: null,
        city: null,
        state: null,
        zip: null,
      })

      onChange({
        shippingAddress: {
          ...shippingAddress,
          country: "US",
          address: street_line,
          city,
          state,
          zip,
        },
      })
    },
    [shippingAddress, errors, onChange]
  )

  const handleContinueClick = useCallback(() => {
    const err = validate(checkout)
    trackEvent("Checkout Continue to Payment")
    setErrors(err)

    if (isEmptyObject(err)) {
      onShipping(checkout)
    }
  }, [checkout, onShipping])

  const handleChangeSMSNotify = useCallback(
    ({ target: { value: marketingType } }) => {
      onChange({
        [marketingType]: !checkout[marketingType],
      })
    },
    [checkout, onChange]
  )

  useEffect(() => {
    if (!checkoutErrors) {
      return
    }
    setErrors(calcErrors(checkoutErrors))
  }, [checkoutErrors])

  const PhoneCheckbox = (
    <>
      <InputSMSNotifyLabel>
        <InputSMSNotify
          type="checkbox"
          checked={isSmsNotify}
          onChange={handleChangeSMSNotify}
          disabled={loading}
          value={CHECKOUT_SMS_NOTIFICATION_ATTRIBUTES}
        />{" "}
        Send me updates on my order via SMS.
      </InputSMSNotifyLabel>
      <InputSMSNotifyLabelMarketing>
        <InputSMSNotifyMarketing
          type="checkbox"
          checked={isSmsNotifyMarketing}
          onChange={handleChangeSMSNotify}
          disabled={loading}
          value={CHECKOUT_SMS_MARKETING_NOTIFICATION_ATTRIBUTES}
        />{" "}
        Send me updates on exclusive sales and new product launches via SMS.
      </InputSMSNotifyLabelMarketing>
      <div className="marketing-permission-text">
        <p style={{ fontSize: "9px", marginBottom: "0px", color: "#a9a9a9" }}>
          By joining via text, you agree to receive recurring automated
          marketing messages from Because Market at the cell number provided
          when joining. Consent is not a condition of any purchase. Msg & data
          rates may apply. View{" "}
          <a
            href="https://becausemarket.com/pages/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms{" "}
          </a>
          &{" "}
          <a
            href="https://becausemarket.com/pages/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy
          </a>
          .
        </p>
      </div>
    </>
  )

  const phoneLabel = (
    <>
      Mobile Phone Number{" "}
      <Tippy
        content="Phone number will be used to send order updates via text message."
        placement="bottom"
      >
        <i className="fa fa-question-circle" aria-hidden="true" />
      </Tippy>
    </>
  )

  return (
    <div>
      <div>
        <FormRow>
          <FormColumn>
            <Input
              label="First name"
              value={shippingAddress.firstname}
              onChange={handleChangeFirstName}
              error={errors.firstname}
            />
          </FormColumn>
          <FormColumn>
            <Input
              label="Last name"
              value={shippingAddress.lastname}
              onChange={handleChangeLastName}
              error={errors.lastname}
            />
          </FormColumn>
        </FormRow>

        <FormRow>
          <div className="col-md-12 col-sm-12 col-12">
            <InputEmail
              type="email"
              label="Email"
              value={checkout.email}
              onChange={handleChangeEmail}
              error={errors.email}
            />
          </div>
        </FormRow>

        <FormRow>
          <div className="col-md-12 col-sm-12 col-12">
            <InputAddress
              label="Address"
              value={shippingAddress.address}
              onChange={handleAddressSelect}
              onChangeValue={handleChangeAddress}
              footer={
                addressWarning && (
                  <DeliveryWarning>{addressWarning}</DeliveryWarning>
                )
              }
              error={errors.address1}
            />
          </div>
        </FormRow>

        <FormRow>
          <FormColumn>
            <Input
              label="Apt, suite (optional)"
              value={shippingAddress.address2}
              onChange={handleChangeAddress2}
            />
          </FormColumn>
          <FormColumn>
            <Input
              label="City"
              value={shippingAddress.city}
              onChange={handleChangeCity}
              error={errors.city}
            />
          </FormColumn>
        </FormRow>

        <FormRow>
          <FormColumn>
            <InputSelect
              label="State"
              value={shippingAddress.state}
              onChange={handleState}
              options={STATES}
              error={errors.state}
            />
          </FormColumn>
          <FormColumn>
            <Input
              label="Zip Code"
              value={shippingAddress.zip}
              onChange={handleChangeZip}
              error={errors.zip}
            />
          </FormColumn>
        </FormRow>

        <FormRow>
          <div className="col-md-12 col-sm-12 col-12">
            <InputPhone
              type="phone"
              label={phoneLabel}
              value={shippingAddress.phone}
              placeholder={"Mobile Phone Number"}
              onChange={handleChangePhone}
              error={errors.phone}
            />
          </div>
        </FormRow>
      </div>

      <FormRow>
        <div className="col-md-12 col-sm-12 col-12">{PhoneCheckbox}</div>
      </FormRow>

      <Footer>
        <ImagesLayout>
          <Image alt="trust symbol" src={secureImg} />
          <Image alt="ssl symbol" src={sslImg} />
        </ImagesLayout>

        <CheckoutButton
          onClick={handleContinueClick}
          disabled={isDisabledButton}
        >
          Continue
        </CheckoutButton>
      </Footer>
    </div>
  )
}

const Footer = styled.div`
  padding-bottom: 20px;
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
`

const ImagesLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  @media (max-width: 575px) {
    display: none;
  }
`

const Image = styled.img`
  width: 50px;
`

const InputSMSNotifyLabel = styled.label`
  font-size: 13px;
  display: flex;
  padding-top: 4px;
`

const InputSMSNotifyLabelMarketing = styled(InputSMSNotifyLabel)`
  margin-left: 5px;
  display: flex;
  margin: 8px 0;
  align-items: flex-start;
`

const InputSMSNotify = styled.input`
  margin-right: 6px;
  cursor: pointer;
`

const InputSMSNotifyMarketing = styled(InputSMSNotify)`
  margin-top: 3px !important;
  min-width: 14px;
  max-width: 14px;
  width: auto;
  flex: 0 0 14px;
`

const DeliveryWarning = styled.p`
  color: #667799;
`

const CheckoutButton = styled(Button)`
  width: 60%;

  @media (max-width: 575px) {
    width: 100%;
  }
`

export default CheckoutShippingAddressForm
