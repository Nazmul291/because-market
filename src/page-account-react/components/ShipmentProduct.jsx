import React, { useMemo, useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { formatDollarPrice, noop } from "../../utils"
import { ChevronRightIcon } from "../../rUI/icons/ChevronRightIcon"

ShipmentProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    handle: PropTypes.string,
    image: PropTypes.string,
    quantity: PropTypes.number,
    totalQuantity: PropTypes.number,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    oneTimeOffer: PropTypes.bool,
  }),
  onViewDetails: PropTypes.func,
}

export function ShipmentProduct({ product, onViewDetails = noop, ...props }) {
  const price = useMemo(
    () => formatDollarPrice(product.price * product.quantity),
    [product]
  )

  const handleProductClick = useCallback(
    (event) => {
      onViewDetails(product)
      event.preventDefault()
    },
    [onViewDetails, product]
  )

  return (
    <StyledShipmentProduct
      onClick={handleProductClick}
      href={`/products/${product.handle}`}
      target="_blank"
      {...props}
    >
      {Boolean(product.oneTimeOffer) && (
        <StyledOneTimeOfferBadge>One Time Order</StyledOneTimeOfferBadge>
      )}
      <StyledShipmentProductImage
        style={{ backgroundImage: `url("${product.image}")` }}
      />
      <StyledShipmentProductInfo>
        <StyledShipmentProductTitle>{product.name}</StyledShipmentProductTitle>
        <StyledShipmentProductQuantity>
          {`Quantity - ${product.quantity} ${
            product.quantity === 1 ? "pack" : "packs"
          }${
            product.totalQuantity && product.totalQuantity > 1
              ? ` of ${product.totalQuantity}`
              : ""
          }`}
        </StyledShipmentProductQuantity>
        <StyledShipmentProductPrice>{price}</StyledShipmentProductPrice>
        <StyledShipmentProductChevron>
          <ChevronRightIcon />
        </StyledShipmentProductChevron>
      </StyledShipmentProductInfo>
      <StyledShipmentProductButton>View Details</StyledShipmentProductButton>
    </StyledShipmentProduct>
  )
}

const StyledShipmentProduct = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  cursor: pointer;

  &:hover,
  &:active {
    text-decoration: none;
  }

  &:hover > button:last-child {
    opacity: 1;

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }

  @media screen and (max-width: 1024px) {
    flex-direction: row;
  }
`

const StyledShipmentProductImage = styled.div`
  width: 50%;
  height: 128px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: contain;

  @media screen and (max-width: 1024px) {
    width: 100px;
    height: 90px;
    margin-right: 10px;
  }
`

const StyledShipmentProductInfo = styled.div`
  display: contents;

  @media screen and (max-width: 1024px) {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100%;
    padding-right: 10px;
  }
`

const StyledShipmentProductChevron = styled.div`
  position: absolute;
  display: none;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.7;

  & svg {
    width: 10px;
    height: 10px;
  }

  @media screen and (max-width: 1024px) {
    display: block;
  }
`

const StyledShipmentProductTitle = styled.h4`
  margin-top: 5px;
  text-align: center;
  color: #566582;
  font-family: "Graphik Semibold";
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  @media screen and (max-width: 1024px) {
    display: flex;
    flex: 1;
    margin: 0;
    text-align: left;
    font-size: 16px;
    line-height: 20px;
  }
`

const StyledShipmentProductQuantity = styled.small`
  display: block;
  margin: 0;
  margin-top: auto;
  padding: 0;
  padding-bottom: 5px;
  font-family: "Graphik Regular";
  font-size: 14px;
  color: #747e92;
`

const StyledShipmentProductPrice = styled.strong`
  display: block;
  padding-bottom: 10px;
  color: #30d9c5;
  font-family: "Merriweather";
  font-size: 16px;
  font-weight: 900;
  line-height: 1;
  text-align: center;

  @media screen and (max-width: 1024px) {
    padding-bottom: 0;
  }
`

const StyledOneTimeOfferBadge = styled.div`
  position: absolute;
  background-color: #eef4ff;
  color: #566582;
  font-family: "Graphik Medium";
  font-size: 13px;
  font-weight: 500;
  line-height: 14px;
  padding: 7px 14px;

  @media screen and (max-width: 1024px) {
    padding: 2px;
    top: 10px;
  }
`

const StyledShipmentProductButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 10px;
  opacity: 0;
  display: inline-block;
  outline: none;
  border: none;
  vertical-align: initial;
  font-family: "Lato", "Helvetica Neue", Arial, Helvetica, sans-serif;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  user-select: none;
  transition: opacity 0.3s ease-in-out;
  border-radius: 5px;
  background-color: #566582;
  height: 50px;
  max-width: 221px;
  width: calc(100% - 20px);
  color: #fff;
  font-family: "Graphik Semibold";
  font-size: 14px;
  font-weight: 600;
  line-height: 42px;
  padding: 0;
  cursor: pointer;
`
