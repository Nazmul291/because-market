import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../../../../utils"

TrialButton.propTypes = {
  onClick: PropTypes.func,
}

function TrialButton({ onClick = noop, ...props }) {
  return (
    <div className="trialButtonContainer">
      <StyledButton type="button" onClick={onClick} {...props}>
        Get Your FREE Starter Pack
      </StyledButton>
    </div>
  )
}

export default TrialButton

const StyledButton = styled.button`
  width: 100%;
  color: rgb(51, 51, 51);
  font-family: Roboto, Arial, Helvetica, sans-serif;
  box-shadow: rgb(51 51 51) 3px 3px 0;
  background: rgb(67, 237, 220);
  border-radius: 5px;
  padding: 16px 19px;
  font-size: 22px;
  font-weight: 600;
`
