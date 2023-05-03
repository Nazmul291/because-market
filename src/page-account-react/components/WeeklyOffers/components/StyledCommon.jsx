import React from "react"
import { styled } from "@linaria/react"
import { applyStyleIfHasProperty } from "../../../../utils"
import LoadingSpinner from "../../../../rUI/LoadingSpinner/LoadingSpinner"
import RenderHtml from "../../../../rUI/RenderHtml"
import { Price } from "../../../../rUI"

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -20px;
  left: -20px;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  z-index: 9999;
`

const StyledCommonButton = styled.button`
  display: flex;
  justify-content: center;
  line-height: 65px;
  padding: ${applyStyleIfHasProperty("primary", "0 50px", "0 25px")};
  background-color: ${applyStyleIfHasProperty("primary", "#66efda", "#fff")};
  color: ${applyStyleIfHasProperty("primary", "#364157", "#566582")};
  font-family: "Graphik Semibold";
  font-size: 17px;
  font-weight: 600;
  border: ${applyStyleIfHasProperty(
    "primary",
    "1px solid #66efda",
    "1px solid rgba(86, 101, 130, 0.85)"
  )};
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:hover,
  &:active {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    filter: grayscale(1);
    cursor: not-allowed;
  }
`
export const StyledLoadingWrapper = () => (
  <LoadingWrapper>
    <LoadingSpinner size={64} />
  </LoadingWrapper>
)

export const StyledWeeklyOfferPDPContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 0 20px 0;

  @media only screen and (max-width: 415px) {
    padding: 6px;
    flex-direction: column;
  }
`

export const StyledLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 49%;
  margin-right: 12px;

  @media only screen and (max-width: 415px) {
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }
`

export const StyledImageContainer = styled.div`
  margin-bottom: 30px;
`

export const StyledRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 50%;

  @media only screen and (max-width: 415px) {
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
`

export const StyledQuantityAndPriceContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 415px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

export const StyledWeeklyOffersItemTitle = styled.h2`
  color: #3e4a63;
  font-family: "Cooper Md BT W05 Regular";
  font-size: 32px;
  font-weight: 500;
  line-height: 39.6px;
  margin: 0 0 12px 0;
  padding: 0;
  display: block;

  @media screen and (max-width: 1024px) {
    font-family: "Graphik Semibold";
    font-size: 16px;
    line-height: 25px;
    margin: 0 0 10px;
    padding: 0;
  }
`

export const StyledRenderHtmlWeeklyOffersItemDescription = styled(RenderHtml)`
  display: contents;
  padding: 0;
  margin: 0 0 0.5em;

  p {
    color: #878787;
    font-family: "Graphik Regular";
    font-size: 18px;
    line-height: 27px;
  }

  @media screen and (max-width: 1024px) {
    margin: 0 0 0.5em;
    padding: 0;

    p {
      font-size: 14px;
      line-height: 19px;
    }
  }
`

export const StyledPriceContainer = styled.div`
  margin: 12px 0;
  border: none;
  display: flex;
  align-items: baseline;

  div:first-of-type {
    margin-right: 24px;
  }
`

export const StyledPriceLabel = styled.div`
  color: #87827c;
  font-family: "Graphik Medium";
  font-size: 15px;
  font-weight: 500;
  line-height: 17px;
  width: auto;
`

export const StyledButtonsContainer = styled.fieldset`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  width: 100%;

  & button {
    margin-right: 13px;
  }

  & button:last-of-type {
    margin-right: 0;
  }

  @media only screen and (max-width: 1024px) {
    flex-wrap: wrap;
    width: 100%;

    & button {
      margin-right: 0;
      width: 100%;
    }

    & button:last-of-type {
      margin-top: 6px;
    }
  }
`

export const StyledButton = styled(StyledCommonButton)`
  width: 49%;

  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`

export const StyledPricesContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  width: auto;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
  }
`

export const StyledPriceItem = styled.div`
  border: none;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
`

export const StyledPriceBeforeDiscount = styled(Price)`
  font-style: italic;
  text-decoration: line-through;
  margin-top: 7px;
`
