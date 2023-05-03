import React, { useEffect } from "react"
import { styled } from "@linaria/react"
import { PageTitle } from "../components/PageTitle"
import { WideSticker } from "../components/WideSticker"
import { MailIcon } from "../../rUI/icons/MailIcon"
import { PhoneIcon } from "../../rUI/icons/PhoneIcon"

window.gladlyHCConfig = {
  api: process.env.GLADLY_API_URL,
  orgId: process.env.GLADLY_ORIGINAL_ID,
  brandId: process.env.GLADLY_BRAND_ID,
  cdn: process.env.GLADLY_CDN_URL,
  selector: "#gladly-help-center-container",
}

export function PageHelpCenter() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })

    const gladlyScript = document.createElement("script")

    gladlyScript.id = "gladly-help-center-script"
    gladlyScript.src = "https://cdn.gladly.com/help-center/hcl.js"
    gladlyScript.async = true
    gladlyScript.crossOrigin = "anonymous"

    document.head.appendChild(gladlyScript)

    return () => {
      window.gladlyHCLoaded = false
      document.head.removeChild(gladlyScript)
    }
  }, [])

  return (
    <StyledPageContainer>
      <PageTitle mobile>
        Help Center
        <StyledSubTitle>
          Answers to some of our most frequently asked questions.
        </StyledSubTitle>
      </PageTitle>

      <StyledGladlyContainer id="gladly-help-center-container" />

      <StyledHelpContactsHeader>
        Still have a question?
      </StyledHelpContactsHeader>

      <StyledWideSticker icon={<MailIcon />}>
        Email us at{" "}
        <a
          href="mailto:help@becausemarket.com"
          target="_blank"
          rel="noreferrer"
        >
          help@becausemarket.com
        </a>{" "}
        and our customer care team will reply.
      </StyledWideSticker>

      <StyledWideSticker icon={<PhoneIcon />}>
        <StyledContactColumns>
          <StyledContactColumn>
            Toll Free Number
            <br />
            (855) 318 - 5318
          </StyledContactColumn>
          <StyledContactColumn>
            Monday - Friday
            <br />
            9am - 6pm EST
          </StyledContactColumn>
        </StyledContactColumns>
      </StyledWideSticker>
    </StyledPageContainer>
  )
}

const StyledPageContainer = styled.section`
  @media screen and (max-width: 1024px) {
    margin: 0 14px;
  }
`

const StyledSubTitle = styled.small`
  display: block;
  color: #566582;
  font-family: "Cooper Lt BT W05 Regular";
  font-size: 20px;
  font-weight: 300;
  line-height: 42px;
  margin-bottom: 0;
  margin-top: -5px;
`

const StyledGladlyContainer = styled.section`
  font-size: 14px;

  &.gladlyHC h3.gladlyHC-faqSection-header {
    font-size: 18px;
  }

  &.gladlyHC
    .gladlyHC-faq
    .gladlyHC-faqSection
    ul.gladlyHC-faqSection-list
    li.gladlyHC-faqSection-listItem
    a {
    font-size: 14px;
    line-height: 24px;
  }

  &.gladlyHC .gladlyHC-answerDetail-name {
    color: #566582;
    font-family: "Cooper Md BT W05 Regular", serif;
    font-size: 26px;
    font-weight: 500;
    line-height: 42px;
    position: relative;
    padding: 0 0 10px;
  }

  &.gladlyHC .gladlyHC-faq .gladlyHC-answersIndex-link {
    a {
      background-color: transparent !important;
      color: inherit !important;
      box-shadow: none !important;
      display: inline-block;
      margin: 0 !important;
      border-radius: 0 !important;
      border: none !important;
      cursor: pointer;
      min-width: 2.4rem;
      transition: none !important;
      padding: 8px 0 !important;
      text-decoration: none !important;
      font-weight: 400 !important;
      font-size: 14px !important;
    }
    a:hover,
    a:visited {
      background-color: none !important;
      color: #1e70bf !important;
      box-shadow: none !important;
      text-decoration: none !important;
    }
  }
`

const StyledHelpContactsHeader = styled.h2`
  color: #566582;
  font-family: "Cooper Md BT W05 Regular";
  font-size: 35px;
  font-weight: 500;
  letter-spacing: -0.1px;
  line-height: 42px;
  padding-bottom: 20px;
  margin-top: 86px;
  margin-bottom: 0;
  text-align: center;

  @media screen and (max-width: 1024px) {
    font-size: 26px;
  }
`

const StyledWideSticker = styled(WideSticker)`
  margin-bottom: 40px;
`

const StyledContactColumns = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`

const StyledContactColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid hsla(0, 0%, 100%, 0.2);
  flex: 1;

  &:last-of-type {
    border-right: none;
    border-bottom: none;
  }

  @media screen and (max-width: 1024px) {
    padding: 14px 0;
    border-right: none;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
  }
`
