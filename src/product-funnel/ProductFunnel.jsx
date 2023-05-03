import React, { memo, useCallback, useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { scroller } from "react-scroll"
import {
  FindYourFitSection,
  ProductBenefitsFunnel,
  ProductFaqFunnel,
  ProductVideoFunnel,
  ProductHappyCustomersFunnel,
  ProductDetailsFunnel,
  ProductStoriesFunnel,
  ProductTitleAndFeatures,
  ProductFormFunnel,
  FindYourFitLink,
} from "./components"
import { AccountProductGallery } from "../rUI"
import ProductSlider from "./components/ProductSlider"
import ProductImageMobileSlider from "./components/ProductImageMobileSlider"
import { StyledBlock } from "./components/StyledBlock"
import {
  findVariantByGroupedOptions,
  getUrlParameter,
  groupVariantOptions,
  sanitizeStorefrontId,
} from "../utils"
import mixpanel from "../integrations/mixpanel"
import { fetchProduct } from "../api/storefrontApi"
import { useAsyncState, useProductIsType } from "../hooks"
import { trackEvent } from "../integrations/tracker"
import { getUTMParams } from "../integrations/utm"
import ProductYotpoReviews from "./components/ProductYotpoReviews"

const FUNNEL_ID_QUERY = "funnelID"
const BACK_URL_QUERY = "backUrl"
const USER_ID_QUERY = "userID"
const MIXPANEL_ID = "did"
const QUANTITY = "quantity"

const options = [
  "No commitments, cancel anytime",
  "Reminders sent before starter pack ends",
  "You will not be charged full price",
]

const ABSORBENCY_ORDER = ["moderate", "maximum", "overnight"]

ProductFunnel.propTypes = {
  currentProduct: PropTypes.object.isRequired,
}

function ProductFunnel({ currentProduct }) {
  const [productState, reqFetchProduct] = useAsyncState(fetchProduct)
  const [selectedVariant, setSelectedVariant] = useState()
  const [initialVariantId, setInitialVariantId] = useState(
    getUrlParameter("variant")
  )

  const { data: product } = productState
  const isUnderwear = useProductIsType("underwear")

  const productsOptions = useMemo(() => {
    const products = getUrlParameter("products")

    if (!products) {
      return null
    }

    return [
      {
        value: Number(getUrlParameter("productID")),
        label: getUrlParameter("title"),
      },
      ...products.split(";").map((str) => {
        const [value, label] = str.split(":")

        return {
          value: Number(value),
          label,
        }
      }),
    ].sort(({ label: labelA }, { label: labelB }) => {
      const indexA = ABSORBENCY_ORDER.indexOf(labelA.toLowerCase())
      const indexB = ABSORBENCY_ORDER.indexOf(labelB.toLowerCase())

      return indexA - indexB
    })
  }, [])

  const handleProductChange = useCallback(
    (id) => {
      const previousVariant = selectedVariant
      reqFetchProduct(id).then((product) => {
        if (!previousVariant || !product?.variants) {
          return
        }

        const previousOptions = groupVariantOptions(previousVariant)
        // we should select variant only with existing options
        const filteredPreviousOptions =
          product?.options?.reduce((acc, { name }) => {
            const value = previousOptions[name]

            if (value) {
              acc[name] = value
            }

            return acc
          }, {}) ?? {}

        const variant = findVariantByGroupedOptions(
          product.variants,
          filteredPreviousOptions
        )

        if (variant) {
          setInitialVariantId(variant.id)
        }
      })
    },
    [reqFetchProduct, selectedVariant]
  )

  const handleFindYourFitClick = useCallback(() => {
    scroller.scrollTo("find-your-fit-section", {
      duration: 500,
      delay: 250,
      smooth: "easeInOutQuart",
      offset: -140,
    })
  }, [])

  const handleVariantChange = useCallback((variant) => {
    setSelectedVariant(variant)
  }, [])

  const handleSubmit = useCallback(() => {
    trackEvent("Add to Cart Click", {
      product: {
        name: product.title,
        options: selectedVariant?.selectedOptions,
      },
    })

    const searchParams = new URLSearchParams(location.search)
    const backUrl = searchParams.get(BACK_URL_QUERY)
    const utm = getUTMParams()

    const search = new URLSearchParams({
      [FUNNEL_ID_QUERY]: searchParams.get(FUNNEL_ID_QUERY),
      [USER_ID_QUERY]: searchParams.get(USER_ID_QUERY),
      [QUANTITY]: searchParams.get(QUANTITY),
      productID: sanitizeStorefrontId(product.id),
      variantID: sanitizeStorefrontId(selectedVariant.id),
      [MIXPANEL_ID]:
        searchParams.get(MIXPANEL_ID) || mixpanel.get_distinct_id() || "",
      ...(utm ?? {}),
    }).toString()

    location.href = `${backUrl}?${search}`
  }, [product, selectedVariant])

  useEffect(() => {
    reqFetchProduct(getUrlParameter("productID"))
  }, [reqFetchProduct])

  useEffect(() => {
    const mixpanelId = getUrlParameter("did")
    trackEvent("Funnel PDP Load")
    if (mixpanelId) {
      mixpanel.identify(mixpanelId)
    }
  }, [])

  return (
    <>
      <StyledContainerHolder className="container-lg">
        <div className="row">
          <div className="col-lg-12">
            <StyleDesktopOnlyHolder className="desktop-only">
              <span>
                Based on your answers, I recommend this Free Starter Pack:
              </span>
            </StyleDesktopOnlyHolder>
            <StyledProductTitleHolder>
              <ProductTitleAndFeatures product={product} />
            </StyledProductTitleHolder>
          </div>
        </div>
        <div className="row">
          <StyleDesktopOnlyHolder className="col-xl-7 col-lg-12 desktop-only">
            <StyledAccountProductGallery
              images={product?.images ?? currentProduct?.media}
              funnelView={true}
            />
          </StyleDesktopOnlyHolder>
          <StyleMobileOnlyHolder className="col-xl-7 col-lg-12">
            <ProductImageMobileSlider
              images={product?.images ?? currentProduct?.media}
            />
          </StyleMobileOnlyHolder>

          <StyleMobileOnlyHolder className="col-xl-7 col-lg-12 ">
            <ProductSlider
              autoStart={true}
              options={options}
              showDots={false}
              showArrows={true}
            />
          </StyleMobileOnlyHolder>
          <div className="col-xl-5 col-lg-12" style={{ margin: "0 0 42px 0" }}>
            <ProductFormFunnel
              product={product}
              productsOptions={productsOptions}
              initialVariantId={initialVariantId}
              onProductChange={handleProductChange}
              onVariantChange={handleVariantChange}
              onSubmit={handleSubmit}
            />
            {isUnderwear && (
              <FindYourFitLink
                product={product}
                onClick={handleFindYourFitClick}
              />
            )}
          </div>
        </div>
      </StyledContainerHolder>
      <div className="container-lg">
        <ProductDetailsFunnel product={product} />
        <ProductBenefitsFunnel product={product} />
        {isUnderwear && (
          <FindYourFitSection product={product} name="find-your-fit-section" />
        )}
        <ProductVideoFunnel product={product} />
        <ProductFaqFunnel product={product} />
      </div>
      <StyledFeedback>
        <div className="container-lg">
          <ProductHappyCustomersFunnel product={product} />
          <StyledReviewContainer>
            <div className={`col-lg-7 col-md-12 col-sm-12`}>
              <ProductYotpoReviews product={product} />
            </div>
            <div className={`col-lg-5 col-md-12 col-sm-12`}>
              <ProductStoriesFunnel product={product} />
            </div>
          </StyledReviewContainer>
        </div>
      </StyledFeedback>
    </>
  )
}

export default memo(ProductFunnel)

const StyledReviewContainer = styled(StyledBlock)`
  display: flex;
  flex-wrap: wrap;
`

const StyledFeedback = styled.div`
  background-color: white;
`

const StyledProductTitleHolder = styled.div`
  .product__title__wrapper {
    margin-top: 0 !important;
  }

  .product__title {
    color: #212529 !important;
    display: inline-block;
    font-family: "Merriweather", serif !important;
    font-size: 38px !important;
    font-weight: bold !important;
  }

  @media (max-width: 768px) {
    .product__title {
      color: #212529 !important;
      margin-bottom: 0.75rem !important;
      display: inline-block;
      font-family: "Merriweather", serif !important;
      font-size: 38px !important;
      font-weight: bold !important;
      margin-right: 20px !important;
      line-height: 1.2;
    }
  }
`

const StyledContainerHolder = styled.div`
  padding-top: 60px;
  padding-left: 50px;
  padding-right: 50px;

  @media (max-width: 1023px) {
    padding-top: 20px;
  }
`

const StyleDesktopOnlyHolder = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

const StyleMobileOnlyHolder = styled.div`
  display: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  color: #212529;
  @media (max-width: 768px) {
    display: flex;
  }
`

const StyledAccountProductGallery = styled(AccountProductGallery)`
  margin-right: 0;
  margin-bottom: 32px;

  .carousel {
    display: flex;
    flex-direction: row-reverse;
  }

  .dot-group-inner {
    flex-direction: column;
    gap: 16px;
  }

  .dot-group {
    width: 140px;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 600px;
    margin-right: 16px;
  }

  .carousel__slider {
    background-color: #fff;
    min-height: 600px;
    padding: 5em 5px;
    border-radius: 7px;
  }
  @media (max-width: 1199px) {
    .carousel__slider {
      min-height: 700px;
      padding: 10px;
      img {
        height: 90%;
      }
    }
  }
`
