import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { formatDollarPrice, noop, applyStyleIfHasProperty } from "../../utils"
import { MembersFavoritesItem } from "./MembersFavoritesItem"
import { withLoading } from "../../hocs/withLoading"
import Skeleton from "../../rUI/Skeleton"

MembersFavoritesComponent.propTypes = {
  products: PropTypes.array,
  onViewDetailsClick: PropTypes.func,
}

function MembersFavoritesComponent({
  products,
  onViewDetailsClick = noop,
  ...props
}) {
  return (
    Array.isArray(products) &&
    Boolean(products.length) && (
      <StyledMembersFavoritesContainer {...props}>
        <StyledPageTitle mobile>
          Members' Favorites
          <StyledSubTitle>Our members love these products</StyledSubTitle>
        </StyledPageTitle>
        <StyledProductsGrid>
          {products.map(({ id, title, images, priceRange }, idx) => (
            <StyledProduct key={id} className={idx < 2 ? "large" : null}>
              <MembersFavoritesItem
                title={title}
                imageUrl={images[0]?.src}
                price={formatDollarPrice(priceRange.minVariantPrice.amount)}
                onViewDetailsClick={() => onViewDetailsClick({ productId: id })}
                large={idx < 2}
              />
            </StyledProduct>
          ))}
        </StyledProductsGrid>
      </StyledMembersFavoritesContainer>
    )
  )
}

const StyledMembersFavoritesContainer = styled.section`
  padding-top: 10px;

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

const StyledProductsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const StyledProduct = styled.article`
  position: relative;
  min-height: 323px;
  background-color: rgb(245, 249, 245);
  border-radius: 5px;
  overflow: hidden;

  &.large {
    grid-column: span 2;
  }

  &:nth-child(1) {
    background-color: rgb(243, 248, 252);
  }

  &:nth-child(2) {
    background-color: rgb(251, 246, 242);
  }
`

const StyledSkeletonContainer = styled.div`
  width: 100%;
  padding-top: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 2.5em 1.5em 323px 323px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const StyledSkeleton = styled(Skeleton)`
  width: 100%;
  height: 100%;
`

const StyledPageTitle = styled.h2`
  color: #566582;
  font-family: "Cooper Md BT W05 Regular";
  font-size: 35px;
  font-weight: 500;
  letter-spacing: -0.1px;
  line-height: 42px;
  padding: 0;
  margin: 0;
  padding-left: 10px;
  margin-bottom: 14px;

  @media screen and (max-width: 1024px) {
    display: ${applyStyleIfHasProperty("mobile", "block", "none")};
    font-size: 26px;
    line-height: 42px;
    margin: 0 10px;
  }
`

export const MembersFavorites = withLoading(
  MembersFavoritesComponent,
  <StyledSkeletonContainer>
    <StyledSkeleton style={{ gridColumn: "1 / span 2" }} />
    <StyledSkeleton style={{ gridColumn: "1 / span 2" }} />
    <StyledSkeleton style={{ gridColumn: "1 / span 2" }} />
    <StyledSkeleton style={{ gridColumn: "span 2" }} />
    <StyledSkeleton />
    <StyledSkeleton />
    <StyledSkeleton />
    <StyledSkeleton />
  </StyledSkeletonContainer>
)
