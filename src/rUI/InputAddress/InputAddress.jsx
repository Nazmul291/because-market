import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"
import { findAddress } from "../../api/smartystreets"
import { useDebouncedCallback } from "../../hooks"
import { noop } from "../../utils"
import InputAutocomplete from "../InputAutocomplete"

InputAddress.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onChangeValue: PropTypes.func,
}

function InputAddress({
  value = "",
  onChange = noop,
  onChangeValue = noop,
  ...props
}) {
  const [currentValue, setCurrentValue] = useState(value)
  const [req, setReq] = useState(0)
  const [autocompleteList, setAutocompleteList] = useState(null)

  const debouncedFind = useDebouncedCallback(
    (value, currentReq) => {
      findAddress(value).then((res) => {
        if (req === currentReq) {
          setAutocompleteList(
            res?.map((item, i) => ({
              value: item,
              label: (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginLeft: 8,
                    alignItems: "flex-end",
                  }}
                >
                  <div style={{ color: "#000", fontSize: "13px" }}>
                    {item.street_line}
                  </div>
                  <div style={{ color: "#999", fontSize: "11px" }}>
                    {item.city} {item.state} {item.zipcode}
                  </div>
                </div>
              ),
              key: `${item.street_line} ${item.state} ${item.zipcode} ${i}`,
            }))
          )
        }
      })
    },
    [req]
  )

  const handleOnChange = useCallback(
    (ev) => {
      const {
        target: { value },
      } = ev
      const trimmed = value?.trim()
      const currentReq = req
      setReq(req + 1)
      setCurrentValue(value)
      onChangeValue(ev)

      if (!trimmed) {
        setAutocompleteList(null)
        return
      }

      debouncedFind(trimmed, currentReq)
    },
    [debouncedFind, req, onChangeValue]
  )

  const handleOnClickItem = useCallback(
    (item) => {
      setAutocompleteList(null)
      setCurrentValue(item.value.street_line)
      onChange(item.value)
    },
    [onChange]
  )

  const handleOnBlur = useCallback(() => {
    setReq(req + 1)
    setAutocompleteList(null)
  }, [req])

  return (
    <InputAutocomplete
      {...props}
      value={currentValue}
      onChange={handleOnChange}
      onClickItem={handleOnClickItem}
      onBlur={handleOnBlur}
      autocompleteList={autocompleteList}
    />
  )
}

export default InputAddress
