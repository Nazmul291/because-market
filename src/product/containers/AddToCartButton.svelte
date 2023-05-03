<script>
  import { getContext, onMount } from "svelte"
  import Portal from "svelte-portal"
  import SubscriptionModal from "./SubscriptionModal.svelte"
  import CurrentPrice from "./CurrentPrice.svelte"
  import { APP_CONTEXT, PRODUCT_TAG_PRICE_FROM } from "../../const"
  import { getUTMParams } from "../../integrations/utm"
  import { addToCart } from "../api"
  import ProductViewCount from "./ProductViewCount.svelte"
  import { hasTag } from "../../utils"

  const BACK_URL_QUERY = "backUrl"
  const FUNNEL_ID_QUERY = "funnelID"
  const USER_ID_QUERY = "userID"

  const { product, currentVariant, quantity } =
    getContext(APP_CONTEXT).getStore()
  const { maxSubscription, hasSubscription } = product
  const { subscription, subscriptionDiscount } = currentVariant

  let disabled = true
  let loading = false
  let showModal = false
  let funnelId = null
  let backUrl = null
  let userId = null

  $: disabled = loading || !$currentVariant || !$currentVariant.available
  $: showFromPrice = hasTag($product.tags, PRODUCT_TAG_PRICE_FROM)

  onMount(() => {
    const urlParams = new URLSearchParams(location.search)
    funnelId = urlParams.get(FUNNEL_ID_QUERY)
    backUrl = urlParams.get(BACK_URL_QUERY)
    userId = urlParams.get(USER_ID_QUERY)
  })

  const handleAddCart = () => {
    if (disabled) {
      return
    }

    loading = true

    const finnalPromise = !$subscription
      ? addToCart($currentVariant.id, $quantity, { utm: getUTMParams() })
      : addToCart($currentVariant.id, $quantity, {
          subscription: { key: $subscription, discount: $subscriptionDiscount },
          utm: getUTMParams(),
        })

    finnalPromise
      .then(() => (document.location = "/cart"))
      .catch((error) => {
        console.error("Error:", error)
        loading = false
      })
  }

  const handleAddToCartClick = () => {
    if (!$hasSubscription || $subscription) {
      return handleAddCart()
    }

    showModal = true
  }

  const handleModalSubscripbe = () => {
    showModal = false
    currentVariant.subscription.set($maxSubscription.key)
    handleAddCart()
  }

  const handleModalCancel = () => {
    showModal = false
    handleAddCart()
  }

  const handleFreeTrialClick = () => {
    const search = new URLSearchParams({
      [FUNNEL_ID_QUERY]: funnelId,
      [USER_ID_QUERY]: userId,
      productID: $product.id,
      variantID: $currentVariant.id,
    }).toString()

    location.href = `${backUrl}?${search}`
  }
</script>

{#if backUrl}
  <button class="s-button" on:click={handleFreeTrialClick} {disabled}
    >Get your FREE Starter Pack</button
  >
{:else if showFromPrice}
  <button class=" s-button" on:click={handleAddToCartClick} {disabled}
    ><CurrentPrice /> | Add To Cart</button
  >
{:else}
  <button class=" s-button" on:click={handleAddToCartClick} {disabled}
    >Add To Cart</button
  >
{/if}
<div class="s-view-count">
  <ProductViewCount productId={$product.id} />
</div>
<div class="d-flex justify-content-center">
  <a href={"#"} class="secure">
    <i class="fa fa-lock" aria-hidden="true" />Secure Transaction</a
  >
</div>

{#if showModal}
  <Portal target="body">
    <SubscriptionModal
      on:subscribe={handleModalSubscripbe}
      on:cancel={handleModalCancel}
    />
  </Portal>
{/if}

<style>
  .s-button {
    width: 100%;
    background: #52e8e1;
    border-radius: 30px;
    font-size: 18px;
    color: #333;
    font-weight: 500;
    padding-top: 15px;
    padding-bottom: 15px;
    box-shadow: 3px 5px;
    border: none;
  }

  .s-button:disabled {
    background: #ccc;
  }

  .s-view-count {
    margin-top: 16px;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.2;
  }

  @media screen and (max-width: 500px) {
    .s-view-count {
      display: none;
    }
  }
</style>
