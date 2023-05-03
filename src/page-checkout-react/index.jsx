import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { CHECKOUT_ID_QUERY, MIXPANEL_ID_QUERY } from "../const"
import ErrorBoundary from "../rUI/ErrorBoundary"

const target = document.querySelector("#r-checkout")

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
