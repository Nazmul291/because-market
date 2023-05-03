import React from "react"
import PropTypes from "prop-types"
import RenderHtml from "../RenderHtml"

AccountProductDescription.propTypes = {
  product: PropTypes.object,
}

function AccountProductDescription({ product, ...props }) {
  const { description, descriptionHtml } = product || {}
  return <RenderHtml {...props} html={descriptionHtml || description} />
}

export default AccountProductDescription
