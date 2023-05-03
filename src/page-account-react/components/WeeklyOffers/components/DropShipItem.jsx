import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import { OfferCountdown } from "./OfferCountdown"
import { useProductVariantStore } from "../../../../hooks"
import {
  StyledLoadingWrapper,
  StyledWeeklyOfferPDPContainer,
  StyledLeft,
  StyledImageContainer,
  StyledRight,
  StyledWeeklyOffersItemTitle,
  StyledRenderHtmlWeeklyOffersItemDescription,
  StyledPriceLabel,
  StyledButtonsContainer,
  StyledButton,
  StyledPricesContainer,
  StyledPriceItem,
  StyledPriceBeforeDiscount,
} from "./StyledCommon"
import { noop } from "../../../../utils"
import { WeeklyOffersShipmentStats } from "./WeeklyOffersShipmentStats"
import segment from "../../../../integrations/segment"
import { Price } from "../../../../rUI"

DropShipItem.propTypes = {
  product: PropTypes.object,
  productImage: PropTypes.object,
  deadline: PropTypes.string,
  shortDescription: PropTypes.string,
  shipment: PropTypes.shape({}),
  discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBuyItNow: PropTypes.func,
}

export function DropShipItem({
  product,
  productImage,
  deadline,
  shortDescription,
  shipment,
  discount,
  onBuyItNow = noop,
  ...props
}) {
  const [loading, setLoading] = useState(false)

  const store = useProductVariantStore(product)
  const finalPrice = store.currentVariantStore.finalPrice

  const handleBuyItNow = useCallback(() => {
    setLoading(true)
    segment.track("S2-Clicks Add to Next Box Only Button")
    onBuyItNow(
      store.productStore.product.id,
      store.currentVariantStore.currentVariant?.id,
      store.quantity
    )
  }, [onBuyItNow, store])

  return (
    <>
      <StyledWeeklyOfferPDPContainer {...props}>
        <StyledLeft>
          <StyledImageContainer>
            <img
              src={productImage?.src}
              alt={productImage?.alt}
              className="s-image"
            />
          </StyledImageContainer>
          <OfferCountdown deadline={deadline} />
        </StyledLeft>
        <StyledRight>
          <StyledWeeklyOffersItemTitle>
            {product.title}
          </StyledWeeklyOffersItemTitle>
          <StyledRenderHtmlWeeklyOffersItemDescription
            html={shortDescription}
          />

          <StyledPricesContainer>
            <StyledPriceItem>
              <StyledPriceLabel>Regular price</StyledPriceLabel>
              {discount ? (
                <StyledPriceBeforeDiscount
                  priceV2={{ amount: finalPrice }}
                  free
                />
              ) : (
                <Price amountV2={finalPrice} free />
              )}
            </StyledPriceItem>
            {discount && (
              <StyledPriceItem>
                <WeeklyOffersShipmentStats
                  shipment={shipment}
                  finalPrice={finalPrice}
                  discountPercent={parseInt(discount, 10)}
                  title={"Price after discount"}
                />
              </StyledPriceItem>
            )}
          </StyledPricesContainer>

          <StyledButtonsContainer>
            <StyledButton type="submit" primary onClick={handleBuyItNow}>
              Buy it now
            </StyledButton>
          </StyledButtonsContainer>
        </StyledRight>
      </StyledWeeklyOfferPDPContainer>
      {loading ? <StyledLoadingWrapper /> : null}
    </>
  )
}
