import React from "react"
import Modal from "./"

export default {
  title: "rUI/Modal",
  component: Modal,
}

const Template = (args) => <Modal {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Content",
  hiddenCloseButton: false,
}

export const WithHeader = Template.bind({})
WithHeader.args = {
  header: "Header",
  children: <div>Content</div>,
  hiddenCloseButton: false,
}

export const WithoutCloseButton = Template.bind({})
WithoutCloseButton.args = {
  header: "Header",
  children: <div>Content</div>,
  hiddenCloseButton: true,
}

export const LongModal = Template.bind({})
LongModal.args = {
  children: (
    <div style={{ height: "800px", width: "100%", color: "red" }}>Hello</div>
  ),
}
