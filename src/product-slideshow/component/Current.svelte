<script>
  export let current
</script>

<div class="s-root">
  <img src={current.src} alt={current.alt} class="s-image" />
</div>

<style>
  .s-root {
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 677px;
    height: 100%;
    border-radius: 7px;
  }

  .s-image {
    max-width: 95%;
    max-height: 677px;
    width: 100%;
    border-radius: 6px;
  }
</style>
