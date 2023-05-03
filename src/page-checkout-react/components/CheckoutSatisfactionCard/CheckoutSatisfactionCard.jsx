import React from "react"
import { styled } from "@linaria/react"
import CheckoutCard from "../../../rUI/CheckoutCard"

function CheckoutSatisfactionCard(props) {
  return (
    <Root {...props}>
      <Block>
        <i className="fa fa-calendar-check-o" />
        <Text>MONTHLY DELIVERIES</Text>
      </Block>
      <Block>
        <i className="fa fa-clock-o" />
        <Text>CHANGE OR CANCEL AT ANY TIME</Text>
      </Block>
    </Root>
  )
}

const Root = styled(CheckoutCard)`
  padding: 15px 25px;
  display: flex;
`

const Block = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #667799;
`

const Text = styled.p`
  font-size: 11px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 0;
  max-width: 100%;
`

export default CheckoutSatisfactionCard
