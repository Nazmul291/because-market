import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { PRODUCT_TAG_BUY_NOW } from "../../../const"
import AccountPDPFormActionBuyNow from "./AccountPDPFormActionBuyNow"
import AccountPDPFormActionSubAndAdd from "./AccountPDPFormActionSubAndAdd"

AccountPDPFormFooter.propTypes = {
  product: PropTypes.object,
  onSubmit: PropTypes.func,
  onBuyNow: PropTypes.func,
}

function AccountPDPFormFooter({ product, onSubmit, onBuyNow, ...props }) {
  const tags = product?.tags
  const isBuyNow = useMemo(() => tags?.includes(PRODUCT_TAG_BUY_NOW), [tags])

  return isBuyNow ? (
    <AccountPDPFormActionBuyNow
      product={product}
      onBuyNow={onBuyNow}
      {...props}
    />
  ) : (
    <AccountPDPFormActionSubAndAdd
      product={product}
      onSubmit={onSubmit}
      {...props}
    />
  )
}

export default AccountPDPFormFooter
