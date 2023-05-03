import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

ShipmentStatsItem.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  children: PropTypes.node,
}

export function ShipmentStatsItem({ icon, title, value, children, ...props }) {
  return (
    <StyledStatsItem {...props}>
      {icon}
      <StyledStatsItemInfo>
        <StyledStatsItemTitle>{title}</StyledStatsItemTitle>
        <StyledStatsItemValue>
          {value}
          {children}
        </StyledStatsItemValue>
      </StyledStatsItemInfo>
    </StyledStatsItem>
  )
}

const StyledStatsItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;

  svg {
    height: 50px;
    fill: #566582;
  }
`

const StyledStatsItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`

const StyledStatsItemTitle = styled.h3`
  margin: 0;
  padding: 0;
  color: #9699a3;
  font-family: "Roboto";
  font-size: 15px;
  font-style: italic;
  font-weight: 500;
`

const StyledStatsItemValue = styled.div`
  margin: 0;
  padding: 0;
  color: #566582;
  font-family: "Graphik Semibold";
  font-size: 22px;
  font-weight: 600;
`
