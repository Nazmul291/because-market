<script>
  import { createEventDispatcher } from "svelte"
  import { findVariantByOption } from "../../utils"
  import { Price, Select, InputQuantity } from "../../sUI"
  import noImg from "../../rUI/img/no-image-400x400.webp"

  export let item
  export let productStore

  const dispatch = createEventDispatcher()
  const calcIsSubscription = (item) => Boolean(item?.properties?.subscription)
  const calcFinalItemPrice = (item, isSubscription) =>
    !isSubscription
      ? item.final_line_price
      : item.final_line_price *
        (1 - item.properties.subscription.discount / 100)
  const calcOptions = (item) =>
    item.options_with_values?.reduce(
      (acc, opt) => ({ ...acc, [opt.name]: opt.value }),
      {}
    )
  const calcImage = (item) => item.image || noImg
  const {
    hasSubscription,
    maxSubscription,
    optionsArr,
    optionsIndex,
    availableVariants,
  } = productStore

  let isSubscription = calcIsSubscription(item)
  let finalItemPrice = calcFinalItemPrice(item, isSubscription)
  let currentOptions = calcOptions(item)

  $: isSubscription = calcIsSubscription(item)
  $: finalItemPrice = calcFinalItemPrice(item, isSubscription)
  $: currentOptions = calcOptions(item)
  $: itemImg = calcImage(item)

  const handleRemoveClick = () => {
    dispatch("remove", item)
  }

  const handleBuyOnceClick = () => {
    dispatch("change", {
      line: item.line,
      quantity: item.quantity,
      properties: {
        subscription: null,
      },
    })
  }

  const handleSubscribeClick = () => {
    dispatch("change", {
      line: item.line,
      quantity: item.quantity,
      properties: {
        subscription: {
          key: $maxSubscription.key,
          discount: $maxSubscription.value,
        },
      },
    })
  }

  const handleQuantityChange = ({ detail }) => {
    if (detail <= 0) {
      dispatch("remove", item)
    } else {
      dispatch("change", {
        id: String(item.id),
        quantity: detail,
      })
    }
  }

  const handleOptionSelected = ({ key, value }) => {
    const newVariant = findVariantByOption(
      key,
      value,
      currentOptions,
      $availableVariants,
      $optionsIndex
    )

    if (!newVariant) {
      return
    }

    dispatch("changeVariant", {
      line: item.line,
      item,
      variant: newVariant,
    })
  }
</script>

<div class="d-flex">
  <div class="s_cart-image cart__image">
    <a href={item.url}>
      <img class="s_img" src={itemImg} alt={item.title} />
    </a>
  </div>
  <div style="flex: 1 1 0%;">
    <div class="cart-item__top-line">
      <a href={item.url}>
        <div class="cart__item__title">{item.title}</div>
      </a>
      <div class="item__price cart-items__price">
        <p class="item__price--final"><Price amount={finalItemPrice} free /></p>
      </div>
    </div>
    <div class="cart-product__controls">
      <div class="cart-product__variants s_variant-options-layout">
        <InputQuantity
          value={item.quantity}
          min={0}
          variant="lite"
          on:change={handleQuantityChange}
          withoutError
        />
        {#each $optionsArr as option (option.key)}
          <Select
            options={option.values}
            value={currentOptions[option.key]}
            variant="lite"
            withoutError
            on:change={({ target: { value } }) =>
              handleOptionSelected({ key: option.key, value })}
          />
        {/each}
      </div>
      <a
        href={null}
        class="cart__remove"
        on:click|preventDefault={handleRemoveClick}>Remove</a
      >
    </div>
    {#if $hasSubscription}
      <div
        class="product-subscription-switch product-subscription-switch--desktop"
      >
        {#if isSubscription}
          <span class="product-subscription-switch__text">
            <span class="product-subscription-switch__icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="#667796" />
                <path
                  d="M10.142 17L5.34357 12.2015L6.69673 10.8484L10.142 14.2841L17.4261 7L18.7793 8.36276L10.142 17Z"
                  fill="#FCFCF4"
                />
              </svg>
            </span>
            You’re set up for {item.properties.subscription.key} deliveries.
          </span>
          <button type="button" on:click={handleBuyOnceClick}>Buy Once</button>
        {:else}
          <span class="product-subscription-switch__text">
            <span class="product-subscription-switch__icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="#FFB800" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.6899 5.78V3.5L8.28589 6.54L11.6899 9.583V7.303C14.4999 7.303 16.7979 9.355 16.7979 11.863C16.7979 12.623 16.5419 13.384 16.2019 13.993L17.4789 15.133C18.0739 14.143 18.4999 13.079 18.4999 11.862C18.4999 8.518 15.4359 5.781 11.6899 5.781V5.78ZM11.69 16.6972C9.137 16.6972 7.048 14.6442 7.048 12.1352C7.048 11.3752 7.28 10.6152 7.589 10.0072L6.43 8.86719C5.887 9.85419 5.5 10.9182 5.5 12.1342C5.5 15.4792 8.286 18.2162 11.69 18.2162V20.4982L14.786 17.4582L11.69 14.4162V16.6962V16.6972Z"
                  fill="#FCFCF4"
                />
              </svg>
            </span>Subscribe &amp; save {$maxSubscription.value}%. Cancel
            anytime.
          </span>
          <button type="button" on:click={handleSubscribeClick}
            >Subscribe</button
          >
        {/if}
      </div>
    {/if}
  </div>
</div>
{#if $hasSubscription}
  <div class="product-subscription-switch product-subscription-switch--mobile">
    {#if isSubscription}
      <span class="product-subscription-switch__text">
        <span class="product-subscription-switch__icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#667796" />
            <path
              d="M10.142 17L5.34357 12.2015L6.69673 10.8484L10.142 14.2841L17.4261 7L18.7793 8.36276L10.142 17Z"
              fill="#FCFCF4"
            />
          </svg>
        </span>
        You’re set up for {item.properties.subscription.key} deliveries.
      </span>
      <button type="button" on:click={handleBuyOnceClick}>Buy Once</button>
    {:else}
      <span class="product-subscription-switch__text">
        <span class="product-subscription-switch__icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#FFB800" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.6899 5.78V3.5L8.28589 6.54L11.6899 9.583V7.303C14.4999 7.303 16.7979 9.355 16.7979 11.863C16.7979 12.623 16.5419 13.384 16.2019 13.993L17.4789 15.133C18.0739 14.143 18.4999 13.079 18.4999 11.862C18.4999 8.518 15.4359 5.781 11.6899 5.781V5.78ZM11.69 16.6972C9.137 16.6972 7.048 14.6442 7.048 12.1352C7.048 11.3752 7.28 10.6152 7.589 10.0072L6.43 8.86719C5.887 9.85419 5.5 10.9182 5.5 12.1342C5.5 15.4792 8.286 18.2162 11.69 18.2162V20.4982L14.786 17.4582L11.69 14.4162V16.6962V16.6972Z"
              fill="#FCFCF4"
            />
          </svg>
        </span>
        Subscribe &amp; save {$maxSubscription.value}%. Cancel anytime.
      </span>
      <button type="button" on:click={handleSubscribeClick}>Subscribe</button>
    {/if}
  </div>
{/if}

<style>
  .s_variant-options-layout {
    display: flex;
  }

  @media (max-width: 1024px) {
    .s_variant-options-layout {
      display: block;
    }
  }

  .s_cart-image {
    text-align: center;
  }

  .s_img {
    height: 100%;
  }
</style>
