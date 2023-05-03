import React, { useCallback, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { checkoutUpdateById } from "../../../api/marketApi"
import { fetchProduct } from "../../../api/storefrontApi"
import { useAsyncState } from "../../../hooks"
import { noop } from "../../../utils"
import ModalTrialMediator from "../../components/ModalTrialMediator"

SkipTrialModalContainer.propTypes = {
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  checkout: PropTypes.object,
}

function SkipTrialModalContainer({ onApply = noop, onClose = noop, checkout }) {
  const [productState, reqProduct] = useAsyncState(fetchProduct)
  const item = useMemo(
    () => checkout.items.find(({ isTrial }) => !isTrial),
    [checkout]
  )

  const handleApply = useCallback(() => {
    checkoutUpdateById(checkout.id, {
      items: [
        {
          id: item.id,
          quantity: item.quantity,
          type: item.type,
          trial: false,
        },
      ],
    }).then((newCheckout) => {
      onApply(newCheckout)
      onClose()
    })
  }, [checkout, item, onApply, onClose])

  useEffect(() => {
    if (item) {
      reqProduct(item.productId)
    } else {
      console.warn("Trial item not found")
    }
  }, [item, reqProduct])

  if (!productState.data) {
    return
  }

  return (
    <ModalTrialMediator
      product={productState.data}
      selectedVariantId={item.id}
      quantity={item.quantity}
      onApply={handleApply}
      onCancel={onClose}
    />
  )
}

export default SkipTrialModalContainer
