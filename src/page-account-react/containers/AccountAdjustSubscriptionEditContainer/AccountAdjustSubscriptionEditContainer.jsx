import React, { useMemo } from "react"
import PropTypes from "prop-types"
import {
  getStorefrontProductId,
  getStorefrontProductVariantId,
} from "../../../utils"
import AccountSubscriptionEditContainer from "../AccountSubscriptionEditContainer"

AccountAdjustSubscriptionEditContainer.propTypes = {
  item: PropTypes.object,
}

function AccountAdjustSubscriptionEditContainer({ item, ...props }) {
  const additionalOpts = useMemo(
    () => ({
      subscriptionId: item.id,
      productId: getStorefrontProductId(item?.productID),
      variantId: getStorefrontProductVariantId(item?.variantID),
      quantity: item.quantity,
      currentPrice: item.price,
      intervalType: item.intervalType,
    }),
    [item]
  )
  return <AccountSubscriptionEditContainer {...props} {...additionalOpts} />
}

export default AccountAdjustSubscriptionEditContainer
