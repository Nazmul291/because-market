import React from "react"
import { styled } from "@linaria/react"

function CheckoutNewerSpamDisclaim(props) {
  return (
    <StyledRoot {...props}>
      WE NEVER SPAM. By clicking "Buy Now", you agree to our{" "}
      <a href="/pages/terms-and-conditions" target="__blank">
        Terms
      </a>{" "}
      and{" "}
      <a href="/pages/privacy" target="__blank">
        Privacy Policy.
      </a>
    </StyledRoot>
  )
}

const StyledRoot = styled.div`
  font-size: 12px;
  font-weight: 500;
  text-align: center;

  a {
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
  }
`

export default CheckoutNewerSpamDisclaim
