import React from "react"
import PropTypes from "prop-types"

const CURRENCY_CODE_DEFAULT = "USD"

const CURRENCY_MAP = {
  [CURRENCY_CODE_DEFAULT]: "$",
}

const fixPriceV2Amount = (amount = "") => {
  let strAmount = "string" === typeof amount ? amount : `${amount}`

  const [i = "0", d = "00"] = strAmount.split(".")

  if (d.length === 2) {
    return `${i}.${d}`
  }

  return d.length < 2 ? `${i}.${d}0` : `${i}.${d[0]}${d[1]}`
}

Price.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  amountV2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  currency: PropTypes.oneOf([CURRENCY_CODE_DEFAULT]),
  priceV2: PropTypes.object,
  free: PropTypes.bool,
  freeText: PropTypes.string,
}

function Price({
  amount = 0,
  amountV2 = 0,
  currency = CURRENCY_CODE_DEFAULT,
  priceV2,
  free = false,
  freeText = "Free",
  ...props
}) {
  const value = amountV2
    ? fixPriceV2Amount(amountV2)
    : !priceV2
    ? (amount / 100).toFixed(2)
    : fixPriceV2Amount(priceV2.amount)

  const isShowFree = free && Number(value) === 0

  if (isShowFree) {
    return (
      <span {...props} data-is-free="true">
        {freeText}
      </span>
    )
  }

  const currencyCode =
    priceV2 && priceV2.currencyCode ? priceV2.currencyCode : currency
  const currencySymbol = CURRENCY_MAP[currencyCode]

  if (currencySymbol) {
    const isNegative = value[0] === "-"
    const strValue = !isNegative ? value : value.substring(1)

    return (
      <span {...props}>
        {isNegative ? "-" : ""}
        {currencySymbol}
        {strValue}
      </span>
    )
  }

  return (
    <span {...props}>
      {value} {currencyCode}
    </span>
  )
}

export default Price
