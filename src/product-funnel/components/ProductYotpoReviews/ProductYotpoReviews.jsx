import React from "react"
import PropTypes from "prop-types"
import { AccountYotpoReviews } from "../../../rUI"
import { useProductYoptoReviewId } from "../../../hooks"

ProductYotpoReviews.propTypes = {
  product: PropTypes.object,
}

function ProductYotpoReviews({ product, ...props }) {
  const productId = useProductYoptoReviewId(product)

  if (!product) {
    return null
  }

  return (
    <AccountYotpoReviews
      productId={productId}
      productTitle={product.title}
      {...props}
    />
  )
}

export default ProductYotpoReviews
