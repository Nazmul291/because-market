<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf"
  import { Theme, Price } from "../"
</script>

<Meta
  title="sUI/Price"
  component={Price}
  argTypes={{
    amount: { control: "number" },
    currency: { control: "select" },
    free: { control: "boolean" },
  }}
/>

<Template let:args>
  <Theme />
  <Price {...args} />
</Template>

<Story
  name="Default"
  args={{
    amount: 100,
  }}
/>

<Story
  name="Free"
  args={{
    amount: 0,
    free: true,
  }}
/>
