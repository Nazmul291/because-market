import React, { useEffect, useMemo } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import useIsTrialCheckout from "../../../hooks/useIsTrialCheckout"
import { trackAttentivePurchaseOnce } from "../../../integrations/attentive"
import { createPurchaseDataEvent } from "../../../integrations/gtm"
import { fbPurchase } from "../../../integrations/tracker"
import CheckoutDetail from "../../components/CheckoutDetail"
import CheckoutGuarantee from "../../components/CheckoutGuarantee"
import CheckoutSupport from "../../components/CheckoutSupport"
import CheckoutOrderSummaryContainer from "../CheckoutOrderSummaryContainer"
import TrialCheckoutOrderSummaryNextContainer from "../TrialCheckoutOrderSummaryNextContainer"
import FAQTrial from "../../components/CheckoutDetail/FAQTrial"
import { getDeliveryRange } from "../../../utils"

const DELIVERY_DAYS_MIN_TRIAL = 5
const DELIVERY_DAYS_MAX_TRIAL = 7
const DELIVERY_DAYS_MIN = 13
const DELIVERY_DAYS_MAX = 16

CheckoutSuccessContainer.propTypes = {
  checkout: PropTypes.object,
}

function CheckoutSuccessContainer({ checkout }) {
  const isTrial = useIsTrialCheckout(checkout)
  const deliveryRangeTrial = useMemo(
    () =>
      getDeliveryRange(
        checkout?.createdAt,
        DELIVERY_DAYS_MIN_TRIAL,
        DELIVERY_DAYS_MAX_TRIAL
      ),
    [checkout]
  )
  const deliveryRange = useMemo(
    () =>
      getDeliveryRange(
        checkout?.createdAt,
        DELIVERY_DAYS_MIN,
        DELIVERY_DAYS_MAX
      ),
    [checkout]
  )

  useEffect(() => {
    trackAttentivePurchaseOnce(checkout)
    createPurchaseDataEvent("purchase", checkout)
    fbPurchase(checkout)
  })

  return (
    <div className="container">
      <Row className="row">
        <LeftColumn
          className={
            isTrial
              ? "col-lg-8 col-md-12 col-sm-12"
              : "col-lg-7 col-md-12 col-sm-12"
          }
        >
          <CheckoutDetail
            checkout={checkout}
            isTrial={isTrial}
            deliveryRange={deliveryRangeTrial}
          />
        </LeftColumn>
        <RightColumn
          className={
            isTrial
              ? "col-lg-4 col-md-12 col-sm-12"
              : "col-lg-5 col-md-12 col-sm-12"
          }
        >
          <CheckoutCheckoutOrderSummaryWrapper>
            <CheckoutOrderSummaryContainer
              checkout={checkout}
              isTrial={isTrial}
            />
          </CheckoutCheckoutOrderSummaryWrapper>
          {isTrial && (
            <CheckoutCheckoutOrderSummaryWrapper>
              <TrialCheckoutOrderSummaryNextContainer
                checkout={checkout}
                isTrial={isTrial}
              />
            </CheckoutCheckoutOrderSummaryWrapper>
          )}
          <CheckoutGuaranteeWrapper>
            <CheckoutGuarantee />
          </CheckoutGuaranteeWrapper>
          <CheckoutSupport />
        </RightColumn>

        {isTrial && <FAQTrial deliveryRange={deliveryRange} />}
      </Row>
    </div>
  )
}

const Row = styled.div`
  @media print {
    flex-wrap: nowrap;
  }
`

const Padding = styled.div`
  padding-bottom: 20px;
`

const LeftColumn = styled.div`
  @media print {
    flex: 0 0 66.6666666667%;
    max-width: 66.6666666667%;
    padding-left: 0;
    padding-right: 0;
  }
`

const RightColumn = styled.div`
  @media (max-width: 768px) {
    padding-top: 20px;
  }

  @media print {
    flex: 0 0 33.3333333333%;
    max-width: 33.3333333333%;
    padding-left: 0;
    padding-right: 0;
  }
`

const CheckoutCheckoutOrderSummaryWrapper = styled(Padding)`
  @media (max-width: 768px) {
    padding-bottom: 0;
  }
`

const CheckoutGuaranteeWrapper = styled(Padding)`
  @media (max-width: 768px) {
    display: none;
  }
`

export default CheckoutSuccessContainer
