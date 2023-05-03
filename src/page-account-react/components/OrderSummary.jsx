import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import {
  formatDate,
  formatDateAndTime,
  formatOrderName,
  formatOrderPrice,
  getInvoiceDownloadUrlFromOrder,
} from "../../utils"
import { OrderField } from "./OrderField"
import { PlusIcon } from "../../rUI/icons/PlusIcon"
import { MinusIcon } from "../../rUI/icons/MinusIcon"
import segment from "../../integrations/segment"

const FINANCIAL_STATUSES = {
  AUTHORIZED: "authorized",
  EXPIRED: "expired",
  PAID: "paid",
  PARTIALLY_PAUD: "partially_paid",
  PARTIALLY_REFUNDED: "partially_refunded",
  PENDING: "pending",
  REFUNDED: "refunded",
  UNPAID: "unpaid",
  VOIDED: "voided",
}

const FULFILLMENT_STATUSES = {
  COMPLETE: "complete",
  FULFILLED: "fulfilled",
  PARTIAL: "partial",
  RESTOCKED: "restocked",
  UNFULFILLED: "unfulfilled",
}

const OUTPUT_STATUSES = {
  REFUNDED: "Refunded",
  DELIVERED_SHIPMENT: "Delivered Shipment",
  DELAYED_SHIPMENT: "Delayed Shipment",
  CANCELLED_ORDER: "Cancelled Order",
  IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out For Delivery",
}

const STATUSES_MAP = {
  [OUTPUT_STATUSES.REFUNDED]: [[FINANCIAL_STATUSES.REFUNDED], []],
  [OUTPUT_STATUSES.DELIVERED_SHIPMENT]: [[], [FULFILLMENT_STATUSES.COMPLETE]],
  [OUTPUT_STATUSES.DELAYED_SHIPMENT]: [[], [FULFILLMENT_STATUSES.PARTIAL]],
  [OUTPUT_STATUSES.IN_TRANSIT]: [[0], [0]], // temporary filled with 0 so this status won't be picked
  [OUTPUT_STATUSES.OUT_FOR_DELIVERY]: [[0], [0]], // temporary filled with 0 so this status won't be picked
}

const POSITIVE_STATUSES = [OUTPUT_STATUSES.DELIVERED_SHIPMENT]

const NEGATIVE_STATUSES = [
  OUTPUT_STATUSES.REFUNDED,
  OUTPUT_STATUSES.CANCELLED_ORDER,
]

const getOutputStatus = (order) => {
  if (order.cancelled) {
    return OUTPUT_STATUSES.CANCELLED_ORDER
  }

  const foundStatus = Object.entries(STATUSES_MAP).find(
    ([, matchingStatuses]) => {
      const [financialStatuses, fulfillmentStatuses] = matchingStatuses
      return (
        (financialStatuses.includes(order.financial_status) ||
          !financialStatuses.length) &&
        (fulfillmentStatuses.includes(order.fulfillment_status) ||
          !fulfillmentStatuses.length)
      )
    }
  )

  return foundStatus ? foundStatus[0] : order.fulfillment_status_label
}

OrderSummary.propTypes = {
  expanded: PropTypes.bool,
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
    tracking_urls: PropTypes.array,
  }).isRequired,
}

export function OrderSummary({ expanded = false, order, ...props }) {
  const dateAndTime = useMemo(
    () => formatDateAndTime(order.created_at),
    [order]
  )
  const date = useMemo(() => formatDate(order.created_at), [order])
  const name = useMemo(() => formatOrderName(order.name), [order])
  const subtotal = useMemo(
    () => formatOrderPrice(order.subtotal_price),
    [order]
  )
  const credit = useMemo(() => formatOrderPrice(0), [])
  const total = useMemo(() => formatOrderPrice(order.total_price), [order])
  const invoiceLink = useMemo(
    () => getInvoiceDownloadUrlFromOrder(order),
    [order]
  )

  const status = getOutputStatus(order)

  return (
    <StyledOrderSummary {...props}>
      <OrderField desktop from="1" title={dateAndTime} highlighted>
        {date}
      </OrderField>
      <OrderField
        mobile
        from="1"
        colspan={expanded ? 2 : 1}
        title={dateAndTime}
        highlighted
      >
        <StyledOrderStatus
          positive={POSITIVE_STATUSES.includes(status)}
          negative={NEGATIVE_STATUSES.includes(status)}
        >
          {status}
        </StyledOrderStatus>
        {date}
        {order.tracking_urls.map((url, idx) => (
          <StyledInvoiceLinkMobile
            href={url}
            target="_blank"
            key={url}
            onClick={(e) => {
              e.stopPropagation()

              segment.track("S2-Invoice Page Download Started")
            }}
          >
            Track This Shipment{" "}
            {order.tracking_urls.length > 1 ? `#${idx + 1}` : null}
          </StyledInvoiceLinkMobile>
        ))}
      </OrderField>
      <OrderField desktop>
        <StyledOrderName>{name}</StyledOrderName>
        <StyledInvoiceLink
          href={invoiceLink}
          target="_blank"
          onClick={(e) => e.stopPropagation()}
        >
          Download Invoice
        </StyledInvoiceLink>
      </OrderField>
      <OrderField desktop>
        <StyledOrderStatus
          positive={POSITIVE_STATUSES.includes(status)}
          negative={NEGATIVE_STATUSES.includes(status)}
        >
          {status}
        </StyledOrderStatus>
        {order.tracking_urls.map((url, idx) => (
          <StyledInvoiceLink
            href={url}
            target="_blank"
            key={url}
            onClick={(e) => e.stopPropagation()}
          >
            Track This Shipment{" "}
            {order.tracking_urls.length > 1 ? `#${idx + 1}` : null}
          </StyledInvoiceLink>
        ))}
      </OrderField>
      <OrderField desktop highlighted>
        {subtotal}
      </OrderField>
      <OrderField desktop highlighted positive>
        {credit}
      </OrderField>
      <OrderField desktop={expanded} highlighted mobileTitle="Total">
        {total}
      </OrderField>
      <StyledOrderFieldWithIcon>
        {expanded ? <MinusIcon /> : <PlusIcon />}
      </StyledOrderFieldWithIcon>
    </StyledOrderSummary>
  )
}

const StyledOrderSummary = styled.section`
  display: contents;
  cursor: pointer;

  &.expanded > div {
    border-bottom: none;
  }
`

const StyledOrderFieldWithIcon = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 20px 20px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-top: -1px;
  text-align: center;

  & svg {
    width: 20px;
    height: 20px;
    fill: #566582;
    cursor: pointer;
  }

  & svg:hover {
    opacity: 0.5;
  }
`

const StyledOrderName = styled.div`
  font-size: 16px;
  line-height: 20px;
  white-space: nowrap;

  color: ${({ negative, positive }) =>
    positive ? "#0ACAC0" : negative ? "#F34545" : "inherit"};
`

const StyledOrderStatus = styled.div`
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  font-weight: 600;
  white-space: nowrap;

  color: ${({ negative, positive }) =>
    positive ? "#0ACAC0" : negative ? "#F34545" : "inherit"};
`

const StyledInvoiceLink = styled.a`
  font-size: 13px;
  line-height: 20px;
  color: #6c757d;
  text-decoration: none;
  white-space: nowrap;

  &:hover,
  &:active {
    color: #1e70bf;
    text-decoration: none;
  }
`

const StyledInvoiceLinkMobile = styled.a`
  font-size: 13px;
  line-height: 20px;
  color: #6c757d;
  text-decoration: none;
  white-space: nowrap;
  display: grid;

  &:hover,
  &:active {
    color: #1e70bf;
    text-decoration: none;
  }
`
