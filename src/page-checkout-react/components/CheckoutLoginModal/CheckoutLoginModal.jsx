import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import Button from "../../../rUI/Button"
import Input from "../../../rUI/Input"
import Modal from "../../../rUI/Modal"
import { noop } from "../../../utils"

CheckoutLoginModal.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  onContinueClick: PropTypes.func,
}

function CheckoutLoginModal({
  loading,
  error,
  onContinueClick = noop,
  ...props
}) {
  const [data, setData] = useState({
    zip: "",
    lastFourDigitsPhone: "",
  })

  const buttonDisabled = loading || !data?.zip || !data?.lastFourDigitsPhone

  const errorText = error ? "Account not found" : null

  const handleZipChange = useCallback(({ target: { value } }) => {
    setData((oldSate) => ({ ...oldSate, zip: value }))
  }, [])

  const handlePhoneChange = useCallback(({ target: { value } }) => {
    setData((oldSate) => ({ ...oldSate, lastFourDigitsPhone: value }))
  }, [])

  const handleButtonClick = useCallback(() => {
    onContinueClick(data)
  }, [data, onContinueClick])

  return (
    <Modal {...props}>
      <Root>
        <Title>
          <TitleP>We noticed you already have account with us.</TitleP>
          <TitleP>
            Verify your information to be redirected to your member portal.
          </TitleP>
        </Title>

        <Body>
          <Row>
            <Input
              label="Zip Code:"
              placeholder=""
              value={data.zip}
              error={errorText}
              onChange={handleZipChange}
            />
          </Row>

          <Row>
            <Input
              label="Last 4 Digits of Mobile Phone Number:"
              placeholder=""
              value={data.lastFourDigitsPhone}
              error={errorText}
              onChange={handlePhoneChange}
            />
          </Row>
        </Body>

        <Footer>
          <Button onClick={handleButtonClick} disabled={buttonDisabled}>
            Continue
          </Button>
        </Footer>
      </Root>
    </Modal>
  )
}

const Root = styled.div``

const Title = styled.div`
  text-align: center;
  color: var(--theme-color--blue);
`

const TitleP = styled.p`
  font-weight: bold;
  font-size: 16px;
`

const Body = styled.div`
  padding: 0 20px;
`

const Row = styled.div``

const Footer = styled.div`
  display: flex;
  justify-content: center;
`

export default CheckoutLoginModal
