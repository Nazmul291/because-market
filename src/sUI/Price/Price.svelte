<script>
  export let amount = 0
  export let currency = "USD"
  export let priceV2 = null
  export let free = false // Show `Free` if amount === 0

  const CURRENCY_MAP = {
    USD: "$",
  }

  const fixPriceV2Amount = (amount = "") => {
    let strAmount = "string" === typeof amount ? amount : String(amount)

    const [i = "0", d = "00"] = strAmount.split(".")

    if (d.length === 2) {
      return `${i}.${d}`
    }

    return d.length < 2 ? `${i}.${d}0` : `${i}.${d[0]}${d[1]}`
  }

  let value = ""
  let showFree = free

  $: value = !priceV2
    ? (amount / 100).toFixed(2)
    : fixPriceV2Amount(priceV2.amount)
  $: showFree = free && Number(value) <= 0
  let currencyCode =
    priceV2 && priceV2.currencyCode ? priceV2.currencyCode : currency
  let symbol = CURRENCY_MAP[currencyCode]
</script>

{#if showFree}
  Free
{:else if symbol}
  {symbol}{value}
{:else}
  {value} {currencyCode}
{/if}
