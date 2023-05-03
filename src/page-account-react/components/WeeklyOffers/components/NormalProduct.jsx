import React, { memo, useCallback, useState } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { OfferCountdown } from "./OfferCountdown"
import {
  AccountProductOption,
  AccountProductInputQuantity,
  Price,
} from "../../../../rUI"
import { useProductVariantStore } from "../../../../hooks"
import { getMetafieldValue } from "../../../../utils"
import { PRODUCT_METAFIELD_NAMESPACE_SUBSCRIPTION } from "../../../../const"
import {
  StyledLoadingWrapper,
  StyledWeeklyOfferPDPContainer,
  StyledLeft,
  StyledImageContainer,
  StyledRight,
  StyledQuantityAndPriceContainer,
  StyledWeeklyOffersItemTitle,
  StyledRenderHtmlWeeklyOffersItemDescription,
  StyledPriceLabel,
  StyledButtonsContainer,
  StyledButton,
  StyledPricesContainer,
  StyledPriceItem,
  StyledPriceBeforeDiscount,
} from "./StyledCommon"
import { WeeklyOffersShipmentStats } from "./WeeklyOffersShipmentStats"

NormalProduct.propTypes = {
  product: PropTypes.object,
  productImage: PropTypes.object,
  deadline: PropTypes.string,
  shortDescription: PropTypes.string,
  onSubscribe: PropTypes.func,
  hasNextShipment: PropTypes.bool,
  shipment: PropTypes.shape({}),
  discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onAddToNextBoxOnly: PropTypes.func,
}

export function NormalProduct({
  product,
  productImage,
  deadline,
  shortDescription,
  onSubscribe,
  hasNextShipment,
  shipment,
  discount,
  onAddToNextBoxOnly,
  ...props
}) {
  const hasMonthlySubscription = Boolean(
    getMetafieldValue(
      product?.metafields,
      PRODUCT_METAFIELD_NAMESPACE_SUBSCRIPTION,
      "monthly"
    )
  )
  const [loading, setLoading] = useState(false)

  const store = useProductVariantStore(product)
  const showQuantity = store.productStore.showQuantity
  const finalPrice = store.currentVariantStore.finalPrice
  const optionsArr = store.productStore.optionsArr
  const groupedOption = store.currentVariantStore.groupedOption

  const handleOptionChange = useCallback(
    (name, value) => {
      store.currentVariantStore.setCurrentVariantByOptions({
        ...groupedOption,
        [name]: value,
      })
    },
    [groupedOption, store.currentVariantStore]
  )

  const handleOnSubscribe = useCallback(() => {
    setLoading(true)
    onSubscribe({
      variantId: store.currentVariantStore.currentVariant?.id,
      quantity: store.quantity,
    })
  }, [onSubscribe, store])

  const handleAddToNextBoxOnly = useCallback(() => {
    setLoading(true)
    onAddToNextBoxOnly({
      variantId: store.currentVariantStore.currentVariant?.id,
      quantity: store.quantity,
    })
  }, [onAddToNextBoxOnly, store])

  return (
    <>
      <StyledWeeklyOfferPDPContainer {...props}>
        <StyledLeft>
          <StyledImageContainer>
            <img src={productImage?.src} alt={productImage?.alt} />
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
          <div style={{ marginTop: "24px" }}>
            {optionsArr.map((option) => (
              <AccountProductOption
                disabled={false}
                funnelView={false}
                key={option.key}
                label={option.key}
                option={{
                  id: option.key,
                  name: option.key,
                  values: option.values,
                }}
                value={groupedOption[option.key]}
                onChange={(value) => handleOptionChange(option.key, value)}
              />
            ))}
          </div>

          <StyledQuantityAndPriceContainer>
            {!showQuantity ? null : (
              <StyledQuantity
                label="Quantity"
                value={store.quantity}
                onChange={store.setQuantity}
              />
            )}
          </StyledQuantityAndPriceContainer>

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
            <StyledPriceItem>
              {discount && (
                <WeeklyOffersShipmentStats
                  shipment={shipment}
                  finalPrice={finalPrice}
                  discountPercent={parseInt(discount, 10)}
                  title={"Price after discount"}
                />
              )}
            </StyledPriceItem>
          </StyledPricesContainer>

          <StyledButtonsContainer>
            {hasMonthlySubscription && (
              <StyledButton type="submit" primary onClick={handleOnSubscribe}>
                Subscribe
              </StyledButton>
            )}
            <StyledButton
              type="button"
              onClick={handleAddToNextBoxOnly}
              disabled={!hasNextShipment}
            >
              Add to Next Box Only
            </StyledButton>
          </StyledButtonsContainer>

          <StyledTextAddonsContainer>
            {!hasMonthlySubscription && (
              <ul>
                <li>Free Shipping on Orders $25+</li>
              </ul>
            )}
            {hasMonthlySubscription && (
              <ul>
                <li>Cancel or Change Anytime</li>
                <li>Free Shipping on Orders $25+</li>
                <li>Discreet Delivery</li>
              </ul>
            )}
          </StyledTextAddonsContainer>
        </StyledRight>
      </StyledWeeklyOfferPDPContainer>

      {loading ? <StyledLoadingWrapper /> : null}
    </>
  )
}

const StyledTextAddonsContainer = styled.fieldset`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;

  ul {
    list-style: circle;
    margin-top: 16px;
  }

  li {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 13px !important;
    font: inherit;
    font-family: "Graphik Regular";
    vertical-align: initial;
  }
`

const StyledQuantity = styled(AccountProductInputQuantity)`
  width: 129px;
`

export default memo(NormalProduct)
