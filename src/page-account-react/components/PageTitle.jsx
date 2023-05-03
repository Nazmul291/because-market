import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { applyStyleIfHasProperty } from "../../utils"

PageTitle.propTypes = {
  children: PropTypes.node,
}

export function PageTitle({ children, ...props }) {
  return <StyledPageTitle {...props}>{children}</StyledPageTitle>
}

const StyledPageTitle = styled.h1`
  color: #566582;
  font-family: "Cooper Md BT W05 Regular";
  font-size: 35px;
  font-weight: 500;
  letter-spacing: -0.1px;
  line-height: 42px;
  padding: 0;
  margin: 0;
  padding-left: 10px;
  margin-bottom: 14px;

  @media screen and (max-width: 1024px) {
    display: ${applyStyleIfHasProperty("mobile", "block", "none")};
    font-size: 26px;
    line-height: 42px;
    margin: 0 10px;
  }
`
