import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import Price from "../../../rUI/Price"
import CheckoutDisclaimLayout from "../CheckoutDisclaimLayout"

CheckoutTrialNotify.propTypes = {
  checkout: PropTypes.object,
}

function CheckoutTrialNotify({ checkout, ...props }) {
  return (
    <StyledRoot {...props}>
      <i className="fa fa-credit-card" />
      <StyledText>
        Don't worry, today you'll be charged only{" "}
        <Price amountV2={checkout?.shipping} free /> for the starter pack
        shipping
      </StyledText>
    </StyledRoot>
  )
}

const StyledRoot = styled(CheckoutDisclaimLayout)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledText = styled.div`
  margin-left: 12px;
`

export default CheckoutTrialNotify
