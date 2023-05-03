<script>
  import { setContext } from "svelte"
  import { APP_CONTEXT } from "../const"
  import { Theme } from "../sUI"

  const FUNNEL_ID_QUERY = "funnelID"
  const BACK_URL_QUERY = "backUrl"

  import Header from "./containers/Header.svelte"
  import SubscriptionVariant from "./containers/SubscriptionVariant.svelte"
  import OptionSelectors from "./containers/OptionSelectors.svelte"
  import AddToCartButton from "./containers/AddToCartButton.svelte"
  import Benefits from "./containers/Benefits.svelte"
  import ProductViewCount from "./containers/ProductViewCount.svelte"

  export let store = null
  export let assetsUrls = {}

  const searchParams = new URLSearchParams(location.search)
  const funnelID = searchParams.get(FUNNEL_ID_QUERY)
  const backUrl = searchParams.get(BACK_URL_QUERY)

  const { product } = store

  setContext(APP_CONTEXT, {
    getStore: () => store,
    getAssetsUrls: () => assetsUrls,
  })
</script>

<Theme />
{#if !(funnelID || backUrl)}
  <Header />
  <SubscriptionVariant />
{/if}
<OptionSelectors />
<div class="s-view-count">
  <ProductViewCount productId={$product.id} />
</div>
<div class="s-add-btn-position">
  <div class="s-add-btn-wrapper">
    <AddToCartButton />
  </div>
</div>
<Benefits />

<style>
  .s-add-btn-position {
    width: 100%;
    margin: 24px 0;
    z-index: 999;
  }

  .s-view-count {
    display: none;
    margin-top: 16px;
  }

  @media screen and (max-width: 500px) {
    .s-view-count {
      display: block;
    }

    .s-add-btn-position {
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 0 60px 0;
      justify-content: center;
    }

    .s-add-btn-wrapper {
      width: 90%;
      margin: 0;
    }
  }
</style>
