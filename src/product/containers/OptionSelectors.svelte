<script>
  import { getContext } from "svelte"
  import { APP_CONTEXT, PRODUCT_PACK_SIZE_OPTION } from "../../const"
  import { Select, InputQuantity } from "../../sUI"

  const { getStore } = getContext(APP_CONTEXT)
  const { product, currentVariant, quantity } = getStore()
  const {
    groupedOption,
    subscription,
    availableOptionArr,
    hasOneQuantityValue,
  } = currentVariant
  const { sortedSubscriptions } = product

  let subscriptionOptions = []

  $: subscriptionOptions = $sortedSubscriptions.map(({ key }) => key)

  const handleQuantityChange = ({ detail }) => {
    quantity.set(detail)
  }

  const handleOptionSelected = ({ name, value }) => {
    if ($hasOneQuantityValue) {
      quantity.set(1)
    }

    currentVariant.changeByOption(name, value)
  }

  const handleSubscriptionSelect = ({ target: { value } }) => {
    subscription.set(value)
  }
</script>

<div class="s_root">
  {#if $hasOneQuantityValue}
    <InputQuantity value={$quantity} on:change={handleQuantityChange}>
      <label let:id={inputId} slot="label" for={inputId} class="s_label"
        >Select Pack Quantity</label
      >
      <div slot="text" let:value>
        {value} pack{value > 1 ? "s" : ""} ({$groupedOption[
          PRODUCT_PACK_SIZE_OPTION
        ] * $quantity}
        pieces)
      </div>
    </InputQuantity>
  {:else}
    <InputQuantity value={$quantity} on:change={handleQuantityChange}>
      <label let:id={inputId} slot="label" for={inputId} class="s_label"
        >Quantity</label
      >
    </InputQuantity>
  {/if}

  {#each $availableOptionArr as option (option.key)}
    <Select
      options={option.values}
      value={$groupedOption[option.key]}
      on:change={({ target: { value } }) =>
        handleOptionSelected({ name: option.key, value })}
    >
      <label let:id={inputId} slot="label" for={inputId} class="s_label"
        >{option.key}</label
      >
    </Select>
  {/each}

  {#if $subscription && subscriptionOptions.length > 1}
    <Select
      options={subscriptionOptions}
      value={$subscription}
      on:change={handleSubscriptionSelect}
    >
      <label let:id={inputId} slot="label" for={inputId} class="s_label"
        >Subscription</label
      >
    </Select>
  {/if}
</div>

<style>
  .s_root {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  .s_label {
    font-family: Cooper MD BT W05 Regular;
    color: #333;
    font-size: 18px;
    margin-bottom: 0.5rem;
  }

  @media screen and (max-width: 500px) {
    .s_root {
      grid-template-columns: 1fr;
    }
  }
</style>
