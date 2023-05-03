import React from "react"
import RenderNode from "./index"

export default {
  title: "rUI/RenderNode",
  component: RenderNode,
}

export const empty = () => <RenderNode />

export const nodeAsNode = () => <RenderNode node={<div>children</div>} />

export const nodeAsFunction = () => (
  <RenderNode node={({ value }) => <div>children {value}</div>} value="123" />
)

// eslint-disable-next-line react/prop-types
const Component = ({ value, ...props }) => (
  <div {...props}>as components value: {value}</div>
)
export const nodeAsComponent = () => <RenderNode node={Component} value="123" />
