import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop, applyStyleIfHasProperty } from "../../utils"
import { Input } from "../../rUI"

const SELECT_TYPE = "select"

AccountFormField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "number", "select"]),
  placeholder: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
      }),
    ])
  ),
  required: PropTypes.bool,
  style: PropTypes.object,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object, // fix error (plugin linaria) EvalError: Element is not defined in
  ]),
  onFocus: PropTypes.func,
}

export function AccountFormField({
  label,
  type,
  placeholder = " ",
  options,
  style,
  ref,
  onFocus = noop,
  ...props
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
      {type !== SELECT_TYPE ? (
        <StyledInput
          type={type}
          placeholder={placeholder}
          onFocus={handleFocus}
          ref={ref}
          {...props}
        />
      ) : (
        <select
          placeholder={placeholder}
          ref={ref}
          onFocus={handleFocus}
          {...props}
        >
          {!props.required && <option>{placeholder}</option>}
          {options.map((item, idx) =>
            typeof item === "string" ? (
              <option value={item} key={idx}>
                {item}
              </option>
            ) : (
              <option value={item.value} key={idx}>
                {item.name}
              </option>
            )
          )}
        </select>
      )}
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
    color: #566582;
    background-color: #fff;
    font-family: "Graphik Semibold";
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    outline: none;
    box-shadow: 0 0 5px 0 rgba(227, 232, 242, 0.43);
    -webkit-appearance: none;
    border: 1px solid #eff1f2;
    border-radius: 7px;
    margin: 0;
    margin-bottom: 12px;
    padding: 35px 16px 10px 24px;
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

const StyledInput = styled(Input)`
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
