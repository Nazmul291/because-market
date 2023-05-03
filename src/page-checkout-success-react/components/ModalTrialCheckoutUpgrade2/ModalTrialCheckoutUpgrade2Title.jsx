import React from "react"
import { styled } from "@linaria/react"

function ModalTrailCheckoutUpgrade2Title(props) {
  return (
    <StyledRoot {...props}>
      <StyledH2>Are you sure you don&apos;t want to upgrade?</StyledH2>
      <StyledP>This offer is exclusively for new members.</StyledP>
    </StyledRoot>
  )
}

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

  @media only screen and (max-width: 1023px) {
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 767px) {
    font-size: 14px;
  }
`

export default ModalTrailCheckoutUpgrade2Title
