import React from "react"
import PropTypes from "prop-types"
import noImg from "../img/no-image-400x400.webp"

Image.propTypes = {
  src: PropTypes.string,
}

function Image({ src, ...props }) {
  const imgSrc = src || noImg
  return <img {...props} src={imgSrc} />
}

export default Image
