export function addMouseFlow() {
  window._mfq = window._mfq || []

  const mf = document.createElement("script")
  mf.type = "text/javascript"
  mf.defer = true
  mf.src = `//cdn.mouseflow.com/projects/${process.env.MOUSEFLOW_TOKEN}.js`
  document.getElementsByTagName("head")[0].appendChild(mf)
}
