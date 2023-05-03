import React from "react"
import PropTypes from "prop-types"
import { useProductPrice } from "../../hooks"
import AccountProductFormPricingLayout from "./AccountProductFormPricingLayout"

AccountProductFormPricing.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  variant: PropTypes.object,
  discounts: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string),
  ]),
  quantity: PropTypes.number,
}

function AccountProductFormPricing({
  label,
  variant,
  discounts,
  quantity,
  ...props
}) {
  const { finalPriceV2, hasPerPiece, finalPricePerPieceV2 } = useProductPrice({
    variant,
    discounts,
    quantity,
  })

  return (
    <AccountProductFormPricingLayout
      {...props}
      label={label}
      showPerPiecePrice={hasPerPiece}
      pricePerPiece={finalPricePerPieceV2}
      priceTotal={finalPriceV2}
    />
  )
}

export default AccountProductFormPricing
