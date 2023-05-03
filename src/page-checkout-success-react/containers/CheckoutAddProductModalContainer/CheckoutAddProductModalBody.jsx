import React from "react"
import PropTypes from "prop-types"
import CrossSellProductModalContainer from "../../../containers/CrossSellProductModalContainer"
import { noop } from "../../../utils"

CheckoutAddProductModalBody.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  onClose: PropTypes.func,
  onNext: PropTypes.func,
  onAdd: PropTypes.func,
}

function CheckoutAddProductModalBody({
  productId,
  disabled = false,
  onClose = noop,
  onNext = noop,
  onAdd = noop,
}) {
  return (
    <CrossSellProductModalContainer
      productId={productId}
      disabled={disabled}
      onAdd={onAdd}
      onClose={onClose}
      onNext={onNext}
    />
  )
}

export default CheckoutAddProductModalBody
