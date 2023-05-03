import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useRecurly } from "@recurly/react-recurly"
import { noop } from "../../../utils"

const PAY_PAL_DEFAULT = { display: { displayName: "Becausemarke" } }

CheckoutPayPalForm.propTypes = {
  onPay: PropTypes.func,
  onPayError: PropTypes.func,
  onPayCancel: PropTypes.func,
}

function CheckoutPayPalForm({
  onPay = noop,
  onPayError = noop,
  onPayCancel = noop,
}) {
  const recurly = useRecurly()
  const payPal = recurly.PayPal(PAY_PAL_DEFAULT) // eslint-disable-line new-cap

  useEffect(() => {
    payPal.on("token", onPay)

    payPal.on("error", onPayError)

    payPal.on("cancel", onPayCancel)

    payPal.start()
  }, [payPal, onPay, onPayError, onPayCancel])

  return <div />
}

export default CheckoutPayPalForm
