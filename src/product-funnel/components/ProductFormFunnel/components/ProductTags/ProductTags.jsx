import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { defaultTagIcons } from "../default-data.js"
import useProductMetafieldValue from "../../../../../hooks/useProductMetafieldValue.js"
import {
  PRODUCT_METAFIELD_KEY_CUSTOM_TAG_ICONS,
  PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
} from "../../../../../const.js"

ProductTags.propTypes = {
  product: PropTypes.object,
}

function ProductTags({ product, ...props }) {
  const tagIconsList =
    useProductMetafieldValue(
      product,
      PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
      PRODUCT_METAFIELD_KEY_CUSTOM_TAG_ICONS
    ) ?? defaultTagIcons

  return (
    <StyledProductTags {...props}>
      {tagIconsList.map((tagIcon, index) => (
        <StyledTag key={index}>
          <img src={tagIcon.src} alt={tagIcon.alt} />
          <p>{tagIcon.alt}</p>
        </StyledTag>
      ))}
    </StyledProductTags>
  )
}

export default ProductTags

const StyledProductTags = styled.div`
  font-size: 17px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    display: none;
  }
`

const StyledTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
  img {
    width: 16px;
    height: 16px;
  }
  p {
    color: #667799;
    font-size: 10px;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 0;
    max-width: 100%;
    white-space: nowrap;
  }
`
