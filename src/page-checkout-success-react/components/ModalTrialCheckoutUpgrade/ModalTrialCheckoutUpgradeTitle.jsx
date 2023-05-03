import React, { memo } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"

ModalTrialCheckoutUpgradeTitle.propTypes = {
  discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

function ModalTrialCheckoutUpgradeTitle({ discount, ...props }) {
  return (
    <StyledRoot {...props}>
      <StyledH2>Upgrade to a full-sized box NOW and save {discount}%</StyledH2>
      <StyledP>
        Over 60% of our customers choose to skip the starter pack and receive
        <br /> a full box of Because products straight away at a {discount}%
        discount.
      </StyledP>
    </StyledRoot>
  )
}

export default memo(ModalTrialCheckoutUpgradeTitle)

const StyledRoot = styled.div``

const StyledH2 = styled.h2`
  color: #333;
  text-align: center;
  font-size: 35px;
  margin: 0 0 15px;
  font-weight: bold;
  // special request for modal title
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    Segoe UI Symbol, "Noto Color Emoji";

  @media only screen and (max-width: 767px) {
    margin-bottom: 10px;
    font-size: 28px;
  }
`

const StyledP = styled.p`
  color: #777;
  text-align: center;
  font-size: 18px;
  margin: 0;
  line-height: 1.5em;

  @media only screen and (max-width: 767px) {
    font-size: 14px;

    br {
      display: none;
    }
  }
`
