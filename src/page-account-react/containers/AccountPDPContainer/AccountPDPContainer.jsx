import React, { memo, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { noop } from "../../../utils"
import { ModalWindow } from "../../../rUI"
import { withLoading } from "../../../hocs/withLoading"
import { useAsyncState } from "../../../hooks/useAsyncState"
import { fetchProduct } from "../../../api/storefrontApi"
import { createCheckoutForVariant } from "../../../api/shopifyClient"
import { addToNextBox, buyNow } from "../../../api/marketApi"
import AccountPDP from "../../components/AccountPDP"

const submitForm = ({ variant, subscription, quantity }) => {
  return createCheckoutForVariant({ variant, subscription, quantity }).then(
    (checkout) => addToNextBox(checkout?.id)
  )
}

const buyNowForm = ({ variant, subscription, quantity }) => {
  return createCheckoutForVariant({ variant, subscription, quantity }).then(
    (checkout) => buyNow(checkout?.id)
  )
}

const AccountPDPWithLoading = withLoading(AccountPDP)

AccountPDPContainer.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  variantId: PropTypes.string,
  quantity: PropTypes.number,
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  onBuyNow: PropTypes.func,
}

function AccountPDPContainer({
  productId = null,
  variantId = null,
  quantity,
  onClose = noop,
  onSubmit = noop,
  onBuyNow = noop,
  ...props
}) {
  const [productState, reqFetchProduct] = useAsyncState(fetchProduct)
  const [submitState, reqSubmitForm, reqBuyNowForm] = useAsyncState(
    submitForm,
    buyNowForm
  )

  const handleSubmit = useCallback(
    (data) => {
      reqSubmitForm(data).then(() => {
        onSubmit(data)
      })
    },
    [onSubmit, reqSubmitForm]
  )

  const handleBuyNow = useCallback(
    (data) => {
      reqBuyNowForm(data).then(() => onBuyNow(data))
    },
    [onBuyNow, reqBuyNowForm]
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
            productState.loading || submitState.loading || !productState.loaded
          }
          product={productState.data}
          selectedVariantId={variantId}
          quantity={quantity}
          onSubmit={handleSubmit}
          onBuyNow={handleBuyNow}
          {...props}
        />
      }
      onCloseModal={onClose}
    />
  )
}

export default memo(AccountPDPContainer)
