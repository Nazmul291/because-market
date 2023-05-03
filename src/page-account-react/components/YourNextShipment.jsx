import React, { useMemo, useState, useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import add from "date-fns/add"
import { useNavigate } from "react-router-dom"
import { noop, createHrefToPage } from "../../utils"
import { ShipmentStats } from "./ShipmentStats"
import { ShipmentActions } from "./ShipmentActions"
import { ShipmentProducts } from "./ShipmentProducts"
import { START_SHOPPING_URL } from "../../const"
import { withLoading } from "../../hocs/withLoading"
import ModalWindow from "../../rUI/ModalWindow"
import { ChangeShippingDateForm } from "./ChangeShippingDateForm"
import Skeleton from "../../rUI/Skeleton"
import { ALL_PRODUCTS } from "../route-const"
import segment from "../../integrations/segment"

YourNextShipmentComponent.propTypes = {
  shipment: PropTypes.object,
  error: PropTypes.node,
  promoState: PropTypes.object,
  onDateChanged: PropTypes.func,
  onViewProductDetails: PropTypes.func,
  onPromoSubmit: PropTypes.func,
}

function YourNextShipmentComponent({
  shipment,
  error,
  promoState,
  onDateChanged = noop,
  onViewProductDetails = noop,
  onPromoSubmit = noop,
  ...props
}) {
  // trackEvent(TYPE_MIXPANEL, "S2-Membership Plan Page Loaded")
  segment.track("S2-Membership Plan Page Loaded")
  const navigate = useNavigate()

  const date = useMemo(
    () =>
      shipment &&
      shipment?.items &&
      shipment.items.length &&
      shipment.items[0].currentPeriodStartedAt &&
      new Date(shipment.items[0].currentPeriodStartedAt),
    [shipment]
  )

  const formattedDate = useMemo(
    () =>
      date
        ? new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(date)
        : "",
    [date]
  )

  const [changeDateFormShown, setChangeDateFormShown] = useState(false)
  const [currentDate, setCurrentDate] = useState(date)

  const handleAddMoreProducts = useCallback(() => {
    segment.track("S2-Add more items clicked")
    navigate(createHrefToPage(ALL_PRODUCTS))
  }, [navigate])

  const handleCloseChangeDatePopup = useCallback(() => {
    document.body.style.overflow = "auto"
    setChangeDateFormShown(false)
    segment.track("S2-Calendar Cancel Button Clicked")
  }, [setChangeDateFormShown])

  const handleDateChanged = useCallback(
    (newDate) => {
      onDateChanged(newDate)
      setCurrentDate(newDate)
      handleCloseChangeDatePopup()
    },
    [onDateChanged, setCurrentDate, handleCloseChangeDatePopup]
  )

  const handleOnChangeDate = useCallback(() => {
    segment.track("S2-Calendar Loaded")
    setChangeDateFormShown(true)
  }, [setChangeDateFormShown])

  const minDate = add(new Date(), { days: 1 })
  const maxDate = add(new Date(), { months: 2 })

  const popup = (
    <ModalWindow
      appElement={"#MainContent"}
      fullScreen={true}
      open={Boolean(changeDateFormShown)}
      children={
        <ChangeShippingDateForm
          minDate={minDate}
          maxDate={maxDate}
          currentDate={currentDate}
          startDate={date}
          onSubmit={handleDateChanged}
          onCancel={handleCloseChangeDatePopup}
        />
      }
      onCloseModal={handleCloseChangeDatePopup}
    />
  )

  return error ? (
    <StyledShipmentContainer {...props}>
      <StyledError>
        An error occurred during the loading your subscription information.
        <br />
        Please try to reload the web page or contact support.
      </StyledError>
    </StyledShipmentContainer>
  ) : shipment && shipment.items?.length ? (
    <>
      <StyledShipmentContainer {...props}>
        <StyledShipmentRow>
          <StyledShipmentHeading>
            <span>Your next shipment</span>
            <StyledShipmentSubheading>
              <span>Ships:</span> {formattedDate}
            </StyledShipmentSubheading>
          </StyledShipmentHeading>
          <ShipmentStats desktop shipment={shipment} />
        </StyledShipmentRow>
        <ShipmentActions
          promo={shipment?.redemptionCoupons}
          promoState={promoState}
          onChangeDate={handleOnChangeDate}
          onPromoSubmit={onPromoSubmit}
        />
        <ShipmentProducts
          products={shipment.items || []}
          onAddMoreProducts={handleAddMoreProducts}
          onViewProductDetails={onViewProductDetails}
        />
        <ShipmentStats mobile shipment={shipment} />
        <StyledAddMoreItemsButton onClick={handleAddMoreProducts}>
          Add more items
        </StyledAddMoreItemsButton>
      </StyledShipmentContainer>
      {popup}
    </>
  ) : (
    <>
      <StyledNoSubscriptionMessage>
        You have no active subscriptions.{" "}
        <a href={START_SHOPPING_URL} target="_blank" rel="noreferrer">
          Start shopping!
        </a>
      </StyledNoSubscriptionMessage>
      {popup}
    </>
  )
}

const StyledShipmentContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-bottom: 1rem;
  background-color: #f5f7f9;
  color: #566582;
  border: 1px solid rgba(86, 101, 130, 0.17);
  border-radius: 5px;

  @media screen and (max-width: 1024px) {
    margin: 0 10px;
  }
`

const StyledShipmentRow = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 14px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`

const StyledShipmentHeading = styled.h2`
  display: flex;
  flex-direction: column;
  font-family: "Cooper Md BT W05 Regular";
  font-size: 28px;
  font-weight: 500;
  letter-spacing: -0.1px;
  white-space: nowrap;
  line-height: 34px;
  color: #566582;
  padding-bottom: 0;
  padding-left: 10px;
  margin-bottom: 0;
`

const StyledShipmentSubheading = styled.small`
  font-family: "Cooper Lt BT W05 Regular";
  font-size: 17px;
  font-weight: 300;
  line-height: 42px;
  margin-bottom: 0;
  margin-top: -5px;

  @media screen and (max-width: 1024px) {
    line-height: 1.5em;
    padding: 0.75em 0;

    & span {
      display: block;
      color: #9699a3;
      font-size: 14px;
      font-weight: 500;
    }
  }
`

const StyledAddMoreItemsButton = styled.button`
  display: none;
  height: 55px;
  margin-top: 20px;
  background-color: #566582;
  color: #fff;
  font-family: "Graphik Semibold";
  font-size: 14px;
  font-weight: 600;
  border: none;
  outline: none;
  border-radius: 5px;

  @media screen and (max-width: 1024px) {
    display: block;
  }
`

const StyledNoSubscriptionMessage = styled.p`
  font-family: "Cooper Lt BT W05 Regular";
  font-size: 16px;
  font-weight: normal;
  color: #566582;
  margin: 0;
  padding: 16px 40px;
  margin-bottom: 10px;
  border: 1px solid rgba(86, 101, 130, 0.15);
  border-radius: 8px;
  box-shadow: 0 2px 4px 3px rgb(0 0 0 / 10%);

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }
`

const StyledError = styled.div`
  text-align: center;
`

const StyledSkeletonContainer = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 16px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 2.5em 1.5em 1.5em 320px;
  margin-bottom: 2rem;
`

const StyledSkeleton = styled(Skeleton)`
  width: 100%;
  height: 100%;
`

export const YourNextShipment = withLoading(
  YourNextShipmentComponent,
  <StyledSkeletonContainer>
    <StyledSkeleton style={{ gridColumn: "1 / span 4" }} />
    <StyledSkeleton style={{ gridColumn: "1 / span 2" }} />
    <StyledSkeleton style={{ gridColumn: "1 / span 2" }} />
    <StyledSkeleton style={{ gridColumn: "1" }} />
    <StyledSkeleton />
    <StyledSkeleton />
    <StyledSkeleton />
  </StyledSkeletonContainer>
)
