import React from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { format } from "date-fns"
import { DetailsCard } from "./DetailsCard"
import { OptionColumn } from "./OptionColumn"
import { applyStyleIfHasProperty, noop } from "../../utils"

SubscriptionDeliverySettings.propTypes = {
  nextShipmentDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  onChangeDateClick: PropTypes.func,
  mobile: PropTypes.bool,
  desktop: PropTypes.bool,
}

export function SubscriptionDeliverySettings({
  nextShipmentDate,
  onChangeDateClick = noop,
  mobile,
  desktop,
  ...props
}) {
  const formatDate = () => {
    return nextShipmentDate
      ? format(new Date(nextShipmentDate), "MM/dd/yyyy")
      : format(new Date(), "MM/dd/yyyy")
  }

  return (
    <StyledWrapper desktop={desktop} mobile={mobile}>
      <DetailsCard
        title="Delivery Settings"
        action="Change Shipping Date"
        onActionClick={onChangeDateClick}
        {...props}
      >
        <OptionColumn title="Next shipment:" value={formatDate()} />
      </DetailsCard>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: ${applyStyleIfHasProperty("mobile", "none", "block")};

  @media screen and (max-width: 1024px) {
    display: ${applyStyleIfHasProperty("desktop", "none", "block")};
  }
`
