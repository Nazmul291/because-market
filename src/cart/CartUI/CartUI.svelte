<script>
  import CartItems from "./CartItems.svelte"
  import CartCheckout from "./CartCheckout.svelte"

  export let cart
  export let store
  export let removedItems
  export let nextShipment

  const calcShowDisclaimer = (c) =>
    c?.items.some((item) => Boolean(item.properties?.subscription))

  $: showDisclaimer = calcShowDisclaimer(cart)
  $: addToNextBox = nextShipment?.items?.length > 0
</script>

<div class="cart-page-redesigned-wrapper">
  <div class="wrapper page-margin cart-page">
    <div class="cart cartForm">
      <h2 class="cart__title hidden-small">Review your cart</h2>
      <div class="cart-content-wrapper">
        <div class="cart-items-wrapper">
          <CartItems
            {cart}
            {showDisclaimer}
            {store}
            {removedItems}
            {addToNextBox}
            on:remove
            on:change
            on:changeVariant
            on:checkout
            on:addNext
          />
        </div>
        <div class="cart-checkout-wrapper">
          <CartCheckout
            {cart}
            {showDisclaimer}
            {nextShipment}
            {addToNextBox}
            on:checkout
            on:addNext
            on:cancel
          />
        </div>
      </div>
    </div>
  </div>
</div>
