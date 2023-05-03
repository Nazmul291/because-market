<script>
  import Thumbnails from "./component/Thumbnails.svelte"
  import Current from "./component/Current.svelte"
  import noImg from "../rUI/img/no-image-400x400.webp"

  export let media
  export let badge
  export let sticky = false

  const calcCurrent = (m) => (m && m.length ? m[0] : { src: noImg })

  $: current = calcCurrent(media)
  const handleChangeCurrent = ({ detail }) => (current = detail)
</script>

<div class="s-root row" class:s-root--sticky={sticky}>
  {#if media && media.length > 1}
    <div class="col-xl-2 s-thumbs-container">
      <Thumbnails {media} {current} on:change={handleChangeCurrent} />
    </div>
  {/if}

  {#if current}
    <div class="col-xl-10">
      {#if badge}
        <div class="product-slideshow-badge s-badge">{badge}</div>
      {/if}

      <div>
        <Current {current} />
      </div>
    </div>
  {/if}
</div>

<style>
  .s-root {
    display: flex;
    height: 100%;
  }

  .s-root--sticky {
    height: auto;
    position: sticky;
    top: 150px;
  }

  .s-badge {
    top: 10px;
    left: 35px;
  }

  @media (max-width: 1200px) {
    .s-root {
      flex-direction: column-reverse;
    }

    .s-thumbs-container {
      margin-top: 10px;
    }
  }
</style>
