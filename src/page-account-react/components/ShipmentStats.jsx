import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { ShipmentStatsItem } from "./ShipmentStatsItem"
import { OrderItemsIcon } from "../../rUI/icons/OrderItemsIcon"
import { ReceiptIcon } from "../../rUI/icons/ReceiptIcon"
import { InformationTooltip } from "./InformationTooltip"
import { applyStyleIfHasProperty } from "../../utils"
import { Price } from "../../rUI"

ShipmentStats.propTypes = {
  shipment: PropTypes.shape({
    discount: PropTypes.number,
    total: PropTypes.number,
    subtotal: PropTypes.number,
    handling: PropTypes.number,
    shipping: PropTypes.number,
    tax: PropTypes.number,
    items: PropTypes.array,
    redemptionCoupons: PropTypes.array,
  }),
  desktop: PropTypes.bool,
  mobile: PropTypes.bool,
}

export function ShipmentStats({ shipment = {}, desktop, mobile, ...props }) {
  const {
    discount,
    total,
    subtotal,
    handling,
    shipping,
    tax,
    redemptionCoupons,
    items,
  } = shipment

  const itemsCount = items?.length
  const hasCoupons = redemptionCoupons?.length > 0
  const onlyDiscount = Boolean(discount) && !hasCoupons

  const priceTitle = useMemo(() => {
    if (!discount) {
      return "Total"
    }

    return <StyledPriceBeforeDiscount amountV2={subtotal} />
  }, [discount, subtotal])

  return (
    <StyledStatsContainer mobile={mobile} desktop={desktop} {...props}>
      <ShipmentStatsItem
        icon={<OrderItemsIcon />}
        title="Items in Box"
        value={itemsCount}
      />
      <ShipmentStatsItem
        icon={<ReceiptIcon />}
        title={priceTitle}
        value={<Price amountV2={total} />}
      >
        <InformationTooltip style={{ marginLeft: "10px" }}>
          <StyledTooltipRow>
            <span>Reduced Handling Fee</span>
            <span>
              <Price amountV2={handling} />
            </span>
          </StyledTooltipRow>
          <StyledTooltipRow>
            <span>Sub Total</span>
            <span>
              <Price amountV2={subtotal} />
            </span>
          </StyledTooltipRow>
          {!onlyDiscount ? null : (
            <StyledTooltipRow>
              <span>Discount</span>
              <span>
                -<Price amountV2={discount} />
              </span>
            </StyledTooltipRow>
          )}
          <StyledTooltipRow>
            <span>Shipping Fee</span>
            <span>
              <Price amountV2={shipping} />
            </span>
          </StyledTooltipRow>
          <StyledTooltipRow>
            <span>Tax</span>
            <span>
              <Price amountV2={tax} />
            </span>
          </StyledTooltipRow>
          {!hasCoupons ? null : (
            <StyledTooltipRow>
              <span>Coupon code: {redemptionCoupons.join(", ")}</span>
              <span>
                -<Price amountV2={discount} />
              </span>
            </StyledTooltipRow>
          )}
          <StyledTooltipRow highlighted>
            <span>Order Total</span>
            <span>
              <Price amountV2={total} />
            </span>
          </StyledTooltipRow>
        </InformationTooltip>
      </ShipmentStatsItem>
    </StyledStatsContainer>
  )
}

const StyledStatsContainer = styled.section`
  display: ${applyStyleIfHasProperty("mobile", "none", "flex")};
  flex-direction: row;

  @media screen and (max-width: 1024px) {
    display: ${applyStyleIfHasProperty("desktop", "none", "flex")};
  }
`

const StyledPriceBeforeDiscount = styled(Price)`
  text-decoration: line-through;
`

const StyledTooltipRow = styled.div`
  display: grid;
  width: 400px;
  padding: 15px 20px;
  grid-template-columns: 70% 30%;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  font-family: "Graphik Regular";
  font-size: ${applyStyleIfHasProperty("highlighted", "18px", "16px")};
  font-weight: normal;
  font-style: normal;
  color: ${applyStyleIfHasProperty("highlighted", "#566582", "#9699a3")};

  & > *:last-child {
    text-align: right;
  }
`
