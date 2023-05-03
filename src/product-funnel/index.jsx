/* global currentProduct */
import React from "react"
import { createRoot } from "react-dom/client"
import ProductFunnel from "./ProductFunnel.jsx"

const target = document.querySelector("#r-product-funnel-react")

if (target) {
  const root = createRoot(target)
  root.render(<ProductFunnel currentProduct={currentProduct} />)
}
