import React from "react"
import { noop } from "../../utils"
import AccountAccordion from "./AccountAccordion"

export default {
  title: "rUI/AccountAccordion",
  component: AccountAccordion,
}

const Template = (args) => (
  <AccountAccordion {...args}>Content</AccountAccordion>
)

export const LongTitle = Template.bind({})
LongTitle.args = {
  title:
    "Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title",
  onChange: noop,
}

export const Controlled = Template.bind({})
Controlled.args = {
  title: "Title",
  opened: true,
}
