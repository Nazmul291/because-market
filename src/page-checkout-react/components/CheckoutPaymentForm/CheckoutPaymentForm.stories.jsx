/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect } from "react"
import { PAYMENT_METHOD_CARD, PAYMENT_METHOD_PAYPAL } from "../../../const"
import CheckoutPaymentForm from "./"

export default {
  title: "Checkout/components/CheckoutPaymentForm",
  component: CheckoutPaymentForm,
}

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = document.createElement("script")
    el.onload = () => {
      setLoaded(true)
    }
    el.src = "https://js.recurly.com/v4/recurly.js"

    document.body.appendChild(el)

    return () => {
      document.body.removeChild(el)
    }
  }, [])

  if (!loaded) {
    return <div>Loading</div>
  }

  return <>{children}</>
}

export const Card = () => (
  <Layout>
    <CheckoutPaymentForm
      method={PAYMENT_METHOD_CARD}
      paymentMethodState={{
        data: [PAYMENT_METHOD_CARD, PAYMENT_METHOD_PAYPAL],
      }}
      recurlyKeyId="asdasd"
    />
  </Layout>
)

export const Trial = () => (
  <Layout>
    <CheckoutPaymentForm
      method={PAYMENT_METHOD_CARD}
      paymentMethodState={{
        data: [PAYMENT_METHOD_CARD, PAYMENT_METHOD_PAYPAL],
      }}
      isTrial={true}
      totalPrice={{ amount: 20 }}
      recurlyKeyId="asdasd"
    />
  </Layout>
)
