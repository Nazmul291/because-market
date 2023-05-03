import { useCallback } from "react"
import { noop } from "../../utils"
import useQueryAction from "./useQueryAction"
import { nextShipmentPostpone } from "../../api/marketApi"

const ACTION_NAME = "next_shipment_postpone"
const ACTION_PARAMS = ["days", "code"]

/**
 * Use action postpone
 * @param {Object} shipmentState shipment state
 * @param {Function} onAction on next shipment postpone
 */
export default function useActionPostpone(shipmentState, onAction = noop) {
  const nextShipment = shipmentState?.data

  const handleAction = useCallback(
    (days, code) => {
      if (!nextShipment) {
        return
      }

      const qParams = new URLSearchParams(location.search)

      qParams.delete("action")
      ACTION_PARAMS.forEach((name) => qParams.delete(name))

      history.replaceState(
        null,
        "",
        `${location.pathname}?${qParams.toString()}`
      )

      if (!days || !code) {
        return
      }

      nextShipmentPostpone({ days: Number(days), code }).then(onAction)
    },
    [nextShipment, onAction]
  )

  useQueryAction(ACTION_NAME, ACTION_PARAMS, handleAction)
}
