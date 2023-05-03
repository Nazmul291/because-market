import { useCallback, useState } from "react"

/**
 * Wrapper over useState hook to make a data loading/loaded/error state
 * @param {Object} defaultState - default state
 * @returns {Array<Object, Function>} - current state and state custom updater; where Object: {loading: Boolean, loaded: Boolean, error: Error|String}
 */
export function useDataLoadingState(defaultState) {
  const [state, setState] = useState({
    loading: false,
    loaded: false,
    error: null,
    ...defaultState,
  })

  const dataStateUpdated = useCallback(
    (updatedState) =>
      setState((currentState) => ({
        ...currentState,
        ...updatedState,
      })),
    [setState]
  )

  return [state, dataStateUpdated]
}
