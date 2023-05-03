import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { defaultData } from "./default-data.js"
import { RenderHtml } from "../../../rUI"
import useProductMetafieldValue from "../../../hooks/useProductMetafieldValue.js"
import {
  PRODUCT_METAFIELD_KEY_CUSTOM_DETAILS_FUNNEL,
  PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
} from "../../../const.js"
import { hasTag } from "../../../utils/utils.js"

ProductDetailsFunnel.propTypes = {
  product: PropTypes.object,
}

function ProductDetailsFunnel({ product, ...props }) {
  const detailsFunnel =
    useProductMetafieldValue(
      product,
      PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
      PRODUCT_METAFIELD_KEY_CUSTOM_DETAILS_FUNNEL
    ) ?? defaultData

  const moreInfoDescription = useMemo(() => {
    const description = product?.descriptionHtml ?? ""
    const START_STRING = "More Info"
    const END_STRING = "How To Use"
    const fromIndex =
      description.indexOf(START_STRING) < 0
        ? 0
        : description.indexOf(START_STRING) + START_STRING.length
    const toIndex = description.indexOf(END_STRING)
    return description.substring(fromIndex, toIndex)
  }, [product])

  const isMadeInUSARule = useMemo(
    () => hasTag(product?.tags, "underwear"),
    [product]
  )
  return (
    <StyledDetailContainer {...props}>
      <StyledDescription className="col-lg-7 col-md-12 col-sm-12">
        <h5>Product Details</h5>
        <RenderHtml html={moreInfoDescription} />
      </StyledDescription>
      <StyledDetails className="col-lg-5 col-md-12 col-sm-12">
        {detailsFunnel.map((item, index) => {
          if (item.madeInUSA && !isMadeInUSARule) {
            return
          }
          return (
            <StyledDetail key={index}>
              <ImgContainer>
                <StyledImg src={item.img_url} />
              </ImgContainer>
              <div>
                <StyledTitle style={{ fontWeight: "bold" }}>
                  {item.title}
                </StyledTitle>
                <StyledDescriptionText>{item.text}</StyledDescriptionText>
              </div>
            </StyledDetail>
          )
        })}
      </StyledDetails>
    </StyledDetailContainer>
  )
}

export default ProductDetailsFunnel

const StyledDetailContainer = styled.div`
  display: flex;
  margin-top: 32px;
  flex-wrap: wrap;
`

const StyledDescription = styled.div`
  flex-grow: 1;
  p {
    font-size: 17px;
    color: #000;
    line-height: 35px;
    font-family: Roboto, serif;
  }
  h5 {
    font-family: Roboto, serif;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`

const StyledDetail = styled.div`
  display: flex;
  gap: 32px;
  @media (max-width: 768px) {
    display: grid;
  }
`

const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StyledDescriptionText = styled.span`
  margin-bottom: 0;
  color: #747474;
  font-size: 17px;
`

const ImgContainer = styled.div`
  height: 75px;
  min-width: 105px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  img {
    max-height: 100%;
  }
`

const StyledImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const StyledTitle = styled.h5`
  font-family: Roboto, serif;
  font-weight: bold;
`
