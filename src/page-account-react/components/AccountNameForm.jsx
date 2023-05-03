import React from "react"
import PropTypes from "prop-types"
import { AccountForm } from "./AccountForm"
import { AccountFormField } from "./AccountFormField"
import { AccountFormRow } from "./AccountFormRow"

AccountNameForm.propTypes = {
  profile: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
}

export function AccountNameForm({ profile, onCancel, onSubmit, ...props }) {
  return (
    <AccountForm
      title="Edit Your Name"
      onCancel={onCancel}
      onSubmit={onSubmit}
      {...props}
    >
      <AccountFormRow>
        <AccountFormField
          type="text"
          label="First Name"
          name="firstName"
          value={profile?.firstName}
          required
        />
        <AccountFormField
          type="text"
          label="Last Name"
          name="lastName"
          value={profile?.lastName}
        />
      </AccountFormRow>
    </AccountForm>
  )
}
