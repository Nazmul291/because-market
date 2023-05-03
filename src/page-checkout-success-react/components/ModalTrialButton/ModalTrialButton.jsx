import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { Button } from "../../../rUI"

export const VARIANT_APPLY = "apply"
export const VARIANT_CANCEL = "cancel"

ModalTrialButton.propTypes = {
  variant: PropTypes.oneOf([VARIANT_APPLY, VARIANT_CANCEL]),
  children: PropTypes.node,
}

function ModalTrialButton({ variant = VARIANT_APPLY, children, ...props }) {
  return (
    <StyledButton data-variant={variant} {...props}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 340px;
  padding: 17px 12px;
  font-size: 20px;
  line-height: 24px;
  border-radius: 10px;
  font-weight: 500;

  &[data-variant="${VARIANT_APPLY}"] {
    --background-color: rgb(149, 217, 101);
    --border-color: rgb(149, 217, 101);
    --color: #fff;
  }

  &[data-variant="${VARIANT_CANCEL}"] {
    --background-color: transparent;
    --border-color: #aaa;
    --color: #555;
  }
`

export default ModalTrialButton
