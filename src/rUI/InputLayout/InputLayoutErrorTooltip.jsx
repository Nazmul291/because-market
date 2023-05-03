import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

InputLayoutErrorTooltip.propTypes = {
  children: PropTypes.node,
}

function InputLayoutErrorTooltip({ children, ...props }) {
  return (
    <StyledRoot {...props}>
      <StyledContainer>{children}</StyledContainer>
    </StyledRoot>
  )
}

const StyledRoot = styled.div`
  position: relative;
`

const StyledContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  transform: translate(0px, 10px);
  background-color: var(--color-error);
  color: white;
  padding: 12px;
  border-radius: 6px;

  &::before {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -12px);
    display: block;
    content: "";
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 12px solid var(--color-error);
  }
`

export default InputLayoutErrorTooltip
