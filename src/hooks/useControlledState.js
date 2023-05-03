import { useCallback, useRef, useState } from "react"
import { isDefineCallback } from "../utils"

export function useControlledState(initialValue, callback) {
  const [value, setValue] = useState(initialValue)
  const ref = useRef(value)
  const isControlled = isDefineCallback(callback)

  const handleChange = useCallback(
    (value, ...args) => {
      if (isControlled) {
        if (!Object.is(ref.current, value)) {
          ref.current = value
          callback(value, ...args)
        }
      } else {
        setValue(value)
      }
    },
    [callback, isControlled]
  )

  if (isControlled) {
    ref.current = initialValue
  }

  return [isControlled ? ref.current : value, handleChange]
}
