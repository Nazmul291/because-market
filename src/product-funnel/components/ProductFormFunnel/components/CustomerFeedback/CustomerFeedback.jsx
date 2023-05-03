import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import {
  defaultFeedback,
  defaultFeedbackWomenUnderwear,
  defaultFeedbackWomenPad,
  defaultFeedbackMenUnderwear,
  defaultFeedbackMenGuard,
} from "../default-data.js"
import { getMetafieldValue, hasTag } from "../../../../../utils/utils.js"
import {
  PRODUCT_METAFIELD_KEY_CUSTOM_CUSTOMER_FEEDBACK,
  PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
} from "../../../../../const.js"

CustomerFeedback.propTypes = {
  product: PropTypes.object,
}

function CustomerFeedback({ product, ...props }) {
  const customerFeedback = useMemo(() => {
    const isUnderwear = hasTag(product?.tags, "underwear")
    const isWomen = hasTag(product?.tags, "women")
    const isMen = hasTag(product?.tags, "men")

    const isWomenUnderwear = isUnderwear && isWomen
    const isWomenPad = hasTag(product?.tags, "pad") && isWomen
    const isMenUnderwear = isUnderwear && isMen
    const isMenGuard = product?.tags?.indexOf("guard") && isMen

    const customerFeedbackString = isWomenUnderwear
      ? defaultFeedbackWomenUnderwear
      : isMenGuard
      ? defaultFeedbackMenGuard
      : isWomenPad
      ? defaultFeedbackWomenPad
      : isMenUnderwear
      ? defaultFeedbackMenUnderwear
      : defaultFeedback

    const productFeedBack = getMetafieldValue(
      product?.metafields,
      PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
      PRODUCT_METAFIELD_KEY_CUSTOM_CUSTOMER_FEEDBACK
    )

    return {
      ...customerFeedbackString,
      ...(productFeedBack ?? {}),
    }
  }, [product])

  if (!customerFeedback.text || !customerFeedback.author) {
    return null
  }
  return (
    <StyledCustomerFeedback {...props}>
      <FeedbackText>"{customerFeedback.text}"</FeedbackText>
      <FeedbackAuthor> - {customerFeedback.author}</FeedbackAuthor>
    </StyledCustomerFeedback>
  )
}

export default CustomerFeedback

const StyledCustomerFeedback = styled.div`
  font-size: 17px;
  margin-bottom: 20px;
`

const FeedbackText = styled.div`
  font-style: italic;
  font-weight: 500;
`

const FeedbackAuthor = styled.div`
  color: #667799;
  font-family: Roboto, sans-serif;
  font-size: 18px;
`
