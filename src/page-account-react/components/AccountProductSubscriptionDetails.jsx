import React from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { applyStyleIfHasProperty, formatDollarPrice } from "../../utils"

AccountProductSubscriptionDetails.propTypes = {
  variant: PropTypes.shape({
    selectedOptions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    price: PropTypes.string,
    priceV2: PropTypes.shape({
      amount: PropTypes.string,
      currencyCode: PropTypes.string,
    }),
  }),
}

const PRICE_PLACEHOLDER = "N/A"

export function AccountProductSubscriptionDetails({ variant, ...props }) {
  let pricePerItem = variant?.priceV2

  if (variant) {
    const quantityOption = variant.selectedOptions.find(({ name }) =>
      name.toLocaleLowerCase().includes("quantity")
    )

    pricePerItem = quantityOption
      ? (
          parseFloat(variant.priceV2.amount) / parseFloat(quantityOption.value)
        ).toFixed(2)
      : variant.priceV2
  }

  return (
    <StyledSubscriptionDetailsContainer {...props}>
      <StyledSubscriptionTitle>Subscription</StyledSubscriptionTitle>
      <StyledSubscriptionDetailsRow>
        <StyledSubscriptionDetailsLabel>
          Per piece
        </StyledSubscriptionDetailsLabel>
        <StyledSubscriptionDetailsValue>
          {variant ? formatDollarPrice(pricePerItem) : PRICE_PLACEHOLDER}
        </StyledSubscriptionDetailsValue>
      </StyledSubscriptionDetailsRow>
      <StyledSubscriptionDetailsRow>
        <StyledSubscriptionDetailsLabel>Total</StyledSubscriptionDetailsLabel>
        <StyledSubscriptionDetailsValue large>
          {variant
            ? formatDollarPrice(variant.priceV2.amount)
            : PRICE_PLACEHOLDER}
        </StyledSubscriptionDetailsValue>
      </StyledSubscriptionDetailsRow>
    </StyledSubscriptionDetailsContainer>
  )
}

const StyledSubscriptionDetailsContainer = styled.section`
  padding: 14px 0 24px;
  width: 45%;
`

const StyledSubscriptionTitle = styled.h4`
  color: #87827c;
  font-family: "Graphik Semibold";
  font-size: 18px;
  font-weight: 500;
  line-height: 17px;
`

const StyledSubscriptionDetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const StyledSubscriptionDetailsLabel = styled.label`
  color: #87827c;
  font-family: "Graphik Semibold";
  font-size: 15px;
  font-weight: 500;
  line-height: 17px;
  margin: 0;
  padding: 0;
`

const StyledSubscriptionDetailsValue = styled.span`
  color: #566582;
  font-family: "Cooper Md BT W05 Regular";
  font-size: ${applyStyleIfHasProperty("large", "22px", "18px")};
  font-weight: 700;
  line-height: 42.09px;
`
