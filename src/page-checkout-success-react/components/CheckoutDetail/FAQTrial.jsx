import React, { memo, useContext } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { CheckoutSuccessContext } from "../../containers/CheckoutSuccessContext"

FAQTrial.propTypes = {
  deliveryRange: PropTypes.string,
}

function FAQTrial({ deliveryRange }) {
  const { monthlyTotal } = useContext(CheckoutSuccessContext)

  return (
    <Center>
      <HowItWorks>
        <HowHeader>Free Starter Pack FAQ</HowHeader>
        <HowUl>
          <HowUlLi>
            <StepInfo>
              <StepInfoTitle>
                What if the products don&apos;t fit my needs?
              </StepInfoTitle>
              <StepInfoText>
                If anything isn&apos;t working for you, call us at (855)
                318-5318 or email us at{" "}
                <StepLink
                  className="s-link"
                  rel="nofollow"
                  href="mailto:help@becausemarket.com"
                >
                  help@becausemarket.com
                </StepLink>
                {". "}
                We&apos;ll send you something new to try for free.
              </StepInfoText>
            </StepInfo>
          </HowUlLi>
          <HowUlLi>
            <StepInfo>
              <StepInfoTitle>
                How long does the trial period last?
              </StepInfoTitle>
              <StepInfoText>
                The trial period is 2 weeks. 3 days before your trial period
                ends we will send you an email and a text reminder. If we
                don&apos;t hear from you, we will charge you for {monthlyTotal}{" "}
                and ship you first order on {deliveryRange}.
              </StepInfoText>
            </StepInfo>
          </HowUlLi>
          <HowUlLi>
            <StepInfo>
              <StepInfoTitle>Can I adjust my subscription?</StepInfoTitle>
              <StepInfoText>
                Yes, you have complete control. You can change your order ship
                date, update address or payment information, add or swap items,
                and more.
              </StepInfoText>
            </StepInfo>
          </HowUlLi>
        </HowUl>
      </HowItWorks>
    </Center>
  )
}

const HowItWorks = styled.div`
  margin-top: 48px;
  margin-right: -22px;
  @media (max-width: 768px) {
    margin-right: 0px;
  }
`

const HowHeader = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  font-family: "Helvetica Neue", Arial, sans-serif;
`

const HowUl = styled.ul`
  margin-top: 27px;
  list-style-type: none;
  @media (max-width: 768px) {
    padding: 0 !important; /* fix global ul style on theme.css */
  }
`

const HowUlLi = styled.li`
  padding: 20px 0;
  display: flex;
  position: relative;
  text-align: initial;
  border-top: 1px dashed #dadada;

  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }
`

const StepInfo = styled.div`
  margin-left: 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StepInfoTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #212121;
  line-height: 1.5em;
`

const StepInfoText = styled.p`
  font-size: 17px;
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

const Center = styled.div`
  text-align: center;
  font-family: "Helvetica Neue", sans-serif;
  background-color: #f1f3f4;
  padding: 0px 8em;
  @media (max-width: 768px) {
    padding: 0px 2px;
  }
`

export default memo(FAQTrial)
