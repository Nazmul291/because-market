import React from "react"
import { styled } from "@linaria/react"

function HowItWorksNormal() {
  return (
    <HowItWorks>
      <HowHeader>How Because Works:</HowHeader>
      <HowUl>
        <HowUlLi>
          <Circle>1</Circle>
          <StepInfo>
            <StepInfoTitle>GET ITEMS YOU LOVE:</StepInfoTitle>
            <StepInfoText>
              Your new products will arrive in the mail.
            </StepInfoText>
          </StepInfo>
        </HowUlLi>
        <HowUlLi>
          <Circle>2</Circle>
          <StepInfo>
            <StepInfoTitle>TRY YOUR ITEMS:</StepInfoTitle>
            <StepInfoText>
              We hope you&apos;ll love them! Need a different size or
              absorbency? <b>Just give us a call</b> at (855) 318-5318 or email
              us at{" "}
              <StepLink
                className="s-link"
                rel="nofollow"
                href="mailto:help@becausemarket.com"
              >
                help@becausemarket.com
              </StepLink>
              .
            </StepInfoText>
          </StepInfo>
        </HowUlLi>
        <HowUlLi>
          <Circle>3</Circle>
          <StepInfo>
            <StepInfoTitle>CHECK YOUR INBOX:</StepInfoTitle>
            <StepInfoText>
              We&apos;ll always send you a reminder <b>3 days before</b> your
              next order ships.
            </StepInfoText>
          </StepInfo>
        </HowUlLi>
        <HowUlLi>
          <Circle>4</Circle>
          <StepInfo>
            <StepInfoTitle>LIVE WORRY-FREE:</StepInfoTitle>
            <StepInfoText>
              As a subscriber, you&apos;ll save 10% on every order and never
              worry about running out.
            </StepInfoText>
          </StepInfo>
        </HowUlLi>
      </HowUl>
    </HowItWorks>
  )
}

const HowItWorks = styled.div`
  margin-top: 48px;
  margin-right: -22px;
`

const HowHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
`

const HowUl = styled.ul`
  margin-top: 27px;
  list-style-type: none;

  @media (max-width: 768px) {
    padding: 0 !important; // fix global ul style on theme.css
  }
`

const HowUlLi = styled.li`
  padding-bottom: 44px;
  display: flex;
  position: relative;
  text-align: initial;

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child):after {
    content: "";
    position: absolute;
    width: 1px;
    background-color: #dadada;
    top: 48px;
    left: 18px;
    bottom: 0;
  }
`

const Circle = styled.div`
  background-color: #667799;
  font-size: 16px;
  color: #ffffff;
  height: 36px;
  width: 36px;
  min-width: 36px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  left: 0;
  border-radius: 100%;
  margin-top: 6px;
  padding: 0;
  text-align: center;
`

const StepInfo = styled.div`
  margin-left: 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StepInfoTitle = styled.p`
  font-size: 17px;
  font-weight: bold;
  margin: 0;
  color: #212121;
  line-height: 1.5em;
`

const StepInfoText = styled.p`
  font-size: 15px;
  color: #212121;
  line-height: 1.6em;
`

const StepLink = styled.a`
  color: #44577c;
  text-decoration: underline;

  &:visited,
  &:hover {
    color: #44577c;
    text-decoration: underline;
  }
`

export default HowItWorksNormal
