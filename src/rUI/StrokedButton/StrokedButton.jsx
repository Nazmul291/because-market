import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

export const VARIANT_DEFAULT = "default"
export const VARIANT_PRIMARY = "primary"
export const VARIANT_APPLY = "apply"
export const SIZE_SMALL = "small"
export const SIZE_DEFAULT = "default"
export const SIZE_LARGE = "large"

StrokedButton.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([VARIANT_DEFAULT, VARIANT_PRIMARY, VARIANT_APPLY]),
  size: PropTypes.oneOf([SIZE_SMALL, SIZE_DEFAULT, SIZE_LARGE]),
  type: PropTypes.string,
}

function StrokedButton({
  children,
  variant = VARIANT_DEFAULT,
  size = SIZE_DEFAULT,
  type = "button",
  ...props
}) {
  return (
    <StyledStrokedButton
      type={type}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {children}
    </StyledStrokedButton>
  )
}

const StyledStrokedButton = styled.button`
  --color: #566582;
  --active-color: #fff;
  --border-color: #566582;
  --background-color--active: #566582;
  --background-color: transparent;
  --font-size: 16px;

  --height: 50px;
  --line-height: var(--height);

  &[data-variant="${VARIANT_PRIMARY}"] {
    --border-color: #10e4da;
    --background-color: #10e4da;
    --background-color--active: #10e4da;
  }

  &[data-variant="${VARIANT_APPLY}"] {
    --color: #fff;
    --active-color: #566582;
    --border-color: #566582;
    --background-color: #566582;
    --background-color--active: #ffff;
  }

  &[data-size="${SIZE_SMALL}"] {
    --height: 37px;
    --font-size: 14px;
  }

  &[data-size="${SIZE_LARGE}"] {
    --height: 65px;
  }

  width: 100%;
  min-width: 40px;
  height: var(--height);
  line-height: var(--line-height);
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--border-color);
  border-radius: 5px;
  background-color: var(--background-color);
  font-weight: 500;
  font-family: "Graphik Medium", Helvetica, sans-serif;
  font-size: var(--font-size);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: var(--color);
  box-sizing: border-box;

  &:disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.5;
  }

  &:hover,
  &:active {
    background-color: var(--background-color--active);
    color: var(--active-color);
  }

  &:hover svg,
  &:active svg {
    fill: var(--active-color);
  }

  @media screen and (max-width: 1024px) {
    height: 40px;
    font-size: 14px;
  }
`

export default StrokedButton
