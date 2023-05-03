import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import {
  CHECKOUT_ID_QUERY,
  SHOW_ADDITIONAL_MODAL_QUERY,
  SHOW_SKIP_TRIAL_MODAL_QUERY,
  TEMPLATE_NAME_QUERY,
  CHECKOUT_SUCCESS_FUNNEL_TEMPLATE_NAME,
} from "../const"
import Theme from "../rUI/Theme"
import { encodeId, isTrialCheckout } from "../utils"
import CheckoutContainer from "./containers/CheckoutContainer"
import { cartClear } from "../api/shopifyApi"
import mixpanel from "../integrations/mixpanel"

App.propTypes = {
  checkoutId: PropTypes.string,
}

function App({ checkoutId }) {
  const handleComplete = useCallback((checkout) => {
    const isTrial = isTrialCheckout(checkout)

    cartClear()

    sessionStorage.removeItem(encodeId(checkout.id))
    mixpanel.track("orderCompleted")
    mixpanel.track("Order Processed", { funnelType: "store2" })

    const qParams = new URLSearchParams({
      [CHECKOUT_ID_QUERY]: checkout.id,
      [SHOW_ADDITIONAL_MODAL_QUERY]: 1,
    })

    if (isTrial) {
      qParams.append(SHOW_SKIP_TRIAL_MODAL_QUERY, 1)
      qParams.append(TEMPLATE_NAME_QUERY, CHECKOUT_SUCCESS_FUNNEL_TEMPLATE_NAME)
    }

    location.href = `/pages/checkout-success?${qParams.toString()}`
  }, [])

  return (
    <Theme>
      <RootLayout>
        <CheckoutContainer
          checkoutId={checkoutId}
          onComplete={handleComplete}
        />
      </RootLayout>
    </Theme>
  )
}

const RootLayout = styled.div`
  background-color: #f1f3f4;
  padding: 30px 0;

  @media (max-width: 575px) {
    padding: 0;
  }
`

export default App
