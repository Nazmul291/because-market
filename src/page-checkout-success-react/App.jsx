import React, { useCallback, useState, useMemo } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { Theme } from "../rUI"
import {
  SHOW_ADDITIONAL_MODAL_QUERY,
  SHOW_SKIP_TRIAL_MODAL_QUERY,
} from "../const"
import { CheckoutSuccessContext } from "./containers/CheckoutSuccessContext"
import CheckoutAddProductModalContainer from "./containers/CheckoutAddProductModalContainer"
import { asyncStateSetter, useAsyncState } from "../hooks"
import CheckoutLoaderContainer from "../containers/CheckoutLoaderContainer"
import CheckoutSuccessContainer from "./containers/CheckoutSuccessContainer"
import useIsTrialCheckout from "../hooks/useIsTrialCheckout"
import SkipTrialModalContainer from "./containers/SkipTrialModalContainer"
import useIsClosedCheckout from "../hooks/useIsClosedCheckout"

App.propTypes = {
  checkoutId: PropTypes.string,
}

function App({ checkoutId }) {
  const [monthlyTotal, setMonthlyTotal] = useState()
  const checkoutValue = useMemo(
    () => ({ monthlyTotal, setMonthlyTotal }),
    [monthlyTotal]
  )

  const [checkoutState, setCheckout] = useAsyncState(asyncStateSetter)
  const [showModal, setShowModal] = useState(
    new URLSearchParams(location.search).has(SHOW_ADDITIONAL_MODAL_QUERY)
  )
  const [showSkipTrialModal, setShowSkipTrialModal] = useState(
    new URLSearchParams(location.search).has(SHOW_SKIP_TRIAL_MODAL_QUERY)
  )

  const { data: checkout } = checkoutState

  const isTrial = useIsTrialCheckout(checkout)
  const isClosed = useIsClosedCheckout(checkout)

  const handleCloseModal = useCallback(() => {
    const qParams = new URLSearchParams(location.search)
    qParams.delete(SHOW_ADDITIONAL_MODAL_QUERY)
    history.replaceState(null, "", `${location.pathname}?${qParams.toString()}`)
    setShowModal(false)
  }, [])

  const handleCloseSkipTrialModal = useCallback(() => {
    const qParams = new URLSearchParams(location.search)
    qParams.delete(SHOW_SKIP_TRIAL_MODAL_QUERY)
    history.replaceState(null, "", `${location.pathname}?${qParams.toString()}`)
    setShowSkipTrialModal(false)
  }, [])

  if (!checkout) {
    return (
      <Theme>
        <RootLayout>
          <LoaderLayout>
            <CheckoutLoaderContainer id={checkoutId} onLoad={setCheckout} />
          </LoaderLayout>
        </RootLayout>
      </Theme>
    )
  }

  return (
    <Theme>
      <RootLayout>
        <CheckoutSuccessContext.Provider value={checkoutValue}>
          <CheckoutSuccessContainer checkout={checkout} />

          {!isClosed && showModal && !showSkipTrialModal && (
            <CheckoutAddProductModalContainer
              checkout={checkout}
              isTrial={isTrial}
              onUpdateCheckout={setCheckout}
              onClose={handleCloseModal}
            />
          )}

          {!isClosed && showSkipTrialModal && isTrial && (
            <SkipTrialModalContainer
              checkout={checkout}
              onApply={setCheckout}
              onClose={handleCloseSkipTrialModal}
            />
          )}
        </CheckoutSuccessContext.Provider>
      </RootLayout>
    </Theme>
  )
}

const RootLayout = styled.div`
  background-color: #f1f3f4;
  padding: 30px 0;

  @media (max-width: 768px) {
    padding: 15px 0;
  }
`

const LoaderLayout = styled.div`
  height: 40vh;
  display: flex;
  justify-content: center;
`

export default App
