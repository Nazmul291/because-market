import React, { useMemo, useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { useProductVariantStore } from "../../hooks"
import { noop } from "../../utils"
import { trackEvent } from "../../integrations/tracker"
import { Image, InputQuantity, InputSelect, Price, Modal } from ".."
import { PRODUCT_SHORT_DESCRIPTION_SELECTOR } from "../../const"
import RenderHtml from "../RenderHtml"

CrossSellProductModal.propTypes = {
  product: PropTypes.object,
  disabled: PropTypes.bool,
  onNext: PropTypes.func,
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
}

function CrossSellProductModal({
  product,
  disabled = false,
  onClose = noop,
  onNext = noop,
  onAdd = noop,
}) {
  const store = useProductVariantStore(product)

  const finalPrice = store.currentVariantStore.finalPrice
  const showQuantity = store.productStore.showQuantity
  const optionsArr = store.productStore.optionsArr
  const groupedOption = store.currentVariantStore.groupedOption
  const productImage = (product?.images && product.images[0]) || null

  const description = useMemo(() => {
    const template = document.createElement("template")
    template.innerHTML = product.descriptionHtml?.trim()

    const shortDescription = template.content.querySelector(
      PRODUCT_SHORT_DESCRIPTION_SELECTOR
    )

    if (!shortDescription) {
      return null
    }

    return {
      html: shortDescription.innerHTML,
      likes: shortDescription.dataset.likes,
    }
  }, [product])

  const handleAdd = useCallback(() => {
    if (disabled) {
      return
    }

    trackEvent("Post Purchase Cross Sell Click", {
      value: "Taken",
      product: product.title || "",
    })
    onAdd({
      variantId: store.currentVariantStore.currentVariant?.id,
      quantity: store.quantity,
      product,
    })
  }, [onAdd, product, store, disabled])

  const handleQuantityChange = (quantity) => {
    trackEvent("S2 - Cross-sell Modal: adjust quantity")
    store.setQuantity(quantity)
  }

  return (
    <StyledModal onCloseClick={onClose}>
      <ContentHolder>
        <CrossSellTitle>
          <CrossSellHeader data-title={product.title}>
            Add {product.title} to your order?
          </CrossSellHeader>
          <span>
            We'll include them with your Starter Pack and with your monthly
            refills.
          </span>
        </CrossSellTitle>
        <CrossSellProduct>
          <ImageHolder>
            <ImageWrapper>
              <ProductImage src={productImage?.src} alt={productImage?.alt} />
            </ImageWrapper>
            <StyledProductDescriptionRenderHtml html={description?.html} />
          </ImageHolder>
          <PriceWrapper>
            <Price priceV2={{ amount: finalPrice }} free />
          </PriceWrapper>
          <ButtonsWrapper>
            {description && description.likes && (
              <WeekSellWrapper>
                <WeekSellIcon>♥</WeekSellIcon>
                <span>{description.likes}</span>
              </WeekSellWrapper>
            )}

            <OptionsWrapper>
              {!showQuantity ? null : (
                <StyledInputQuantity
                  label="Quantity"
                  value={store.quantity}
                  onChange={handleQuantityChange}
                  withoutError
                />
              )}

              {optionsArr.map((option) => (
                <StyledInputSelect
                  key={option.key}
                  options={option.values}
                  value={groupedOption[option.key]}
                  label={option.key}
                  withoutError
                  onChange={({ target: { value } }) =>
                    store.currentVariantStore.setCurrentVariantByOptions({
                      ...groupedOption,
                      [option.key]: value,
                    })
                  }
                />
              ))}
            </OptionsWrapper>

            <ButtonPrimary
              type="button"
              onClick={handleAdd}
              disabled={disabled}
            >
              Add to my order
            </ButtonPrimary>
            <ButtonSecondary type="button" onClick={onNext}>
              No, thanks
            </ButtonSecondary>
          </ButtonsWrapper>
        </CrossSellProduct>
      </ContentHolder>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  --max-width: 756px;
  --body-padding: 40px;
  --body-padding__mobile: 60px 16px 20px 16px;
  --close-button__color: #000;
`

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

  @media (max-width: 575px) {
    font-size: 22px;
  }
`

const CrossSellProduct = styled.div`
  @media (max-width: 575px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const ImageHolder = styled.div`
  float: left;
  margin: 0 30px 0 0;
  width: calc(50% - 15px);
  max-width: calc(50% - 15px);
  order: 2;
  position: relative;
  overflow: hidden;

  @media (max-width: 575px) {
    margin: 0;
    max-width: 100%;
    width: 100%;
  }
`

const ProductImage = styled(Image)`
  height: 70% !important; // fix global style

  @media (max-width: 575px) {
    height: 100% !important; // fix global style
  }
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 200px;
`

const StyledProductDescriptionRenderHtml = styled(RenderHtml)`
  margin-top: 12px;

  ul {
    padding: 0;
  }

  li::before {
    content: "✔";
    display: inline-block;
    padding-right: 0.3em;
  }

  li {
    list-style: none;
    display: flex;
  }

  @media (max-width: 575px) {
    margin-top: 24px;
  }
`

const PriceWrapper = styled.h4`
  color: #00a400;
  order: 1;
  overflow: hidden;
  max-width: 50%;
  margin-left: auto;
  margin: 0 0 19px;
  font-size: 24px;
  line-height: 1.2;
  font-weight: bold;
  font-family: "HelveticaNeue", sans-serif;
  text-align: center;
`

const OptionsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`

const StyledInputQuantity = styled(InputQuantity)`
  @media (max-width: 575px) {
    --input-body--height: 60px;
  }
`

const StyledInputSelect = styled(InputSelect)`
  @media (max-width: 575px) {
    --input-body--height: 60px;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  order: 2;
  max-width: 50%;
  margin-left: auto;

  @media (max-width: 575px) {
    margin: 0;
    max-width: 100%;
    width: 100%;
    align-items: center;
    margin-top: 16px;
  }
`

const WeekSellWrapper = styled.div`
  width: 100%;
  position: relative;
  background: #eef3ff;
  border: solid 1px #c0c8d8;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
  padding: 16px 8px;
  border-radius: 4px;
  margin-bottom: 17px;

  @media (max-width: 575px) {
    font-size: 16px;
  }

  &::before {
    content: "";
    position: absolute;
    right: 30%;
    top: 100%;
    width: 10px;
    height: 10px;
    border: solid #c0c8d8;
    border-width: 0 1px 1px 0;
    background: #eef3ff;
    transform: rotate(45deg);
    margin-top: -4px;
  }
`

const WeekSellIcon = styled.span`
  font-size: 22px;
  color: #ff4032;
  line-height: 1;
  display: inline-block;
  vertical-align: top;
  margin-right: 4px;
`

const Button = styled.div`
  width: 100%;
  padding: 20px 12px;
  text-align: center;
  line-height: 20px;
  border-radius: 6px;
  border: solid 1px #aaa;
`

const ButtonPrimary = styled(Button)`
  font-size: 17px;
  background: #ed7800;
  border-color: #b75c00;
  color: #fff;
  font-weight: bold;
  margin-top: 15px;

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

export default CrossSellProductModal
