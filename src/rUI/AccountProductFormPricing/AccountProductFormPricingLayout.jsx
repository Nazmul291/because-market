import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import Price from "../Price"

AccountProductFormPricingLayout.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  showPerPiecePrice: PropTypes.bool,
  pricePerPiece: PropTypes.object,
  priceTotal: PropTypes.object,
}

function AccountProductFormPricingLayout({
  label,
  showPerPiecePrice = false,
  pricePerPiece,
  priceTotal,
  ...props
}) {
  return (
    <StyledLayout {...props}>
      <StyledLabel>{label}</StyledLabel>
      <StyledPriceLayout>
        {showPerPiecePrice && (
          <>
            <StyledPriceLabel>Per piece</StyledPriceLabel>
            <StyledPrice priceV2={pricePerPiece} free />
          </>
        )}
        <StyledPriceLabel>Total</StyledPriceLabel>
        <StyledFinalPrice priceV2={priceTotal} free />
      </StyledPriceLayout>
    </StyledLayout>
  )
}

const StyledLayout = styled.div`
  display: grid;
  font-family: "Graphik Semibold";
  color: #87827c;
  font-weight: 500;
  line-height: 22px;
`

const StyledLabel = styled.label`
  font-size: 18px;
`
const StyledPriceLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const StyledPriceLabel = styled.label`
  font-size: 15px;
`

const StyledPrice = styled(Price)`
  font-weight: 700;
  color: #566582;
`

const StyledFinalPrice = styled(StyledPrice)`
  font-size: 22px;
  line-height: 42px;
`

export default AccountProductFormPricingLayout
