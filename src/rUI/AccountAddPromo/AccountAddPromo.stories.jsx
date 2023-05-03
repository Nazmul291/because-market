/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React from "react"
import { useAsyncState } from "../../hooks/useAsyncState"
import { asyncTimeout } from "../../utils/async"
import AccountAddPromo from "./"

export default {
  title: "rUI/AccountAddPromo",
  component: AccountAddPromo,
}

async function fakeUpdate(promo) {
  await asyncTimeout(2000)
  return [promo]
}

async function fakeError() {
  await asyncTimeout(2000)
  return Promise.reject("Error text")
}

const Template = ({ value, ...args }) => {
  const [{ data, loading, error }, reqUpdate] = useAsyncState(fakeUpdate)

  const state = { loading, error }
  const currentValue = data || value

  return (
    <AccountAddPromo
      {...args}
      {...state}
      value={currentValue}
      onSubmit={reqUpdate}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}

export const WithValue = Template.bind({})
WithValue.args = {
  value: ["Promo 1", "Promo 2"],
}

const ErrorTemplate = ({ value, ...args }) => {
  const [{ data, loading, error }, reqUpdate] = useAsyncState(fakeError)

  const state = { loading, error }
  const currentValue = data || value

  return (
    <AccountAddPromo
      {...args}
      {...state}
      value={currentValue}
      onSubmit={reqUpdate}
    />
  )
}

export const Error = ErrorTemplate.bind({})
Error.args = {}
