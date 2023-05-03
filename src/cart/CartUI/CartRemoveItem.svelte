<script>
  export let item
</script>

<div>
  <h5>
    <span>
      <a class="link" href={item.url}>{item.product_title}</a>
    </span>
    <span> - was removed from your cart</span>
  </h5>
</div>

<style>
  .link {
    color: #566583;
  }
</style>
