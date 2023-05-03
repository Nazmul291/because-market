import React, { memo, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { noop, sanitizeStorefrontId } from "../../../utils"
import { ModalWindow } from "../../../rUI"
import { withLoading } from "../../../hocs/withLoading"
import { useAsyncState } from "../../../hooks/useAsyncState"
import { fetchProduct } from "../../../api/storefrontApi"
import {
  deleteSubscriptionById,
  updateSubscriptionById,
} from "../../../api/marketApi"
import AccountPDPEdit from "../../components/AccountPDPEdit"

const AccountPDPEditWithLoading = withLoading(AccountPDPEdit)

AccountSubscriptionEditContainer.propTypes = {
  subscriptionId: PropTypes.string,
  productId: PropTypes.string,
  variantId: PropTypes.string,
  intervalType: PropTypes.string,
  quantity: PropTypes.number,
  currentPrice: PropTypes.object,
  onClose: PropTypes.func,
  onRemove: PropTypes.func,
  onUpdate: PropTypes.func,
}

function AccountSubscriptionEditContainer({
  subscriptionId,
  productId,
  variantId,
  currentPrice,
  intervalType,
  quantity,
  onClose = noop,
  onRemove = noop,
  onUpdate = noop,
  ...props
}) {
  const [productState, reqFetchProduct] = useAsyncState(fetchProduct)
  const [changeState, reqRemoveForm, reqUpdateForm] = useAsyncState(
    deleteSubscriptionById,
    updateSubscriptionById
  )

  const handleRemove = useCallback(() => {
    reqRemoveForm(subscriptionId).then(onRemove)
  }, [reqRemoveForm, subscriptionId, onRemove])

  const handleUpdate = useCallback(
    ({ variant, quantity }) => {
      const params = {
        variantID: sanitizeStorefrontId(variant.id),
        quantity,
        intervalType,
      }

      reqUpdateForm(subscriptionId, params).then(onUpdate)
    },
    [intervalType, subscriptionId, reqUpdateForm, onUpdate]
  )

  useEffect(() => {
    if (!productId) {
      return
    }
    reqFetchProduct(productId)
  }, [productId, reqFetchProduct])

  return (
    <ModalWindow
      appElement={"#MainContent"}
      fullScreen={true}
      open={Boolean(productId)}
      children={
        <AccountPDPEditWithLoading
          loading={
            productState.loading || changeState.loading || !productState.loaded
          }
          product={productState.data}
          selectedVariantId={variantId}
          quantity={quantity}
          intervalType={intervalType}
          currentPrice={currentPrice}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
          {...props}
        />
      }
      onCloseModal={onClose}
    />
  )
}

export default memo(AccountSubscriptionEditContainer)
