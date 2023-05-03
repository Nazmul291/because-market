<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf"
  import { Theme, Input } from "../"
</script>

<Meta
  title="sUI/Input"
  component={Input}
  argTypes={{
    label: { control: "text" },
    error: { control: "text" },
    hidden: { control: "boolean" },
    onChange: { action: "onChange" },
  }}
/>

<Template let:args>
  <Theme />
  <Input {...args} on:change={args.onChange} />
</Template>

<Story
  name="Default"
  args={{
    label: "Label",
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
