import React, { useCallback, useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop, formatDollarPrice } from "../../utils"
import { StrokedButton } from "../../rUI"
import { useProductPrice } from "../../hooks"

ProductCollectionItem.propTypes = {
  product: PropTypes.object,
  onViewDetailsClick: PropTypes.func,
}

export function ProductCollectionItem({ product, onViewDetailsClick = noop }) {
  const meta = product.metafields

  // get the max value from all subscription types
  const maxSubscriptionDiscount = meta?.subscription
    ? Math.max(...Object.values(meta.subscription))
    : null

  const minVariant = useMemo(
    () =>
      product.variants.find(
        (variant) =>
          variant.price.amount === product.priceRange.minVariantPrice.amount
      ) || product.variants[0],
    [product]
  )

  const { finalPriceV2, hasPerPiece, finalPricePerPieceV2 } = useProductPrice({
    variant: minVariant,
    discounts: maxSubscriptionDiscount ? [maxSubscriptionDiscount] : null,
    quantity: 1,
  })

  const handleProductClick = useCallback(
    (event) => {
      event.preventDefault()
      onViewDetailsClick(product)
    },
    [onViewDetailsClick, product]
  )

  return (
    <StyledProductCollectionItemContainer>
      <StyledImage src={product.images[0]?.src} />
      <StyledProductDetails>
        <StyledTitle>{product.title}</StyledTitle>
        <StyledPrice>
          {hasPerPiece
            ? `Starting at ${formatDollarPrice(
                finalPricePerPieceV2.amount
              )} per piece`
            : formatDollarPrice(finalPriceV2.amount)}
        </StyledPrice>
        <StrokedButton onClick={handleProductClick}>View Details</StrokedButton>
      </StyledProductDetails>
    </StyledProductCollectionItemContainer>
  )
}

const StyledProductCollectionItemContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-column-gap: 10px;

  @media screen and (max-width: 1024px) {
    padding: 24px;
  }

  & figure {
    padding: 0 !important;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    height: 100%;
    max-height: 100%;
  }

  & section {
    padding: 0;
  }

  & strong {
    margin-bottom: 24px;
  }

  & button {
    max-width: 186px;
    border: 2px solid #0be5da !important;
    border-radius: 5px;
    background-color: #fff;
    padding: 0 !important;
    cursor: pointer;
    color: #0be5da !important;
  }
  & button:hover {
    background-color: #0be5da !important;
    cursor: pointer;
    color: #fff !important;
  }
`

const StyledImage = styled.img`
  margin: auto auto;
  width: 100%;

  @media screen and (max-width: 1023px) {
    width: 50%;
  }
`

const StyledProductDetails = styled.section`
  margin: 0;
  padding: 0;
  display: grid;
`

const StyledTitle = styled.h3`
  flex: 1;
  text-align: left;
  overflow: visible;
  text-overflow: ellipsis;
  color: #566582;
  font-family: "Graphik Semibold";
  font-size: 15px;
  line-height: 20px;
  /* height: 55px; */

  @media screen and (max-width: 1023px) {
    height: auto;
  }
`

const StyledPrice = styled.strong`
  color: #566582;
  font-family: "Cooper Md BT W05 Regular";
  font-size: 14px;
  font-weight: 500;
  height: auto;
  margin: 0 !important;
`
