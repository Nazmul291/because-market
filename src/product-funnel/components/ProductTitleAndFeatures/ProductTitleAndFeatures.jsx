import React from "react"
import PropTypes from "prop-types"
import {
  useProductMetafieldValue,
  useProductYoptoReviewId,
} from "../../../hooks"
import {
  PRODUCT_METAFIELD_KEY_GLOBAL_BRAND,
  PRODUCT_METAFIELD_NAMESPACE_GLOBAL,
} from "../../../const"

ProductTitleAndFeatures.propTypes = {
  product: PropTypes.object,
}

function ProductTitleAndFeatures({ product, ...props }) {
  const title = product?.title
  const brandName = useProductMetafieldValue(
    product,
    PRODUCT_METAFIELD_NAMESPACE_GLOBAL,
    PRODUCT_METAFIELD_KEY_GLOBAL_BRAND
  )

  const reviewProductId = useProductYoptoReviewId(product)

  return (
    <div {...props}>
      <div className="product__title__wrapper product-page">
        <h3 className="brand_name">{brandName}</h3>
        <h1 className="product__title">{title}</h1>
        <div
          className="yotpo bottomLine yotpo__reviews"
          data-appkey={process.env.YOTPO_TOKEN}
          data-product-id={reviewProductId}
          data-product-models={reviewProductId}
          data-name={title}
          data-url={`/products/${product?.handle}`}
        />
      </div>
    </div>
  )
}

export default ProductTitleAndFeatures
