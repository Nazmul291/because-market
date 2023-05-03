import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

CheckoutDisclaimLayout.propTypes = {
  children: PropTypes.node,
}

function CheckoutDisclaimLayout({ children, ...props }) {
  return <StyledRoot {...props}>{children}</StyledRoot>
}

const StyledRoot = styled.div`
  background-color: #f1f2f3;
  margin: 25px 0;
  padding: 15px 25px;

  word-wrap: break-word;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  font-size: 12px;
  font-weight: 500;
  color: #667799;

  a {
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
  }
`

export default CheckoutDisclaimLayout
