import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

StarRating.propTypes = {
  rating: PropTypes.number,
  maxRating: PropTypes.number,
}

function StarRating({ rating, maxRating }) {
  const ratingArray = new Array(maxRating)
    .fill()
    .map((_, index) => index < rating)
  return (
    <div>
      {ratingArray.map((ratingItem, index) => (
        <StyledStar
          key={index}
          className={`fa fa-star ${ratingItem ? "checked" : ""}`.trim()}
        />
      ))}
    </div>
  )
}

export default StarRating

const StyledStar = styled.span`
  &.checked {
    color: #0ae5da;
  }
  & + & {
    margin-left: 8px;
  }
`
