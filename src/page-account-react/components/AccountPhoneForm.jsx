import React from "react"
import PropTypes from "prop-types"
import { AccountForm } from "./AccountForm"
import { AccountFormField } from "./AccountFormField"
import { AccountFormRow } from "./AccountFormRow"

AccountPhoneForm.propTypes = {
  profile: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
}

export function AccountPhoneForm({ profile, onCancel, onSubmit, ...props }) {
  return (
    <AccountForm
      title="Edit Your Phone Number"
      onCancel={onCancel}
      onSubmit={onSubmit}
      {...props}
    >
      <AccountFormRow>
        <AccountFormField
          type="text"
          label="Mobile Phone Number"
          name="phone"
          value={profile?.phone}
          required
        />
      </AccountFormRow>
    </AccountForm>
  )
}
