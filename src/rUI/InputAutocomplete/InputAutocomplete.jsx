/* eslint-disable react/no-multi-comp */
import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import Input from "../Input"
import { noop } from "../../utils"
import { useDebouncedCallback } from "../../hooks"

const renderItem = (onClick) => (item) =>
  (
    <AutocompleteItem
      key={item.key || item.label}
      onClick={() => onClick(item)}
    >
      {item.label}
    </AutocompleteItem>
  )

InputAutocomplete.propTypes = {
  autocompleteList: PropTypes.array,
  onBlur: PropTypes.func,
  onClickItem: PropTypes.func,
}

function InputAutocomplete({
  autocompleteList,
  onBlur = noop,
  onClickItem = noop,
  ...props
}) {
  const handleBlur = useDebouncedCallback(onBlur, [onBlur])
  const persistBlurEvent = useCallback(
    (e) => {
      e.persist()
      handleBlur(e)
    },
    [handleBlur]
  )

  return (
    <Root>
      <Input {...props} onBlur={persistBlurEvent} />
      {!autocompleteList?.length ? null : (
        <AutocompleteLayout>
          <AutocompleteBody>
            {autocompleteList.map(renderItem(onClickItem))}
          </AutocompleteBody>
        </AutocompleteLayout>
      )}
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
`

const AutocompleteLayout = styled.div`
  position: relative;
  width: 100%;
`

const AutocompleteBody = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  z-index: 1;
  margin-top: -1.4rem;
`

const AutocompleteItem = styled.div`
  cursor: pointer;
  padding: 0 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 30px;
  text-align: left;
  border-top: 1px solid #e6e6e6;
  font-size: 11px;

  &:hover {
    background-color: #e6e6e6;
  }
`

export default InputAutocomplete
