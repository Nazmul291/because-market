<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf"
  import { Theme, InputQuantity } from "../"
</script>

<Meta
  title="sUI/InputQuantity"
  component={InputQuantity}
  argTypes={{
    label: { control: "text" },
    value: { control: "number" },
    error: { control: "text" },
    hidden: { control: "boolean" },
    onChange: { action: "onChange" },
  }}
/>

<Template let:args>
  <Theme />
  <InputQuantity {...args} on:change={args.onChange} />
</Template>

<Story
  name="Default"
  args={{
    label: "Label",
    value: 0,
  }}
/>

<Story
  name="Error"
  args={{
    label: "With error",
    error: "Error",
  }}
/>

<Story
  name="Hidden"
  args={{
    label: "Hidden",
    hidden: true,
  }}
/>
