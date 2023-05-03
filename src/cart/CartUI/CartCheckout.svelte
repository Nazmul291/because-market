<script>
  import { createEventDispatcher } from "svelte"
  import { FREE_SHIPPING_AMOUNT } from "../../const"
  import { Price } from "../../sUI"

  export let cart
  export let freeShippingAmount = FREE_SHIPPING_AMOUNT
  export let showDisclaimer = false
  export let nextShipment
  export let addToNextBox = false

  const dispatch = createEventDispatcher()

  const hasSubscription = (c) =>
    c?.items.some((item) => Boolean(item.properties?.subscription))

  const calcPrice = (c, isSub) =>
    !isSub
      ? c.items_subtotal_price
      : c?.items.reduce((sum, item) => {
          const isSubscription = Boolean(item.properties?.subscription)
          const add = !isSubscription
            ? item.final_line_price
            : item.final_line_price *
              (1 - item.properties.subscription.discount / 100)

          return sum + add
        }, 0)

  const calcShippingPrice = (total, freeShippingPrice, nextShipment) => {
    const nextShipmentPrice = nextShipment
      ? nextShipment.items?.reduce(
          (acc, { price, quantity }) => acc + price * quantity,
          0
        ) * 100
      : 0

    return Math.max(0, freeShippingPrice - total - nextShipmentPrice)
  }

  const calcItemsCount = (c) => c.item_count

  let itemsCount = calcItemsCount(cart)
  let isHasSubscription = hasSubscription(cart)
  let subtotalPrice = calcPrice(cart, isHasSubscription)
  let shippingPrice = calcShippingPrice(
    subtotalPrice,
    freeShippingAmount,
    nextShipment
  )

  $: itemsCount = calcItemsCount(cart)
  $: isHasSubscription = hasSubscription(cart)
  $: subtotalPrice = calcPrice(cart, isHasSubscription)
  $: shippingPrice = calcShippingPrice(
    subtotalPrice,
    freeShippingAmount,
    nextShipment
  )

  const handleCheckoutClick = () => dispatch("checkout")
  const handleCancelClick = () => dispatch("cancel")
  const handleAddNextBoxClick = () => dispatch("addNext")
</script>

<div class="cart-checkout">
  <div class="grid">
    <div class="grid__item">
      {#if shippingPrice}
        <div class="cart-shipping-info">
          <span class="cart-shipping-info__icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 15V9H11V15H9ZM9 5V7H11V5H9Z"
                fill="#FF6666"
              />
            </svg>
          </span>
          <span
            >Add <Price amount={shippingPrice} /> of items to your order to qualify
            for FREE Shipping.</span
          >
        </div>
      {:else}
        <div class="cart-shipping-info">
          <span class="cart-shipping-info__icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                fill="#0AE5DA"
              />
              <path
                d="M10 16.9981L5 11.9981L6.41 10.5881L10 14.1681L17.59 6.57812L19 7.99812L10 16.9981Z"
                fill="#333333"
              />
            </svg>
          </span>
          <span>You’ve qualified for FREE Shipping!</span>
        </div>
      {/if}
      <hr />
      <p class="cart__footer__text">
        <span class="cart__subtotal__title">Subtotal</span>
        <span class="cart__subtotal money"
          ><Price amount={subtotalPrice} /></span
        >
      </p>
      <div class="cart__buttons-and-disclaimer">
        <span class="cart__buttons_container">
          {#if addToNextBox}
            <input
              type="button"
              name="checkout"
              class="primary start btn btn--large checkout__button"
              value="Add to Next Box"
              disabled={!itemsCount}
              on:click={handleAddNextBoxClick}
            />
          {:else}
            <input
              type="button"
              name="checkout"
              class="primary start btn btn--large checkout__button"
              value="Check Out"
              disabled={!itemsCount}
              on:click={handleCheckoutClick}
            />
          {/if}
        </span>
        <h4 class="cart__buttons_container--divider">Or</h4>
        <span class="cart__buttons_container cancel-btn">
          <input
            type="button"
            name="checkout"
            class="primary start btn btn--large checkout__button checkout__button--cancel"
            value="Keep Shopping"
            on:click={handleCancelClick}
          />
        </span>
        {#if showDisclaimer}
          <span class="disclaimer hide-mobile">
            <p>
              By placing your order, you agree to Because's <a
                target="_blank"
                href="/pages/privacy">privacy notice</a
              >
              and
              <a target="_blank" href="/pages/terms-and-conditions"
                >terms and conditions.</a
              >
            </p>
            <p>
              You also agree to the subscription and authorize us to charge your
              default payment method or another payment method on file. Your
              subscription continues until canceled. You can cancel at any time
              via the Member Portal under your account.
            </p>
          </span>
        {/if}
      </div>
    </div>
  </div>
</div>
