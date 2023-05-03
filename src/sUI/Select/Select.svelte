<script>
  import useOnToggleFocus from "../directives/useOnToggleFocus"
  import InputLayout from "../InputLayout"

  export let options = []
  export let label = null
  export let value = null
  export let hidden = false
  export let error = null
  export let id = ""
  export let withoutError
  export let variant

  let focused = false

  $: isObjectOption = "object" === typeof options[0]

  const handleToggleFocus = ({ detail }) => (focused = detail)
</script>

<InputLayout
  {id}
  {label}
  {hidden}
  {error}
  {withoutError}
  let:id={inputId}
  {variant}
  {focused}
  renderLabelSlot={$$slots.label}
>
  <span slot="label">
    <slot name="label" {id} />
  </span>

  <select
    id={inputId}
    class="s_root"
    class:s_input_error={Boolean(error)}
    {value}
    use:useOnToggleFocus
    on:toggleFocus={handleToggleFocus}
    on:change
  >
    {#if $$slots.option}
      {#each options as option}
        <slot name="option" {option} />
      {/each}
    {:else if isObjectOption}
      {#each options as option (option.value)}
        <option value={option.value}>
          {option.label}
        </option>
      {/each}
    {:else}
      {#each options as option (option)}
        <option value={option}>
          {option}
        </option>
      {/each}
    {/if}
  </select>
</InputLayout>

<style>
  .s_root {
    width: 100%;
    height: 100%;
    font-family: "Cooper Lt BT W05 Regular" !important;
    /* font-weight: 500;
    font-size: 14px; */
    padding: 0.375rem 0.75rem;
    border: 0;
  }
</style>
