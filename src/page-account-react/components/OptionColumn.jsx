import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

OptionColumn.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export function OptionColumn({ title, value, ...props }) {
  return (
    <StyledOption {...props}>
      <StyledOptionTitle>{title}</StyledOptionTitle>
      <StyledOptionValue>{value}</StyledOptionValue>
    </StyledOption>
  )
}

const StyledOption = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
`

const StyledOptionTitle = styled.h4`
  margin: 0;
  padding: 0;
  font-family: "Graphik Regular";
  font-size: 15px;
  color: #9699a3;
`

const StyledOptionValue = styled.strong`
  color: #65738e;
  font-family: "Graphik Semibold", sans-serif;
  font-weight: normal;
`
