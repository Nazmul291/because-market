<script>
  import { getContext, createEventDispatcher, onMount } from "svelte"
  import { GLOBAL_CONTEXT } from "../sUI/AppProvider"
  import { updateCart, changeCart } from "./api"
  import {
    addToNextBox,
    checkoutCreate,
    getNextShipment,
  } from "../api/marketApi"
  import { cartCheckout, queryStringCheckout } from "./helpers"
  import CartUI from "./CartUI"
  import createStore from "./store"
  import { CHECKOUT_SMS_NOTIFICATION_ATTRIBUTES } from "../const"
  import mixpanel from "../integrations/mixpanel"

  export let cart
  export let products
  export let customer

  const MIXPANEL_ID_QUERY_PARAM = "userID"
  const dispatch = createEventDispatcher()
  const { getShopifyClient } = getContext(GLOBAL_CONTEXT)
  const shopifyClient = getShopifyClient()
  let nextShipment = null
  let hasVariantsQuery = false
  const store = createStore()

  store.productsById.set(products)

  function createCheckout(cart) {
    return shopifyClient.checkout.create(cartCheckout(cart))
  }

  const handleUpdateItem = ({ detail }) => {
    updateCart({
      updates: detail,
    }).then((res) => {
      cart = res
    })
  }

  const handleChangeItem = ({ detail }) => {
    changeCart(detail).then((res) => {
      cart = res
    })
  }

  const handleChangeVariant = ({ detail: { item, variant } }) => {
    const oldItem = cart.items.find(
      ({ variant_id }) => variant_id === variant.id
    )
    const quantity = (oldItem ? oldItem.quantity : 0) + item.quantity

    updateCart({
      updates: {
        [oldItem ? item.id : item.key]: 0,
        [variant.id]: quantity,
      },
    })
      .then((res) => {
        if (!item.properties || !Object.keys(item.properties).length) {
          return Promise.resolve(res)
        }

        const newItem = res.items.find(({ key: resKey }) =>
          cart.items.every(({ key }) => key !== resKey)
        )

        return changeCart({
          id: newItem ? newItem.key : item.key,
          properties: item.properties,
          quantity,
        })
      })
      .then((res) => {
        cart = res
      })
  }

  const handleCheckout = () => {
    const data = {
      email: customer?.email ?? "",
      shippingAddress: {
        country: "US",
        ...(!customer
          ? {}
          : {
              firstname:
                customer.default_address?.first_name ??
                customer.first_name ??
                "",
              lastname:
                customer.default_address?.last_name ?? customer.last_name ?? "",
              address: customer.default_address?.address1 ?? "",
              address2: customer.default_address?.address2 ?? "",
              city: customer.default_address?.city ?? "",
              state: customer.default_address?.province_code ?? "",
              zip: customer.default_address?.zip ?? "",
              country: customer.default_address?.country_code ?? "US",
              phone: customer.default_address?.phone ?? "",
            }),
      },
      items: cart.items.map(({ id, quantity, properties }) => {
        const subscription = properties?.subscription

        return {
          id: id,
          quantity,
          type: subscription?.key,
        }
      }),
      [CHECKOUT_SMS_NOTIFICATION_ATTRIBUTES]: true,
    }

    const firstWithUTM = cart.items.find((item) =>
      Boolean(item.properties?.utm)
    )

    if (firstWithUTM) {
      data.utmParams = Object.entries(firstWithUTM.properties.utm).map(
        ([key, value]) => `${key}=${value}`
      )
    }

    checkoutCreate(data).then((checkout) => dispatch("checkout", checkout))
  }

  const handleAddNextBox = () => {
    createCheckout(cart).then((checkout) =>
      addToNextBox(checkout?.id).then(() => dispatch("addToNextBox", checkout))
    )
  }

  onMount(() => {
    const params = new URLSearchParams(location.search)
    const checkoutObject = queryStringCheckout()
    const mpid = params.get(MIXPANEL_ID_QUERY_PARAM)?.trim()
    hasVariantsQuery = Boolean(checkoutObject)

    if (mpid) {
      mixpanel.identify(mpid)
    }

    if (!hasVariantsQuery) {
      return
    }

    shopifyClient.checkout.create(checkoutObject).then((checkout) => {
      history.replaceState("cart", document.title, location.pathname)
      dispatch("checkout", checkout)
    })
  })

  onMount(() => {
    if (!customer) {
      return
    }

    getNextShipment().then((data) => {
      nextShipment = data
    })
  })
</script>

{#if !hasVariantsQuery}
  <CartUI
    {cart}
    {store}
    {nextShipment}
    on:cancel
    on:checkout={handleCheckout}
    on:addNext={handleAddNextBox}
    on:updateItem={handleUpdateItem}
    on:changeItem={handleChangeItem}
    on:changeVariant={handleChangeVariant}
  />
{:else}
  <h2>loading...</h2>
{/if}
