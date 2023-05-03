<script>
  import { getContext } from "svelte"
  import { APP_CONTEXT, PRODUCT_TAG_PRICE_FROM } from "../../const"
  import { Price } from "../../sUI"
  import { hasTag } from "../../utils"

  const { getStore } = getContext(APP_CONTEXT)
  const {
    currentVariant: { finalPrice, finalPricePerPiece },
    product,
  } = getStore()
  const { perPiecePrice } = product

  $: showFromPrice = hasTag($product.tags, PRODUCT_TAG_PRICE_FROM)
</script>

{#if $perPiecePrice}
  {showFromPrice ? "From " : ""}<Price
    amount={$finalPricePerPiece}
    free
  />/piece
{:else}
  {showFromPrice ? "From " : "Price "}<Price amount={$finalPrice} free />
{/if}
