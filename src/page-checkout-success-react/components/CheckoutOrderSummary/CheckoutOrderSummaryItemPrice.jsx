import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { Price } from "../../../rUI"
import CouponImg from "../../../rUI/img/coupon-icon.svg"

CheckoutOrderSummaryItemPrice.propTypes = {
  item: PropTypes.object,
}

function CheckoutOrderSummaryItemPrice({ item }) {
  if (item.priceV2BeforeDiscount) {
    return (
      <StyledPriceBeforeDiscountLayout>
        <div>
          <StyledPriceBeforeDiscount
            priceV2={item.priceV2BeforeDiscount}
            free
          />
          &nbsp;
          <Price priceV2={item.priceV2} free />
        </div>
        {item.coupon && (
          <StyledCouponHolder>
            <StyledCouponImg src={CouponImg} />
            {item.coupon.value}% off coupon
          </StyledCouponHolder>
        )}
      </StyledPriceBeforeDiscountLayout>
    )
  }

  return <StyledPrice priceV2={item.priceV2} free />
}

const StyledCouponImg = styled.img`
  margin-right: 3px;
`
const StyledCouponHolder = styled.div`
  font-size: 11px;
`
const StyledPriceBeforeDiscountLayout = styled.div`
  white-space: nowrap;
  text-align: right;
`
const StyledPrice = styled(Price)`
  &[data-is-free="true"] {
    color: #00a400;
    text-transform: uppercase;
    font-weight: bold;
  }
`

const StyledPriceBeforeDiscount = styled(Price)`
  color: #cccc;
  text-decoration: line-through;
`

export default CheckoutOrderSummaryItemPrice
