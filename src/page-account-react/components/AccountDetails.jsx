import React, { useEffect, useCallback, useState } from "react"
import PropTypes from "prop-types"
import { AccountSection } from "../components/AccountSection"
import { AccountDetailsRow } from "../components/AccountDetailsRow"
import { formatAddress, formatPhone } from "../../utils"
import { Skeleton } from "../../rUI"
import ModalWindow from "../../rUI/ModalWindow"
import { AccountNameForm } from "./AccountNameForm"
import { AccountPhoneForm } from "./AccountPhoneForm"
import { AccountEmailForm } from "./AccountEmailForm"
import { AccountAddressForm } from "./AccountAddressForm"
import { withLoading } from "../../hocs/withLoading"
import imgAccountCustomer from "../images/account-customer.png"
import imgAccountPhone from "../images/account-phone.png"
import imgAccountEmail from "../images/account-mail.png"
import imgAccountLocation from "../images/account-location.png"
import segment from "../../integrations/segment"

AccountDetailsComponent.propTypes = {
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
  loading: PropTypes.bool,
  error: PropTypes.node,
  onChange: PropTypes.func,
}

const DEFAULT_VALUE = "N/A"

const POPUP_FORMS = {
  NAME: { value: "name", title: "Customer Name" },
  PHONE: { value: "phone", title: "Phone Number" },
  EMAIL: { value: "email", title: "Email Address" },
  ADDRESS: { value: "defaultAddress", title: "Shipping Address" },
}

function AccountDetailsComponent({ profile, loading, error, onChange }) {
  const [formShown, setFormShown] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  const handleClosePopup = useCallback(() => {
    document.body.style.overflow = "auto"
    setFormShown(false)
  }, [])

  const handleSubmit = useCallback(
    (formData) => {
      setFormLoading(true)
      segment.track("S2-Account Details Updated")
      onChange({ ...profile, ...formData }, formShown)
    },
    [profile, onChange, formShown]
  )

  const handleSubmitAddress = useCallback(
    (formData) => {
      setFormLoading(true)
      onChange({ ...profile, defaultAddress: formData }, formShown)
    },
    [profile, onChange, formShown]
  )

  const conditionnalyShowForm = useCallback(
    (flag, FormComponent) =>
      formShown === flag && (
        <FormComponent
          key={flag}
          profile={profile}
          onSubmit={
            flag === POPUP_FORMS.ADDRESS.value
              ? handleSubmitAddress
              : handleSubmit
          }
          onCancel={handleClosePopup}
          disabled={formLoading}
        />
      ),
    [
      profile,
      formLoading,
      formShown,
      handleSubmit,
      handleSubmitAddress,
      handleClosePopup,
    ]
  )

  const trackMixpanelClick = useCallback(
    (formType) => {
      const { value, title } = formType
      document.body.style.overflow = "hidden"
      segment.track(`S2-${title} Edit Button Clicked`)
      setFormShown(value)
    },
    [setFormShown]
  )

  useEffect(() => {
    if (formShown && formLoading && !loading) {
      handleClosePopup()
      setFormLoading(false)
    }
  }, [formShown, formLoading, loading, handleClosePopup])

  return (
    <AccountSection title="Account details" loading={loading} error={error}>
      <AccountDetailsRow
        icon={<img src={imgAccountCustomer} alt="Customer Name" />}
        title="Customer Name"
        onAction={() => trackMixpanelClick(POPUP_FORMS.NAME)}
      >
        {`${profile.firstName} ${profile.lastName}` || DEFAULT_VALUE}
      </AccountDetailsRow>

      <AccountDetailsRow
        icon={<img src={imgAccountPhone} alt="Phone Number" />}
        title="Phone Number"
        onAction={() => trackMixpanelClick(POPUP_FORMS.PHONE)}
      >
        {formatPhone(profile.phone) || DEFAULT_VALUE}
      </AccountDetailsRow>

      <AccountDetailsRow
        icon={<img src={imgAccountEmail} alt="Email Address" />}
        title="Email Address"
        onAction={() => trackMixpanelClick(POPUP_FORMS.EMAIL)}
      >
        {profile.email || DEFAULT_VALUE}
      </AccountDetailsRow>

      <AccountDetailsRow
        icon={<img src={imgAccountLocation} alt="Shipping Address" />}
        title="Shipping Address"
        onAction={() => trackMixpanelClick(POPUP_FORMS.ADDRESS)}
      >
        {formatAddress(profile.defaultAddress) || DEFAULT_VALUE}
      </AccountDetailsRow>

      <ModalWindow
        appElement={"#MainContent"}
        fullScreen={true}
        centerVertically={true}
        open={Boolean(formShown)}
        children={[
          conditionnalyShowForm(POPUP_FORMS.NAME.value, AccountNameForm),
          conditionnalyShowForm(POPUP_FORMS.PHONE.value, AccountPhoneForm),
          conditionnalyShowForm(POPUP_FORMS.EMAIL.value, AccountEmailForm),
          conditionnalyShowForm(POPUP_FORMS.ADDRESS.value, AccountAddressForm),
        ]}
        onCloseModal={handleClosePopup}
      />
    </AccountSection>
  )
}

export const AccountDetails = withLoading(
  AccountDetailsComponent,
  <Skeleton style={{ height: "435px", margin: "5px 0 50px" }} />
)
