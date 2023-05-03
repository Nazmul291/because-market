import { writable } from "svelte/store"
import createProduct from "../../product/store/product"

export default () => {
  const byId = writable({})

  const set = (products = {}) => {
    const map = Object.entries(products).reduce((acc, [id, product]) => {
      const productStore = createProduct()
      productStore.set(product)
      acc[id] = productStore
      return acc
    }, {})

    byId.set(map)
  }

  return {
    ...byId,
    set,
  }
}
