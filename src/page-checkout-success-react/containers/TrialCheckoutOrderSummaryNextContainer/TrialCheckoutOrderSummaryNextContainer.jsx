import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { fetchProductsMetafields } from "../../../api/storefrontApi"
import { withLoading } from "../../../hocs/withLoading"
import { useAsyncState } from "../../../hooks"
import TrialCheckoutOrderSummaryContainer from "./TrialCheckoutOrderSummaryContainer"

const TrialCheckoutOrderSummaryContainerWithLoading = withLoading(
  TrialCheckoutOrderSummaryContainer
)

TrialCheckoutOrderSummaryNextContainer.propTypes = {
  checkout: PropTypes.object.isRequired,
  isTrial: PropTypes.bool,
}

function TrialCheckoutOrderSummaryNextContainer({
  checkout,
  isTrial,
  ...props
}) {
  const [metaState, reqProductsMetafields] = useAsyncState(
    fetchProductsMetafields
  )

  const { loading, data: productsMeta } = metaState

  useEffect(() => {
    if (!checkout?.items) {
      return
    }

    const ids = checkout.items.reduce(
      (acc, { productId, isTrial: isTrialItem }) => {
        if (isTrialItem) {
          return acc
        }
        acc.push(productId)
        return acc
      },
      []
    )

    reqProductsMetafields(ids)
  }, [checkout, reqProductsMetafields])

  return (
    <TrialCheckoutOrderSummaryContainerWithLoading
      loading={loading || !productsMeta}
      checkout={checkout}
      isTrial={isTrial}
      productsMeta={productsMeta}
      {...props}
    />
  )
}

export default TrialCheckoutOrderSummaryNextContainer
