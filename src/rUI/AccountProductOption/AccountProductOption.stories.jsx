import React from "react"
import { useControlledState } from "../../hooks"
import { noop } from "../../utils"
import AccountProductOption from "./"

export default {
  title: "rUI/AccountProductOption",
  component: AccountProductOption,
}

const Template = (args) => {
  const [value, setValue] = useControlledState(args.value, noop)
  return (
    <AccountProductOption
      {...args}
      value={value}
      funnelView={false}
      onChange={setValue}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  label: "Label",
  option: {
    id: "someID",
    name: "Option Name",
    values: ["one", "tho", "three"],
  },
  disabled: false,
  value: "one",
}
