import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { OrderHistoryItem } from "./OrderHistoryItem"
import { applyStyleIfHasProperty } from "../../utils"
import { ShoppingBagIcon } from "../../rUI/icons/ShoppingBagIcon"
import { withLoading } from "../../hocs/withLoading"
import { Skeleton } from "../../rUI"

OrderHistoryComponent.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({})),
}

const ORDER_COLUMNS = {
  created_at: "Date",
  name: "Order Number",
  status: "Order status",
  subtotal: "Subtotal",
  credit: "Credit",
  total: "Total",
  action: "",
}

const MOBILE_ORDER_COLUMNS = {
  created_at: "Date",
  total: "Total",
  action: "",
}

function OrderHistoryComponent({ orders = [] }) {
  return orders.length ? (
    <StyledOrderHistory>
      {Object.entries(ORDER_COLUMNS).map(([key, title]) => {
        const mobileKeys = Object.keys(MOBILE_ORDER_COLUMNS)

        return (
          <StyledOrderHistoryColumnTitle
            key={key}
            data-column={key}
            desktop={!mobileKeys.includes(key)}
          >
            {title}
          </StyledOrderHistoryColumnTitle>
        )
      })}
      {orders.map((order) => (
        <OrderHistoryItem key={order.name} order={order} />
      ))}
    </StyledOrderHistory>
  ) : (
    <StyledNoOrdersMessage>
      <StyledShoppingBagIcon /> No previous orders
    </StyledNoOrdersMessage>
  )
}

const StyledNoOrdersMessage = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #573a08;
  border-radius: 2px;
  background-color: #fffaf3;
  color: #573a08;
  padding: 20px;

  @media screen and (max-width: 1024px) {
    margin: 15px 10px 0;
    padding: 10px;
    font-weight: 800;
  }
`

const StyledShoppingBagIcon = styled(ShoppingBagIcon)`
  height: 40px;
  margin: 0 20px 0 0;
  fill: #573a08;
`

const StyledOrderHistory = styled.section`
  display: grid;
  grid-template-columns: repeat(${Object.keys(ORDER_COLUMNS).length - 1}, 1fr) 26px;

  @media screen and (max-width: 1024px) {
    grid-template-columns:
      repeat(${Object.keys(MOBILE_ORDER_COLUMNS).length - 1}, 1fr)
      40px;
    margin: 0 15px;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }
`

const StyledOrderHistoryColumnTitle = styled.strong`
  padding: 20px 10px 20px 20px;
  font-family: "Graphik Medium";
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.09px;

  @media screen and (max-width: 1024px) {
    display: ${applyStyleIfHasProperty("desktop", "none")};
    display: none;
  }
`

const StyledSkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 0.5em;
  margin-bottom: 1rem;
  padding-top: 10px;
`

const StyledSkeleton = styled(Skeleton)`
  width: 100%;
  height: 2em;

  &:last-of-type {
    width: 50%;
  }
`

export const OrderHistory = withLoading(
  OrderHistoryComponent,
  <StyledSkeletonContainer>
    {new Array(5).fill().map((item, idx) => (
      <StyledSkeleton key={idx} />
    ))}
  </StyledSkeletonContainer>
)
