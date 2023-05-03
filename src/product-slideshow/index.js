import { saveJsonParse } from "../utils"
import App from "./App.svelte"

const el = document.querySelector("#s-product-slideshow")

if (el) {
  new App({
    target: el,
    props: {
      media: saveJsonParse(el.dataset.media),
      badge: el.dataset.badge,
      sticky: true,
    },
  })
}
