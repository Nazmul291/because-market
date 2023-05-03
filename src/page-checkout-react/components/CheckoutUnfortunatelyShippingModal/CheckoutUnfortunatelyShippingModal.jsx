import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../../utils"
import Modal from "../../../rUI/Modal"

CheckoutUnfortunatelyShippingModal.propTypes = {
  onOrderNowClick: PropTypes.func,
}

function CheckoutUnfortunatelyShippingModal({
  onOrderNowClick = noop,
  ...props
}) {
  return (
    <Modal {...props}>
      <Text>
        <P>
          Unfortunately, the shipping address you entered does not qualify for a
          free starter pack.
        </P>
        <P>Please click the button below to order from our website directly.</P>
      </Text>
      <ButtonLayout>
        <Button type="button" onClick={onOrderNowClick}>
          Order Now
        </Button>
      </ButtonLayout>
    </Modal>
  )
}

const Text = styled.div`
  color: #212529;
  text-align: center;
  padding-bottom: 22px;
`

const P = styled.p`
  font-size: 22px;
  max-width: 510px;
  margin-bottom: 0.7rem;
`

const ButtonLayout = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.button`
  background: #43eddc;
  margin: 0 0 0 !important;
  padding: 15px 20px !important;
  border-radius: 6px !important;
  border-color: none;
  box-shadow: 3px 3px 0 #333333 !important;
  color: #333333 !important;
  font-family: Roboto, sans-serif !important;
  font-size: 1rem !important;
  font-weight: normal !important;
  text-decoration: none;
`

export default CheckoutUnfortunatelyShippingModal
