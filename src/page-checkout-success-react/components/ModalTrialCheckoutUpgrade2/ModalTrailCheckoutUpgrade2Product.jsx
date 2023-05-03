import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import imgBox from "../ModalTrialCheckoutUpgrade/img/box.png"
import { Price } from "../../../rUI"
import { useProductPrice } from "../../../hooks"

ModalTrailCheckoutUpgrade2Product.propTypes = {
  selectedVariant: PropTypes.object,
  quantity: PropTypes.number,
  discount: PropTypes.number,
}

function ModalTrailCheckoutUpgrade2Product({
  selectedVariant,
  quantity,
  discount,
  ...props
}) {
  const { finalPriceV2 } = useProductPrice({
    variant: selectedVariant,
    quantity,
    discounts: [discount],
  })

  return (
    <StyledRoot {...props}>
      <StyledImageHolder>
        <StyledImg src={imgBox} alt="box" />
        <StyledDiscount>
          <StyledDiscountValue>{discount}%</StyledDiscountValue> off
        </StyledDiscount>
      </StyledImageHolder>

      <StyledUl>
        <li>
          <span className="fa fa-check-circle" />
          <strong>
            <Price priceV2={finalPriceV2} /> for today only
          </strong>
        </li>
        <li>
          <span className="fa fa-check-circle" />
          Not available in stores
        </li>
        <li>
          <span className="fa fa-check-circle" />
          24/7 Customer Support
        </li>
        <li>
          <span className="fa fa-check-circle" />
          Change or cancel anytime
        </li>
      </StyledUl>
    </StyledRoot>
  )
}

const StyledRoot = styled.div`
  max-width: 400px;
  margin: 0 auto 0;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px rgba(0, 0, 0, 0.1) solid;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.03);

  @media only screen and (max-width: 767px) {
    padding: 10px;
  }
`

const StyledImageHolder = styled.div`
  position: relative;
  margin-bottom: 30px;
`

const StyledImg = styled.img`
  border: 0;
  max-width: 100%;
`

const StyledDiscount = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: #679;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
`

const StyledDiscountValue = styled.div`
  font-size: 32px;
  margin-bottom: 3px;
`

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;

  li {
    margin-bottom: 5px;
    font-size: 15px;
  }

  .fa {
    color: rgb(149, 217, 101);
    vertical-align: top;
    margin: 0 5px 0 0;
    font-size: 20px;
  }
`

export default ModalTrailCheckoutUpgrade2Product
