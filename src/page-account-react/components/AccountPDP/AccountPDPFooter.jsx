import React from "react"
import PropTypes from "prop-types"
import { PRODUCT_TYPE_UNDERWEAR } from "../../../const"
import {
  AccountProductDescription,
  AccountProductFAQ,
  AccountProductReviews,
} from "../../../rUI"

AccountPDPFooter.propTypes = {
  product: PropTypes.object,
}

function AccountPDPFooter({ product, ...props }) {
  return (
    <div {...props} style={{ marginTop: "35px" }}>
      {(product?.description || product?.descriptionHtml) && (
        <div className="product-description ui container">
          <h2
            className="product-description-header"
            style={{ marginBottom: "35px" }}
          >
            Product Details
          </h2>
          <div>
            <AccountProductDescription product={product} />
          </div>
        </div>
      )}
      {product?.productType === PRODUCT_TYPE_UNDERWEAR && (
        <AccountProductReviews product={product} />
      )}
      <AccountProductFAQ />
    </div>
  )
}

export default AccountPDPFooter
