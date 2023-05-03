<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf"
  import { Theme, Select } from "../"
</script>

<Meta
  title="sUI/Select"
  component={Select}
  argTypes={{
    label: { control: "text" },
    error: { control: "text" },
    hidden: { control: "boolean" },
    options: { contol: "list" },
    onChange: { action: "onChange" },
  }}
/>

<Template let:args>
  <Theme />
  <Select {...args} on:change={args.onChange} />
</Template>

<Story
  name="Default"
  args={{
    label: "Label",
    options: ["foo", "bar", "baz"],
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
