import { saveJsonParse } from "../utils"
import App from "./App.svelte"

const el = document.querySelector("#new-cart")

if (el) {
  const cart = saveJsonParse(el.dataset.cart)
  const products = saveJsonParse(el.dataset.products)
  const settings = saveJsonParse(el.dataset.settings)
  const t = saveJsonParse(el.dataset.t)
  const customer = saveJsonParse(el.dataset.customer)

  new App({
    target: document.getElementById("new-cart"),
    props: {
      cart,
      products,
      settings,
      t,
      customer,
    },
  })
}
