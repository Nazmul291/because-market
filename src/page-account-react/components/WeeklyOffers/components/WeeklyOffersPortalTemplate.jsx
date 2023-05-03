import React, { memo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { NormalProduct } from "./NormalProduct"
import { DropShipItem } from "./DropShipItem"
import { useFetchProductState } from "../../../../hooks"
import { addToNextBox } from "../../../../api/marketApi"
import { shopifyClient } from "../../../../api/shopifyClient"
import {
  PRODUCT_TAG_BUY_NOW,
  CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION,
} from "../../../../const"
import segment from "../../../../integrations/segment"

WeeklyOffersPortalTemplate.propTypes = {
  product: PropTypes.object,
  shortDescription: PropTypes.string,
  hasNextShipment: PropTypes.bool,
  shipment: PropTypes.shape({}),
  discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSubscribe: PropTypes.func,
  onAddToNextBoxOnly: PropTypes.func,
  onBuyItNow: PropTypes.func,
}

export function WeeklyOffersPortalTemplate({
  product,
  shortDescription,
  hasNextShipment,
  shipment,
  discount,
  onSubscribe,
  onAddToNextBoxOnly,
  onBuyItNow,
  ...props
}) {
  const normalProduct = !product.tags.includes(PRODUCT_TAG_BUY_NOW)
  const productImage = (product.images && product.images[0]) || null

  const {
    loaded,
    reset,
    data: currentProduct,
  } = useFetchProductState(product.id)

  const handleOnSubscribe = (lineItem) => {
    segment.track("S2-Campaign Offer Modal Button Click", {
      type: "Subscribe & Save",
    })
    shopifyClient.checkout
      .create({
        lineItems: [
          {
            variantId: lineItem.variantId,
            quantity: lineItem.quantity,
            customAttributes: [
              {
                key: CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION,
                value: "monthly",
              },
            ],
          },
        ],
      })
      .then((checkout) => addToNextBox(checkout?.id))
      .then(() => {
        reset()
        onSubscribe()
      })
  }

  const handleAddToNextBoxOnly = (lineItem) => {
    segment.track("S2-Campaign Offer Modal Button Click", {
      type: "One Time Purchase",
    })
    shopifyClient.checkout
      .create({ lineItems: [lineItem] })
      .then((checkout) => addToNextBox(checkout?.id))
      .then(() => {
        reset()
        onAddToNextBoxOnly()
      })
  }

  return (
    loaded && (
      <StyledContainer {...props}>
        {normalProduct ? (
          <NormalProduct
            product={currentProduct}
            productImage={productImage}
            deadline={product.expiryDate?.value}
            shortDescription={shortDescription}
            onSubscribe={handleOnSubscribe}
            hasNextShipment={hasNextShipment}
            shipment={shipment}
            discount={discount}
            onAddToNextBoxOnly={handleAddToNextBoxOnly}
          />
        ) : (
          <DropShipItem
            product={currentProduct}
            productImage={productImage}
            deadline={product.expiryDate?.value}
            shortDescription={shortDescription}
            shipment={shipment}
            discount={discount}
            onBuyItNow={onBuyItNow}
          />
        )}
      </StyledContainer>
    )
  )
}

const StyledContainer = styled.div`
  border: none;
  display: flex;
  width: 100%;
  padding: 5%;

  @media only screen and (max-width: 1024px) {
    border: none;
    padding: 6px;
  }
`

export default memo(WeeklyOffersPortalTemplate)
