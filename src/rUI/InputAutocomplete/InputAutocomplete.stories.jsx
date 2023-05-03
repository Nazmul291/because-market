/* eslint-disable react/prop-types */
import React, { useState } from "react"
import InputAutocomplete from "./"

export default {
  title: "rUI/InputAutocomplete",
  component: InputAutocomplete,
}

const Template = ({ value, autocompleteList, ...args }) => {
  const [currentValue, setCurrentValue] = useState(value)
  const [list, setList] = useState(autocompleteList)

  const handleClickItem = (item) => {
    setCurrentValue(item.label)
    setList(null)
  }

  const handleChange = ({ target: { value } }) => {
    setCurrentValue(value)
  }

  return (
    <InputAutocomplete
      {...args}
      autocompleteList={list}
      value={currentValue}
      onChange={handleChange}
      onClickItem={handleClickItem}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  label: "InputAutocomplete",
  autocompleteList: [
    { key: 1, label: "one" },
    { key: 2, label: "two" },
  ],
}
