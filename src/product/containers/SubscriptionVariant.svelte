<script>
  import { getContext } from "svelte"
  import { APP_CONTEXT } from "../../const"
  import { Price } from "../../sUI"

  const { getStore } = getContext(APP_CONTEXT)
  const { product, discount, currentVariant } = getStore()
  const { subscription, price } = currentVariant
  const { hasSubscription, maxSubscription } = product
  const { subscribePrice } = discount

  const SUBSCRIPTION_VALUE = "SUBSCRIPTION_VALUE"
  const ONE_TIME_VALUE = "ONE_TIME_VALUE"

  const handlePurchaseType = (value) => {
    if (value === SUBSCRIPTION_VALUE) {
      currentVariant.subscription.set($maxSubscription.key)
    } else {
      currentVariant.subscription.set(null)
    }
  }
</script>

<div class="s_subscription_variant">
  {#if $hasSubscription}
    <div class="s_item">
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-interactive-supports-focus -->
      <div
        class="radio-option-outer subscribe-outer s-option"
        class:radio-checked={$subscription !== null}
        role="button"
        aria-controls="subscribe-body"
        on:click={() => handlePurchaseType(SUBSCRIPTION_VALUE)}
      >
        {#if $discount}
          <div class="ten_off">{$discount}% off</div>
        {/if}
        <label class="radio-option-inner">
          <input
            class="subscribe onetime_subscribe_radio"
            type="radio"
            name="purchaseType"
            value={SUBSCRIPTION_VALUE}
          />
          <p class="radio-option-caption">Subscribe & Save</p>
          <span class="price-text">
            {#if $subscribePrice}
              <Price amount={$subscribePrice} free />
            {/if}
          </span>
        </label>
      </div>

      <p class="s_skip">Skip or Cancel, Anytime</p>
    </div>
  {/if}

  <div class="s_item">
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-interactive-supports-focus -->
    <div
      class="radio-option-outer onetime-outer s-option"
      class:radio-checked={$subscription === null}
      role="button"
      aria-controls="onetime-body"
      on:click={() => handlePurchaseType(ONE_TIME_VALUE)}
    >
      <label class="radio-option-inner">
        <input
          class="onetime onetime_subscribe_radio"
          type="radio"
          name="purchaseType"
          value={ONE_TIME_VALUE}
        />
        <p class="radio-option-caption">One-time Purchase</p>
        <span class="price-text">
          {#if $price}
            <Price amount={$price} free />
          {/if}
        </span>
      </label>
    </div>
  </div>
</div>

<style>
  .s_subscription_variant {
    display: grid;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-template-columns: 1fr 1fr;
    margin-top: 20px;
  }

  .s-option {
    cursor: pointer;
    width: 100%;
  }

  .s_skip {
    text-align: center;
    padding-top: 8px;
    font-size: 16px;
    margin: 0;
  }

  .radio-option-outer {
    margin-left: 0;
    margin-right: 0;
  }

  @media screen and (max-width: 500px) {
    .s_subscription_variant {
      display: grid;
      grid-template-columns: 1fr;
    }

    .radio-option-outer {
      width: 100%;
    }

    .s_skip {
      padding-top: 0px;
    }
  }
</style>
