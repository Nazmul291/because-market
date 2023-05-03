<script>
  import { createEventDispatcher, getContext } from "svelte"
  import { GLOBAL_CONTEXT } from "../../sUI/AppProvider"
  import CartUI from "./CartUI.svelte"
  import CartRemoveModal from "./CartRemoveModal.svelte"

  export let cart
  export let store
  export let nextShipment

  const dispatch = createEventDispatcher()
  const { getT } = getContext(GLOBAL_CONTEXT)
  const T = getT()

  let isEmpty = true
  let removedDetail = null
  let removedItems = []

  $: isEmpty = cart.items <= 0 && removedItems <= 0

  const handleRemoveItem = ({ detail }) => {
    removedDetail = detail
  }

  const handleModalCancel = () => {
    removedDetail = null
  }

  const handleModaleConfirm = () => {
    dispatch("updateItem", {
      [removedDetail.id]: 0,
    })
    removedItems = [...removedItems, removedDetail]
    removedDetail = null
  }

  const handleChangeItem = ({ detail }) => dispatch("changeItem", detail)
</script>

{#if isEmpty}
  <div class="cart__empty wrapper page-margin text-center">
    <div class="supports-cookies">
      <h2 class="h2 cart__title">{T["cart.general.title"]}</h2>
      <p>{T["cart.general.empty"]}</p>
      <a href="/" class="btn btn--large"
        >{T["cart.general.continue_browsing_html"]}</a
      >
    </div>
    <div class="supports-no-cookies">
      <p>{T["cart.general.cookies_required"]}</p>
    </div>
  </div>
{:else}
  <CartUI
    {cart}
    {store}
    {removedItems}
    {nextShipment}
    on:remove={handleRemoveItem}
    on:change={handleChangeItem}
    on:changeVariant
    on:checkout
    on:addNext
    on:cancel
  />
{/if}

{#if removedDetail}
  <CartRemoveModal
    on:cancel={handleModalCancel}
    on:confirm={handleModaleConfirm}
  />
{/if}
