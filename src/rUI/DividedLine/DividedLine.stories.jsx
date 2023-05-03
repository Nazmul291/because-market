/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React from "react"
import { styled } from "@linaria/react"
import DividedLine from "./"

export default {
  title: "rUI/DividedLine",
  component: DividedLine,
}

export const Default = (args) => <DividedLine {...args} />
Default.args = {
  head: "Head",
  tail: "tail",
}

export const LongText = (args) => <DividedLine {...args} />
LongText.args = {
  head: "Head Head Head Head",
  tail: "tail tail tail tail tail tail",
}

export const LongTextWithoutWhiteSpace = (args) => <DividedLine {...args} />
LongTextWithoutWhiteSpace.args = {
  head: "HeadHeadHeadHead",
  tail: "TailTailTailTailTailTail",
}

const StyleDividedLine = styled(DividedLine)`
  --color-divide: red;
`

export const ColorDivide = (args) => <StyleDividedLine {...args} />
ColorDivide.args = {
  head: "Head",
  tail: "tail",
}

export const Components = ({ head, tail, ...args }) => (
  <StyleDividedLine
    {...args}
    head={<div style={{ color: "green" }}>{head}</div>}
    tail={<div style={{ color: "blue" }}>{tail}</div>}
  />
)
Components.args = {
  head: "Head",
  tail: "tail",
}
