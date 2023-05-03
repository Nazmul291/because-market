import React from "react"
import { useControlledState } from "../../hooks"
import { noop } from "../../utils"
import AccountProductInputQuantity from "./"

export default {
  title: "rUI/AccountProductInputQuantity",
  component: AccountProductInputQuantity,
}

const Template = (args) => {
  const [value, setValue] = useControlledState(args.value, noop)
  return (
    <AccountProductInputQuantity {...args} value={value} onChange={setValue} />
  )
}

export const Default = Template.bind({})
Default.args = {
  label: "Label",
  value: 1,
}
