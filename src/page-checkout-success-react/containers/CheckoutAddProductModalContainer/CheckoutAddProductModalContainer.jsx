import React, { useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { checkoutUpdateById } from "../../../api/marketApi"
import {
  PRODUCT_METAFIELD_NAMESPACE_SUBSCRIPTION,
  PRODUCT_SUBSCRIPTION_ORDER,
} from "../../../const"
import { useAsyncState } from "../../../hooks"
import { trackEvent } from "../../../integrations/tracker"
import {
  getMetafieldNamespace,
  isUndef,
  noop,
  sanitizeStorefrontId,
} from "../../../utils"
import CheckoutAddProductModalBody from "./CheckoutAddProductModalBody"
import CheckoutSubProductIdsLoader from "./CheckoutSubProductIdsLoader"

CheckoutAddProductModal.propTypes = {
  checkout: PropTypes.object.isRequired,
  onUpdateCheckout: PropTypes.func,
  onClose: PropTypes.func,
}

function CheckoutAddProductModal({
  checkout,
  onUpdateCheckout = noop,
  onClose = noop,
}) {
  const [subProductIds, setSubProductIds] = useState(null)
  const [currentProductId, setCurrentProductId] = useState(null)
  const [addItemState, reqAddItem] = useAsyncState(checkoutUpdateById)

  const getNext = useCallback(() => {
    const next = subProductIds?.length && subProductIds[0]
    setCurrentProductId(next)
    setSubProductIds(subProductIds?.slice(1))
    return Boolean(next)
  }, [subProductIds])

  const handleLoadProductIds = useCallback(
    (list) => {
      if (!list.length) {
        return onClose()
      }

      setCurrentProductId(list[0])
      setSubProductIds(list.slice(1))
    },
    [onClose]
  )

  const handleOnNext = useCallback(() => {
    if (!getNext()) {
      onClose()
    } else {
      trackEvent("Post Purchase Cross Sell Click", {
        value: "Rejected",
        product: currentProductId || "",
      })
    }
  }, [getNext, onClose, currentProductId])

  const handleAdd = useCallback(
    ({ variantId, quantity, product: { metafields } }) => {
      const subscriptions = getMetafieldNamespace(
        metafields,
        PRODUCT_METAFIELD_NAMESPACE_SUBSCRIPTION
      )

      const subscriptionType = subscriptions
        ? PRODUCT_SUBSCRIPTION_ORDER.find(
            (subType) => !isUndef(subscriptions[subType])
          )
        : undefined

      reqAddItem(checkout.id, {
        items: [
          ...checkout.items.map(({ id, quantity, type, isFullPack }) => ({
            id,
            quantity,
            type: type || undefined,
            trial: isFullPack || undefined,
          })),
          {
            id: sanitizeStorefrontId(variantId),
            quantity,
            type: subscriptionType,
          },
        ],
      }).then((checkout) => {
        onUpdateCheckout(checkout)

        if (!getNext()) {
          onClose()
        }
      })
    },
    [checkout, reqAddItem, onUpdateCheckout, getNext, onClose]
  )

  useEffect(() => {
    trackEvent("Post Purchase Cross Sell")
  }, [])

  return !currentProductId ? (
    <CheckoutSubProductIdsLoader
      checkout={checkout}
      onClose={onClose}
      onLoad={handleLoadProductIds}
    />
  ) : (
    <CheckoutAddProductModalBody
      productId={currentProductId}
      disabled={addItemState.loading}
      onClose={handleOnNext}
      onNext={handleOnNext}
      onAdd={handleAdd}
    />
  )
}

export default CheckoutAddProductModal
