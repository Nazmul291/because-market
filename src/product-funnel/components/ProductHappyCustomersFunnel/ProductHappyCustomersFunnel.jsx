import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import StarRating from "./StarRating.jsx"
import { defaultData } from "./default-data.js"
import { StyledBlock } from "../StyledBlock"
import useProductMetafieldValue from "../../../hooks/useProductMetafieldValue.js"
import {
  PRODUCT_METAFIELD_KEY_CUSTOM_HAPPY_CUSTOMERS,
  PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
} from "../../../const.js"

ProductHappyCustomersFunnel.propTypes = {
  product: PropTypes.object,
}

function ProductHappyCustomersFunnel({ product, ...props }) {
  const happyCustomers =
    useProductMetafieldValue(
      product,
      PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
      PRODUCT_METAFIELD_KEY_CUSTOM_HAPPY_CUSTOMERS
    ) ?? defaultData
  const customers = happyCustomers.customers

  if (!happyCustomers) {
    return null
  }

  return (
    <StyledContainer {...props}>
      <StyledTitle>{happyCustomers.title}</StyledTitle>
      <StyledSubTitle>{happyCustomers.sub_title}</StyledSubTitle>
      <StyledStories>
        {customers.map((customer, index) => (
          <StyledStory
            key={index}
            className={`col-lg-${Math.max(
              1,
              Math.ceil(12 / customers.length)
            )} col-md-12 col-sm-12`}
          >
            <div>
              <img src={customer.img_link} alt="test" />
            </div>

            <StyledTextList>
              {customer.text_list.map((text, index) => (
                <StyledText key={index}>"{text}"</StyledText>
              ))}
            </StyledTextList>
            <div>
              <StyledText>{customer.user_name}</StyledText>
            </div>
            <StarRating
              rating={Number(customer.rank[0])}
              maxRating={Number(customer.rank[1])}
            />
            <StyledText>{customer.user_title}</StyledText>
            <StyledProduct>{customer.product}</StyledProduct>
          </StyledStory>
        ))}
      </StyledStories>
    </StyledContainer>
  )
}

export default ProductHappyCustomersFunnel

const StyledContainer = styled(StyledBlock)`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  font-family: "Cooper Md BT W05 Regular", sans-serif;
`

const StyledTitle = styled.div`
  font-size: 72px;
  font-weight: 700;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const StyledSubTitle = styled.div`
  font-size: 44px;
  text-align: center;
  margin-top: 32px;
  @media (max-width: 768px) {
    font-size: 16px;
    margin-top: 8px;
  }
`

const StyledStories = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  font-weight: 700;
`

const StyledStory = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  & div,
  & p {
    text-align: center;
  }
`

const StyledText = styled.p`
  color: #617a9d;
  line-height: initial;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  margin: 0;
`

const StyledTextList = styled.div`
  @media (min-width: 1024px) {
    min-height: 110px;
  }
  margin: 8px 0;
`

const StyledProduct = styled.p`
  color: #617a9d;
  font-size: 10px;
  margin-top: 2px;
`
