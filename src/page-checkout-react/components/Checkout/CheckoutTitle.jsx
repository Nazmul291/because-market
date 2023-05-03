import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import CheckoutTitleOrderCompleteTooltip from "./CheckoutTitleOrderCompleteTooltip"

const stepTitles = ["Shipping Details", "Complete Order"]

CheckoutTitle.propTypes = {
  step: PropTypes.number,
}

function CheckoutTitle({ step = 1, ...props }) {
  const titleText = stepTitles[step - 1]

  return (
    <StyledRoot {...props}>
      <StyledText>{titleText}</StyledText>
      {step === 2 && <CheckoutTitleOrderCompleteTooltip />}
    </StyledRoot>
  )
}

const StyledRoot = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  cursor: pointer;
`

const StyledText = styled.h3`
  font-family: inherit;
  color: #000000;
`

export default CheckoutTitle
