import React, { useCallback } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { CheckoutCard, Image } from "../../../rUI"
import { Printer } from "../../../rUI/icons/Printer"
import useCheckoutItems from "../../../hooks/useCheckoutItems"
import HowItWorksTrial from "./HowItWorksTrial"
import HowItWorksNormal from "./HowItWorksNormal"

CheckoutDetail.propTypes = {
  checkout: PropTypes.object,
  isTrial: PropTypes.bool,
  deliveryRange: PropTypes.string,
}

function CheckoutDetail({ checkout, isTrial, deliveryRange }) {
  const items = useCheckoutItems(checkout)

  const confirmEmail = !checkout?.email ? null : (
    <ConfirmEmail>
      A confirmation email has been sent to <span>{checkout.email}</span>, and
      you will receive another email once your Starter Pack ships.
    </ConfirmEmail>
  )

  const lineItems = !items ? null : (
    <Items>
      {items.map((item) => (
        <ProductImg alt={item.title} src={item.imageURL} key={item.id} />
      ))}
    </Items>
  )

  const handlePrintClick = useCallback((e) => {
    e.preventDefault()
    window.print()
  }, [])

  return (
    <>
      <CheckoutCard>
        <Root>
          <Center>
            <Header>Welcome to Because</Header>
            <JoinText>
              Thank you for your order! You’re joining a community of 250,000
              happy customers.
            </JoinText>

            {confirmEmail}
            {lineItems}
          </Center>

          <DesktopPrint>
            <PrintLink href="#" onClick={handlePrintClick}>
              <PrinterIcon width="24px" height="24px" />
              Print receipt
            </PrintLink>
          </DesktopPrint>

          <OrderInfo>
            <ListItems>
              <ListItem>
                <OrderInfoTitle>Order Number</OrderInfoTitle>
                <OrderInfoData>Pending</OrderInfoData>
              </ListItem>
              {/* eslint-disable-next-line react/prop-types */}
              {checkout?.shippingLine && (
                <ListItem>
                  <OrderInfoTitle>Shipping Method</OrderInfoTitle>
                  {/* eslint-disable-next-line react/prop-types */}
                  <OrderInfoData>{checkout.shippingLine.title}</OrderInfoData>
                </ListItem>
              )}
              {!deliveryRange ? null : (
                <ListItem>
                  <OrderInfoTitle>Est. Delivery Date</OrderInfoTitle>
                  <OrderInfoData>{deliveryRange}</OrderInfoData>
                </ListItem>
              )}

              <MobilePrint>
                <PrintLink href="#" onClick={handlePrintClick}>
                  <PrinterIcon width="24px" height="24px" />
                  Print receipt
                </PrintLink>
              </MobilePrint>
            </ListItems>
          </OrderInfo>

          {!isTrial ? (
            <HowItWorksNormal />
          ) : (
            <HowItWorksTrial deliveryRange={deliveryRange} />
          )}
        </Root>
      </CheckoutCard>
    </>
  )
}

const Root = styled.div`
  padding: 53px 66px 20px 76px;
  line-height: 1.47;
  font-size: 17px;

  @media (max-width: 768px) {
    padding: 15px;
    order: 0;
    margin: 15px 0;
    flex: auto;
    font-size: 15px;
    line-height: 1.67;
  }
`

const Center = styled.div`
  text-align: center;
`

const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  font-family: "Helvetica Neue", Arial, sans-serif;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`

const JoinText = styled.p`
  font-size: 20px;
  line-height: normal;
  color: #212121;
  margin: 4px 0 0 0;

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1.33;
    margin: 6px 0 0 0;
  }
`

const ConfirmEmail = styled.div`
  max-width: 485px;
  margin: 24px auto 0 auto;
`

const Items = styled.div`
  margin-top: 24px;
  margin-bottom: 32px;
`

const ProductImg = styled(Image)`
  height: 114px !important; // fix global image style on theme.css
  max-width: 100%;
  margin-right: 1em;

  &:last-child {
    margin-right: 0;
  }
`

const DesktopPrint = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
`

const PrintLink = styled.a`
  color: #44577c;
  text-decoration: none !important; // fix global style

  &:hover,
  &:visited {
    color: #44577c !important; // fix global style
  }

  &:hover {
    text-decoration: underline;
  }
`
const PrinterIcon = styled(Printer)`
  margin-right: 8px;
`

const OrderInfo = styled.div`
  background-color: #f6f6f6;
  border-radius: 8px;
  border: 1px solid #dadada;
  width: 100%;
  padding: 15px 0 18px 0;
  position: relative;
  margin-top: 12px;
`

const ListItems = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0 !important; // fix global ul style on theme.css
  padding: 0 !important; // fix global ul style on theme.css
`

const ListItem = styled.li`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 8px;

  @media (max-width: 768px) {
    width: 50%;
    max-width: 50%;
    flex: auto;

    &:nth-child(2) {
      margin-bottom: 17px !important; // fix global ul style on theme.css
    }
  }
`

const MobilePrint = styled(ListItem)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`

const OrderInfoTitle = styled.div`
  line-height: 1.87;
  font-size: 15px;

  @media (max-width: 768px) {
    font-size: 13px;
    line-height: normal;
  }
`

const OrderInfoData = styled.div`
  line-height: normal;
  font-size: 18px;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`

export default CheckoutDetail
