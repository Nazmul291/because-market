import React, { useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { noop } from "../../utils"
import CrossSellProductModalAnnoyContainer from "../../containers/CrossSellProductModalAnnoyContainer"

CrossSellProductsModalContainer.propTypes = {
  productIds: PropTypes.arrayOf(PropTypes.string),
  onSubscribe: PropTypes.func,
  onClose: PropTypes.func,
  onAddToNextBoxOnly: PropTypes.func,
}

function CrossSellProductsModalContainer({
  productIds = [],
  onSubscribe = noop,
  onClose = noop,
  onAddToNextBoxOnly = noop,
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentProductId, setCurrentProductId] = useState(null)
  const [items] = useState([])

  const handleClose = useCallback(() => {
    if (items.length) {
      onSubscribe(items)
    } else {
      onClose()
    }
  }, [items, onClose, onSubscribe])

  const handleNext = useCallback(() => {
    const next = currentIndex + 1
    setCurrentIndex(next)
  }, [currentIndex])

  useEffect(() => {
    const productId = productIds[currentIndex]

    if (productId) {
      setCurrentProductId(productId)
    } else {
      handleClose()
    }
  }, [currentIndex, productIds, handleClose])

  return (
    <CrossSellProductModalAnnoyContainer
      productId={currentProductId}
      itemsLength={productIds.length}
      currentIndex={currentIndex}
      onSubscribe={onSubscribe}
      onNext={handleNext}
      onClose={handleClose}
      onAddToNextBoxOnly={onAddToNextBoxOnly}
    />
  )
}

export default CrossSellProductsModalContainer
