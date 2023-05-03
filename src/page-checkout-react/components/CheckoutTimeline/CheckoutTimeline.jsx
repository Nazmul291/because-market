import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../../utils"

CheckoutTimeline.propTypes = {
  step: PropTypes.number,
  onStep: PropTypes.func,
}

function CheckoutTimeline({ step = 1, onStep = noop }) {
  const isNext = step < 2

  const handleClickShipping = () => {
    onStep(1)
  }

  const handleClickPayment = () => {
    onStep(2)
  }

  return (
    <RootLayout>
      <Numbers>
        {step === 1 ? (
          <NumberE onClick={handleClickShipping}>1</NumberE>
        ) : (
          <NumberECompleted onClick={handleClickShipping}>✓</NumberECompleted>
        )}
        <Divider isActive={step === 2} />
        <NumberE isNext={isNext} onClick={handleClickPayment}>
          2
        </NumberE>
      </Numbers>

      <Titles>
        <Title onClick={handleClickShipping}>Shipping Details</Title>
        <Title isNext={isNext} onClick={handleClickPayment}>
          Complete Order
        </Title>
      </Titles>
    </RootLayout>
  )
}

const RootLayout = styled.div`
  width: 100%;
`

const Numbers = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  margin: auto;
`

const Titles = styled.div`
  display: flex;
  width: 65%;
  justify-content: space-between;
  margin: auto;
`

const NumberE = styled.div`
  width: 25px;
  height: 25px;
  color: var(--theme-color--white);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  align-self: center;

  background-color: ${(props) =>
    !props.isNext ? "var(--theme-color--black)" : "var(--theme-color--gray)"};
`

const NumberECompleted = styled(NumberE)`
  background-color: var(--theme-color--gray);
`

const Divider = styled.div`
  flex-grow: 1;
  border-bottom: 3px solid var(--theme-color--gray);

  border-bottom-color: ${(props) =>
    !props.isActive ? "var(--theme-color--gray)" : "var(--theme-color--black)"};
`

const Title = styled.div`
  margin-top: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  color: ${(props) =>
    !props.isNext ? "inherits" : "var(--theme-color--gray)"};
`

export default CheckoutTimeline
