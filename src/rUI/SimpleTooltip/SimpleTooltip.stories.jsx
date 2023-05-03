/* eslint-disable react/no-multi-comp */
import React from "react"
import SimpleTooltip from "./"
import SimpleTooltipBody from "./SimpleTooltipBody"

export default {
  title: "rUI/SimpleTooltip",
  component: SimpleTooltip,
}

export const Default = () => (
  <SimpleTooltip
    tooltip={
      <>
        <p style={{ textAlign: "justify" }}>
          By submitting your payment details, you consent to us using those
          payment details in accordance with our{" "}
          <a
            href="https://www.becausemarket.com/pages/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
          , and acknowledge and agree to our{" "}
          <a
            href="https://www.becausemarket.com/pages/terms-and-conditions"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Service
          </a>
          .
        </p>
        <p style={{ textAlign: "justify", marginBottom: "0px" }}>
          If you decide that you don't want to keep receiving Because Market
          shipments, you'll need to terminate your monthly subscription at least
          3 business days before your next box ships to avoid being charged.
        </p>
      </>
    }
  >
    {(props) => <span {...props}>Hover me</span>}
  </SimpleTooltip>
)

export const DefaultBody = () => (
  <SimpleTooltipBody>
    <p style={{ textAlign: "justify" }}>
      By submitting your payment details, you consent to us using those payment
      details in accordance with our{" "}
      <a
        href="https://www.becausemarket.com/pages/privacy"
        target="_blank"
        rel="noreferrer"
      >
        Privacy Policy
      </a>
      , and acknowledge and agree to our{" "}
      <a
        href="https://www.becausemarket.com/pages/terms-and-conditions"
        target="_blank"
        rel="noreferrer"
      >
        Terms of Service
      </a>
      .
    </p>
    <p style={{ textAlign: "justify", marginBottom: "0px" }}>
      If you decide that you don't want to keep receiving Because Market
      shipments, you'll need to terminate your monthly subscription at least 3
      business days before your next box ships to avoid being charged.
    </p>
  </SimpleTooltipBody>
)
