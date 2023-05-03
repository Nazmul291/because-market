import React, { memo, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { ModalWindow } from "../../rUI"
import { withLoading } from "../../hocs/withLoading"
import { useAsyncState } from "../../hooks/useAsyncState"
import { fetchProduct } from "../../api/storefrontApi"
import { noop } from "../../utils"
import { shopifyClient } from "../../api/shopifyClient"
import { addToNextBox } from "../../api/marketApi"
import { CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION } from "../../const"
import AccountPDP from "../components/AccountPDP"

const submitForm = ({ variant, subscription, quantity }) => {
  return shopifyClient.checkout
    .create({
      lineItems: [
        {
          variantId: variant.id,
          quantity,
          customAttributes: !subscription
            ? []
            : [
                {
                  key: CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION,
                  value: subscription.key,
                },
              ],
        },
      ],
    })
    .then((checkout) => addToNextBox(checkout?.id))
}

const AccountPDPWithLoading = withLoading(AccountPDP)

AccountProductDetailsPopup.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  variantId: PropTypes.string,
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
}

function AccountProductDetailsPopup({
  productId = null,
  variantId = null,
  loading = false,
  onClose = noop,
  onSubmit = noop,
  ...props
}) {
  const [productState, reqFetchProduct] = useAsyncState(fetchProduct)
  const [submitState, reqSubmitForm] = useAsyncState(submitForm)

  const handleClosePopup = useCallback(() => {
    onClose()
  }, [onClose])

  const handleSubmit = useCallback(
    (data) => {
      reqSubmitForm(data).then(() => {
        onSubmit(data)
      })
    },
    [onSubmit, reqSubmitForm]
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
        <AccountPDPWithLoading
          loading={
            productState.loading ||
            loading ||
            submitState.loading ||
            !productState.loaded
          }
          product={productState.data}
          selectedVariantId={variantId}
          onSubmit={handleSubmit}
          {...props}
        />
      }
      onCloseModal={handleClosePopup}
    />
  )
}

export default memo(AccountProductDetailsPopup)
