import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import InputLayout from "../InputLayout"
import { isUndef, noop, isDefineCallback } from "../../utils"
import { useControlledState } from "../../hooks"

const TYPES = {
  TEXT: "text",
  PHONE: "phone",
  EMAIL: "email",
}

const TYPES_VALIDATOR = {
  [TYPES.PHONE]: (value) => /^[+]?[0-9-]{0,}$/gi.test(value),
}

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  renderLabel: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  hidden: PropTypes.bool,
  withoutError: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(TYPES)),
  autocomplete: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  name: PropTypes.string,
  onChange: PropTypes.func,
}

function Input({
  id,
  label,
  renderLabel,
  error,
  footer,
  hidden,
  withoutError,
  type = TYPES.TEXT,
  autocomplete = "none",
  value = "",
  defaultValue,
  placeholder,
  className,
  style,
  name,
  onChange = noop,
  ...props
}) {
  const ref = useRef(null)
  const [cursor, setCursor] = useState(null)
  const [currentValue, setCurrentValue] = useControlledState(
    value,
    useMemo(
      () => (isDefineCallback(onChange) ? (_, evn) => onChange(evn) : null),
      [onChange]
    )
  )

  const handleOnChange = useCallback(
    (evn) => {
      const {
        target: { value },
      } = evn
      const isValid = !TYPES_VALIDATOR[type] || TYPES_VALIDATOR[type](value)

      if (isValid) {
        setCurrentValue(value, evn)
      }

      setCursor(evn.target.selectionStart)
    },
    [type, setCurrentValue]
  )

  const placeholderText = useMemo(
    () => (isUndef(placeholder) ? label : placeholder),
    [placeholder, label]
  )

  useEffect(() => {
    const input = ref.current
    if (!input) {
      return
    }

    input?.setSelectionRange(cursor, cursor)
  }, [ref, cursor, value])

  const renderChildren = ({ id, ...addProps }) => (
    <StyledInput
      {...addProps}
      ref={ref}
      id={id}
      data-has-error={Boolean(error)}
      type="text"
      value={currentValue}
      defaultValue={defaultValue}
      placeholder={placeholderText}
      autoComplete={autocomplete}
      name={name}
      onChange={handleOnChange}
    />
  )

  return (
    <InputLayout
      {...props}
      id={id}
      className={className}
      style={style}
      renderChildren={renderChildren}
      label={label}
      renderLabel={renderLabel}
      error={error}
      footer={footer}
      withoutError={withoutError}
      hidden={hidden}
    />
  )
}

const StyledInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  color: currentColor;

  &:focus {
    outline: 0;
  }
`

export default Input
