<script>
  import { getContext } from "svelte"
  import CurrentPrice from "./CurrentPrice.svelte"
  import { APP_CONTEXT, PRODUCT_TAG_SHOW_PRICE_PIECE } from "../../const"
  import { hasTag } from "../../utils"

  const { getStore } = getContext(APP_CONTEXT)
  const { product } = getStore()

  $: showPricePiece = hasTag($product.tags, PRODUCT_TAG_SHOW_PRICE_PIECE)
</script>

{#if showPricePiece}
  <h2 class="current_price">
    <CurrentPrice />
  </h2>
{/if}
