/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React, { useCallback, useState } from "react"
import { useAsyncState } from "../../hooks"
import { asyncTimeout } from "../../utils/async"
import Input from "./"

export default {
  title: "rUI/Input",
  component: Input,
}

const Template = ({ value = "", ...args }) => {
  const [currentValue, setValue] = useState(value)

  const handleChange = useCallback(({ target: { value } }) => {
    setValue(value)
  }, [])

  return (
    <>
      <Input value={currentValue} onChange={handleChange} />
      <Input {...args} value={currentValue} onChange={handleChange} />
    </>
  )
}

export const Uncontrolled = () => <Input />

export const Controlled = Template.bind({})
Controlled.args = {
  value: "",
}

export const WithAsyncUpdate = () => {
  const [{ data: value }, setValue] = useAsyncState(async (value) => {
    await asyncTimeout(100)
    return value
  })

  const handleChange = useCallback(
    ({ target: { value } }) => {
      setValue(value)
    },
    [setValue]
  )

  return <Input value={value ?? ""} onChange={handleChange} />
}
