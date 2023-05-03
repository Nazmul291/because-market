import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../../utils"
import Button from "../../../rUI/Button"
import Modal from "../../../rUI/Modal"

CheckoutLoginErrorModal.propTypes = {
  onContinueClick: PropTypes.func,
}

function CheckoutLoginErrorModal({ onContinueClick = noop, ...props }) {
  return (
    <Modal {...props}>
      <Root>
        <Title>
          <TitleP>Oops! The information you entered was incorrect</TitleP>
        </Title>

        <Body>
          Receive you personalized link to access you account and manage your
          subscription.
        </Body>

        <Footer>
          <Button onClick={onContinueClick}>Receive account link</Button>
        </Footer>
      </Root>
    </Modal>
  )
}

const Root = styled.div`
  max-width: 420px;
`

const Title = styled.div`
  text-align: center;
  color: var(--theme-color--blue);
`

const TitleP = styled.p`
  font-weight: bold;
  font-size: 24px;
`

const Body = styled.div`
  padding: 0 20px;
  text-align: center;
  color: var(--theme-color--gray5);
`

const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`

export default CheckoutLoginErrorModal
