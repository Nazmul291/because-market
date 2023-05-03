import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

Badge.propTypes = {
  children: PropTypes.node,
}

function Badge({ children, ...props }) {
  return <StyledRoot {...props}>{children}</StyledRoot>
}

const StyledRoot = styled.em`
  color: #fff;
  background: rgb(110, 191, 235);
  align-self: flex-start;
  border-radius: 5px;
  padding: 7px;
  font-style: normal;
  font-size: 16px;
  font-weight: 500;
`

export default Badge
