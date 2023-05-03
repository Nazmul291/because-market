<script>
  import { setContext } from "svelte"
  import Client from "shopify-buy"
  import { GLOBAL_CONTEXT } from "./const"

  export let settings = {}
  export let domain = process.env.STORE_DOMAIN
  export let storefrontAccessToken = process.env.STOREFRONT_TOKEN
  export let apiURL = process.env.PERCHE_API_URL
  export let t = {}

  const shopifyClient = Client.buildClient({
    domain,
    storefrontAccessToken,
  })

  setContext(GLOBAL_CONTEXT, {
    getT: () => t,
    getSettings: () => settings,
    getCurrency: () => "USD",
    getDomain: () => domain,
    getApiUrl: () => apiURL,
    getStorefrontAcessToken: () => storefrontAccessToken,
    getShopifyClient: () => shopifyClient,
  })
</script>

<slot />
