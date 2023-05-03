<script>
  import { createEventDispatcher } from "svelte"
  import useOnToggleFocus from "../directives/useOnToggleFocus"
  import InputLayout from "../InputLayout"
  import { IconMinus, IconPlus } from "../Icons"

  export let label = ""
  export let value = ""
  export let hidden = false
  export let error = null
  export let data = {}
  export let id
  export let autocomplete = "none"
  export let min = 1
  export let max = Number.POSITIVE_INFINITY
  export let withoutError
  export let variant

  const dispatch = createEventDispatcher()

  let inputEl
  let focused = false

  $: dataAttr = Object.entries(data).reduce((sum, [key, value]) => {
    sum[`data-${key}`] = value
    return sum
  }, {})

  $: textVisibility = focused ? "hidden" : "visible"

  const handleChange = ({ target: { value } }) => {
    const next = parseInt(value, 10)
    dispatch("change", next < min ? min : next)
  }

  const handleMinusClick = () => {
    const next = value - 1
    dispatch("change", next < min ? min : next)
  }

  const handlePlusClick = () => {
    const next = value + 1
    dispatch("change", next > max ? max : next)
  }

  const handleClickBody = () => {
    inputEl.focus()
  }

  const handleToggleFocus = ({ detail }) => (focused = detail)
</script>

<InputLayout
  {id}
  {label}
  {error}
  let:id={inputId}
  {hidden}
  {withoutError}
  {variant}
  {focused}
  renderLabelSlot={$$slots.label}
>
  <span slot="label">
    <slot name="label" {id} />
  </span>

  <div class="s_input-quantity">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="s_body"
      style="visibility: {textVisibility}"
      on:click|stopPropagation|preventDefault={handleClickBody}
    >
      <slot name="text" {value}>{value}</slot>
    </div>
    <input
      id={inputId}
      class="s_body s_input"
      class:s_input_error={Boolean(error)}
      type="text"
      {value}
      aria-label="quantity"
      pattern="[0-9]*"
      {autocomplete}
      {...dataAttr}
      use:useOnToggleFocus
      bind:this={inputEl}
      on:change={handleChange}
      on:toggleFocus={handleToggleFocus}
      on:focus
      on:blur
      on:keypress
    />

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span class="s_icon_minus" on:click={handleMinusClick}>
      <div class="s_icon">
        <IconMinus />
      </div>
    </span>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span class="s_icon_plus" on:click={handlePlusClick}>
      <div class="s_icon">
        <IconPlus />
      </div>
    </span>
  </div>
</InputLayout>

<style>
  .s_input-quantity {
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-block;
  }

  .s_body {
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
    color: #495057;
    background-color: transparent;
    background-clip: padding-box;
    font-size: 14px;
    text-align: center;
  }

  .s_input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 0;
  }

  .s_input:focus {
    opacity: 1;
    border-color: #667799;
    outline: 0;
  }

  .s_input_error {
    border: 1px solid #e43c29;
  }

  .s_icon {
    display: flex;
    width: 12px;
  }

  .s_icon_plus {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    cursor: pointer;
    align-items: center;
    margin-right: 10px;
  }

  .s_icon_minus {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    cursor: pointer;
    align-items: center;
    margin-left: 10px;
  }
</style>
