import React, { useCallback, useRef, useState, useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { css } from "@linaria/core"
import {
  CardCvvElement,
  CardMonthElement,
  CardNumberElement,
  CardYearElement,
  useRecurly,
} from "@recurly/react-recurly"
import { isEmptyObject, noop } from "../../../utils"
import Button from "../../../rUI/Button"
import FormColumn from "../../../rUI/FormColumn"
import FormRow from "../../../rUI/FormRow"
import Input from "../../../rUI/Input"
import InputLayout from "../../../rUI/InputLayout"
import ErrorBoundary from "../../../rUI/ErrorBoundary"
import RenderNode from "../../../rUI/RenderNode"
import secureImg from "../../../rUI/img/secure-checkout-logo.png"
import sslImg from "../../../rUI/img/ssl-logo.png"

import CheckoutNewerSpamDisclaim from "../CheckoutNewerSpamDisclaim"

const CARD_ERRORS = {
  number: "Credit card number is not valid.",
  cvv: "CVV is not valid.",
  month: "Expiration month is not valid.",
  year: "Expiration year is not valid.",
}

const createHandlerFor = (field, oldData, setter) =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useCallback(
    ({ target: { value } }) => {
      const trimmed = value ? value.trim() : ""

      setter({
        ...oldData,
        [field]: trimmed,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [oldData]
  )

const createHandlerForRecurly = (field, oldData, setter) =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useCallback(
    (status) => {
      setter({ ...oldData, [field]: status })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [oldData]
  )

CheckoutCardForm.propTypes = {
  checkout: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  notify: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onPay: PropTypes.func,
  onPayError: PropTypes.func,
}

function CheckoutCardForm({
  checkout,
  loading,
  notify,
  onPay = noop,
  onPayError = noop,
}) {
  const [billingAddress, setBillingAddress] = useState({
    firstName: checkout?.billingAddress?.firstname || "",
    lastName: checkout?.billingAddress?.lastname || "",
    address: checkout?.billingAddress?.address || "",
    city: checkout?.billingAddress?.city || "",
    state: checkout?.billingAddress?.state || "",
    country: checkout?.billingAddress?.country || "US",
    zip: checkout?.billingAddress?.zip || "",
    email: checkout?.email || "",
  })
  const [recurlyFieldStatus, setRecurlyFieldStatus] = useState({})
  const [tokenLoading, setTokenLoading] = useState(false)
  const recurly = useRecurly()
  const formRef = useRef()
  const recurlyErrors = useMemo(
    () =>
      Object.entries(recurlyFieldStatus).reduce(
        (acc, [key, { valid, empty }]) => {
          if (empty) {
            return acc
          }

          if (!valid) {
            return { ...acc, [key]: CARD_ERRORS[key] }
          }

          return acc
        },
        {}
      ),
    [recurlyFieldStatus]
  )
  const recurlyEmpties = useMemo(
    () =>
      Object.entries(recurlyFieldStatus).reduce((acc, [key, { empty }]) => {
        if (empty) {
          return { ...acc, [key]: true }
        }

        return acc
      }, {}),
    [recurlyFieldStatus]
  )

  const buyButtonDisabled =
    loading ||
    tokenLoading ||
    !isEmptyObject(recurlyErrors) ||
    !isEmptyObject(recurlyEmpties)

  const handleFirstNameChange = createHandlerFor(
    "firstName",
    billingAddress,
    setBillingAddress
  )

  const handleLastNameChange = createHandlerFor(
    "lastName",
    billingAddress,
    setBillingAddress
  )

  const handleAddressChange = createHandlerFor(
    "address",
    billingAddress,
    setBillingAddress
  )

  const handleCityChange = createHandlerFor(
    "city",
    billingAddress,
    setBillingAddress
  )

  const handleProvinceChange = createHandlerFor(
    "state",
    billingAddress,
    setBillingAddress
  )

  const handleZipChange = createHandlerFor(
    "zip",
    billingAddress,
    setBillingAddress
  )

  const handleEmailChange = createHandlerFor(
    "email",
    billingAddress,
    setBillingAddress
  )

  const handleCardNumber = createHandlerForRecurly(
    "number",
    recurlyFieldStatus,
    setRecurlyFieldStatus
  )

  const handleCardCVV = createHandlerForRecurly(
    "cvv",
    recurlyFieldStatus,
    setRecurlyFieldStatus
  )

  const handleCardMonth = createHandlerForRecurly(
    "month",
    recurlyFieldStatus,
    setRecurlyFieldStatus
  )

  const handleCardYear = createHandlerForRecurly(
    "year",
    recurlyFieldStatus,
    setRecurlyFieldStatus
  )

  const handleSubmit = useCallback(
    (event) => {
      if (event.preventDefault) {
        event.preventDefault()
      }
      setTokenLoading(true)
      setRecurlyFieldStatus({})

      recurly.token(formRef.current, (err, token) => {
        setTokenLoading(false)

        if (err?.fields?.length) {
          setRecurlyFieldStatus(
            err.details.reduce((acc, { field }) => {
              acc[field] = { valid: false, empty: false }
              return acc
            }, {})
          )

          onPayError(err)
        } else if (err) {
          onPayError(err)
        } else {
          onPay(token)
        }
      })
    },
    [recurly, onPay, onPayError]
  )

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      ref={formRef}
      disabled={buyButtonDisabled}
    >
      <FormRow>
        <FormColumn>
          <Input
            data-recurly="first_name"
            label="First name"
            value={billingAddress.firstName}
            hidden
            onChange={handleFirstNameChange}
          />
        </FormColumn>
        <FormColumn>
          <Input
            data-recurly="last_name"
            label="Last name"
            value={billingAddress.lastName}
            hidden
            onChange={handleLastNameChange}
          />
        </FormColumn>
      </FormRow>

      <FormRow>
        <FormColumn>
          <Input
            data-recurly="address1"
            label="Address"
            value={billingAddress.address}
            hidden
            onChange={handleAddressChange}
          />
        </FormColumn>
        <FormColumn>
          <Input
            data-recurly="city"
            label="City"
            value={billingAddress.city}
            hidden
            onChange={handleCityChange}
          />
        </FormColumn>
      </FormRow>

      <FormRow>
        <FormColumn>
          <Input
            data-recurly="state"
            label="State"
            value={billingAddress.state}
            hidden
            onChange={handleProvinceChange}
          />
        </FormColumn>

        <FormColumn>
          <Input
            data-recurly="postal_code"
            label="Zip"
            value={billingAddress.zip}
            hidden
            onChange={handleZipChange}
          />
        </FormColumn>
      </FormRow>

      <FormRow>
        <FormColumn>
          <Input
            type="email"
            data-recurly="email"
            label="Email"
            value={billingAddress.email}
            hidden
            onChange={handleEmailChange}
          />
        </FormColumn>
        <FormColumn>
          <Input
            data-recurly="country"
            label="Country"
            value={billingAddress.country}
            hidden
          />
        </FormColumn>
      </FormRow>

      <ErrorBoundary>
        <FormRow>
          <FormColumn>
            <StyledInputLayout
              id="r-number"
              label="Card Number"
              error={recurlyErrors.number}
            >
              <CardNumberElement
                id="r-number"
                style={{
                  placeholder: {
                    content: "Card number",
                  },
                }}
                className={fixCssRecurly}
                onChange={handleCardNumber}
              />
            </StyledInputLayout>
          </FormColumn>

          <FormColumn>
            <StyledInputLayout
              id="r-cvv"
              label="Security Code (CVV)"
              error={recurlyErrors.cvv}
            >
              <CardCvvElement
                id="r-cvv"
                style={{
                  placeholder: {
                    content: "Security Code (CVV)",
                  },
                }}
                className={fixCssRecurly}
                onChange={handleCardCVV}
              />
            </StyledInputLayout>
          </FormColumn>
        </FormRow>

        <FormRow>
          <FormColumn>
            <StyledInputLayout
              id="r-month"
              label="Expiration month"
              error={recurlyErrors.month}
            >
              <CardMonthElement
                id="r-month"
                style={{
                  placeholder: {
                    content: "MM",
                  },
                }}
                className={fixCssRecurly}
                onChange={handleCardMonth}
              />
            </StyledInputLayout>
          </FormColumn>

          <FormColumn>
            <StyledInputLayout
              id="r-year"
              label="Expiration year"
              error={recurlyErrors.year}
            >
              <CardYearElement
                id="r-year"
                style={{
                  placeholder: {
                    content: "YY",
                  },
                }}
                className={fixCssRecurly}
                onChange={handleCardYear}
              />
            </StyledInputLayout>
          </FormColumn>
        </FormRow>
      </ErrorBoundary>

      {notify && <RenderNode node={notify} />}

      <StyledFooter>
        <StyledActionsLayout>
          <StyledActionsImages>
            <FooterImage alt="trust symbol" src={secureImg} />
            <FooterImage alt="ssl symbol" src={sslImg} />
          </StyledActionsImages>

          <BuyButton disabled={buyButtonDisabled}>Buy now</BuyButton>
          <BuyButtonMobile disabled={buyButtonDisabled}>
            Buy Now
          </BuyButtonMobile>
        </StyledActionsLayout>

        <StyledNewerSpamDisclaim />
      </StyledFooter>
    </form>
  )
}

const StyledFooter = styled.footer`
  padding-top: 20px;
  padding-bottom: 20px;
`

const StyledActionsLayout = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledActionsImages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  @media (max-width: 575px) {
    display: none;
  }
`

const FooterImage = styled.img`
  width: 50px;
`

const BuyButton = styled(Button)`
  width: 60%;

  @media (max-width: 575px) {
    display: none;
  }
`

const BuyButtonMobile = styled(Button)`
  width: 100%;
  display: none;

  @media (max-width: 575px) {
    display: block;
  }
`

const StyledNewerSpamDisclaim = styled(CheckoutNewerSpamDisclaim)`
  padding-top: 20px;
`

const StyledInputLayout = styled(InputLayout)`
  --size-border--default: 0px;
  --input-body--height: 40px;
`

const fixCssRecurly = css`
  .recurly-element {
    width: 100%;
    height: 40px;
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 2px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    font-size: 14px;
    padding-top: 0.5rem;
    margin-top: 0;
  }

  .recurly-element-invalid {
    border-color: red;
  }

  .recurly-element-focus {
    border-color: #667799;
    outline: 0;
  }
`

export default CheckoutCardForm
