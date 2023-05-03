import React, { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { styled } from "@linaria/react"
import { PageTitle } from "../components/PageTitle"
import { createHrefToPage } from "../../utils"
import { SUBSCRIPTIONS, allProductsCategories } from "../route-const"
import AccountPDPContainer from "../containers/AccountPDPContainer"
import ProductsCollectionContainer from "../containers/ProductsCollectionContainer"
import segment from "../../integrations/segment"

const COLLECTION_PRODUCTS_LIMIT = 100

export function PageAllProducts() {
  const navigate = useNavigate()

  const [viewProduct, setViewProduct] = useState()

  const handleViewProductDetails = useCallback((product) => {
    document.body.style.overflow = "hidden"
    segment.track("S2-Product View Details Clicked", { page: "All Products" })
    setViewProduct(product)
  }, [])

  const handleCloseProductDetailsPopup = useCallback(() => {
    document.body.style.overflow = "auto"
    setViewProduct(null)
  }, [])

  const handleUpdateSubscriptionItemClick = useCallback(() => {
    handleCloseProductDetailsPopup()
    navigate(createHrefToPage(SUBSCRIPTIONS), { state: { redirected: true } })
  }, [handleCloseProductDetailsPopup, navigate])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [])

  return (
    <>
      <PageTitle mobile>
        All Products
        <StyledSubTitle>
          Explore all products and member specials.
        </StyledSubTitle>
      </PageTitle>

      {allProductsCategories.map(({ handle, object: collection }, index) => (
        <ProductsCollectionContainer
          key={handle}
          collection={collection}
          productLimit={COLLECTION_PRODUCTS_LIMIT}
          imageFloat={index % 2 ? "right" : "left"}
          onViewProductDetails={handleViewProductDetails}
        />
      ))}

      {viewProduct && (
        <AccountPDPContainer
          oneTimeOffer={viewProduct?.oneTimeOffer}
          productId={viewProduct?.id}
          variantId={null}
          onClose={handleCloseProductDetailsPopup}
          onSubmit={handleUpdateSubscriptionItemClick}
          onBuyNow={handleCloseProductDetailsPopup}
        />
      )}
    </>
  )
}

const StyledSubTitle = styled.small`
  display: block;
  color: #566582;
  font-family: "Cooper Lt BT W05 Regular";
  font-size: 20px;
  font-weight: 300;
  line-height: 42px;
  margin-bottom: 0;
  margin-top: -5px;

  @media screen and (max-width: 1024px) {
    font-size: 16px;
    line-height: 30px;
  }
`
