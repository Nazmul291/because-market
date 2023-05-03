import React from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"

AccountFormRow.propTypes = {
  children: PropTypes.node,
}

export function AccountFormRow({ children, ...props }) {
  return <StyledFormRow {...props}>{children}</StyledFormRow>
}

const StyledFormRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 14px;
  flex-wrap: nowrap;
  flex-direction: row;

  & > * {
    margin: 0 5px;
  }

  @media only screen and (max-width: 415px) {
    flex-wrap: wrap;
    flex-direction: column;
  }
`
