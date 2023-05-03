import React, { memo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { withLoading } from "../../../hocs/withLoading"
import { PageTitle } from "../PageTitle"
import { WeeklyOffersItem } from "./components/WeeklyOffersItem"
import { Skeleton } from "../../../rUI"

WeeklyOffersComponent.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
  hasNextShipment: PropTypes.bool,
  shipment: PropTypes.shape({}),
  pdpId: PropTypes.string,
  onSubscribe: PropTypes.func,
  onAddToNextBoxOnly: PropTypes.func,
  onBuyItNow: PropTypes.func,
}

function WeeklyOffersComponent({
  offers,
  hasNextShipment,
  shipment,
  pdpId,
  onSubscribe,
  onAddToNextBoxOnly,
  onBuyItNow,
  ...props
}) {
  return offers?.length ? (
    <StyledWeeklyOffersContainer {...props}>
      <PageTitle mobile>
        Weekly Offers
        <StyledWeeklyOffersCounter>{offers.length}</StyledWeeklyOffersCounter>
      </PageTitle>
      <StyledWeeklyOffersList>
        {offers.map((product) => (
          <WeeklyOffersItem
            key={product.id}
            product={product}
            hasNextShipment={hasNextShipment}
            shipment={shipment}
            pdpId={pdpId}
            onSubscribe={onSubscribe}
            onAddToNextBoxOnly={onAddToNextBoxOnly}
            onBuyItNow={onBuyItNow}
          />
        ))}
      </StyledWeeklyOffersList>
    </StyledWeeklyOffersContainer>
  ) : null
}

const StyledWeeklyOffersContainer = styled.section`
  padding-top: 10px;
  margin-bottom: 1rem;

  @media screen and (max-width: 1024px) {
    margin: 0 10px;
    padding-top: 40px;
  }
`

const StyledWeeklyOffersList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
  border: 1px solid rgba(86, 101, 130, 0.09);
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px 3px rgb(0 0 0 / 2%);

  @media screen and (max-width: 1024px) {
    margin-top: 40px;
    padding: 0;
    border: none;
    border-radius: 0;
    box-shadow: none;
    background-color: transparent;
  }
`

const StyledWeeklyOffersCounter = styled.span`
  position: relative;
  top: -0.25em;
  display: inline-block;
  background-color: #0be5da;
  color: #fff;
  min-width: 2em;
  min-height: 2em;
  padding: 0.5em;
  margin-left: 7px;
  font-size: 18px;
  line-height: 1em;
  text-align: center;
  border-radius: 50%;
`

const StyledSkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 2em 195px;
  margin-bottom: 1rem;
  padding-top: 10px;
`

const StyledSkeleton = styled(Skeleton)`
  width: 100%;
  height: 100%;
`

const WeeklyOffers = withLoading(
  WeeklyOffersComponent,
  <StyledSkeletonContainer>
    <StyledSkeleton style={{ gridColumn: "1 / 1" }} />
    <StyledSkeleton style={{ gridColumn: "1 / span 2" }} />
  </StyledSkeletonContainer>
)

export default memo(WeeklyOffers)
