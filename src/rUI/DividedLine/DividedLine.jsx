import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import RenderNode from "../RenderNode"

DividedLine.propTypes = {
  head: PropTypes.node,
  isMonthly: PropTypes.bool,
  tail: PropTypes.node,
}

function DividedLine({ head, tail, isMonthly, ...props }) {
  return !isMonthly ? (
    <StyledEndRoot {...props}>
      <RenderNode node={head} />
      <Divide />
      <RenderNode node={tail} />
    </StyledEndRoot>
  ) : (
    <StyledRoot {...props}>
      <RenderNode node={head} />
      <Divide />
      <RenderNode node={tail} />
    </StyledRoot>
  )
}
const StyledEndRoot = styled.div`
  --color-divide: currentColor;
  display: flex;
  justify-content: space-between;
  align-items: flex-end !important;
  overflow-wrap: word-wrap;
  margin-bottom: 18px;
  width: 100%;
`
const StyledRoot = styled.div`
  --color-divide: currentColor;
  display: flex;
  align-items: flex-start !important;
  justify-content: space-between;
  overflow-wrap: word-wrap;
  margin-bottom: 18px;
  width: 100%;
`

const Divide = styled.div`
  border-bottom: 1px dotted var(--color-divide);
  flex: 1;
  min-width: 10px;
  margin: 0 10px;
`

export default DividedLine
