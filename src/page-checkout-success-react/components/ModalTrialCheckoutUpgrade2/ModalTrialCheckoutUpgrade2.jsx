import React, { useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../../utils"
import { Modal } from "../../../rUI"
import ModalTrailCheckoutUpgrade2Title from "./ModalTrialCheckoutUpgrade2Title"
import ModalTrailCheckoutUpgrade2Product from "./ModalTrailCheckoutUpgrade2Product"
import ModalTrialCheckoutUpgrade2Buttons from "./ModalTrialCheckoutUpgrade2Buttons"
import useSelectedVariantByIdForSkipTrial from "../../hooks/useSelectedVariantByIdForSkipTrial"
import { trackEvent } from "../../../integrations/tracker"

ModalTrialCheckoutUpgrade2.propTypes = {
  product: PropTypes.object,
  selectedVariantId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.number,
  discount: PropTypes.number,
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
}

function ModalTrialCheckoutUpgrade2({
  product,
  selectedVariantId,
  quantity = 1,
  discount = 0,
  onApply = noop,
  onCancel = noop,
  ...props
}) {
  const selectedVariant = useSelectedVariantByIdForSkipTrial(
    product,
    selectedVariantId
  )

  useEffect(() => {
    trackEvent("Full Box Are you sure -Load")
  }, [])

  const handleApply = useCallback(
    (arg) => {
      trackEvent("Full Box Are you sure -Click", { value: "Taken" })
      onApply(arg)
    },
    [onApply]
  )

  return (
    <StyledModal {...props} onCloseClick={onCancel}>
      <ModalTrailCheckoutUpgrade2Title />
      <StyledModalTrailCheckoutUpgrade2Product
        selectedVariant={selectedVariant}
        quantity={quantity}
        discount={discount}
      />
      <StyledModalTrialCheckoutUpgrade2Buttons
        discount={discount}
        onApply={handleApply}
        onCancel={onCancel}
      />
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  --width: 100%;
  --body-padding: 100px 40px 40px;
  --body-padding__mobile: 50px 13px 27px 13px;
  --close-button__color: #000;
`

const StyledModalTrailCheckoutUpgrade2Product = styled(
  ModalTrailCheckoutUpgrade2Product
)`
  margin-top: 40px;

  @media only screen and (max-width: 1023px) {
    margin-top: 20px;
  }
`

const StyledModalTrialCheckoutUpgrade2Buttons = styled(
  ModalTrialCheckoutUpgrade2Buttons
)`
  margin-top: 30px;
`

export default ModalTrialCheckoutUpgrade2
