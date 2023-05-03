import { noop } from "../utils"

export default window?.analytics || {
  track: noop,
}
