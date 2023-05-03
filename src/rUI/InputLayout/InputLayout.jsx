import React, { useMemo, useState, useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import InputLabel from "../InputLabel"
import { noop } from "../../utils"
import RenderNode from "../RenderNode"
import InputLayoutErrorTooltip from "./InputLayoutErrorTooltip"

export const ERROR_VARIANT_DEFAULT = "error-default"
export const ERROR_VARIANT_TOOLTIP = "error-tooltip"

const ERROR_LAYOUTS = {
  [ERROR_VARIANT_DEFAULT]: ErrorLayout,
  [ERROR_VARIANT_TOOLTIP]: InputLayoutErrorTooltip,
}

InputLayout.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  renderChildren: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  renderLabel: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  errorVariant: PropTypes.oneOf([ERROR_VARIANT_DEFAULT, ERROR_VARIANT_TOOLTIP]),
  footer: PropTypes.node,
  hidden: PropTypes.bool,
  withoutError: PropTypes.bool,
}

function InputLayout({
  id,
  children,
  renderChildren = noop,
  label,
  renderLabel,
  error,
  errorVariant = ERROR_VARIANT_DEFAULT,
  footer,
  hidden = false,
  withoutError = false,
  ...props
}) {
  const [focused, setIsFocus] = useState()
  const localId = useMemo(() => (id ? id : `input_${Math.random()}`), [id])

  const dataAttr = Object.entries(props).reduce((acc, [name, value]) => {
    if (/^data-/.test(name)) {
      acc[name] = value
    }

    return acc
  }, {})

  const ErrorLayoutComponent = ERROR_LAYOUTS[errorVariant] || ErrorLayout

  const handleFocus = useCallback(() => {
    setIsFocus(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsFocus(false)
  }, [])

  return (
    <Root
      data-hidden={hidden}
      data-without-error={withoutError}
      data-error={Boolean(error)}
      data-focus={focused}
      {...props}
    >
      {label || renderLabel ? (
        <InputLabel htmlFor={localId} renderLabel={renderLabel}>
          {label}
        </InputLabel>
      ) : null}
      <InputContainer data-without-error={withoutError}>
        <InputBody>
          <RenderNode
            node={children || renderChildren}
            id={localId}
            {...dataAttr}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </InputBody>
        {error && <ErrorLayoutComponent>{error}</ErrorLayoutComponent>}
        {footer}
      </InputContainer>
    </Root>
  )
}

const Root = styled.div`
  --color-error: #ff0000;
  --color-border--default: #ced4da;
  --color-border--focus: #667799;
  --color-border--error: var(--color-error);
  --size-border--default: 2px;
  --size-border--focus: var(--size-border--default);
  --input-body--height: 37px;
  --text-color: currentColor;
  --text-color--error: var(--text-color);
  --body-background-color: transparent;
  --body-background-color--error: transparent;

  --border-color: var(--color-border--default);
  --border-size: var(--size-border--default);

  color: var(--text-color);

  &[data-focus="true"] {
    --border-color: var(--color-border--focus);
    --border-size: var(--size-border--focus);
  }

  &[data-error="true"] {
    --border-color: var(--color-border--error);
    color: var(--text-color--error);
    --body-background-color: var(--body-background-color--error);
  }

  display: flex;
  flex-direction: column;
  min-height: 80px;

  &[data-hidden="true"] {
    display: none;
  }

  &[data-without-error="true"] {
    min-height: auto;
  }
`

const InputContainer = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  flex-direction: column;

  &[data-without-error="true"] {
    min-height: auto;
  }
`

const InputBody = styled.div`
  display: flex;
  height: var(--input-body--height);
  border: var(--border-size) solid var(--border-color);
  background-color: var(--body-background-color);
  background-clip: padding-box;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  box-sizing: border-box;
`

const ErrorLayout = styled.div`
  color: var(--color-error);
  font-size: 13px;
`

export default InputLayout
