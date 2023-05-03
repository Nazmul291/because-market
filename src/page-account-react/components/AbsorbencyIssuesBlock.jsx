import React, { useCallback } from "react"
import { styled } from "@linaria/react"
import { AccountSection } from "./AccountSection"
import { openNewTabWithURL } from "../../utils"
import { SUPPORT_EMAIL_ADDRESS, TRY_SOMETHING_NEW_PAGE_PATH } from "../../const"
import { StrokedButton } from "../../rUI"
import segment from "../../integrations/segment"

export function AbsorbencyIssuesBlock(props) {
  const handleTrySomethingNewClick = useCallback(() => {
    segment.track("S2-Portal try something new button clicked")
    const url = `${window.location.origin}${
      TRY_SOMETHING_NEW_PAGE_PATH.match(/^\//)
        ? TRY_SOMETHING_NEW_PAGE_PATH
        : `/${TRY_SOMETHING_NEW_PAGE_PATH}`
    }`

    openNewTabWithURL(url)
  }, [])

  const handleContactSupportClick = useCallback(() => {
    segment.track("S2-Portal contact support button clicked")
    const url = `mailto:${SUPPORT_EMAIL_ADDRESS}`
    openNewTabWithURL(url)
  }, [])

  return (
    <AccountSection title="Having absorbency issues?" {...props}>
      <StyledText>
        A lot of customers end of switching to a different product before
        finding the perfect fit. If absorbency is an issue for you, we recommend
        trying something new.
      </StyledText>
      <StyledActions>
        <StrokedButton type="button" onClick={handleTrySomethingNewClick}>
          Try Something New
        </StrokedButton>
        <StrokedButton type="button" onClick={handleContactSupportClick}>
          Contact Support
        </StrokedButton>
      </StyledActions>
    </AccountSection>
  )
}

const StyledText = styled.p`
  color: #9699a3;
  font-family: Helvetica;
  font-size: 17px;
`

const StyledActions = styled.div`
  display: flex;
  flex-direction: row;

  & > button {
    margin-right: 16px;
  }

  & > button:last-of-type {
    margin-right: 0;
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;

    & > button {
      margin-right: 0;
      margin-bottom: 16px;
    }

    & > button:last-of-type {
      margin-bottom: 0;
    }
  }
`
