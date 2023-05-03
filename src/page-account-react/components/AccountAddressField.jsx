import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop, applyStyleIfHasProperty } from "../../utils"
import InputAddress from "../../rUI/InputAddress"

AccountAddressField.propTypes = {
  label: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
}

export function AccountAddressField({
  label,
  style,
  type,
  name,
  value,
  required,
  onChange = noop,
  onFocus = noop,
}) {
  const [isTouched, setTouched] = useState(false)

  const handleFocus = useCallback(
    (event) => {
      setTouched(true)
      onFocus(event)
    },
    [onFocus]
  )

  return (
    <StyledFieldContainer isTouched={isTouched} style={style}>
      <StyledInputAddress
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        onFocus={handleFocus}
      />
      <StyledFieldLabel>{label}</StyledFieldLabel>
    </StyledFieldContainer>
  )
}

const StyledFieldContainer = styled.div`
  position: relative;
  flex: 1;

  & input,
  & select {
    width: 100%;
    height: 73px;
    padding: 35px 16px 10px 24px;
    margin: 0;
    color: #566582;
    background-color: #fff;
    font-family: "Graphik Semibold";
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    outline: none;
    border: 1px solid #eff1f2;
    border-radius: 7px;
    box-shadow: 0 0 5px 0 rgba(227, 232, 242, 0.43);
    -webkit-appearance: none;
  }

  & input::placeholder,
  & select::placeholder {
    font-size: 0;
    color: #fff;
  }

  & input:placeholder-shown ~ label,
  & select:placeholder-shown ~ label {
    top: 39px;
    font-size: 16px;
    line-height: 20px;
  }

  & input:invalid,
  & select:invalid {
    border: ${applyStyleIfHasProperty(
      "isTouched",
      "1px solid red",
      "1px solid #eff1f2"
    )};
  }
`

const StyledInputAddress = styled(InputAddress)`
  --size-border--default: 0px;
`

const StyledFieldLabel = styled.label`
  position: absolute;
  top: 5px;
  bottom: 10px;
  left: 24px;
  visibility: visible;
  line-height: 42px;
  font-size: 14px;
  color: #747e92;
  font-family: "Graphik Regular";
  pointer-events: none;
  opacity: 1;
  transition: all 0.2s ease-in-out;
`
