import { isFunction } from "../utils"

function getMixPanel(name) {
  return (...args) => {
    if (isFunction(window?.mixpanel?.[name])) {
      return window.mixpanel[name](...args)
    }

    return window?.mixpanel?.[name]
  }
}

export default ["identify", "track", "get_distinct_id"].reduce(
  (acc, name) => ({
    ...acc,
    [name]: getMixPanel(name),
  }),
  {}
)
