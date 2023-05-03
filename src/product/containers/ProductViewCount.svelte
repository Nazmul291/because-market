<script>
  import { getProductViewCount } from "../../utils"

  export let productId = null

  $: count = getProductViewCount(productId)
</script>

<div class="s-view-count">
  <i class="fa fa-eye s-view-count-icon" />
  <span>
    <span class="s-view-count-number">{count} people</span>
    in the last hour added to cart
  </span>
</div>

<style>
  .s-view-count {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
  }

  .s-view-count-icon {
    color: #000;
    margin-right: 5px;
  }

  .s-view-count-number {
    font-family: "Graphik Medium";
  }
</style>
