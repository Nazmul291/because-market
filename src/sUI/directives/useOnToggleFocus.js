const EVENT_NAME = "toggleFocus"

export default function useOnToggleFocus(node) {
  const handleFocus = () => {
    node.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: true }))
  }

  const handleBlur = () => {
    node.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: false }))
  }

  node.addEventListener("focus", handleFocus)
  node.addEventListener("blur", handleBlur)

  return {
    destroy() {
      node.removeEventListener("focus", handleFocus)
      node.removeEventListener("blur", handleBlur)
    },
  }
}
