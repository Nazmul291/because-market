import React, { useMemo } from "react"
import PropTypes from "prop-types"
import {
  getStorefrontProductId,
  getStorefrontProductVariantId,
} from "../../../utils"
import AccountSubscriptionEditContainer from "../AccountSubscriptionEditContainer"

AccountNextShipmentEditContainer.propTypes = {
  item: PropTypes.object,
}

function AccountNextShipmentEditContainer({ item, ...props }) {
  const additionalOpts = useMemo(
    () => ({
      subscriptionId: item.id,
      productId: getStorefrontProductId(item?.productID),
      variantId: getStorefrontProductVariantId(item?.variantID),
      currentPrice: item.price,
      quantity: item.quantity,
      intervalType: item.oneTimeOffer
        ? undefined
        : item.code?.replace(/^\d+-/, ""),
    }),
    [item]
  )

  return <AccountSubscriptionEditContainer {...props} {...additionalOpts} />
}

export default AccountNextShipmentEditContainer
