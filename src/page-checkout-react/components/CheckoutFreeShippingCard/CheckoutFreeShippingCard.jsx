import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import CheckoutCard from "../../../rUI/CheckoutCard"
import Price from "../../../rUI/Price"

CheckoutFreeShippingCard.propTypes = {
  amount: PropTypes.number,
}

function CheckoutFreeShippingCard({ amount = 0, ...props }) {
  return (
    <CheckoutCard {...props}>
      <Root>
        <strong>
          You are <ToFreePrice amount={amount} /> away from free shipping!
        </strong>
      </Root>
    </CheckoutCard>
  )
}

const Root = styled.div`
  padding: 15px 45px;
`

const ToFreePrice = styled(Price)`
  color: #13cfc6;
`

export default CheckoutFreeShippingCard
