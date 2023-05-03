import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../../utils"
import ModalTrialButton from "../ModalTrialButton"
import {
  VARIANT_APPLY,
  VARIANT_CANCEL,
} from "../ModalTrialButton/ModalTrialButton"

ModalTrialCheckoutUpgrade2Buttons.propTypes = {
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  discount: PropTypes.number,
}

function ModalTrialCheckoutUpgrade2Buttons({
  onApply = noop,
  onCancel = noop,
  discount = 0,
  ...props
}) {
  return (
    <StyledRoot {...props}>
      <StyledButton variant={VARIANT_APPLY} onClick={onApply}>
        Upgrade my order
      </StyledButton>
      <StyledButton variant={VARIANT_CANCEL} onClick={onCancel}>
        No, I don't want {discount}% off
      </StyledButton>
    </StyledRoot>
  )
}

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-left: 10px;
  margin-right: 10px;

  @media only screen and (max-width: 767px) {
    flex-direction: column;
  }
`

const StyledButton = styled(ModalTrialButton)`
  width: 100%;

  @media only screen and (max-width: 767px) {
    max-width: 100%;
  }
`

export default ModalTrialCheckoutUpgrade2Buttons
