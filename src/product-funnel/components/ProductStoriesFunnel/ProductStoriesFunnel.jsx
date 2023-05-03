import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { defaultData } from "./default-data.js"
import useProductMetafieldValue from "../../../hooks/useProductMetafieldValue.js"
import {
  PRODUCT_METAFIELD_KEY_CUSTOM_FUNNEL_STORIES,
  PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
} from "../../../const.js"

ProductStoriesFunnel.propTypes = {
  product: PropTypes.object,
}

function ProductStoriesFunnel({ product, ...props }) {
  const stories =
    useProductMetafieldValue(
      product,
      PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
      PRODUCT_METAFIELD_KEY_CUSTOM_FUNNEL_STORIES
    ) ?? defaultData

  return (
    stories && (
      <StyledContainer {...props}>
        {stories.map((story, index) => {
          return (
            <StyledStory key={index}>
              <StyledImg src={story.img} alt="" />
              <StyledText>{story.text}</StyledText>
            </StyledStory>
          )
        })}
      </StyledContainer>
    )
  )
}

export default ProductStoriesFunnel

const StyledContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`

const StyledStory = styled.div`
  background-color: #f7f8f8;
  padding: 32px;
  border-radius: 7px;
  & + & {
    margin-top: 32px;
  }
  &:last-child {
    margin-bottom: 32px;
  }
`

const StyledText = styled.div`
  margin-top: 32px;
  color: #000000;
  font-family: Roboto, sans-serif;
  font-size: 16px;
`

const StyledImg = styled.img`
  max-height: 120px;
`
