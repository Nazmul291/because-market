/* global currentProduct */

import { get } from "svelte/store"
import createStore from "./store"
import App from "./App.svelte"
import { getDefaultOptionsFromTags } from "../utils"

const target = document.getElementById("new-product-variant")

if (target) {
  const store = createStore()
  const params = new URLSearchParams(location.search)
  const variantId = parseInt(params.get("variant"), 10)
  const variants = currentProduct?.variants || []
  const currentVariant = variants.find(({ id }) => id === variantId)

  store.product.set(currentProduct)

  if (currentVariant) {
    store.currentVariant.set(currentVariant)
  } else {
    store.currentVariant.setByOptions(
      getDefaultOptionsFromTags(currentProduct?.tags)
    )
  }

  if (get(store.product.hasSubscription)) {
    const productMaxSubscriptions = get(store.product.maxSubscription)
    store.currentVariant.subscription.set(productMaxSubscriptions.key)
  }

  new App({
    target,
    props: {
      store,
      assetsUrls: window.assetsUrls,
    },
  })
}
