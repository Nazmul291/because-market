/* eslint-disable react/button-has-type */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React, { useCallback, useState } from "react"
import { noop } from "../../../../../utils"
import ProductSwitcher from "./"

export default {
  title: "Product-Funnel/components/ProductSwitcher",
  component: ProductSwitcher,
}

const options = [
  { label: "Maximum", value: 111 },
  { label: "Overnight", value: 222 },
]

export const Default = (args) => <ProductSwitcher {...args} />
Default.args = {
  label: "Absorbency",
  value: options[0].value,
  options: options,
  onChange: noop,
}

export const Controlled = ({ options, value, onChange, ...args }) => {
  const [current, setValue] = useState(value)

  const handleChange = useCallback(
    (val) => {
      setValue(val)
      onChange(val)
    },
    [onChange]
  )

  const handleSwitchNext = useCallback(() => {
    const currentIndex = options.findIndex(({ value }) => current === value)
    const nextIndex = currentIndex + 1

    setValue(options[nextIndex >= options.length ? 0 : nextIndex].value)
  }, [current, options])

  return (
    <div>
      <button onClick={handleSwitchNext}>Switch</button>
      <ProductSwitcher
        {...args}
        options={options}
        value={current}
        onChange={handleChange}
      />
    </div>
  )
}
Controlled.args = {
  label: "Absorbency",
  value: options[0].value,
  options: options,
}
