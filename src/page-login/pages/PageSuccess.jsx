import React from "react"
import { styled } from "@linaria/react"
import { HeroSection } from "../components/HeroSection"
import { HeroTitle } from "../components/HeroTitle"
import imgAccountEmailSent from "../images/account-email-sent.png"

export const PageSuccess = (props) => (
  <section className="wrapper" id="user-account" {...props}>
    <HeroSection>
      <StyledWrapper>
        <StyledImage
          className="mx-auto d-block"
          src={imgAccountEmailSent}
          alt="Account Email Sent"
        />
        <HeroTitle>We have sent an email to access your account.</HeroTitle>
        <StyledMessage>
          Please click the Access Account button in your email to access your
          account.
        </StyledMessage>
      </StyledWrapper>
    </HeroSection>
  </section>
)

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 100%;
  max-width: 100%;

  @media (min-width: 576px) {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media (min-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media (min-width: 992px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`

const StyledImage = styled.img`
  margin-bottom: 60px;
`

const StyledMessage = styled.p`
  font-family: "Cooper Lt BT W05 Regular";
  font-size: 1.25rem;
  font-weight: 300;
  text-align: left;
  margin-bottom: 48px;
  line-height: 2;
  letter-spacing: -0.4px;
  color: #566582;
  text-align: center;
`
