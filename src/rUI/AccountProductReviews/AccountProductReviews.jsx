import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import {
  PRODUCT_METAFIELD_KEY_YOTPO_PRODUCT_ID,
  PRODUCT_METAFIELD_NAMESPACE_YOTPO,
} from "../../const"
import {
  applyStyleIfHasProperty,
  getMetafieldValue,
  getProductId,
} from "../../utils"
import AccountYotpoReviews from "../AccountYotpoReviews"
import { IconStar } from "../icons/IconStar"
import imgReview1 from "./images/review1.jpg"
import imgReview1Description from "./images/review1-description.png"
import imgReview2 from "./images/review2.png"
import imgReview2Description from "./images/review2-description.png"
import imgReview3 from "./images/review3.jpg"
import imgReview3Description from "./images/review3-description.png"

const RATING_AMOUNT = 5

AccountProductReviews.propTypes = {
  product: PropTypes.object,
}

function AccountProductReviews({ product }) {
  const title = product?.title

  const id = useMemo(() => {
    return (
      getMetafieldValue(
        product?.metafields,
        PRODUCT_METAFIELD_NAMESPACE_YOTPO,
        PRODUCT_METAFIELD_KEY_YOTPO_PRODUCT_ID
      ) || getProductId(product?.id)
    )
  }, [product])

  return (
    <>
      <StyledReviewsGrid>
        <StyledProductDescription>
          <StyledProductDescriptionHeader>
            Thousands of{" "}
            {new Array(RATING_AMOUNT).fill().map((item, idx) => (
              <StyledStar key={idx} />
            ))}
            Reviews
          </StyledProductDescriptionHeader>
        </StyledProductDescription>
      </StyledReviewsGrid>
      <StyledReviewsGrid>
        <StyledReviewGridColumn third>
          <StyledImg src={imgReview1} />
          <StyledImg src={imgReview1Description} />
        </StyledReviewGridColumn>
        <StyledReviewGridColumn third>
          <StyledImg src={imgReview2} />
          <StyledImg src={imgReview2Description} />
        </StyledReviewGridColumn>
        <StyledReviewGridColumn third>
          <StyledImg src={imgReview3} />
          <StyledImg src={imgReview3Description} />
        </StyledReviewGridColumn>
      </StyledReviewsGrid>
      <StyledReviewsGrid>
        <AccountYotpoReviews productId={id} productTitle={title} />
      </StyledReviewsGrid>
    </>
  )
}

export default AccountProductReviews

const StyledReviewsGrid = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;

  .yotpo .yotpo-user-title {
    color: #40339c !important;
  }

  @media only screen and (max-width: 47.9em) {
    display: block;

    > .yreview-grid-col-3 {
      width: 100%;
      margin: 20px 0;
    }
  }
`

const StyledReviewGridColumn = styled.div`
  max-width: 100%;
  flex: ${applyStyleIfHasProperty("third", "31%", 1)};

  @media only screen and (max-width: 47.9em) {
    width: ${applyStyleIfHasProperty("third", "100%")};
    margin: ${applyStyleIfHasProperty("third", "20px 0")};
  }
`

const StyledProductDescription = styled(StyledReviewsGrid)`
  max-width: 600px;
  padding: 25px 0;

  p {
    color: #566582;
    font-family: "Graphik Medium";
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 768px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @media screen and (max-width: 550px) {
    text-align: left;
  }
`

const StyledProductDescriptionHeader = styled.h2`
  margin: 15px 0;
  font-size: 2rem;
  color: #566582;
  font-family: "Cooper Md BT W05 Regular";
`

const StyledStar = styled(IconStar)`
  width: 42px;
  height: 42px;
  fill: #0ae5da;
  margin: 0 3px;
  margin-top: -0.5em;

  &:first-of-type {
    margin-left: 10px;
  }

  &:last-of-type {
    margin-right: 10px;
  }
`

const StyledImg = styled.img`
  max-width: 100%;
`
