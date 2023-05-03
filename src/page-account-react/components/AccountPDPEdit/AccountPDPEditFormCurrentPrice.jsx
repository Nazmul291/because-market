import React from "react"
import PropTypes from "prop-types"
import AccountProductFormPricingLayout from "../../../rUI/AccountProductFormPricing/AccountProductFormPricingLayout"

AccountPDPEditFormCurrentPrice.propTypes = {
  initialPrice: PropTypes.number,
  initialQuantity: PropTypes.number,
  intervalType: PropTypes.string,
}

function AccountPDPEditFormCurrentPrice({
  initialPrice,
  initialQuantity = 1,
  intervalType,
  ...props
}) {
  if (!initialPrice) {
    return null
  }

  return (
    <AccountProductFormPricingLayout
      {...props}
      label={intervalType ? "Subscription" : "One-Time Purchase"}
      priceTotal={{ amount: Number(initialPrice) * initialQuantity }}
    />
  )
}

export default AccountPDPEditFormCurrentPrice
