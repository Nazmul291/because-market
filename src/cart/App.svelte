<script>
  import { ADD_TO_NEXT_CHECKOUT_ID_QUERY, CHECKOUT_ID_QUERY } from "../const"
  import { AppProvider } from "../sUI"
  import { encodeId } from "../utils"
  import { cartClear } from "../api/shopifyApi"
  import Cart from "./Cart.svelte"

  export let cart = null
  export let products = null
  export let settings = {}
  export let t = {}
  export let customer = null

  const handleCheckout = ({ detail }) => {
    const checkoutId = detail.id
    const qParams = new URLSearchParams({
      [CHECKOUT_ID_QUERY]: checkoutId,
    })

    location.href = `/pages/checkout?${qParams.toString()}`
  }

  const handleAddToNextBox = ({ detail: checkout }) => {
    cartClear().then(() => {
      const checkoutId = encodeId(checkout.id)
      const qParams = new URLSearchParams({
        [ADD_TO_NEXT_CHECKOUT_ID_QUERY]: checkoutId,
      })

      location.href = `/account?${qParams.toString()}`
    })
  }

  const handleCancel = () => {
    location.href = "/"
  }
</script>

<AppProvider
  {settings}
  domain={process.env.STORE_DOMAIN}
  storefrontAccessToken={process.env.STOREFRONT_TOKEN}
  recurlyKeyId={process.env.RECURLY_KEY}
  apiURL={process.env.PERCHE_API_URL}
  {t}
>
  <Cart
    {products}
    {customer}
    bind:cart
    on:checkout={handleCheckout}
    on:addToNextBox={handleAddToNextBox}
    on:cancel={handleCancel}
  />
</AppProvider>

<style>
  :global(body.template-cart) {
    background-color: rgb(252, 252, 244);
  }
</style>
