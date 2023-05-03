import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../utils"
import imgSuccess from "../../../assets/notification-success.png"
import imgClose from "../../../assets/close_16x16.png"

Notification.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
}

function Notification({
  text = "Your changes have been successfully updated.",
  onClick = noop,
}) {
  return (
    <StyledContainer>
      <StyledContent>
        <StyledIcon src={imgSuccess} />
        {text}
      </StyledContent>
      <StyledClose onClick={onClick}>
        <StyledCloseIcon src={imgClose} />
      </StyledClose>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  border: 1px solid rgba(86, 101, 130, 0.17);
  border-radius: 6px;
  width: 100%;
  height: 50px;
  margin: 18px 0;
  color: #566582;
`

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  text-align: center;
`

const StyledIcon = styled.img`
  height: 22px;
  margin-right: 8px;
`

const StyledClose = styled.div`
  display: flex;
  align-self: center;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 16px;
`

const StyledCloseIcon = styled.img`
  height: 16px;
`

export default Notification
