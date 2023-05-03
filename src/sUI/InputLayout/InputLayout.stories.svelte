<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf"
  import { Theme, InputLayout } from "../"
</script>

<Meta
  title="sUI/InputLayout"
  component={InputLayout}
  argTypes={{
    label: { control: "text" },
  }}
/>

<Template let:args>
  <Theme />
  <InputLayout {...args} on:change={args.onChange}>
    <label slot="label" let:id={inputId} for={inputId}>Slot label</label>
  </InputLayout>
</Template>

<Story
  name="Default"
  args={{
    label: "",
  }}
/>
