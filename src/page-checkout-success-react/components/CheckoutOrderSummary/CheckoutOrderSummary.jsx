import React from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { Price } from "../../../rUI"
import CheckoutOrderSummaryLayout from "../CheckoutOrderSummaryLayout"
import CheckoutOrderSummaryList, {
  CheckoutOrderSummaryListItem,
  CheckoutOrderSummaryListDividedLine,
  CheckoutOrderSummaryListWithoutLine,
} from "../CheckoutOrderSummaryList"
import CheckoutOrderSummaryItemPrice from "./CheckoutOrderSummaryItemPrice"

export const VARIANT_DEFAULT = "default"
export const VARIANT_WITH_BOLDED_TOTAL = "bolded_total"

CheckoutOrderSummary.propTypes = {
  title: PropTypes.string,
  titleImg: PropTypes.string,
  subTitle: PropTypes.string,
  items: PropTypes.array,
  subTitleImg: PropTypes.string,
  isTrial: PropTypes.bool,
  total: PropTypes.object,
  variant: PropTypes.string,
  isMonthly: PropTypes.bool,
}

function CheckoutOrderSummary({
  title,
  titleImg,
  subTitle,
  subTitleImg,
  items,
  isTrial,
  total,
  isMonthly,
  variant = VARIANT_DEFAULT,
  ...props
}) {
  return (
    <StyledLayoutContainer>
      <StyledCheckoutOrderSummaryLayout
        {...props}
        className={isTrial ? "isTrialCheckoutOrderSummary" : ""}
        title={title}
        isMonthly={isMonthly}
        titleImg={titleImg}
        subTitleImg={subTitleImg}
        isTrial={isTrial}
        subTitle={subTitle}
        data-variant={variant}
        body={
          items && (
            <CheckoutOrderSummaryList>
              {items.map((item) => (
                <CheckoutOrderSummaryListItem
                  key={item.label}
                  isMonthly={isMonthly}
                  head={
                    <>
                      <div>
                        {item.isNotBold || isMonthly ? (
                          item.label
                        ) : (
                          <b>{item.label}</b>
                        )}
                        {item.quantity && !isMonthly && (
                          <StyledQuantity>
                            &nbsp;x&nbsp;{item.quantity}
                          </StyledQuantity>
                        )}
                      </div>
                    </>
                  }
                  tail={<CheckoutOrderSummaryItemPrice item={item} />}
                />
              ))}
            </CheckoutOrderSummaryList>
          )
        }
        footer={
          total &&
          (!isMonthly ? (
            <StyleFooter>
              <CheckoutOrderSummaryListWithoutLine
                head={total.label}
                tail={<Price priceV2={total.priceV2} free />}
              />
            </StyleFooter>
          ) : (
            <StyleFooter>
              <CheckoutOrderSummaryListDividedLine
                head={total.label}
                tail={
                  <>
                    <Price priceV2={total.priceV2} free />
                    {isMonthly && "/ mo."}
                  </>
                }
              />
            </StyleFooter>
          ))
        }
      />
    </StyledLayoutContainer>
  )
}

const StyledLayoutContainer = styled.div`
  .isTrialCheckoutOrderSummary {
    h2 {
      font-family: Helvetica Neue, Arial, sans-serif !important;
      font-size: 1.5rem;
    }
    h3 {
      font-family: Helvetica Neue, Arial, sans-serif !important;
    }
    margin-top: 20px;
    font-size: 14px;
    padding: 29px 20px 32px 21px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #dadada;
    @media (max-width: 768px) {
      margin-bottom: 20px !important;
    }
  }
`

const StyledCheckoutOrderSummaryLayout = styled(CheckoutOrderSummaryLayout)`
  --footer__font-weight: normal;
  &[data-variant="${VARIANT_WITH_BOLDED_TOTAL}"] {
    --footer__font-weight: bold;
  }
`

const StyledQuantity = styled.strong`
  white-space: nowrap;
`

const StyleFooter = styled.div`
  font-weight: var(--footer__font-weight);
`
export default CheckoutOrderSummary
