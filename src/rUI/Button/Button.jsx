import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

export const TYPE_PRIMARY = "primary"

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
  type: PropTypes.oneOf([TYPE_PRIMARY]),
}

function Button({ disabled, children, type = TYPE_PRIMARY, ...props }) {
  return (
    <Root disabled={disabled} data-type={type} {...props}>
      {children}
    </Root>
  )
}

const Root = styled.button`
  --background-color: var(--theme-button-primary--background-color);
  --border-color: var(--theme-button-primary--border-color);
  --color: var(--theme-button-primary--color);

  min-height: 48px;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;

  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:disabled {
    opacity: 0.65;
  }

  &[data-type="${TYPE_PRIMARY}"] {
    background-color: var(--background-color);
    border-color: var(--border-color);
    color: var(--color);
  }
`

export default Button
