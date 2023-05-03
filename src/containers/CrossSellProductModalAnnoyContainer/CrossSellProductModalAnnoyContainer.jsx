import React, { useEffect, useState, useCallback } from "react"
import PropTypes from "prop-types"
import { useFetchProductState } from "../../hooks"
import {
  CrossSellProductModalWithLoading,
  CrossSellProductModalAnnoyWithLoading,
} from "../../rUI/CrossSellProductModal"
import { noop } from "../../utils"
import ModalWindow from "../../rUI/ModalWindow"

CrossSellProductModalAnnoyContainer.propTypes = {
  productId: PropTypes.string,
  itemsLength: PropTypes.number,
  currentIndex: PropTypes.number,
  onNext: PropTypes.func,
  onSubscribe: PropTypes.func,
  onClose: PropTypes.func,
  onAddToNextBoxOnly: PropTypes.func,
}

function CrossSellProductModalAnnoyContainer({
  productId,
  itemsLength = 0,
  currentIndex = 0,
  onSubscribe = noop,
  onNext = noop,
  onClose = noop,
  onAddToNextBoxOnly = noop,
}) {
  const {
    loading,
    loaded,
    error,
    data: product,
  } = useFetchProductState(productId)

  const isLoading = loading || !loaded

  const [modalOpen, setModalOpen] = useState(false)

  const handleOnNext = useCallback(() => {
    const nextIndex = currentIndex + 1

    if (itemsLength === nextIndex) {
      setModalOpen(true)
    } else {
      onNext()
    }
  }, [itemsLength, currentIndex, onNext])

  const handleOnSkip = useCallback(() => {
    setModalOpen(false)
    onNext()
  }, [setModalOpen, onNext])

  useEffect(() => {
    if (error) {
      onNext()
    }
  }, [error, onNext])

  return (
    <>
      <CrossSellProductModalWithLoading
        loading={isLoading}
        product={product}
        onAdd={onAddToNextBoxOnly}
        onClose={onClose}
        onNext={handleOnNext}
      />

      <ModalWindow
        appElement={"#MainContent"}
        fullScreen={false}
        open={modalOpen}
        discount={null}
        children={
          <CrossSellProductModalAnnoyWithLoading
            loading={isLoading}
            product={product}
            onSubscribe={onSubscribe}
            onSkip={handleOnSkip}
            onAddToNextBoxOnly={onAddToNextBoxOnly}
          />
        }
        onCloseModal={handleOnSkip}
      />
    </>
  )
}

export default CrossSellProductModalAnnoyContainer
