<script>
  import { getContext } from "svelte"
  import { APP_CONTEXT } from "../../const"

  const { getStore, getAssetsUrls } = getContext(APP_CONTEXT)
  const {
    currentVariant: { subscription },
  } = getStore()

  const { tick } = getAssetsUrls()
</script>

<div class="option_benefits">
  {#if !$subscription}
    <div class="one_benefits">
      <p>
        <img
          style="margin-right:20px;"
          src={tick}
          alt="Free, Discreet Delivery"
        />Free, Discreet Delivery
      </p>
    </div>
  {:else}
    <div class="subscribe_benefits">
      <h3
        style="color:#333; font-weight:500; line-height:25px; font-size:18px;"
        alt="Subscription Benefits"
      >
        Subscription Benefits
      </h3>
      <p>
        <img
          style="margin-right:20px;"
          src={tick}
          alt="Free shipping over $25 & save 10% on every order"
        />Free shipping over $25 & save 10% on every order
      </p>
      <p>
        <img
          style="margin-right:20px;"
          src={tick}
          alt="Skip or Cancel, Anytime"
        />Skip or Cancel, Anytime
      </p>
      <p>
        <img
          style="margin-right:20px;"
          src={tick}
          alt="24/7 Customer Support"
        />24/7 Customer Support
      </p>
    </div>
  {/if}
</div>
