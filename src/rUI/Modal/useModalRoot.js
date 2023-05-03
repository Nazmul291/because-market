export default function useModalRoot(elId = "modals-root") {
  let el = document.getElementById(elId)

  if (el) {
    return el
  }

  el = document.createElement("DIV")
  el.id = elId

  document.body.appendChild(el)

  return el
}
