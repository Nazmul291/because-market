import { styled } from "@linaria/react"

const CheckoutCard = styled.div`
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: var(--theme-checkout-card--color);
  background-color: var(--theme-checkout-card--background-color);
  border: solid 1px var(--theme-checkout-card--border-color);

  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0px;
  }
`

export default CheckoutCard
