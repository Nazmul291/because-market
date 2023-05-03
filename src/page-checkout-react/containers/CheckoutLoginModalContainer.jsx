import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { loginUserByZipAndPhone } from "../../api/marketApi"
import { useAsyncState } from "../../hooks/useAsyncState"
import CheckoutLoginModal from "../components/CheckoutLoginModal"
import { noop } from "../../utils"

CheckoutLoginModalContainer.propTypes = {
  onClose: PropTypes.func,
  onError: PropTypes.func,
}

function CheckoutLoginModalContainer({
  onClose = noop,
  onError = noop,
  ...props
}) {
  const [state, request] = useAsyncState(loginUserByZipAndPhone)

  const handleContinueClick = useCallback(
    (data) => {
      request(data)
        .then(({ redirectURL }) => (window.location = redirectURL))
        .catch(onError)
    },
    [onError, request]
  )

  const handleCloseClick = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <CheckoutLoginModal
      {...props}
      loading={state.loading}
      error={state.error}
      onCloseClick={handleCloseClick}
      onContinueClick={handleContinueClick}
    />
  )
}

export default CheckoutLoginModalContainer
