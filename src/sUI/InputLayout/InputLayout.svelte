<script>
  import InputLabel from "../InputLabel"

  export let id = `input_${Math.random()}`
  export let label = null
  export let hidden = false
  export let error = null
  export let withoutError = false
  export let variant = "regular"
  export let renderLabelSlot = false
  export let focused = false
</script>

<div
  class="s_input-layout"
  class:s_hidden={hidden}
  class:s_input-layout-without-error={withoutError}
>
  {#if renderLabelSlot}
    <InputLabel for={id}>
      <slot name="label" {id} />
    </InputLabel>
  {:else if label}
    <InputLabel for={id}>
      {label}
    </InputLabel>
  {/if}
  <div
    class="s_input-container"
    class:s_input-container-without-error={withoutError}
    class:s_input-container-variant-regular={variant === "regular"}
    class:s_input-container-variant-lite={variant === "lite"}
    class:s_input-container-focused={focused}
  >
    <slot {id} />
  </div>

  {#if error}
    <div class="s_error">{error}</div>
  {/if}
</div>

<style>
  .s_input-layout {
    display: flex;
    flex-direction: column;
    min-height: 80px;
    min-width: 70px;
    width: 100%;
  }

  .s_hidden {
    display: none;
  }

  .s_input-container {
    background-color: transparent;
    background-clip: padding-box;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    border-radius: 0.25rem;
    border-width: 2px;
    border-style: solid;
    min-height: 40px;
  }

  .s_input-container-variant-regular {
    border-color: #333333;
  }

  .s_input-container-variant-lite {
    border-color: #dfe1e3;
    border-width: 1px;
  }

  .s_input-container-focused {
    border-color: #667799;
  }

  .s_error {
    color: red;
    font-size: 13px;
  }

  .s_input-layout-without-error,
  .s_input-container-without-error {
    min-height: auto;
  }
</style>
