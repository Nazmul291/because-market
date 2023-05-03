import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import { noop } from "../../../utils"
import { trackEvent } from "../../../integrations/tracker"
import ModalTrialCheckoutUpgrade from "../ModalTrialCheckoutUpgrade"
import ModalTrialCheckoutUpgrade2 from "../ModalTrialCheckoutUpgrade2"

const MODALS = [ModalTrialCheckoutUpgrade, ModalTrialCheckoutUpgrade2]
const DISCOUNT = 40

ModalTrialMediator.propTypes = {
  product: PropTypes.object,
  selectedVariantId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
}

function ModalTrialMediator({
  product,
  selectedVariantId,
  quantity,
  onApply = noop,
  onCancel = noop,
}) {
  const [currentModalIndex, setCurrentModalIndex] = useState(0)
  const CurrentModal = MODALS[currentModalIndex]

  const handleCancelClick = useCallback(() => {
    const nextIndex = currentModalIndex + 1
    if (MODALS[nextIndex]) {
      setCurrentModalIndex(nextIndex)
      trackEvent("Post Purchase Upgrade Load Click", { value: "Rejected" })
    } else {
      trackEvent("Full Box Are you sure -Click", { value: "Rejected" })
      onCancel()
    }
  }, [currentModalIndex, onCancel])

  return (
    <CurrentModal
      product={product}
      selectedVariantId={selectedVariantId}
      quantity={quantity}
      discount={DISCOUNT}
      onApply={onApply}
      onCancel={handleCancelClick}
    />
  )
}

export default ModalTrialMediator
