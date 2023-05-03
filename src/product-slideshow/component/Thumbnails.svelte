<script>
  import { createEventDispatcher } from "svelte"

  export let media = []
  export let current = null
  export let visibleCount = 5

  let currentPos = 0

  $: visibleItems = media.slice(currentPos, currentPos + visibleCount)
  $: isNeedScroll = media.length > visibleCount

  const dispatch = createEventDispatcher()

  const handleClick = (item) => {
    dispatch("change", item)
  }

  const handleUpClick = () => {
    if (currentPos <= 0) {
      return
    }

    currentPos = currentPos - 1
  }

  const handleDownClick = () => {
    if (currentPos + visibleCount >= media.length) {
      return
    }

    currentPos = currentPos + 1
  }
</script>

<div class="s-root">
  {#if isNeedScroll}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="thumbs-up-button thumbs-button s-button-up"
      on:click={handleUpClick}
    >
      <i class="fa fa-2x fa-angle-up" aria-hidden="true" />
    </div>
  {/if}
  <ul class="s-items">
    {#each visibleItems as item (item.src)}
      <li class="s-item">
        <a
          href={item.src}
          class="s-item-a"
          class:s-item-a__active={item === current}
          on:click|preventDefault={() => handleClick(item)}
          on:mouseenter|preventDefault={() => handleClick(item)}
        >
          <img class="s-item-img" src={item.preview_image.src} alt={item.alt} />
        </a>
      </li>
    {/each}
  </ul>
  {#if isNeedScroll}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="thumbs-down-button thumbs-button s-button-down"
      on:click={handleDownClick}
    >
      <i class="fa fa-2x fa-angle-down" aria-hidden="true" />
    </div>
  {/if}
</div>

<style>
  .s-root {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .s-button-up,
  .s-button-down {
    cursor: pointer;
  }

  .s-items {
    margin: 15px 0;
    padding: 0px;
    list-style: none;
  }

  .s-item {
    margin: 15px 0;
  }

  .s-item:first-child {
    margin-top: 0;
  }

  .s-item:last-child {
    margin-bottom: 0;
  }

  .s-item-a {
    display: block;
    border-radius: 6px;
    width: 100%;
    box-shadow: rgb(211, 211, 211) 0px 0px 3px 2px;
  }

  .s-item-a__active {
    box-shadow: rgb(9, 229, 219) 0px 0px 2px 1px;
    border-color: rgb(9, 229, 219);
  }

  .s-item-img {
    border-radius: 6px;
    display: block;
    max-width: 100%;
    margin: 0px auto;
  }

  @media (max-width: 1200px) {
    .s-root {
      justify-content: center;
      flex-direction: row;
    }

    .s-button-up {
      transform: rotate(-90deg);
    }

    .s-button-down {
      transform: rotate(-90deg);
    }

    .s-items {
      flex-direction: row;
      justify-content: center;
      display: flex;
      flex-direction: row;
      margin: 0 15px;
    }

    .s-item {
      margin: 0 15px;
    }

    .s-item:first-child {
      margin-right: 0;
    }

    .s-item:last-child {
      margin-left: 0;
    }

    .s-item-a {
      display: block;
      max-width: 80px;
      max-height: 100%;
    }
  }
</style>
