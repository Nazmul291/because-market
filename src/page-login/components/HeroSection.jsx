import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

HeroSection.propTypes = {
  children: PropTypes.node,
}

export function HeroSection({ children, ...props }) {
  return <StyledSection {...props}>{children}</StyledSection>
}

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background-color: #fcf7f4;
    padding-top: 104px;
    padding-bottom: 61px;
    margin: 0;
    min-width: 100%;
}`
