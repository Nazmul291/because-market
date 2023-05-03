import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import Price from "../../../rUI/Price"
import Image from "../../../rUI/Image"

CheckoutItem.propTypes = {
  item: PropTypes.object,
  hideQuantity: PropTypes.bool,
  isTrialCheckout: PropTypes.bool,
}
function CheckoutItem({ item, hideQuantity = false, isTrialCheckout = false }) {
  const [itemTitle, optionsTitle] = useMemo(() => {
    const arr = item.title.split(/\s\/\s+?/)

    return [arr.shift(), arr.join(", ")]
  }, [item])

  return (
    <RootLayout>
      <ItemImgLayout>
        <ItemImg src={item.imageURL} alt={item.title} />
      </ItemImgLayout>

      <ItemDetailLayout data-is-trial-checkout={isTrialCheckout}>
        <div>
          <div>
            <strong>{itemTitle}</strong>
          </div>

          {optionsTitle && <div>{optionsTitle}</div>}
        </div>

        {!item.type ? null : <div>Subscription: {item.type}</div>}

        {hideQuantity ? null : <div>Quantity: {item.quantity}</div>}
      </ItemDetailLayout>

      <ItemPrice data-is-trial-checkout={isTrialCheckout}>
        <Price amountV2={item.amount} free />
      </ItemPrice>
    </RootLayout>
  )
}

const RootLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 1rem;

  &:first-child {
    padding-top: 0;
  }
`

const ItemImgLayout = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 0 0 25%;
  max-width: 25%;
`

const ItemImg = styled(Image)`
  width: 50%;
  margin: 15px 0;
`

const ItemDetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  color: rgb(0, 0, 0);
  font-size: 14px;
  line-height: 1.2;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 10px;
  max-width: 46.3333%;
  flex: 0 0 46.3333%;

  &[data-is-trial-checkout="true"] {
    flex: 1;
    max-width: inherit;
  }
`

const ItemPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 14px;
  font-weight: 600;
  flex: 1;

  &[data-is-trial-checkout="true"] {
    flex: inherit;
  }
`

export default CheckoutItem
