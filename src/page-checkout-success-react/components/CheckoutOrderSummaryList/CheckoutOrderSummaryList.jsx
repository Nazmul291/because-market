import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { DividedLine } from "../../../rUI"

export const CheckoutOrderSummaryList = styled.ul`
  font-size: 15px;
  margin: 0;
  padding-left: 0 !important;
  margin-top: 33px;
  list-style-type: none;
`

export const CheckoutOrderSummaryListItem = ({
  head,
  tail,
  isMonthly,
  ...props
}) => (
  <StyledSummaryListItem {...props}>
    <CheckoutOrderSummaryListDividedLine
      isMonthly={isMonthly}
      head={head}
      tail={tail}
    />
  </StyledSummaryListItem>
)

CheckoutOrderSummaryListItem.propTypes = {
  head: PropTypes.node,
  tail: PropTypes.node,
  isMonthly: PropTypes.bool,
}

const StyledSummaryListItem = styled.li``

export const CheckoutOrderSummaryListDividedLine = styled(DividedLine)`
  --color-divide: #cccccc;
  align-items: baseline;
`

export const CheckoutOrderSummaryListWithoutLine = styled(DividedLine)`
  --color-divide: #ffffff;
  align-items: baseline;
`
