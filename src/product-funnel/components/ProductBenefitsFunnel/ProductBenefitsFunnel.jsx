import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { defaultData } from "./default-data.js"
import { StyledBlock } from "../StyledBlock"
import { getMetafieldValue } from "../../../utils/utils.js"
import {
  PRODUCT_METAFIELD_KEY_CUSTOM_BENEFITS_PADS,
  PRODUCT_METAFIELD_KEY_CUSTOM_BENEFITS_UNDERWEAR,
  PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
} from "../../../const.js"

ProductBenefitsFunnel.propTypes = {
  product: PropTypes.object,
}

function ProductBenefitsFunnel({ product, ...props }) {
  const benefitsList = useMemo(() => {
    if (!product) {
      return null
    }
    const hasUnderwearTag = product?.tags?.includes("underwear")
    const hasPadsTag = product?.tags?.includes("pads")

    return hasUnderwearTag
      ? getMetafieldValue(
          product.metafields,
          PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
          PRODUCT_METAFIELD_KEY_CUSTOM_BENEFITS_UNDERWEAR
        ) ?? defaultData.tagUnderwear
      : hasPadsTag
      ? getMetafieldValue(
          product.metafields,
          PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
          PRODUCT_METAFIELD_KEY_CUSTOM_BENEFITS_PADS
        ) ?? defaultData.tagPads
      : null
  }, [product])

  return benefitsList ? (
    <StyledDetailContainer {...props}>
      {benefitsList.map((benefit, idx) => (
        <StyledBenefitContainer key={idx}>
          <StyledTitle>
            {benefit?.icon && <i className={`fa ${benefit.icon}`} />}
            <h5>{benefit?.title}</h5>
          </StyledTitle>
          <StyledBenefits>
            {benefit?.list?.map((item, index) => (
              <StyledBenefit key={index}>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </StyledBenefit>
            ))}
          </StyledBenefits>
        </StyledBenefitContainer>
      ))}
    </StyledDetailContainer>
  ) : null
}

export default ProductBenefitsFunnel

const StyledDetailContainer = styled(StyledBlock)`
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 24px;
  margin-top: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const StyledBenefitContainer = styled.div`
  min-width: 45%;
  margin-bottom: 0;
  border: none;

  &:last-of-type {
    min-width: 55%;
  }

  &:not(:last-of-type) {
    margin-right: 14px;
  }

  @media (max-width: 768px) {
    min-width: 100%;

    &:last-of-type {
      min-width: 100%;
      max-width: 100%;
    }

    &:not(:last-of-type) {
      margin-right: 0;
      margin-bottom: 16px;
    }
  }
`

const StyledTitle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: bolder;
  margin-bottom: 16px;
  font-size: 16px;

  i {
    font-size: 22px;
    font-weight: bolder;
    color: #43eddc;
    margin-right: 10px;
  }

  h5 {
    margin: 0 !important;
    font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica,
      Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-weight: bold;
    font-size: 16px;
    color: #212529;
    margin-bottom: "1rem";
  }
`

const StyledBenefits = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style-type: none;
  padding: 0;
`

const StyledBenefit = styled.li`
  &::before {
    content: "•";
    color: #43eddc;
    font-size: 22px;
  }
  span {
    color: #747474;
    font-size: 16px;
    padding-left: 10px;
  }
`
