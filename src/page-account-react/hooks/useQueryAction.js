import { useEffect } from "react"
import { noop } from "../../utils"

/**
 * Call callback on query action
 * @param {String} actionName action name
 * @param {Array<String>} actionParams array of query params name
 * @param {Function} onAction on action callback
 */
export default function useQueryAction(
  actionName,
  actionParams,
  onAction = noop
) {
  const search = location.search

  useEffect(() => {
    const searchParams = new URLSearchParams(search)
    const action = searchParams.get("action")

    if (action === actionName) {
      const args = actionParams?.map((name) => searchParams.get(name)) ?? []
      onAction(...args)
    }
  }, [search, actionName, actionParams, onAction])
}
