import React, { useState, useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../utils"
import Input from "../Input"
import StrokedButton from "../StrokedButton"
import { SIZE_SMALL, VARIANT_APPLY } from "../StrokedButton/StrokedButton"
import { ERROR_VARIANT_TOOLTIP } from "../InputLayout/InputLayout"

AccountAddPromoForm.propTypes = {
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
}

function AccountAddPromoForm({
  error,
  disabled = false,
  onClose = noop,
  onSubmit = noop,
  ...props
}) {
  const [currentValue, setCurrentValue] = useState("")
  const [changed, setChanged] = useState(Boolean(error))

  const handleChange = useCallback((e) => {
    e.preventDefault()
    setCurrentValue(e.target.value)
    setChanged(true)
  }, [])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      setChanged(false)
      onSubmit(currentValue.trim())
    },
    [currentValue, onSubmit]
  )

  return (
    <StyledRoot
      {...props}
      disabled={!currentValue || disabled}
      onSubmit={handleSubmit}
    >
      <StrokedButton disabled={disabled} onClick={onClose} size={SIZE_SMALL}>
        Cancel
      </StrokedButton>
      <StyledInput
        disabled={disabled}
        value={currentValue}
        onChange={handleChange}
        withoutError
        error={changed ? null : error}
        errorVariant={ERROR_VARIANT_TOOLTIP}
      />
      <StrokedButton
        type="submit"
        size={SIZE_SMALL}
        variant={VARIANT_APPLY}
        disabled={!currentValue || disabled}
      >
        Apply
      </StrokedButton>
    </StyledRoot>
  )
}

const StyledRoot = styled.form`
  display: grid;
  grid-template-columns: auto 60% auto;
  grid-gap: 8px;
`

const StyledInput = styled(Input)`
  --size-border--default: 1px;
  --text-color--error: var(--color-error);
  --body-background-color--error: #fef6f6;
`

export default AccountAddPromoForm
