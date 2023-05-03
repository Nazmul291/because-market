import React, { useEffect, useState } from "react"
import { styled } from "@linaria/react"
import { useCustomerContext } from "../containers/CustomerContext"
import { PageTitle } from "../components/PageTitle"
import { OrderHistory } from "../components/OrderHistory"
import { useDataLoadingState } from "../../hooks"
import { loadUsingDataLoadingState } from "../../utils"
import { getOrdersTracking } from "../../api/marketApi"
import segment from "../../integrations/segment"

export function PageOrderHistory() {
  const { customer } = useCustomerContext()

  const [ordersWithTracking, setOrdersWithTracking] = useState([])
  const [orderTrackingState, setOrderTrackingState] = useDataLoadingState()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
    segment.track("S2-Order History Page Loaded")
  }, [])

  useEffect(() => {
    if (customer.orders) {
      loadUsingDataLoadingState(
        () =>
          getOrdersTracking().then((trackingInfo) =>
            customer.orders.map((order) => ({
              ...order,
              tracking_urls: trackingInfo[order.order_number] || [],
            }))
          ),
        orderTrackingState,
        setOrdersWithTracking,
        setOrderTrackingState
      )
    }
  }, [
    customer,
    orderTrackingState,
    setOrdersWithTracking,
    setOrderTrackingState,
  ])

  return (
    <>
      <PageTitle mobile>
        Order History
        <StyledSubTitle>Easily keep track of your past orders</StyledSubTitle>
      </PageTitle>
      <OrderHistory
        loading={orderTrackingState.loading || !orderTrackingState.loaded}
        orders={ordersWithTracking}
      />
    </>
  )
}

const StyledSubTitle = styled.small`
  display: block;
  color: #566582;
  font-family: "Cooper Lt BT W05 Regular";
  font-size: 20px;
  font-weight: 300;
  line-height: 42px;
  margin-bottom: 0;
  margin-top: -5px;

  @media screen and (max-width: 1024px) {
    font-size: 16px;
    line-height: 30px;
  }
`
