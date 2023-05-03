import { useCallback, useEffect, useMemo, useRef } from "react"

const clearTimer = (ref) => {
  if (ref?.current !== null) {
    clearTimeout(ref.current)
  }
  ref.current = null
}

/**
 * Create debounced callback
 * @param {Function} callback callback function
 * @param {Array} dependencies dependencies values
 * @param {Integer} [debounce] - debounce ms (default: 300)
 * @returns {Function} debounced callback function
 */
export function useDebouncedCallback(
  callback,
  dependencies = [],
  debounce = 300
) {
  const ref = useRef(null)
  const handler = useMemo(() => callback, dependencies) // eslint-disable-line react-hooks/exhaustive-deps

  const debounced = useCallback(
    (...args) => {
      clearTimer(ref)
      ref.current = setTimeout(() => {
        clearTimer(ref)
        handler(...args)
      }, debounce)
    },
    [handler, debounce]
  )

  useEffect(() => () => clearTimer(ref), [])

  return debounced
}
