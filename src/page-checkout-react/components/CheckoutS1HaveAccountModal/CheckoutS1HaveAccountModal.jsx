import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import Modal from "../../../rUI/Modal"

CheckoutS1HaveAccountModal.propTypes = {
  email: PropTypes.string,
}

function CheckoutS1HaveAccountModal({ email, ...props }) {
  return (
    <Modal
      {...props}
      header="It looks like you already have an account with us"
    >
      <StyledBody>
        <div>We just send you an email so you can access your account</div>
        <div>
          Please check your email associated with the account{" "}
          <StyledEmail>{email}</StyledEmail>
        </div>
      </StyledBody>
    </Modal>
  )
}

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 360px;
`

const StyledEmail = styled.span`
  color: #5ba6ad;
`

export default CheckoutS1HaveAccountModal
