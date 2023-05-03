import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { AccountProductDetails } from "../../../rUI"
import { noop } from "../../../utils"
import AccountPDPFooter from "./AccountPDPFooter"
import AccountPDPFormFooter from "./AccountPDPFormFooter"
import segment from "../../../integrations/segment"

AccountPDP.propTypes = {
  product: PropTypes.object,
  selectedVariantId: PropTypes.string,
  editable: PropTypes.bool,
  quantity: PropTypes.number,
  showQuantity: PropTypes.bool,
  onSubmit: PropTypes.func,
  onBuyNow: PropTypes.func,
}

function AccountPDP({
  product,
  selectedVariantId,
  editable = true,
  quantity,
  showQuantity,
  onSubmit = noop,
  onBuyNow = noop,
  ...props
}) {
  useEffect(() => {
    if (!product) {
      return
    }

    segment.track("S2-Portal PDP Load")
    segment.track("S2-Product Viewed", { product })
  }, [product])

  return (
    <AccountProductDetails
      {...props}
      product={product}
      selectedVariantId={selectedVariantId}
      editable={editable}
      quantity={quantity}
      showQuantity={showQuantity}
      footer={<AccountPDPFooter product={product} />}
      formFooter={(props) => (
        <AccountPDPFormFooter
          {...props}
          onSubmit={onSubmit}
          onBuyNow={onBuyNow}
        />
      )}
    />
  )
}

export default AccountPDP
