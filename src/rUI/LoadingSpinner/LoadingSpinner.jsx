import React from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"

const DEFAULT_SIZE = "32px"

LoadingSpinner.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

function LoadingSpinner({ size, ...props }) {
  return (
    <StyledLoadingSpinner
      style={{ width: size || DEFAULT_SIZE, height: size || DEFAULT_SIZE }}
      {...props}
    />
  )
}

const StyledLoadingSpinner = styled.figure`
  position: relative;
  display: block;

  &:before,
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: block;
    content: " ";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-sizing: border-box;
    border-width: 6px;
    border-style: solid;
  }

  &:before {
    border-color: rgba(0, 0, 0, 0.1);
  }

  &:after {
    @keyframes loader {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    border-color: #00b5ad transparent transparent;
    animation: loader 0.6s linear;
    animation-iteration-count: infinite;
  }
`

export default LoadingSpinner
