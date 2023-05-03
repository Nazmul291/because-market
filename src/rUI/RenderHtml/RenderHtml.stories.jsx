/* eslint-disable react/no-multi-comp */
import React from "react"
import { styled } from "@linaria/react"
import RenderHtml from "./"

export default {
  title: "rUI/RenderHtml",
  component: RenderHtml,
}

const Template = (args) => <RenderHtml {...args} />

export const Default = Template.bind({})
Default.args = {
  html: "<div style='color: green;'>hello</div>",
}

export const TagName = Template.bind({})
TagName.args = {
  html: "Because Men&#39;s Guards - 20",
  tagName: "h2",
}

export const Empty = Template.bind({})
Empty.args = {}

const StyledRender = styled(RenderHtml)`
  color: red;
`
export const Styled = () => <StyledRender html="Hello world" />
