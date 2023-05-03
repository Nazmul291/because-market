import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { applyStyleIfHasProperty, noop } from "../../utils"
import { trackEvent } from "../../integrations/tracker"

const SHORT_VALUE_MAX_LENGTH = 5

const isDefaultChecked = (value, defaultValue) => {
  return value.toLocaleLowerCase() === (defaultValue || "").toLocaleLowerCase()
}

AccountProductOption.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  option: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    values: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          value: PropTypes.string,
        }),
      ])
    ),
  }).isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  funnelView: PropTypes.bool,
  onChange: PropTypes.func,
}

function AccountProductOption({
  label,
  option,
  funnelView,
  value,
  disabled = false,
  onChange = noop,
  ...props
}) {
  const { id, name, values } = option
  const safeValues = values.every((item) => typeof item === "string")
    ? values
    : values.map(({ value }) => value)

  const hasOnlyShortValues = safeValues.every(
    (value) => value.length <= SHORT_VALUE_MAX_LENGTH
  )

  const trackOptionClickEvent = (optionName, optionValue) => {
    // Needs Mixpanel here as we're using the same id from quiz
    trackEvent("Product Attributes Selector", {
      [optionName]: optionValue,
    })
    onChange(optionValue)
  }

  return (
    <StyledOptionContainer key={id} {...props}>
      <StyledOptionName className="product-name">
        {label || name}
      </StyledOptionName>
      <StyledValues className="product-values">
        {safeValues.map((optionValue, idx) => {
          const separateOptionText = optionValue.split(" ")
          return (
            <StyledValue key={optionValue} className="product-value">
              <input
                type="radio"
                id={`${id}-${idx}`}
                name={name}
                value={optionValue}
                disabled={disabled}
                checked={isDefaultChecked(optionValue, value)}
                onChange={() => trackOptionClickEvent(name, optionValue)}
              />
              <StyledValueButton
                htmlFor={`${id}-${idx}`}
                short={hasOnlyShortValues}
              >
                {!funnelView && <span>{optionValue}</span>}
                {funnelView &&
                  separateOptionText.map((opt) => <span key={opt}>{opt}</span>)}
              </StyledValueButton>
            </StyledValue>
          )
        })}
      </StyledValues>
    </StyledOptionContainer>
  )
}

const StyledOptionContainer = styled.div`
  width: 100%;
`

const StyledOptionName = styled.h4`
  color: #87827c;
  font-family: "Graphik Medium";
  font-size: 15px;
  font-weight: 500;
  line-height: 17px;
  margin-bottom: 14px;
`

const StyledValues = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`

const StyledValue = styled.li`
  display: contents;

  input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }

  input:checked ~ label {
    border: 3px solid #10e4da;
    color: #10e4da;
  }
`

const StyledValueButton = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #a5a5a5;
  border-radius: 5px;
  padding: 7px;
  flex-grow: 1;
  max-width: ${applyStyleIfHasProperty("short", "67px", "30%")};
  min-width: ${applyStyleIfHasProperty("short", "67px", "60px")};
  flex: 1 1;
  margin: 0 5px 10px;
  cursor: pointer;
  font-family: Roboto;
  font-size: 13px;
  font-weight: 500;
  line-height: 2rem;
  text-align: center;
  color: #747474;
  flex-basis: 30%;
  height: 64px;

  @media (max-width: 768px) {
    span:not(:first-child) {
      display: none;
    }
  }
`

export default AccountProductOption
