import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

HeroTitle.propTypes = {
  children: PropTypes.node,
}

export function HeroTitle({ children, ...props }) {
  return <StyledHeroTitle {...props}>{children}</StyledHeroTitle>
}

const StyledHeroTitle = styled.h2`
  font-family: Graphik Medium;
  font-size: 3.5rem;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.15;
  letter-spacing: -2.64px;
  color: #566582;
  text-align: center;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 35px;

  @media (max-width: 767.98px) {
    font-size: 2.1875rem;
    font-weight: 500;
    text-align: left;
  }
`
