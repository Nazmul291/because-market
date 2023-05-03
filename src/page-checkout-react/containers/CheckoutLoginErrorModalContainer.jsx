import React, { useCallback } from "react"
import PropTypes from "prop-types"
import CheckoutLoginErrorModal from "../components/CheckoutLoginErrorModal"
import { noop } from "../../utils"

CheckoutLoginErrorModalContainer.propTypes = {
  onClose: PropTypes.func,
}

function CheckoutLoginErrorModalContainer({ onClose = noop, ...props }) {
  const handleContinueClick = useCallback(() => {
    location.href = "/account"
  }, [])

  return (
    <CheckoutLoginErrorModal
      {...props}
      onCloseClick={onClose}
      onContinueClick={handleContinueClick}
    />
  )
}

export default CheckoutLoginErrorModalContainer
