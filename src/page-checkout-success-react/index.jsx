import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { CHECKOUT_ID_QUERY, MIXPANEL_ID_QUERY } from "../const.js"
import { ErrorBoundary } from "../rUI/index.jsx"

const target = document.querySelector("#r-checkout-success")

if (target) {
  const qParams = new URLSearchParams(location.search)
  const mpid = qParams.get(MIXPANEL_ID_QUERY)
  const checkoutId = qParams.get(CHECKOUT_ID_QUERY)

  const root = createRoot(target)

  root.render(
    <ErrorBoundary>
      <App checkoutId={checkoutId} mpid={mpid} />
    </ErrorBoundary>
  )
}
