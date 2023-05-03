import React from "react"
import { styled } from "@linaria/react"
import { CheckoutCard } from "../../../rUI"
import { IconCalendar } from "../../../rUI/icons/IconCalendar"
import { IconCall } from "../../../rUI/icons/IconCall"

function CheckoutSupport() {
  return (
    <Root>
      <Item>
        <Calendar />
        <ItemText>Change products or cancel anytime</ItemText>
      </Item>
      <Item>
        <Call />
        <ItemText>24/7 customer support</ItemText>
      </Item>
    </Root>
  )
}

const Root = styled(CheckoutCard)`
  padding: 18px;
  display: flex;
  justify-content: space-between;
  line-height: 1.36;
  @media (max-width: 768px) {
    border-top: 0;
    margin-top: -22px;
    border-radius: 0px;
  }
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex: 1;
  position: relative;
  padding: 0 26px 0;
  height: 100%;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    width: 1px;
    height: 50%;
    background-color: #dadada;
  }

  &:last-child::after {
    display: none;
  }
`

const ItemText = styled.p`
  font-size: 14px;
  margin: 0;
  font-size: 14px;
  line-height: 1.36;
`

const Calendar = styled(IconCalendar)`
  height: 33px;
  margin-bottom: 16px;
  color: #667799;
`

const Call = styled(IconCall)`
  height: 33px;
  margin-bottom: 16px;
  color: #667799;
`

export default CheckoutSupport
