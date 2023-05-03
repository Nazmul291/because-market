import React, { useCallback } from "react"
import { styled } from "@linaria/react"
import { AccountSection } from "./AccountSection"
import { openNewTabWithURL } from "../../utils"
import { RETRIAL_GOOGLE_FORM_URL } from "../../const"
import { useCustomerContext } from "../containers/CustomerContext"
import { StrokedButton } from "../../rUI"

export function GetNewTrialBlock(props) {
  const { customer } = useCustomerContext()
  const handleContactSupportClick = useCallback(() => {
    const url = `${RETRIAL_GOOGLE_FORM_URL}${customer.email}`
    openNewTabWithURL(url)
  }, [customer])

  return (
    <AccountSection title="Get a New Starter Pack" {...props}>
      <StyledContent>
        <StyledText>
          You can receive a new starter pack at any time.
          <br />
          You&apos;ll restart your trial period.
        </StyledText>
        <StrokedButton
          type="button"
          onClick={handleContactSupportClick}
          style={{ padding: "0 24px" }}
        >
          Get New Starter Pack
        </StrokedButton>
      </StyledContent>
    </AccountSection>
  )
}

const StyledText = styled.p`
  color: #9699a3;
  font-family: Helvetica;
  font-size: 17px;
`

const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
