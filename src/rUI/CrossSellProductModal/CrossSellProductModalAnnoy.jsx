import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { useProductVariantStore } from "../../hooks"
import { noop } from "../../utils"
import { Image, Price } from ".."
import { Checkmark } from "./Checkmark"

CrossSellProductModalAnnoy.propTypes = {
  product: PropTypes.object,
  onSubscribe: PropTypes.func,
  onSkip: PropTypes.func,
  onAddToNextBoxOnly: PropTypes.func,
}

function CrossSellProductModalAnnoy({
  product,
  onSubscribe = noop,
  onSkip = noop,
  onAddToNextBoxOnly = noop,
}) {
  const store = useProductVariantStore(product)

  const finalPrice = store.currentVariantStore.finalPrice
  const productImage = (product?.images && product.images[0]) || null

  const handleSubscribe = useCallback(() => {
    onSubscribe({
      variantId: store.currentVariantStore.currentVariant?.id,
      quantity: store.quantity,
    })
  }, [onSubscribe, store])

  const handleAddToNextBoxOnly = useCallback(() => {
    onAddToNextBoxOnly({
      variantId: store.currentVariantStore.currentVariant?.id,
      quantity: store.quantity,
    })
  }, [onAddToNextBoxOnly, store])

  return (
    <ContentHolder>
      <CrossSellTitle>
        <CrossSellHeader data-title={product.title}>
          Are you sure you <Underlined>don't</Underlined> want to add to your
          order?
        </CrossSellHeader>
        <span>Add {product.title} to your next box to try it out!</span>
      </CrossSellTitle>

      <CrossSellProduct>
        <ProductImage src={productImage?.src} alt={productImage?.alt} />
        <ul style={{ listStyleType: "none" }}>
          <li>
            <Checkmark /> <Price priceV2={{ amount: finalPrice }} free /> for
            today only.
          </li>
          <li>
            <Checkmark /> Not available in stores
          </li>
          <li>
            <Checkmark /> 24/7 Customer Support
          </li>
          <li>
            <Checkmark /> Change or cancel anytime
          </li>
        </ul>
      </CrossSellProduct>

      <ButtonsWrapper>
        <ButtonPrimary type="button" onClick={handleSubscribe}>
          Upgrade my monthly order
        </ButtonPrimary>
        <ButtonSecondary type="button" onClick={handleAddToNextBoxOnly}>
          Add to my next box only
        </ButtonSecondary>
      </ButtonsWrapper>

      <SkipAnnoy onClick={onSkip}>x No thanks, I don't want it</SkipAnnoy>
    </ContentHolder>
  )
}

const ContentHolder = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
`

const CrossSellTitle = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
  line-height: 1.44;
`

const CrossSellHeader = styled.h3`
  line-height: 1.2;
  margin: 0 0 12px;
  font-size: 28px;
  font-weight: bold;
  font-family: "HelveticaNeue", sans-serif;
`

const Underlined = styled.span`
  font-style: normal;
  text-decoration: underline;
  font-family: inherit;
`

const CrossSellProduct = styled.div`
  max-width: 400px;
  margin: 0 auto 30px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.03);
`

const ProductImage = styled(Image)`
  height: 100% !important; // fix global style
  max-width: 100%;
  margin-bottom: 20px;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: baseline;
  justify-content: space-between;
  order: 2;
  width: 100%;

  @media (max-width: 575px) {
    margin: 0;
    flex-direction: column;
  }
`

const Button = styled.div`
  width: 48%;
  padding: 20px 12px;
  text-align: center;
  line-height: 20px;
  border-radius: 6px;
  border: solid 1px #aaa;
  white-space: nowrap;

  @media (max-width: 415px) {
    width: 100%;
    flex-direction: column;
  }
`

const ButtonPrimary = styled(Button)`
  font-size: 17px;
  background: #ed7800;
  border-color: #b75c00;
  color: #fff;
  font-weight: bold;

  &:hover {
    background: #b75c00;
    outline: none;
  }
`

const ButtonSecondary = styled(Button)`
  margin-top: 15px;

  &:hover {
    outline: none;
    background: #aaa;
    color: #fff;
  }
`

const SkipAnnoy = styled.div`
  cursor: pointer;
  margin: 24px auto;
  text-align: center;
`

export default CrossSellProductModalAnnoy
