import React from "react"
import { styled } from "@linaria/react"
import SimpleTooltip from "../../../rUI/SimpleTooltip"

function CheckoutTitleOrderCompleteTooltip() {
  return (
    <SimpleTooltip
      tooltip={
        <StyledTooltipRoot>
          <StyledP>
            By submitting your payment details, you consent to us using those
            payment details in accordance with our{" "}
            <a href="/pages/privacy" target="_blank">
              Privacy Policy
            </a>
            , and acknowledge and agree to our{" "}
            <a href="/pages/terms-and-conditions" target="_blank">
              Terms of Service.
            </a>
          </StyledP>
          <StyledP style={{ marginBottom: "0px" }}>
            If you decide that you don't want to keep receiving Because Market
            shipments, you'll need to terminate your monthly subscription at
            least 3 business days before your next box ships to avoid being
            charged.
          </StyledP>
        </StyledTooltipRoot>
      }
    >
      {(props) => (
        <i className="fa fa-info-circle" aria-hidden="true" {...props} />
      )}
    </SimpleTooltip>
  )
}

const StyledTooltipRoot = styled.div`
  max-width: 300px;

  a {
    color: #007bff;
    text-decoration: none;

    &:active,
    &:hover,
    &:visited {
      text-decoration: none;
    }
  }
`

const StyledP = styled.p`
  font-size: 14px;
  text-align: justify;
  margin-bottom: 0;
`

export default CheckoutTitleOrderCompleteTooltip
