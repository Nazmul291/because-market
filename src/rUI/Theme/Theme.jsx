import { useEffect } from "react"
import resetShopifyTheme from "./resetShopifyTheme"
import themeDefault from "./themeDefault"

const THEME_DEFAULT = "default"

const THEMES = {
  [THEME_DEFAULT]: themeDefault,
}

function getThemeClassName(name) {
  return THEMES[name] || THEMES[THEME_DEFAULT]
}

function Theme({ theme = THEME_DEFAULT, children }) {
  useEffect(() => {
    if (document.body.classList.contains(resetShopifyTheme)) {
      return
    }
    document.body.classList.add(resetShopifyTheme)

    return () => document.body.classList.remove(resetShopifyTheme)
  }, [])

  useEffect(() => {
    const themeClassName = getThemeClassName(theme)
    document.body.classList.add(themeClassName)

    return () => document.body.classList.remove(themeClassName)
  }, [theme])

  return children
}

export default Theme
