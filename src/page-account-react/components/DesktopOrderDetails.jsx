import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { OrderField } from "./OrderField"
import RenderHtml from "../../rUI/RenderHtml"

DesktopOrderDetails.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      quantity: PropTypes.number,
      line_price: PropTypes.string,
    })
  ),
}

export function DesktopOrderDetails({ items = [] }) {
  return items.map((item) => (
    <StyledOrderItem key={item.id}>
      <OrderField from="2" colspan="2" desktop>
        {item.quantity} x <RenderHtml html={item.title} tagName="span" />
      </OrderField>
      <OrderField from="4" colspan="1" desktop>
        $ {item.line_price}
      </OrderField>
    </StyledOrderItem>
  ))
}

const StyledOrderItem = styled.div`
  display: contents;

  & > div {
    border-top: none;
    border-bottom: none;
  }
`
