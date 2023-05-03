import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

InputLabel.propTypes = {
  renderLabel: PropTypes.func,
  children: PropTypes.node,
  htmlFor: PropTypes.string,
}

function InputLabel({ renderLabel, children, htmlFor }) {
  if (renderLabel) {
    return renderLabel({ id: htmlFor })
  }

  return <Root htmlFor={htmlFor}>{children}</Root>
}

const Root = styled.label`
  font-size: 14px;
  margin-bottom: 0.1rem;
  color: #2c2b2b;
  font-weight: 500;
`

export default InputLabel
