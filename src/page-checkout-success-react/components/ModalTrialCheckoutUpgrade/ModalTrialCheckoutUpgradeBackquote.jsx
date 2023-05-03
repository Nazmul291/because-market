import React from "react"
import { styled } from "@linaria/react"
import imgCeo from "./img/ceo.png"
import imgSig from "./img/signature.png"

function ModalTrialCheckoutUpgradeBackquote(props) {
  return (
    <StyledRoot {...props}>
      <StyledQ>
        I am confident our products will work for you. We work around the clock
        to provide high-quality, absorbent underwear, pads and guards that will
        keep you dry and comfortable, day and night.
      </StyledQ>
      <StyledCite>
        <StyledCeoImg src={imgCeo} alt="Alexi Suvacioglu" />
        <span>
          <StyledCeoSign src={imgSig} alt="Alexi Suvacioglu" /> Chief Executive
          Officer
        </span>
      </StyledCite>
    </StyledRoot>
  )
}

const StyledRoot = styled.blockquote`
  padding-bottom: 20px;
  margin: 0 20px 20px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #dedede;

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    margin-left: 0;
    margin-right: 0;
  }
`

const StyledQ = styled.q`
  width: calc(70% - 30px);
  margin: 0 20px 0 10px;
  border: solid 1px #dedede;
  border-radius: 10px;
  background: rgb(241, 244, 253);
  padding: 15px 20px;
  font-size: 16px;
  font-weight: normal;
  position: relative;

  @media only screen and (max-width: 767px) {
    width: 100%;
    margin: 0 0 20px;
    font-size: 14px;
    padding: 15px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 14px;
    height: 14px;
    right: -7px;
    margin-top: -7px;
    background: rgb(241, 244, 253);
    border: solid 1px #dedede;
    border-width: 1px 1px 0 0;
    transform: rotate(45deg);

    @media only screen and (max-width: 767px) {
      top: 100%;
      right: 50%;
      transform: rotate(135deg);
    }
  }

  &::before {
    display: none;
  }
`

const StyledCite = styled.cite`
  width: 30%;
  display: flex;
  align-items: center;
  font-style: normal;

  @media only screen and (max-width: 767px) {
    width: auto;
    align-self: center;
  }
`

const StyledCeoImg = styled.img`
  margin-right: 15px;
`

const StyledCeoSign = styled.img`
  display: block;
  max-width: 130px;
`

export default ModalTrialCheckoutUpgradeBackquote
