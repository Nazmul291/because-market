import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useFetchProductState } from "../../hooks"
import { CrossSellProductModalWithLoading } from "../../rUI/CrossSellProductModal"
import { noop } from "../../utils"

CrossSellProductModalContainer.propTypes = {
  productId: PropTypes.string,
  disabled: PropTypes.bool,
  onNext: PropTypes.func,
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
}

// Load product and view cross sell product modal

function CrossSellProductModalContainer({
  productId,
  disabled = false,
  onAdd = noop,
  onNext = noop,
  onClose = noop,
}) {
  const {
    loading,
    loaded,
    error,
    data: product,
  } = useFetchProductState(productId)

  const isLoading = loading || !loaded

  useEffect(() => {
    if (error) {
      onNext()
    }
  }, [error, onNext])

  return (
    <CrossSellProductModalWithLoading
      loading={isLoading}
      disabled={disabled}
      product={product}
      onAdd={onAdd}
      onClose={onClose}
      onNext={onNext}
    />
  )
}

export default CrossSellProductModalContainer
