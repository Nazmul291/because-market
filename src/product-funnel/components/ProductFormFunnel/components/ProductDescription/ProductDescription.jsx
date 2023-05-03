import React, { useMemo } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { useProductMetafieldValue, useProductPrice } from "../../../../../hooks"
import {
  PRODUCT_METAFIELD_KEY_CUSTOM_VARIANT_DESCRIPTION,
  PRODUCT_METAFIELD_KEY_SUBSCRIPTION_MONTHLY,
  PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
  PRODUCT_METAFIELD_NAMESPACE_SUBSCRIPTION,
  PRODUCT_SIZE_OPTIONS,
} from "../../../../../const"
import {
  findOptionByNames,
  getMetafieldValue,
  hasTag,
  normalizeString,
} from "../../../../../utils"
import { Price, RenderHtml } from "../../../../../rUI"

const SIZE_WORD = normalizeString("size")
const PER_PIECE_WORD = normalizeString("per piece")

const defaultDescriptions = [
  "High-performance absorption",
  "Size",
  "20% less than leading brands",
  "per piece",
]

ProductDescription.propTypes = {
  product: PropTypes.object,
  variant: PropTypes.object,
  quantity: PropTypes.number,
}

function ProductDescription({
  product,
  variant = null,
  quantity = null,
  ...props
}) {
  const discounts = useMemo(() => {
    const discount = getMetafieldValue(
      product?.metafields,
      PRODUCT_METAFIELD_NAMESPACE_SUBSCRIPTION,
      PRODUCT_METAFIELD_KEY_SUBSCRIPTION_MONTHLY
    )

    return discount ? [discount] : null
  }, [product])

  const { hasPerPiece, pricePerPieceV2, finalPricePerPieceV2 } =
    useProductPrice({
      variant,
      quantity,
      discounts,
    })

  const customDescriptions = useProductMetafieldValue(
    product,
    PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
    PRODUCT_METAFIELD_KEY_CUSTOM_VARIANT_DESCRIPTION
  )

  const sizeOption = useMemo(() => {
    return findOptionByNames(variant?.selectedOptions, PRODUCT_SIZE_OPTIONS)
  }, [variant])

  const descriptions = useMemo(() => {
    const description = customDescriptions || defaultDescriptions
    const hasPadsTag = hasTag(product?.tags, "pads")

    return description.reduce((acc, text) => {
      const normalizedText = normalizeString(text)

      if (normalizedText.indexOf(SIZE_WORD) >= 0) {
        if (hasPadsTag) {
          acc.push(<span>Odor minimizing system</span>)
        } else if (sizeOption) {
          acc.push(<span>Size {sizeOption.value}</span>)
        }
      } else if (normalizedText.indexOf(PER_PIECE_WORD) >= 0) {
        hasPerPiece &&
          acc.push(
            <span>
              Starting at{" "}
              <strike style={{ fontSize: "19px" }}>
                <Price priceV2={pricePerPieceV2} />
              </strike>{" "}
              <b>
                <Price priceV2={finalPricePerPieceV2} />
              </b>{" "}
              per piece
            </span>
          )
      } else {
        acc.push(<RenderHtml html={text} tagName="span" />)
      }
      return acc
    }, [])
  }, [
    product,
    customDescriptions,
    sizeOption,
    hasPerPiece,
    pricePerPieceV2,
    finalPricePerPieceV2,
  ])

  return (
    <StyledProductFormDescriptionFunnel {...props}>
      {descriptions.map((description, index) => (
        <div key={index}>
          <i className="fa fa-check fa-lg" aria-hidden="true" />
          {description}
        </div>
      ))}
    </StyledProductFormDescriptionFunnel>
  )
}

export default ProductDescription

const StyledProductFormDescriptionFunnel = styled.div`
  color: #212529;
  font-size: 22px;
  margin-bottom: 20px;

  @media (max-width: 1199px) {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }

  i {
    color: rgb(67, 237, 220);
    margin-right: 5px;
  }
`
