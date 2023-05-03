import { useMemo } from "react"
import { useDataLoadingState } from "./useDataLoadingState"

const makeExecuter =
  (executer, setState) =>
  (...args) => {
    setState({ loading: true, loaded: false, error: null })
    return executer(...args)
      .then((data) => {
        setState({ loading: false, loaded: true, data })
        return data
      })
      .catch((error) => {
        setState({ loading: false, error })
        return Promise.reject(error)
      })
  }

/**
 * Function for set async state
 * @param {*} data any data
 * @returns {Promise<*>}
 */
export function asyncStateSetter(data) {
  return Promise.resolve(data)
}

/**
 * Make state with async functions
 * @param {Array<Promise>} executers functions should return promise
 * @returns {Array<Object, Function, executers>} - [state, exec1, exec2, ...] where Object: {loading: Boolean, loaded: Boolean, error: Error|String, data: *, reset: Function}
 */
export function useAsyncState(...executers) {
  const [stateData, setState] = useDataLoadingState({ data: null })

  const execs = useMemo(
    () => executers.map((executer) => makeExecuter(executer, setState)),
    [...executers] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const state = useMemo(
    () => ({
      ...stateData,
      reset: () =>
        setState({ loading: false, loaded: false, error: null, data: null }),
    }),
    [stateData] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return [state, ...execs]
}
