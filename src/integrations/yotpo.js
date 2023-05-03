export const init = () => {
  if (!window.yotpo) {
    const script = document.createElement("script")
    script.src = `//staticw2.yotpo.com/${process.env.YOTPO_TOKEN}/widget.js`
    script.async = true
    document.body.appendChild(script)
  } else if (!window.yotpo.initialized) {
    setTimeout(() => {
      // eslint-disable-next-line new-cap
      init()
    }, 1000)
  } else {
    try {
      window.yotpo.refreshWidgets()
    } catch (e) {
      console.error("error: ", e)
    }
  }
}
