import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { useControlledState } from "../../../../../hooks"
import { noop } from "../../../../../utils"

const ValueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.object,
])

ProductSwitcher.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: ValueType,
    })
  ),
  value: ValueType,
  onChange: PropTypes.func,
}

function ProductSwitcher({
  label,
  options = [],
  value,
  onChange = noop,
  ...props
}) {
  const [current, setValue] = useControlledState(value, onChange)

  return (
    <StyledRoot {...props}>
      <StyledLabel>{label}</StyledLabel>
      <StyledOptions>
        {options.map(({ label, value }) => (
          <StyledOption
            key={label}
            data-active={value === current}
            onClick={() => {
              setValue(value)
            }}
          >
            {label}
          </StyledOption>
        ))}
      </StyledOptions>
    </StyledRoot>
  )
}

const StyledRoot = styled.div`
  width: 100%;
`

const StyledLabel = styled.div`
  color: #333;
  font-family: -apple-system, system-ui, Segoe UI;
  font-size: 22px;
  line-height: 26px;
  margin-bottom: 0.5rem;
  font-weight: 500;
`

const StyledOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`

const StyledOption = styled.div`
  font-family: -apple-system, system-ui, Segoe UI;
  min-width: 70px;
  max-width: min-content;
  border: 2px solid #a5a5a5;
  padding: 5px 20px;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  color: #747474;
  border-radius: 17px;
  background-color: "transparent";
  text-align: center;
  text-transform: capitalize;

  &[data-active="true"] {
    color: #fff;
    background: #679;
    border-color: #679;
  }

  @media (max-width: 768px) {
    max-width: initial;
    flex: 1;
  }

  @media (max-width: 575px) {
    padding: 5px 0px;
  }
`

export default ProductSwitcher
