import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import CheckoutCard from "../../../rUI/CheckoutCard"
import Image from "../../../rUI/Image"
import Price from "../../../rUI/Price"
import { noop } from "../../../utils"

CheckoutCrossSellProductCard.propTypes = {
  product: PropTypes.object,
  loading: PropTypes.bool,
  onAdd: PropTypes.func,
}

function CheckoutCrossSellProductCard({
  product,
  loading = false,
  onAdd = noop,
}) {
  const img = product?.images[0]
  const variant = product?.variants[0]
  const imgSrc = img ? img.src : null
  const imgAltText = img ? img.altText : product?.title

  const handleOnAddClick = useCallback(
    () => onAdd({ product, variant }),
    [product, variant, onAdd]
  )

  return (
    <Root>
      <ImgLayout className="col-3">
        <Img src={imgSrc} alt={imgAltText} />
      </ImgLayout>
      <ProductLayout className="col-6">
        <strong>{product.title}</strong>
        <P>
          <Price priceV2={variant?.price} />
        </P>
      </ProductLayout>
      <ButtonLayout className="col-3">
        <AddButton onClick={handleOnAddClick} disabled={loading}>
          Add to Cart
        </AddButton>
      </ButtonLayout>
    </Root>
  )
}

const Root = styled(CheckoutCard)`
  background: #e8f3f6;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
`

const ImgLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0;
`

const Img = styled(Image)`
  width: 50%;
`

const ProductLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  color: #000000;
  font-size: 14px;
  line-height: 1.2;
`

const P = styled.p`
  margin-top: 5px;
  margin-bottom: 0;
`

const ButtonLayout = ImgLayout

const AddButton = styled.button`
  white-space: nowrap;
  background-color: #546a93;
  border: none;
  color: white;
  font-size: 14px;
  line-height: 16px;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
`

export default CheckoutCrossSellProductCard
