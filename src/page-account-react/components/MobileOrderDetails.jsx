import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { OrderField } from "./OrderField"
import {
  applyStyleIfHasProperty,
  formatOrderName,
  formatOrderPrice,
  getInvoiceDownloadUrlFromOrder,
} from "../../utils"

MobileOrderDetails.propTypes = {
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

export function MobileOrderDetails({ order }) {
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

  return (
    <OrderField mobile from="1" colspan="3">
      <StyledDetailsGrid>
        <StyledGridRow>
          <StyledGridCell>Order Number</StyledGridCell>
          <StyledGridCell from="2" colspan="2">
            <StyledOrderName>{name}</StyledOrderName>
            <StyledInvoiceLink href={invoiceLink} target="_blank">
              Download Invoice
            </StyledInvoiceLink>
          </StyledGridCell>
        </StyledGridRow>
      </StyledDetailsGrid>
      <StyledDetailsGrid>
        {order.subtotal_line_items.map((item) => (
          <StyledGridRow key={item.id}>
            <StyledGridCell from="1" colspan="2">
              {item.quantity} x {item.title}
            </StyledGridCell>
            <StyledGridCell highlighted>$ {item.line_price}</StyledGridCell>
          </StyledGridRow>
        ))}
      </StyledDetailsGrid>
      <StyledDetailsGrid>
        <StyledGridRow>
          <StyledGridCell from="1" colspan="2">
            Subtotal
          </StyledGridCell>
          <StyledGridCell highlighted>{subtotal}</StyledGridCell>
        </StyledGridRow>
        <StyledGridRow>
          <StyledGridCell from="1" colspan="2">
            Credit
          </StyledGridCell>
          <StyledGridCell highlighted positive>
            {credit}
          </StyledGridCell>
        </StyledGridRow>
        <StyledGridRow>
          <StyledGridCell from="1" colspan="2">
            Total
          </StyledGridCell>
          <StyledGridCell highlighted>{total}</StyledGridCell>
        </StyledGridRow>
      </StyledDetailsGrid>
    </OrderField>
  )
}

const StyledDetailsGrid = styled.section`
  display: grid;
  grid-template-columns: 50% 25% 25%;
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  padding-bottom: 5px;
  margin-right: 10px;
  margin-bottom: 16px;

  &:last-of-type {
    border-bottom: none;
    padding-top: 16px;
    margin-bottom: 0;
  }
`

const StyledGridRow = styled.div`
  display: contents;

  & > div:last-child {
    text-align: right;
  }
`

const StyledGridCell = styled.div`
  padding: 0 0 10px;
  color: ${applyStyleIfHasProperty("positive", "#0acac0")};
  font-size: 14px;
  font-family: ${applyStyleIfHasProperty("highlighted", '"Graphik Semibold"')};
  font-weight: ${applyStyleIfHasProperty("highlighted", 600)};
  line-height: 1.6em;
  grid-column: ${({ from, colspan }) =>
    from ? (colspan ? `${from} / span ${colspan}` : `${from} / auto`) : "auto"};
`

const StyledOrderName = styled.div`
  font-size: 16px;
  line-height: 20px;
`

const StyledInvoiceLink = styled.a`
  font-size: 13px;
  line-height: 20px;
  color: #6c757d;
  text-decoration: none;

  &:hover,
  &:active {
    color: #1e70bf;
    text-decoration: none;
  }
`
