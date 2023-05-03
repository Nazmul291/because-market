import { writable } from "svelte/store"
import createProduct from "./product"
import createCurrentVariant from "./currentVariant"
import createDiscount from "./discount"

export default function createStore() {
  const quantity = writable(1)
  const product = createProduct()
  const currentVariant = createCurrentVariant({ product, quantity })
  const discount = createDiscount({ product, currentVariant })

  return {
    quantity,
    product,
    currentVariant,
    discount,
  }
}
