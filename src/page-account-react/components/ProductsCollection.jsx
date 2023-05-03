import React, { useState } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { ProductCollectionDescriptionItem } from "./ProductCollectionDescriptionItem"
import { ProductCollectionItem } from "./ProductCollectionItem"
import { withLoading } from "../../hocs/withLoading"

ProductsCollectionComponent.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  imageFloat: PropTypes.string,
  onViewProductDetails: PropTypes.func,
  descriptionHtml: PropTypes.string,
  viewBtnText: PropTypes.string,
  imageUrl: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.object),
}

function ProductsCollectionComponent({
  name = "",
  title = "",
  imageFloat = "left",
  onViewProductDetails,
  descriptionHtml = "",
  viewBtnText = "",
  imageUrl = "",
  products,
  ...props
}) {
  const [openState, setOpenState] = useState(false)

  const onOpenClick = () => setOpenState(true)
  const onCloseClick = () => setOpenState(false)

  return (
    Array.isArray(products) &&
    Boolean(products.length) && (
      <StyledProductsCollectionContainer id={`collection-${name}`} {...props}>
        <StyledProductsDescription>
          <ProductCollectionDescriptionItem
            title={title}
            descriptionHtml={descriptionHtml}
            viewBtnText={viewBtnText}
            onViewDetailsClick={onOpenClick}
            imageUrl={imageUrl}
            imageFloat={imageFloat}
          />
        </StyledProductsDescription>
        <StyledProductsGrid>
          {products.map((product, idx) => {
            const isHidden = !openState && idx > 2
            if (isHidden) {
              return null
            }
            return (
              <StyledProduct
                key={product.id}
                className="product"
                style={{ display: isHidden ? "none" : "block" }}
              >
                <ProductCollectionItem
                  product={product}
                  onViewDetailsClick={onViewProductDetails}
                />
              </StyledProduct>
            )
          })}
        </StyledProductsGrid>
        {products.length > 3 && (
          <StyledExpander
            className={openState ? "open" : ""}
            onClick={openState ? onCloseClick : onOpenClick}
          >
            <span className="left-bar" />
            <span className="right-bar" />
          </StyledExpander>
        )}
      </StyledProductsCollectionContainer>
    )
  )
}

const StyledProductsCollectionContainer = styled.section`
  padding-top: 10px;
  display: grid;
  grid-row-gap: 10px;

  @media screen and (max-width: 1024px) {
    margin: 0 10px;
    padding-top: 40px;

    & h1 {
      text-align: center;
      align-items: center;
      margin-bottom: 24px;
    }
  }
`

const StyledProductsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const StyledProductsDescription = styled.article`
  width: 100%;
  overflow: hidden;
  display: flex;
  height: 441px;
  background-color: #eff1f5;
  border-radius: 5px;

  @media screen and (max-width: 1024px) {
    display: block;
    height: auto;
  }
`

const StyledProduct = styled.article`
  position: relative;
  width: 100%;
  overflow: hidden;

  &.product {
    border: 1px solid #e7e7e7;
    border-radius: 4px;
    background-color: #fff !important;
  }
`

const StyledExpander = styled.div`
  background-color: #ffffff;
  height: 2.8em;
  width: 2.8em;
  display: block;
  padding: 0.5em;
  margin: 1rem auto -0.5rem;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  cursor: pointer;
  right: 14px;

  .left-bar {
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    width: 40px;
    height: 6px;
    display: block;
    transform: rotate(35deg);
    float: right;
    border-radius: 20px;

    &:after {
      content: "";
      background-color: #9699a3;
      width: 40px;
      height: 6px;
      display: block;
      float: right;
      border-radius: 20px;
      transition: all 0.5s cubic-bezier(0.25, 1.7, 0.35, 0.8);
      z-index: -1;
    }
  }

  .right-bar {
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 28px;
    width: 40px;
    height: 6px;
    display: block;
    transform: rotate(-35deg);
    float: right;
    border-radius: 20px;

    &:after {
      content: "";
      background-color: #9699a3;
      width: 40px;
      height: 6px;
      display: block;
      float: right;
      border-radius: 20px;
      transition: all 0.5s cubic-bezier(0.25, 1.7, 0.35, 0.8);
      z-index: -1;
    }
  }

  &.open {
    margin-top: 1.5rem;

    .left-bar:after {
      transform-origin: center center;
      transform: rotate(-70deg);
    }
    .right-bar:after {
      transform-origin: center center;
      transform: rotate(70deg);
    }
  }
`

export const ProductsCollection = withLoading(ProductsCollectionComponent)
