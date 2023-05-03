import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

import { OrderSummary } from "./OrderSummary"
import { OrderDetails } from "./OrderDetails"

OrderHistoryItem.propTypes = {
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

export function OrderHistoryItem({ order }) {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = useCallback(
    () => setExpanded(!expanded),
    [expanded, setExpanded]
  )

  return (
    <StyledOrderHistoryItem>
      <OrderSummary
        order={order}
        expanded={expanded}
        onClick={toggleExpanded}
        className={expanded ? "expanded" : null}
      />
      <OrderDetails order={order} className={!expanded ? "hidden" : null} />
    </StyledOrderHistoryItem>
  )
}

const StyledOrderHistoryItem = styled.section`
  display: contents;

  & .hidden {
    display: none;
  }
`
