import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import InputQuantity from "../InputQuantity"
import { applyStyleIfHasProperty } from "../../utils"

AccountProductInputQuantity.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
}

function AccountProductInputQuantity(props) {
  return (
    <StyledInputQuantity
      {...props}
      renderLabel={() => <StyledLabel>{props.label}</StyledLabel>}
      actionMinusComponent={(addProp) => (
        <StyledActionLayout {...addProp}>-</StyledActionLayout>
      )}
      actionPlusComponent={(addProp) => (
        <StyledActionLayout {...addProp}>+</StyledActionLayout>
      )}
    />
  )
}

const StyledInputQuantity = styled(InputQuantity)`
  --active-color: #38d9c0;
  --disabled-color: #959595;
  --color-border--default: #a5a5a5;
  --color-border--focus: var(--active-color);
  --size-border--default: 2px;
  --size-border--focus: 3px;
  --input-body--height: 56px;
`

const StyledLabel = styled.h4`
  color: #87827c;
  font-family: "Graphik Medium";
  font-size: 15px;
  font-weight: 500;
  line-height: 17px;
  margin-bottom: 14px;
`

const StyledActionLayout = styled.div`
  height: 100%;
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f0;
  color: ${applyStyleIfHasProperty(
    "disabled",
    "var(--disabled-color)",
    "var(--active-color)"
  )};
`

export default AccountProductInputQuantity
