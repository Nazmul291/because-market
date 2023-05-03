import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { InformationTooltip } from "../../InformationTooltip"
import { applyStyleIfHasProperty } from "../../../../utils"
import { Price } from "../../../../rUI"
import { StyledPriceLabel } from "./StyledCommon"

WeeklyOffersShipmentStats.propTypes = {
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
  finalPrice: PropTypes.number,
  discountPercent: PropTypes.number,
  desktop: PropTypes.bool,
  mobile: PropTypes.bool,
  title: PropTypes.string,
}

export function WeeklyOffersShipmentStats({
  shipment = {},
  finalPrice,
  discountPercent,
  desktop,
  mobile,
  title,
}) {
  const { shipping, tax } = shipment

  const discountedPrice = useMemo(() => {
    const disc = finalPrice * (1 - discountPercent / 100)
    return parseFloat(disc.toFixed(2), 10)
  }, [finalPrice, discountPercent])

  const orderTotal = useMemo(
    () => discountedPrice + tax + shipping,
    [discountedPrice, tax, shipping]
  )

  return (
    <>
      <StyledStatsContainer mobile={mobile} desktop={desktop}>
        <StyledPriceLabel style={{ color: "#ca4433" }}>
          {title}
        </StyledPriceLabel>
        <InformationTooltip redded={true} style={{ marginLeft: "10px" }}>
          <StyledTooltipRow>
            <span>Sub Total</span>
            <span>
              <Price amountV2={discountedPrice} />
            </span>
          </StyledTooltipRow>
          <StyledTooltipRow>
            <span>Tax</span>
            <span>
              <Price amountV2={tax} />
            </span>
          </StyledTooltipRow>
          <StyledTooltipRow>
            <span>Shipping Fee</span>
            <span>
              <Price amountV2={shipping} />
            </span>
          </StyledTooltipRow>
          <StyledTooltipRow highlighted>
            <span>Order Total</span>
            <span>
              <Price amountV2={orderTotal} />
            </span>
          </StyledTooltipRow>
        </InformationTooltip>
      </StyledStatsContainer>

      <StyledStatsItem>
        <Price amountV2={orderTotal} />
      </StyledStatsItem>
    </>
  )
}

const StyledStatsContainer = styled.span`
  display: ${applyStyleIfHasProperty("mobile", "none", "flex")};
  flex-direction: row;
  margin-left: 24px;

  @media screen and (max-width: 1024px) {
    display: ${applyStyleIfHasProperty("desktop", "none", "flex")};
  }
`

const StyledStatsItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Merriweather;
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;
  color: #ca4433;
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
