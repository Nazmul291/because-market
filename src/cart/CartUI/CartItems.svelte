<script>
  import { createEventDispatcher } from "svelte"
  import { compareString } from "../../utils"
  import CartItem from "./CartItem.svelte"
  import CartRemoveItem from "./CartRemoveItem.svelte"

  export let cart
  export let showDisclaimer = false
  export let store
  export let removedItems = []
  export let addToNextBox = false

  const { productsById } = store
  const dispatch = createEventDispatcher()

  const handleCheckoutClick = () => dispatch("checkout")
  const handleAddNextBoxClick = () => dispatch("addNext")

  $: items = cart?.items
    .map((item, index) => ({ ...item, line: index + 1 }))
    .sort((i1, i2) => compareString(i1.handle, i2.handle))
</script>

<table class="stack cart-items">
  <tbody>
    {#each removedItems as item (item.key)}
      <tr>
        <td colspan="4"><CartRemoveItem {item} /></td>
      </tr>
    {/each}
    {#each items as item (item.key)}
      <tr class="cart__row">
        <td class="cart_row_table_cell">
          <CartItem
            {item}
            productStore={$productsById[item.product_id]}
            on:remove
            on:change
            on:changeVariant
          />
        </td>
      </tr>
    {/each}
  </tbody>
  <div>
    <div class="mobile-checkout-button-slot" style="">
      {#if addToNextBox}
        <input
          type="button"
          name="checkout"
          class="primary start btn btn--large checkout__button"
          value="Add to Next Box"
          on:click={handleAddNextBoxClick}
        />
      {:else}
        {#if showDisclaimer}
          <span class="disclaimer">
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

        <input
          type="button"
          name="checkout"
          class="primary start btn btn--large checkout__button"
          value="Check Out"
          on:click={handleCheckoutClick}
        />
      {/if}
    </div>
  </div>
</table>
