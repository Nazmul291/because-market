import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { useProductPrice } from "../../../hooks"
import { Price, StrokedButton } from "../../../rUI"
import {
  SIZE_LARGE,
  VARIANT_PRIMARY,
} from "../../../rUI/StrokedButton/StrokedButton"
import guarantedImg from "../../../rUI/img/get-in-right-guarantee-with-text.png"
import { noop } from "../../../utils"

AccountPDPFormActionBuyNow.propTypes = {
  product: PropTypes.object,
  selectedVariant: PropTypes.object,
  quantity: PropTypes.number,
  editable: PropTypes.bool,
  onBuyNow: PropTypes.func,
}

function AccountPDPFormActionBuyNow({
  product,
  selectedVariant,
  quantity,
  onBuyNow = noop,
  editable = true,
  ...props
}) {
  const { finalPriceV2 } = useProductPrice({
    variant: selectedVariant,
    quantity,
  })

  const handleBuyNow = useCallback(
    (e) => {
      e.preventDefault()
      onBuyNow({ product, variant: selectedVariant, quantity })
    },
    [product, selectedVariant, quantity, onBuyNow]
  )

  return (
    <StyledRoot {...props}>
      {selectedVariant && <StyledPrice priceV2={finalPriceV2} free />}
      <StyledButton
        variant={VARIANT_PRIMARY}
        size={SIZE_LARGE}
        disabled={!selectedVariant || !editable}
        onClick={handleBuyNow}
      >
        Buy Now
      </StyledButton>
      <StyledImageLayout>
        <StyledImage src={guarantedImg} />
      </StyledImageLayout>
      <StyledFreeShipping>
        <ul>
          <li>Free Shipping on Orders $25+</li>
        </ul>
      </StyledFreeShipping>
    </StyledRoot>
  )
}

const StyledRoot = styled.section`
  display: grid;
  grid-template:
    "price ." auto
    "button image" auto
    "shipping ." auto / 50% 50%;
  width: 100%;
  gap: 16px;
`

const StyledPrice = styled(Price)`
  grid-area: price;
  font-family: "Cooper Md BT W05 Regular";
  font-size: 22px;
  font-weight: 700;
  line-height: 42.09px;
  margin-bottom: 2rem;
`
const StyledButton = styled(StrokedButton)`
  grid-area: button;
`

const StyledImageLayout = styled.div`
  grid-area: image;
`

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 65px;
`

const StyledFreeShipping = styled.div`
  grid-area: shipping;
  font-size: 14px;
`

export default AccountPDPFormActionBuyNow
