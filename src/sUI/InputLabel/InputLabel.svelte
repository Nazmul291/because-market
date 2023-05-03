{#if $$slots.label}
  <slot name="label" />
{:else}
  <label class="s_root {$$restProps.class || ''}" for={$$restProps.for || ""}
    ><slot /></label
  >
{/if}

<style>
  .s_root {
    font-size: 14px;
    margin-bottom: 0.1rem;
    color: #2c2b2b;
    font-weight: 500;
  }
</style>
