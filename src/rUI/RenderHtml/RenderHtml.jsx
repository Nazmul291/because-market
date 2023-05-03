import React, { useMemo } from "react"
import PropTypes from "prop-types"
import DOMPurify from "dompurify"

RenderHtml.propTypes = {
  html: PropTypes.string,
  tagName: PropTypes.string,
}

function RenderHtml({ html, tagName = "div", ...props }) {
  const dangerouslySetInnerHTML = useMemo(() => {
    if (!html) {
      return null
    }

    return {
      __html: DOMPurify.sanitize(html),
    }
  }, [html])

  if (!dangerouslySetInnerHTML) {
    return null
  }

  return React.createElement(tagName, {
    ...props,
    dangerouslySetInnerHTML,
  })
}

export default RenderHtml
