import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import InputLayout from "../InputLayout"
import InputQuantityIconMinus from "./icons/InputQuantityIconMinus"
import InputQuantityIconPlus from "./icons/InputQuantityIconPlus"
import { noop } from "../../utils"
import RenderNode from "../RenderNode"

const normalizeValue = (val, min, max) =>
  isNaN(val) || val < min ? min : val > max ? max : val

InputQuantity.propTypes = {
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  renderLabel: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  hidden: PropTypes.bool,
  withoutError: PropTypes.bool,
  autocomplete: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  actionMinusComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  actionPlusComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onChange: PropTypes.func,
}

function InputQuantity({
  id,
  label,
  renderLabel,
  error,
  hidden,
  withoutError,
  autocomplete = "none",
  disabled = false,
  placeholder,
  value,
  defaultValue,
  min = 1,
  max = Number.POSITIVE_INFINITY,
  actionMinusComponent = null,
  actionPlusComponent = null,
  onChange = noop,
  ...props
}) {
  const minusDisabled = disabled || value <= min
  const plusDisabled = disabled || value >= max

  const handleChange = useCallback(
    ({ target: { value } }) => {
      const next = parseInt(value, 10)
      onChange(normalizeValue(next, min, max))
    },
    [min, max, onChange]
  )

  const handleMinusClick = useCallback(() => {
    const next = value - 1
    onChange(normalizeValue(next, min, max))
  }, [min, max, value, onChange])

  const handlePlusClick = useCallback(() => {
    const next = value + 1
    onChange(normalizeValue(next, min, max))
  }, [min, max, value, onChange])

  const renderChildren = ({ id, ...addProps }) => (
    <Root>
      <IconMinusWrapper onClick={handleMinusClick}>
        <RenderNode
          node={actionMinusComponent || <IconMinus />}
          disabled={minusDisabled}
        />
      </IconMinusWrapper>

      <IconPlusWrapper onClick={handlePlusClick}>
        <RenderNode
          node={actionPlusComponent || <IconPlus />}
          disabled={plusDisabled}
        />
      </IconPlusWrapper>

      <Input
        {...addProps}
        disabled={disabled}
        id={id}
        type="text"
        pattern="[0-9]*"
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder || label}
        autoComplete={autocomplete}
        data-has-error={Boolean(error)}
        onChange={handleChange}
      />
    </Root>
  )

  return (
    <InputLayout
      {...props}
      id={id}
      renderChildren={renderChildren}
      label={label}
      renderLabel={renderLabel}
      error={error}
      withoutError={withoutError}
      hidden={hidden}
    />
  )
}

const Root = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`

const Input = styled.input`
  width: 100%;
  text-align: center;
  border: none;

  &:focus {
    outline: 0;
  }
`

const IconWrapper = styled.span`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
`

const IconMinusWrapper = styled(IconWrapper)`
  left: 0;
`

const IconPlusWrapper = styled(IconWrapper)`
  right: 0;
`

const IconMinus = styled(InputQuantityIconMinus)`
  display: flex;
  width: 12px;
  margin-left: 10px;
`

const IconPlus = styled(InputQuantityIconPlus)`
  display: flex;
  width: 12px;
  margin-right: 10px;
`

export default InputQuantity
