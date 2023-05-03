import React, { memo, useCallback, useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { createPortal } from "react-dom"
import { AccountProductForm } from "../../../rUI"

import {
  CustomerFeedback,
  TrialButton,
  ProductTags,
  ProductDescription,
} from "./components"
import { noop, sanitizeStorefrontId } from "../../../utils"
import ProductSwitcher from "./components/ProductSwitcher"

ProductFormFunnel.propTypes = {
  product: PropTypes.object,
  productsOptions: PropTypes.array,
  initialVariantId: PropTypes.string,
  onProductChange: PropTypes.func,
  onVariantChange: PropTypes.func,
  onSubmit: PropTypes.func,
}

function ProductFormFunnel({
  product,
  productsOptions,
  initialVariantId,
  onProductChange = noop,
  onVariantChange = noop,
  onSubmit = noop,
  ...props
}) {
  const currentProductId = useMemo(
    () => sanitizeStorefrontId(product?.id),
    [product]
  )

  const handleVariantChange = useCallback(
    ({ variant }) => {
      onVariantChange(variant)
    },
    [onVariantChange]
  )

  const button = <TrialButton {...props} onClick={onSubmit} />

  return (
    <>
      {createPortal(button, document.querySelector("#header-button"))}
      <StyledFormFunnel {...props}>
        {productsOptions && (
          <StyledProductSwitcher
            label="Absorbency"
            value={currentProductId}
            options={productsOptions}
            onChange={onProductChange}
          />
        )}
        {product && (
          <StyledAccountProductForm
            product={product}
            selectedVariantId={initialVariantId}
            showQuantity={false}
            funnelView={true}
            onChange={handleVariantChange}
            footer={({ product, selectedVariant, quantity }) => (
              <>
                <ProductDescription
                  product={product}
                  variant={selectedVariant}
                  quantity={quantity}
                />
                <CustomerFeedback product={product} />
                {button}
                <ProductTags product={product} />
              </>
            )}
          />
        )}
      </StyledFormFunnel>
    </>
  )
}

export default memo(ProductFormFunnel)

const StyledFormFunnel = styled.div`
  height: 100%;
  background-color: rgb(255, 255, 255);
  height: auto;
  padding: 1.2rem 1.2rem 1.2rem;
  border-radius: 7px;

  .trialButtonContainer {
    @media (max-width: 768px) {
      width: 100%;
      background: white;
      border: 1px solid rgb(170, 170, 170);
      position: fixed;
      padding: 5px 10px;
      left: 0px;
      bottom: 0px;
      z-index: 8000;
      transition: position 0.15s ease 0s, left 0.15s ease 0s, top 0.15s ease 0s;
    }
  }
`

const StyledAccountProductForm = styled(AccountProductForm)`
  margin-bottom: 0;

  section {
    padding-bottom: 8px;
  }

  .product-name {
    color: #333;
    font-family: "Segoe UI", Arial, sans-serif;
    font-size: 22px;
    line-height: 26px;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .product-guide-label {
    line-height: initial;
    img {
      height: 17px;
    }
  }

  .product-values {
    margin: 0 -5px 10px;
  }

  .product-value {
    & label {
      height: initial;
      flex-basis: initial;
      border: 2px solid #a5a5a5;
      padding: 5px;
      cursor: pointer;
      font-size: 14px;
      line-height: 20px;
      color: #747474;
      background: #fff;
      border-radius: 17px;
      max-width: min-content;
      min-width: initial;
      font-family: Graphik Regular, sans-serif;
    }

    & label > span {
      min-width: 70px;
      @media (max-width: 768px) {
        min-width: 55px;
      }
    }

    & input:checked ~ label {
      color: #fff;
      background: #679;
      border-color: #679;
    }
  }
`

const StyledProductSwitcher = styled(ProductSwitcher)`
  padding-bottom: 24px;
`
