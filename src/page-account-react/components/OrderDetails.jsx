import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { DesktopOrderDetails } from "./DesktopOrderDetails"
import { MobileOrderDetails } from "./MobileOrderDetails"

OrderDetails.propTypes = {
  order: PropTypes.shape({
    created_at: PropTypes.string,
    name: PropTypes.string,
    fulfillment_status_label: PropTypes.string,
    subtotal_price: PropTypes.number,
    total_price: PropTypes.number,
    subtotal_line_items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        quantity: PropTypes.number,
        line_price: PropTypes.string,
      })
    ),
  }).isRequired,
}

export function OrderDetails({ order, ...props }) {
  return (
    <StyledOrderDetails {...props}>
      <DesktopOrderDetails items={order.subtotal_line_items} />
      <MobileOrderDetails order={order} />
    </StyledOrderDetails>
  )
}

const StyledOrderDetails = styled.section`
  display: contents;
`
