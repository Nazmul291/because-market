import React from "react"
import { styled } from "@linaria/react"
import InputLayout from "./"
import { ERROR_VARIANT_TOOLTIP } from "./InputLayout"

export default {
  title: "rUI/InputLayout",
  component: InputLayout,
}

const StyledInput = styled.input`
  border: none;
  width: 100%;
  margin: 0;

  &:focus {
    outline: none;
  }
`

const Template = (args) => (
  <>
    <InputLayout {...args}>{(props) => <StyledInput {...props} />}</InputLayout>
    <div>under input content</div>
  </>
)

export const Default = Template.bind({})
Default.args = {
  error: "",
}

export const Error = Template.bind({})
Error.args = {
  error: "Error text",
}

export const ErrorTooltip = Template.bind({})
ErrorTooltip.args = {
  error: "Error text",
  withoutError: true,
  errorVariant: ERROR_VARIANT_TOOLTIP,
}
