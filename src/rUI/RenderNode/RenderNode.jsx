import React from "react"
import PropTypes from "prop-types"
import { isFunction } from "../../utils"

RenderNode.propTypes = {
  node: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
}

function RenderNode({ node, ...props }) {
  if (!node) {
    return <></>
  }
  return isFunction(node) ? node(props) : <>{node}</>
}

export default RenderNode
