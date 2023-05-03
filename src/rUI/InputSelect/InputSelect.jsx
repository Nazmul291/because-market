import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../utils"
import InputLayout from "../InputLayout"

const renderOption = (option) => (
  <option key={option} value={option}>
    {option}
  </option>
)

const renderOptionAsObject = (option) => (
  <option key={option.value} value={option.value}>
    {option.label}
  </option>
)

InputSelect.propTypes = {
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  renderLabel: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  hidden: PropTypes.bool,
  withoutError: PropTypes.bool,
  autocomplete: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
}

function InputSelect({
  id,
  label,
  renderLabel,
  error,
  hidden,
  withoutError,
  autocomplete = "none",
  value = "",
  onChange = noop,
  placeholder,
  options = [],
  ...props
}) {
  const isObjectOption = "object" === typeof options[0]
  const placeholderText = placeholder || label

  const renderOptionFunc = isObjectOption ? renderOptionAsObject : renderOption

  const renderChildren = ({ id, ...addProps }) => (
    <Root
      {...addProps}
      id={id}
      autocomplete={autocomplete}
      value={value}
      onChange={onChange}
      placeholder={placeholder || label}
      data-has-placeholder={!value}
    >
      {placeholderText && (
        <option value="" disabled hidden>
          {placeholderText}
        </option>
      )}
      {options.map(renderOptionFunc)}
    </Root>
  )

  return (
    <InputLayout
      {...props}
      id={id}
      label={label}
      renderLabel={renderLabel}
      error={error}
      hidden={hidden}
      withoutError={withoutError}
      renderChildren={renderChildren}
    />
  )
}

const Root = styled.select`
  width: 100%;
  border: none;
  font-size: 14px;
  line-height: 14px;

  &:focus {
    outline: 0;
  }

  &[data-has-placeholder="true"] {
    color: var(--theme-inputs--placeholder-color);
  }
`

export default InputSelect
