import React from "react"
import { styled } from "@linaria/react"
import { CheckoutCard } from "../../../rUI"
import img from "../../../rUI/img/get-in-right-guarantee-with-text.png"

function CheckoutGuarantee() {
  return (
    <Card>
      <img src={img} alt="Get in right guarantee" />
    </Card>
  )
}

const Card = styled(CheckoutCard)`
  padding: 18px;
`

export default CheckoutGuarantee
