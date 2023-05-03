import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { ShipmentProduct } from "./ShipmentProduct"
import { ShipmentProductDummy } from "./ShipmentProductDummy"
import { applyStyleIfHasProperty, noop } from "../../utils"

const SHIPMENT_PRODUCTS_GRID_COLUMNS = 4

ShipmentProducts.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      handle: PropTypes.string,
      image: PropTypes.string,
      quantity: PropTypes.number,
      totalQuantity: PropTypes.number,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      oneTimeOffer: PropTypes.bool,
    })
  ),
  onAddMoreProducts: PropTypes.func,
  onViewProductDetails: PropTypes.func,
}

export function ShipmentProducts({
  products = [],
  onAddMoreProducts = noop,
  onViewProductDetails = noop,
  ...props
}) {
  const cellsCount = useMemo(
    () =>
      products.length % SHIPMENT_PRODUCTS_GRID_COLUMNS
        ? Math.ceil(products.length / SHIPMENT_PRODUCTS_GRID_COLUMNS) *
          SHIPMENT_PRODUCTS_GRID_COLUMNS
        : products.length + SHIPMENT_PRODUCTS_GRID_COLUMNS,
    [products]
  )

  const cells = useMemo(
    () => [...products, ...new Array(cellsCount - products.length).fill(null)],
    [cellsCount, products]
  )

  return (
    <StyledShipmentPropductsGrid {...props}>
      {cells.map((product, idx) => (
        <StyledShipmentProductsCell
          key={idx}
          className={product ? "active" : null}
          empty={!product}
        >
          {product ? (
            <ShipmentProduct
              product={product}
              onViewDetails={onViewProductDetails}
            />
          ) : (
            <ShipmentProductDummy onClick={onAddMoreProducts} />
          )}
        </StyledShipmentProductsCell>
      ))}
    </StyledShipmentPropductsGrid>
  )
}

const StyledShipmentPropductsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(${SHIPMENT_PRODUCTS_GRID_COLUMNS}, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    grid-column-gap: 0;
    grid-row-gap: 0;
    margin: 20px 0;
  }
`

const StyledShipmentProductsCell = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  border: 1px solid rgba(86, 101, 130, 0.28);
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &.active:hover {
    transform: translateY(-5px);

    @media screen and (max-width: 1024px) {
      transform: none;
    }
  }

  @media screen and (max-width: 1024px) {
    display: ${applyStyleIfHasProperty("empty", "none", "flex")};
    flex-direction: row;
    width: 100%;
    height: auto;
    transition: none;
    margin-bottom: -1px;
    border-radius: 0;

    &.active:first-of-type {
      border-radius: 4px 4px 0 0;
    }

    &.active:last-of-type {
      border-radius: 0 0 4px 4px;
    }
  }
`
