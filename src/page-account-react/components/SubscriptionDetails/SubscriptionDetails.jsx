import React, { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import add from "date-fns/add"
import { AccountSection } from "../AccountSection"
import { SubscriptionDetailsItem } from "./SubscriptionDetailsItem"
import { SubscriptionDetailsTitle } from "./SubscriptionDetailsTitle"
import { SubscriptionDeliverySettings } from "./SubscriptionDeliverySettings"
import { withLoading } from "../../../hocs/withLoading"
import { noop, openNewTabWithURL } from "../../../utils"
import { RETRIAL_GOOGLE_FORM_URL } from "../../../const"
import { useCustomerContext } from "../../containers/CustomerContext"
import { ModalWindow, Skeleton, StrokedButton } from "../../../rUI"
import { ChangeShippingDateForm } from "../ChangeShippingDateForm"
import segment from "../../../integrations/segment"

const ACTIVE_STATE = "active"

SubscriptionDetailsComponent.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.node,
  onCancel: PropTypes.func,
  onEdit: PropTypes.func,
  onDateChanged: PropTypes.func,
}

function SubscriptionDetailsComponent({
  subscriptions,
  loading,
  error,
  onCancel = noop,
  onEdit = noop,
  onDateChanged = noop,
  ...props
}) {
  const { customer } = useCustomerContext()

  const [active, setActive] = useState(false)
  const [nextShipmentDate, setNextShipmentDate] = useState(null)
  const [changeDatePopupShown, setChangeDatePopupShown] = useState(false)

  const handleOpenDatePopup = useCallback(() => {
    setChangeDatePopupShown(true)
    segment.track("S2-Delivery Calendar Opened")
  }, [])

  const handleCloseDatePopup = useCallback(() => {
    setChangeDatePopupShown(false)
    segment.track("S2-Calendar Cancel Button Clicked")
  }, [])

  const handleDateChanged = useCallback(
    (newDate) => {
      onDateChanged(newDate)
      setNextShipmentDate(new Date(newDate))
      handleCloseDatePopup()
    },
    [onDateChanged, handleCloseDatePopup]
  )

  const minDate = add(new Date(), { days: 1 })
  const maxDate = add(new Date(), { months: 2 })

  const popup = (
    <ModalWindow
      appElement={"#MainContent"}
      fullScreen={true}
      open={Boolean(changeDatePopupShown)}
      children={
        <ChangeShippingDateForm
          minDate={minDate}
          maxDate={maxDate}
          currentDate={nextShipmentDate}
          startDate={nextShipmentDate}
          onSubmit={handleDateChanged}
          onCancel={handleCloseDatePopup}
        />
      }
      onCloseModal={handleCloseDatePopup}
    />
  )

  const handleGetNewStarterPackClick = useCallback(() => {
    segment.track("S2-Starter pack button click")
    const url = `${RETRIAL_GOOGLE_FORM_URL}${customer.email}`
    openNewTabWithURL(url)
  }, [customer])

  useEffect(() => {
    if (subscriptions && subscriptions.length) {
      setActive(subscriptions[0].state === ACTIVE_STATE)
      setNextShipmentDate(new Date(subscriptions[0].currentPeriodEndsAt))
    }
  }, [subscriptions, setActive])

  return (
    <>
      <AccountSection
        title={
          <>
            <span>Subscription details</span>
            {!error && active && (
              <SubscriptionDetailsTitle
                active={active}
                onCancel={onCancel}
                subscriptions={subscriptions}
              />
            )}
          </>
        }
        loading={loading}
        error={error}
        {...props}
      >
        {!error && active && (
          <>
            <StyledDescription>
              You can easily control your subscription settings:
            </StyledDescription>
            <StyledSubscriptionContainer>
              {subscriptions.map((product, idx) => (
                <StyledItemContainer key={`${product.id}__${idx}`}>
                  <SubscriptionDetailsItem
                    product={product}
                    onActionClick={() => onEdit(product)}
                    style={{ gridColumn: 1 }}
                  />
                  {!idx && (
                    <SubscriptionDeliverySettings
                      style={{ gridColumn: 2 }}
                      nextShipmentDate={nextShipmentDate}
                      onChangeDateClick={handleOpenDatePopup}
                      desktop
                    />
                  )}
                </StyledItemContainer>
              ))}
              <SubscriptionDeliverySettings
                nextShipmentDate={nextShipmentDate}
                onChangeDateClick={handleOpenDatePopup}
                mobile
              />
            </StyledSubscriptionContainer>
          </>
        )}

        {!error && !active && (
          <>
            <StyledDescription>Get a New Starter Pack</StyledDescription>
            <StyledRow>
              <StyledSubdescription>
                You can receive a new starter pack at any time.
                <br />
                You’ll restart your trial period.
              </StyledSubdescription>
              <StyledButtonContainer>
                <StrokedButton
                  type="button"
                  onClick={handleGetNewStarterPackClick}
                >
                  Get New Starter Pack
                </StrokedButton>
              </StyledButtonContainer>
            </StyledRow>
            <StyledRow>
              <StyledDescription>Your plan is Not Active</StyledDescription>
              <StyledButtonContainer>
                <StrokedButton type="button" onClick={onCancel}>
                  Cancel Plan
                </StrokedButton>
              </StyledButtonContainer>
            </StyledRow>
          </>
        )}
      </AccountSection>
      {popup}
    </>
  )
}

const StyledItemContainer = styled.div`
  display: contents;
`

const StyledDescription = styled.p`
  color: #9699a3;
  font-family: Helvetica, sans-serif;
  font-size: 17px;
  margin: 12px 0 16px 0;
`

const StyledSubscriptionContainer = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  border: none;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
`

const StyledSubdescription = styled.div`
  margin-bottom: 0;

  @media only screen and (max-width: 1024px) {
    margin-bottom: 16px;
  }
`

const StyledButtonContainer = styled.div`
  width: auto;

  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`

const SubscriptionDetails = withLoading(
  SubscriptionDetailsComponent,
  <Skeleton style={{ height: "365px", margin: "5px 0 50px" }} />
)

export default SubscriptionDetails
