import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"

const target = document.querySelector("#s-page-account")

if (target) {
  const root = createRoot(target)

  document
    .querySelectorAll(".react-remove")
    .forEach((element) => element.remove())

  root.render(<App />)
}
