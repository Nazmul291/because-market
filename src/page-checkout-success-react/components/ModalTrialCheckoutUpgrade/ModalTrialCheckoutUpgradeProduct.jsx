import React from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { Badge, Image, Price } from "../../../rUI"
import imgBox from "./img/box.png"
import { useProductPrice } from "../../../hooks"

import ModalTrialButton from "../ModalTrialButton"
import {
  VARIANT_APPLY,
  VARIANT_CANCEL,
} from "../ModalTrialButton/ModalTrialButton"

ModalTrialCheckoutUpgradeProduct.propTypes = {
  product: PropTypes.object,
  selectedVariant: PropTypes.object,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
}

function ModalTrialCheckoutUpgradeProduct({
  product,
  selectedVariant,
  quantity,
  discount,
  onApply,
  onCancel,
  ...props
}) {
  const {
    hasPerPiece,
    priceV2,
    pricePerPieceV2,
    finalPriceV2,
    finalPricePerPieceV2,
  } = useProductPrice({
    variant: selectedVariant,
    quantity,
    discounts: [discount],
  })

  return (
    <StyledRoot {...props}>
      <StyledImg src={imgBox} />
      <StyledDescriptions>
        <StyledPrices>
          <StyledPriceOld priceV2={priceV2} />
          <StyledPriceCurrent priceV2={finalPriceV2} />
          <StyledDiscountBadge>{discount}% off</StyledDiscountBadge>
        </StyledPrices>
        <StyledUl>
          <li>
            <span className="fa fa-check-circle" />
            {product.title}
          </li>

          {hasPerPiece && (
            <li>
              <span className="fa fa-check-circle" />
              <StyledPricePerPiecesOld priceV2={pricePerPieceV2} />{" "}
              <Price priceV2={finalPricePerPieceV2} /> per piece
            </li>
          )}

          <li>
            <span className="fa fa-check-circle" />
            Free shipping
          </li>
        </StyledUl>
        <ModalTrialButton variant={VARIANT_APPLY} onClick={onApply}>
          Upgrade my order
        </ModalTrialButton>
        <StyledButtonCancel variant={VARIANT_CANCEL} onClick={onCancel}>
          No thanks
        </StyledButtonCancel>
      </StyledDescriptions>
    </StyledRoot>
  )
}

const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 767px) {
    flex-direction: column;
  }
`

const StyledImg = styled(Image)`
  box-sizing: border-box;
  width: 40%;
  margin: 0 30px 0 0;

  @media only screen and (max-width: 1023px) {
    margin: 0 20px 0 0;
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
    margin: 0 0 10px;
  }
`

const StyledDescriptions = styled.div`
  box-sizing: border-box;
`

const StyledPrices = styled.div`
  box-sizing: border-box;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-end;
  line-height: 1;
  padding-top: 18px;

  @media only screen and (max-width: 767px) {
    justify-content: center;
    margin-bottom: 20px;
  }
`

const StyledPriceOld = styled(Price)`
  text-decoration: line-through;
  color: #c9c9c9;
  font-size: 20px;
  margin-right: 10px;

  @media only screen and (max-width: 1023px) {
    font-size: 16px;
  }

  @media only screen and (max-width: 767px) {
    font-size: 14px;
  }
`

const StyledPriceCurrent = styled(Price)`
  font-size: 52px;
  font-weight: bold;
  color: rgb(149, 217, 101);

  @media only screen and (max-width: 1023px) {
    font-size: 34px;
  }

  @media only screen and (max-width: 767px) {
    font-size: 28px;
  }
`

const StyledDiscountBadge = styled(Badge)`
  padding: 7px;
  transform: translateY(-80%);

  @media only screen and (max-width: 1023px) {
    font-size: 14px;
    padding: 4px;
  }

  @media only screen and (max-width: 767px) {
    font-size: 12px;
    padding: 2px;
    border-radius: 3px;
  }
`

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  color: rgb(94, 94, 94);
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 22px;
  font-weight: bold;

  li {
    font-size: 14px;
    line-height: 22px;
    font-weight: bold;
  }

  .fa {
    color: rgb(149, 217, 101);
    vertical-align: top;
    margin: 0 5px 0 0;
    font-size: 20px;
  }
`

const StyledPricePerPiecesOld = styled(Price)`
  opacity: 0.7;
  text-decoration: line-through;
`

const StyledButtonCancel = styled(ModalTrialButton)`
  margin-top: 12px;
`

export default ModalTrialCheckoutUpgradeProduct
