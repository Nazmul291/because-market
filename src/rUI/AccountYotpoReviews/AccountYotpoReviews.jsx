import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { applyStyleIfHasProperty } from "../../utils"
import { init as yotpoInit } from "../../integrations/yotpo"

AccountYotpoReviews.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  productTitle: PropTypes.string.isRequired,
}

function AccountYotpoReviews({ productId, productTitle }) {
  useEffect(() => {
    yotpoInit()
  }, [productId])

  return (
    <StyledReviewGridColumn>
      <div
        className="yotpo yotpo-main-widget"
        data-product-id={productId}
        data-name={productTitle}
        data-mode="reviews"
        data-yotpo-element-id="1"
      />
    </StyledReviewGridColumn>
  )
}

const StyledReviewGridColumn = styled.div`
  margin-top: 32px;
  max-width: 100%;
  flex: ${applyStyleIfHasProperty("third", "31%", 1)};

  @media only screen and (max-width: 47.9em) {
    width: ${applyStyleIfHasProperty("third", "100%")};
    margin: ${applyStyleIfHasProperty("third", "20px 0")};
  }
`

export default AccountYotpoReviews
