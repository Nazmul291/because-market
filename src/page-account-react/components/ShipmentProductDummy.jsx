import React from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { PiggyBankIcon } from "../../rUI/icons/PiggyBankIcon"
import { noop } from "../../utils"

ShipmentProductDummy.propTypes = {
  onClick: PropTypes.func,
}

export function ShipmentProductDummy({ onClick = noop, ...props }) {
  return (
    <StyledShipmentProductDummy {...props}>
      <StyledIconContainer>
        <PiggyBankIcon />
      </StyledIconContainer>
      <StyledCaption>Save More</StyledCaption>
      <StyledActionButton onClick={onClick}>Add more items</StyledActionButton>
    </StyledShipmentProductDummy>
  )
}

const StyledShipmentProductDummy = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 128px;

  & svg {
    width: 45px;
    fill: #9699a3;
    opacity: 0.5;
  }
`

const StyledCaption = styled.p`
  display: flex;
  flex-grow: 1;
  color: #9699a3;
  font-family: "Graphik Medium";
  font-size: 17px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  margin: 0;
  padding: 0;
`

const StyledActionButton = styled.button`
  height: 52px;
  max-width: 211px;
  padding: 0;
  width: calc(100% - 20px);
  background-color: initial;
  border: 2px solid #566582 !important;
  border-radius: 5px;
  color: #566582;
  font-family: "Graphik Semibold";
  font-size: 14px;
  font-weight: 600;
  line-height: 42px;
  margin: 10px 0;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:active {
    background-color: #566582;
    color: #fff;
  }
`
