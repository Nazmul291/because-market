import React from "react"
import InputSelect from "./"

export default {
  title: "rUI/InputSelect",
  component: InputSelect,
}

const Template = (args) => <InputSelect {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "InputSelect",
  options: [
    { value: 1, label: "one" },
    { value: 2, label: "two" },
  ],
}
