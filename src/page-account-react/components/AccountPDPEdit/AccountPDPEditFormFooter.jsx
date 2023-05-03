import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { StrokedButton } from "../../../rUI"
import { VARIANT_PRIMARY } from "../../../rUI/StrokedButton/StrokedButton"
import { noop } from "../../../utils"
import AccountPDPEditFormSelectedPrice from "./AccountPDPEditFormSelectedPrice"
import AccountPDPEditFormCurrentPrice from "./AccountPDPEditFormCurrentPrice"
import segment from "../../../integrations/segment"

AccountPDPEditFormFooter.propTypes = {
  product: PropTypes.object,
  selectedVariant: PropTypes.object,
  initialVariantId: PropTypes.string,
  initialQuantity: PropTypes.number,
  initialPrice: PropTypes.number,
  quantity: PropTypes.number,
  editable: PropTypes.bool,
  removable: PropTypes.bool,
  intervalType: PropTypes.string,
  onUpdate: PropTypes.func,
  onRemove: PropTypes.func,
}

function AccountPDPEditFormFooter({
  product,
  selectedVariant,
  initialVariantId,
  initialQuantity,
  initialPrice,
  quantity,
  editable,
  removable,
  intervalType,
  onUpdate = noop,
  onRemove = noop,
  ...props
}) {
  const showCurrentPrice =
    selectedVariant &&
    selectedVariant?.id === initialVariantId &&
    initialQuantity === quantity

  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault()
      segment.track("S2-Clicks Update Item Button")
      onUpdate({ product, variant: selectedVariant, quantity })
    },
    [product, selectedVariant, quantity, onUpdate]
  )

  const handleRemove = useCallback(
    (e) => {
      e.preventDefault()
      segment.track("S2-Portal Remove Item")
      onRemove({ product, variant: selectedVariant, quantity })
    },
    [product, selectedVariant, quantity, onRemove]
  )

  return (
    <>
      {showCurrentPrice ? (
        <AccountPDPEditFormCurrentPrice
          product={product}
          initialPrice={initialPrice}
          initialQuantity={initialQuantity}
          intervalType={intervalType}
        />
      ) : (
        <AccountPDPEditFormSelectedPrice
          product={product}
          selectedVariant={selectedVariant}
          quantity={quantity}
          intervalType={intervalType}
        />
      )}
      <StyledActionsContainer {...props}>
        {editable && (
          <StrokedButton disabled={showCurrentPrice} onClick={handleUpdate}>
            Update
          </StrokedButton>
        )}
        {removable && (
          <StrokedButton variant={VARIANT_PRIMARY} onClick={handleRemove}>
            Remove
          </StrokedButton>
        )}
      </StyledActionsContainer>
    </>
  )
}

const StyledActionsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 24px;
  padding-top: 22px;
`

export default AccountPDPEditFormFooter
