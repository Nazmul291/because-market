import React, { useState, useCallback } from "react"
import PropTypes from "prop-types"
import { css } from "@linaria/core"
import { CardElement } from "@recurly/react-recurly"
import { AccountForm } from "./AccountForm"
import { AccountFormField } from "./AccountFormField"
import { AccountFormRow } from "./AccountFormRow"
import { statesOptions } from "../../states"

CreditCardForm.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    defaultAddress: PropTypes.shape({
      address1: PropTypes.string,
      address2: PropTypes.string,
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
  }),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  error: PropTypes.string,
}

export function CreditCardForm({
  profile,
  onCancel,
  onSubmit,
  error,
  ...props
}) {
  const [recurlyState, setRecurlyState] = useState(
    profile?.defaultAddress?.province
  )
  const [recurlyFormValid, setRecurlyFormValid] = useState(false)

  const handleStateChange = useCallback(
    ({ target }) => setRecurlyState(target.value),
    [setRecurlyState]
  )

  const handleRecurlyFormChange = useCallback(
    ({ valid }) => setRecurlyFormValid(valid),
    [setRecurlyFormValid]
  )

  return (
    <AccountForm
      title="Credit Card (default)"
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitDisabled={!recurlyFormValid}
      error={error}
      {...props}
    >
      <AccountFormRow>
        <AccountFormField
          type="text"
          label="Firt Name"
          name="firstName"
          data-recurly="first_name"
          value={profile?.firstName}
          required
        />
        <AccountFormField
          type="text"
          label="Last Name"
          name="lastName"
          data-recurly="last_name"
          value={profile?.lastName}
          required
        />
      </AccountFormRow>
      <AccountFormRow>
        <AccountFormField
          type="text"
          label="Address Line 1"
          name="address1"
          data-recurly="address1"
          value={profile?.defaultAddress?.address1}
          required
        />
        <AccountFormField
          type="text"
          label="Address Line 2"
          name="address2"
          data-recurly="address2"
          value={profile?.defaultAddress?.address2}
        />
      </AccountFormRow>
      <AccountFormRow>
        <AccountFormField
          type="text"
          label="City"
          name="city"
          data-recurly="city"
          value={profile?.defaultAddress?.city}
          required
        />
        <AccountFormField
          type="select"
          label="State"
          name="province"
          options={statesOptions}
          onChange={handleStateChange}
          value={profile?.defaultAddress?.province}
        />
        <AccountFormField
          type="text"
          label="Zip Code"
          name="zip"
          data-recurly="postal_code"
          value={profile?.defaultAddress?.zip}
          required
        />
      </AccountFormRow>
      <AccountFormRow>
        <CardElement
          className={cardElementCss}
          onChange={handleRecurlyFormChange}
        />
      </AccountFormRow>
      <input
        type="hidden"
        name="state"
        data-recurly="state"
        value={recurlyState}
      />
      <input type="hidden" data-recurly="country" value="US" />
    </AccountForm>
  )
}

const cardElementCss = css`
  width: 100%;
  height: 65px;
  border: 2px solid #679;
  border-radius: 7px;

  & .recurly-element-card {
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-top: 0;
    border: none;
  }
`
