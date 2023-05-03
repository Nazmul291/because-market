import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"

const target = document.querySelector("#s-page-email")

if (target) {
  const root = createRoot(target)
  root.render(<App />)
}
