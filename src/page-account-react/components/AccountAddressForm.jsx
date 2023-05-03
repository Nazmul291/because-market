import React, { useState, useCallback } from "react"
import PropTypes from "prop-types"
import { AccountForm } from "./AccountForm"
import { AccountFormField } from "./AccountFormField"
import { AccountFormRow } from "./AccountFormRow"
import { statesOptions } from "../../states"
import { AccountAddressField } from "./AccountAddressField"

const DEFAULT_ADDRESS = {
  address1: "",
  city: "",
  province: "",
  zip: "",
  apt: "",
}

AccountAddressForm.propTypes = {
  profile: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
}

export function AccountAddressForm({
  profile: { defaultAddress = DEFAULT_ADDRESS } = {},
  onCancel,
  onSubmit,
  ...props
}) {
  const [values, setValues] = useState(defaultAddress)

  const handleAddressSelect = useCallback(
    ({ street_line: address1, city, state: province, zipcode: zip }) => {
      setValues({
        ...values,
        address1,
        city,
        province,
        zip,
      })
    },
    [values, setValues]
  )

  const handleAddressFieldChange = useCallback(
    (fieldName, event) => {
      const value = event.target.value || ""
      setValues((values) => ({ ...values, [fieldName]: value }))
    },
    [setValues]
  )

  return (
    <AccountForm
      title="Shipping Details"
      description="Edit your shipping address details"
      onCancel={onCancel}
      onSubmit={onSubmit}
      {...props}
    >
      <AccountFormRow>
        <AccountAddressField
          type="text"
          label="Street address"
          name="address1"
          onChange={handleAddressSelect}
          value={values.address1}
          required
        />
      </AccountFormRow>
      <AccountFormRow>
        <AccountFormField
          type="text"
          label="Apt/Suite (Optional)"
          name="apt"
          value={values.apt}
          onChange={(e) => handleAddressFieldChange("apt", e)}
        />
        <AccountFormField
          type="text"
          label="City"
          name="city"
          value={values.city}
          onChange={(e) => handleAddressFieldChange("city", e)}
          required
        />
      </AccountFormRow>
      <AccountFormRow>
        <AccountFormField
          type="select"
          label="State"
          name="province"
          options={statesOptions}
          value={values.province}
          onChange={(e) => handleAddressFieldChange("province", e)}
        />
        <AccountFormField
          type="text"
          label="Zip Code"
          name="zip"
          value={values.zip}
          onChange={(e) => handleAddressFieldChange("zip", e)}
          required
        />
      </AccountFormRow>
    </AccountForm>
  )
}
