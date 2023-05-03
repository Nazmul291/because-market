import React, { useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { checkoutLoadById } from "../../api/marketApi"
import { Loader } from "../../rUI/icons/Loader"
import { noop, saveJsonParse } from "../../utils"

CheckoutLoaderContainer.propTypes = {
  id: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
}

function CheckoutLoaderContainer({ id, onLoad = noop, onError = noop }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleError = useCallback(
    (error) => {
      setError(error)
      onError(error)
    },
    [onError]
  )

  useEffect(() => {
    if (!id) {
      return handleError("Error `checkoutId` not found")
    }
    if (loading) {
      return
    }

    setLoading(true)

    const checkoutFromSession = saveJsonParse(sessionStorage.getItem(id))

    sessionStorage.removeItem(id)

    if (checkoutFromSession) {
      return onLoad(checkoutFromSession)
    }

    checkoutLoadById(id)
      .then(onLoad)
      .catch(() => {
        handleError(`Checkout "${id}" not found`)
      })
  }, [id, loading, onLoad, handleError])

  if (error) {
    return <div>{error}</div>
  }

  return <StyledLoader />
}

const StyledLoader = styled(Loader)`
  height: 100%;
`

export default CheckoutLoaderContainer
