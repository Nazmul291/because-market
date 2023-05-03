import React from "react"
import ModalWindow from "./"

export default {
  title: "rUI/ModalWindow",
  component: ModalWindow,
}

const defaultArgs = {
  appElement: ".sb-main-padded",
  fullScreen: true,
  open: true,
  children: (
    <div>
      <div>CHILDREN SECTION</div>
      <div>Place some content here</div>
    </div>
  ),
  onCloseModal: () => null,
}

const Template = (args) => <ModalWindow {...args} />

export const Default = Template.bind({})
Default.args = defaultArgs

export const WithDiscountBadge = Template.bind({})
WithDiscountBadge.args = {
  ...defaultArgs,
  discount: 12,
}
