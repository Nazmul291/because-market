import React, { memo } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"

FindYourFitLink.propTypes = {
  onClick: PropTypes.func,
}

function FindYourFitLink({ onClick, ...props }) {
  return (
    <FindYourFitAnchorContainer {...props}>
      <FindYourFitAnchor onClick={onClick}>
        <span>FIND YOUR FIT - SIZE MEASURES</span>
      </FindYourFitAnchor>
    </FindYourFitAnchorContainer>
  )
}

export default memo(FindYourFitLink)

const FindYourFitAnchorContainer = styled.div`
  margin: -14px 0 0 0;
`

const FindYourFitAnchor = styled.div`
  position: relative;
  background-color: #f7f8f8;
  color: #667799;
  font-family: "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue",
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  padding: 12px 1.2rem;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  cursor: pointer;

  & ::after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #747b80;
    content: "";
    pointer-events: none;
  }
`
