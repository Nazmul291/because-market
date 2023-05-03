import React from "react"
import PropTypes from "prop-types"
import { AccountForm } from "./AccountForm"
import { AccountFormField } from "./AccountFormField"
import { AccountFormRow } from "./AccountFormRow"

AccountEmailForm.propTypes = {
  profile: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
}

export function AccountEmailForm({ profile, onCancel, onSubmit, ...props }) {
  return (
    <AccountForm
      title="Edit Your Email Address"
      onCancel={onCancel}
      onSubmit={onSubmit}
      {...props}
    >
      <AccountFormRow>
        <AccountFormField
          type="email"
          label="Email address"
          name="email"
          value={profile?.email}
          required
        />
      </AccountFormRow>
    </AccountForm>
  )
}
