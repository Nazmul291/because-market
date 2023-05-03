import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { defaultData } from "./default-data.js"
import { StyledBlock } from "../StyledBlock"
import useProductMetafieldValue from "../../../hooks/useProductMetafieldValue.js"
import {
  PRODUCT_METAFIELD_KEY_CUSTOM_FAQ_FUNNEL,
  PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
} from "../../../const.js"

ProductFaqFunnel.propTypes = {
  product: PropTypes.object,
}

function ProductFaqFunnel({ product, ...props }) {
  const faq =
    useProductMetafieldValue(
      product,
      PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
      PRODUCT_METAFIELD_KEY_CUSTOM_FAQ_FUNNEL
    ) ?? defaultData

  const titleIcon = faq?.title_icon
  const title = faq?.title
  const faqList = faq?.list

  if (!faq) {
    return null
  }

  return (
    <StyledFaqContainer {...props}>
      <StyledHeader>
        <i className={`fa ${titleIcon}`.trim()} /> {title}
      </StyledHeader>

      {faqList?.map((fagItem, index) => (
        <div key={index}>
          <StyledAccordionHeader
            id={`collapse_header_id_${index}`}
            data-toggle="collapse"
            data-target={`#collapse_child_id_${index}`}
            aria-expanded="true"
            aria-controls={`collapse_child_id_${index}`}
          >
            <StyledQuestion>{fagItem?.faq_question}</StyledQuestion>
          </StyledAccordionHeader>
          <StyledAccordionBody
            id={`collapse_child_id_${index}`}
            className="collapse"
            aria-labelledby={`collapse_header_id_${index}`}
          >
            <FaqAnswer>
              {fagItem?.faq_answer?.map((item, itemIndex) => (
                <p key={itemIndex}>{item}</p>
              ))}
            </FaqAnswer>
          </StyledAccordionBody>
        </div>
      ))}
    </StyledFaqContainer>
  )
}

export default ProductFaqFunnel

const StyledFaqContainer = styled(StyledBlock)`
  margin-top: 2rem;
  padding: 25px;
`

const StyledHeader = styled.h5`
  color: #212529;
  font-family: "Roboto";
  font-size: 20px;

  i {
    font-size: 25px;
    color: #43eddc;
    margin-right: 10px;
  }
`

const StyledAccordionHeader = styled.div`
  border-bottom: 1px solid rgba(102, 119, 153, 0.15);
  padding: 12px 15px;
  position: relative;
  cursor: pointer;
  &::after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #747b80;
    content: "";
    pointer-events: none;
    opacity: 0.8;
  }
`

const StyledQuestion = styled.div`
  color: #212529;
  font-family: "Roboto";
  font-size: 14px;
`

const FaqAnswer = styled.div`
  font-family: "Roboto" !important;
`

const StyledAccordionBody = styled.div`
  flex: 1 1 auto;
  padding: 1.25rem;
  font-size: 1rem;
  transition: none !important;
  height: initial !important;
`
