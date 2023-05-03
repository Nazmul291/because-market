import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import CheckoutCard from "../../../rUI/CheckoutCard"
import Price, { PriceWithLoading } from "../../../rUI/Price"
import CheckoutItem from "./CheckoutItem"
import useCheckoutItems from "../../../hooks/useCheckoutItems"

CheckoutItems.propTypes = {
  checkout: PropTypes.object,
  isTrial: PropTypes.bool,
}

function CheckoutItems({ checkout = {}, isTrial = false }) {
  const hasCoupons = checkout?.coupons?.length > 0

  const items = useCheckoutItems(checkout)

  const ShippingBody = isTrial ? (
    <ShippingTaxBody>
      <strong>One Time Shipping Charge</strong>
      <strong>
        <Price amountV2={checkout?.shipping} />
      </strong>
    </ShippingTaxBody>
  ) : (
    <ShippingTaxBody>
      <strong>US Shipping</strong>
      <strong>
        <Price amountV2={checkout?.shipping} free />
      </strong>
    </ShippingTaxBody>
  )

  const header = isTrial ? (
    <Header>
      Your <strong>Free Starter Pack</strong> includes:
    </Header>
  ) : (
    <Header>Your order includes:</Header>
  )

  return (
    <StyledCheckoutCard data-is-trial-checkout={isTrial}>
      {header}
      <ItemsLayout>
        {items.map((item) => (
          <CheckoutItem
            key={item.id}
            item={item}
            hideQuantity={isTrial}
            isTrialCheckout={isTrial}
          />
        ))}
      </ItemsLayout>
      <ShippingTaxLayout>{ShippingBody}</ShippingTaxLayout>
      {hasCoupons && (
        <CouponLayout>
          <ShippingTaxBody>
            <strong>Coupon discount</strong>
            <strong>
              -<Price amountV2={checkout?.discount} />
            </strong>
          </ShippingTaxBody>
        </CouponLayout>
      )}
      <TotalLayout>
        <strong>Today's Total</strong>
        <strong>
          <PriceWithLoading loaderSize="28px" amountV2={checkout?.total} free />
        </strong>
      </TotalLayout>
      {!isTrial && (
        <ApplicableTaxesLayout>
          Applicable taxes are calculated after checkout
        </ApplicableTaxesLayout>
      )}
    </StyledCheckoutCard>
  )
}

const StyledCheckoutCard = styled(CheckoutCard)`
  &[data-is-trial-checkout="true"] {
    border: none;
    margin-bottom: 0;
  }
`

const Header = styled.div`
  padding: 0.8rem 20px;
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
  border-bottom: 1px solid var(--theme-checkout-items--border-color);
`

const ItemsLayout = styled.div`
  padding: 25px;
`

const ShippingTaxLayout = styled.div`
  padding: 10px 25px;
  color: var(--theme-checkout-items--shipping-color);
  font-size: 12px;
  font-weight: 500;
  line-height: 19px;
  border-top: 1px solid var(--theme-checkout-items--border-color);
`

const ShippingTaxBody = styled.div`
  display: flex;
  justify-content: space-between;
`

const CouponLayout = styled.div`
  padding: 10px 25px;
  color: var(--theme-color--blue);
  font-size: 12px;
  font-weight: 500;
  line-height: 19px;
  border-top: 1px solid var(--theme-checkout-items--border-color);
`

const TotalLayout = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 25px;
  border-top: 1px solid var(--theme-checkout-items--border-color);
  font-size: 16px;
  line-height: 26px;
`

const ApplicableTaxesLayout = styled.div`
  color: var(--theme-checkout-items--shipping-color);
  font-style: italic;
  font-size: 12px;
  font-weight: 500;
  padding: 10px 25px;
`

export default CheckoutItems
