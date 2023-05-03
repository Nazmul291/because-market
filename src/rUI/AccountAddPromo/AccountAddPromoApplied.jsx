import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

AccountAddPromoApplied.propTypes = {
  value: PropTypes.array,
}

function AccountAddPromoApplied({ value = [], ...props }) {
  const valueString = useMemo(() => value?.join(", "), [value])
  return <StyledRoot {...props}>Promo Applied ({valueString})</StyledRoot>
}

const StyledRoot = styled.div`
  text-decoration: underline;
  cursor: pointer;
`

export default AccountAddPromoApplied
