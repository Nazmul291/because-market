/* eslint-disable react/no-multi-comp */
import React from "react"
import { styled } from "@linaria/react"
import { useControlledState } from "../../hooks"
import { noop } from "../../utils"
import InputQuantity from "./"

export default {
  title: "rUI/InputQuantity",
  component: InputQuantity,
}

const Template = (args) => {
  const [value, setValue] = useControlledState(args.value, noop)
  return <InputQuantity {...args} value={value} onChange={setValue} />
}

export const Default = Template.bind({})
Default.args = {
  value: 1,
}

export const WithError = Template.bind({})
WithError.args = {
  value: 1,
  error: "Error",
}

const StyledInputQuantity = styled(InputQuantity)`
  --color-border--default: yellow;
  --color-border--focus: pink;
  --color-border--error: blue;
  --color-error: gray;
  --input-body--height: 60px;
`
export const Styled = () => <StyledInputQuantity value={1} />

export const StyledAction = Template.bind({})
StyledAction.args = {
  value: 1,
  actionMinusComponent: ({ disabled }) => (
    <div style={{ color: disabled ? "gray" : "red" }}>minus</div>
  ),
  actionPlusComponent: <div style={{ color: "green" }}>plus</div>,
}
