import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { fetchCheckoutCrossSellProductIds } from "../../../api/storefrontApi"
import { noop } from "../../../utils"

CheckoutSubProductIdsLoader.propTypes = {
  checkout: PropTypes.object,
  onLoad: PropTypes.func,
  onClose: PropTypes.func,
}

function CheckoutSubProductIdsLoader({
  checkout,
  onLoad = noop,
  onClose = noop,
}) {
  const [once, setOnce] = useState(false)

  useEffect(() => {
    if (once) {
      return
    }
    setOnce(true)
    fetchCheckoutCrossSellProductIds(checkout, "cross_sell_success")
      .then(onLoad)
      .catch(onClose)
  }, [once, checkout, onClose, onLoad])

  return <div />
}

export default CheckoutSubProductIdsLoader
