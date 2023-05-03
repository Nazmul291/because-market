import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { AccountProductDetails } from "../../../rUI"
import { noop } from "../../../utils"
import AccountPDPFooter from "../AccountPDP/AccountPDPFooter"
import AccountPDPEditFormFooter from "./AccountPDPEditFormFooter"
import segment from "../../../integrations/segment"

AccountPDPEdit.propTypes = {
  product: PropTypes.object,
  selectedVariantId: PropTypes.string,
  currentPrice: PropTypes.number,
  editable: PropTypes.bool,
  removable: PropTypes.bool,
  quantity: PropTypes.number,
  showQuantity: PropTypes.bool,
  intervalType: PropTypes.string,
  onUpdate: PropTypes.func,
  onRemove: PropTypes.func,
}

function AccountPDPEdit({
  product,
  selectedVariantId,
  currentPrice,
  editable = true,
  removable = true,
  quantity,
  showQuantity,
  intervalType,
  onUpdate = noop,
  onRemove = noop,
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
      editable={editable}
      product={product}
      quantity={quantity}
      selectedVariantId={selectedVariantId}
      showQuantity={showQuantity}
      footer={<AccountPDPFooter product={product} />}
      formFooter={(props) => (
        <AccountPDPEditFormFooter
          {...props}
          initialVariantId={selectedVariantId}
          initialQuantity={quantity}
          initialPrice={currentPrice}
          intervalType={intervalType}
          removable={removable}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      )}
    />
  )
}

export default AccountPDPEdit
