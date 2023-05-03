<script>
  import useOnToggleFocus from "../directives/useOnToggleFocus"
  import InputLayout from "../InputLayout"

  export let type = "text"
  export let label = ""
  export let value = ""
  export let hidden = false
  export let error = null
  export let data = {}
  export let id = ""
  export let autocomplete = "none"
  export let variant

  let focused = false

  $: dataAttr = Object.entries(data).reduce((sum, [key, value]) => {
    sum[`data-${key}`] = value
    return sum
  }, {})

  const handleToggleFocus = ({ detail }) => (focused = detail)
</script>

<InputLayout
  {id}
  {label}
  {error}
  let:id={inputId}
  {hidden}
  {variant}
  {focused}
  renderLabelSlot={$$slots.label}
>
  <span slot="label">
    <slot name="label" {id} />
  </span>

  <input
    id={inputId}
    class="s_input"
    class:s_input_error={Boolean(error)}
    {type}
    {value}
    use:useOnToggleFocus
    on:change
    on:keypress
    on:focus
    on:blur
    on:toggleFocus={handleToggleFocus}
    {...dataAttr}
    placeholder={label}
    {autocomplete}
  />
</InputLayout>

<style>
  .s_input {
    width: 100%;
    height: 100%;
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
    color: #495057;
    font-size: 14px;
    outline: 0;
  }

  .s_input:focus {
    outline: 0;
  }

  .s_input_error {
    border: 2px solid #e43c29;
  }
</style>
