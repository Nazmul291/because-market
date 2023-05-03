import React, { useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { useProductSubscriptions } from "../../../hooks"
import guarantedImg from "../../../rUI/img/get-in-right-guarantee-with-text.png"
import { AccountProductFormPricing, StrokedButton } from "../../../rUI"
import {
  SIZE_LARGE,
  VARIANT_PRIMARY,
} from "../../../rUI/StrokedButton/StrokedButton"
import segment from "../../../integrations/segment"

AccountPDPFormActionSubAndAdd.propTypes = {
  product: PropTypes.object,
  selectedVariant: PropTypes.object,
  quantity: PropTypes.number,
  editable: PropTypes.bool,
  onSubmit: PropTypes.func,
}

function AccountPDPFormActionSubAndAdd({
  product,
  selectedVariant,
  quantity,
  editable = true,
  onSubmit,
  ...props
}) {
  const { subscriptionWithMaxDiscount } = useProductSubscriptions(product)

  const handleSubscribe = useCallback(
    (e) => {
      segment.track("S2-Clicks Subscription Purchase Button")
      e.preventDefault()
      onSubmit({
        variant: selectedVariant,
        subscription: subscriptionWithMaxDiscount,
        quantity,
      })
    },
    [selectedVariant, subscriptionWithMaxDiscount, quantity, onSubmit]
  )

  const handlePurchase = useCallback(
    (e) => {
      segment.track("S2-Clicks One-Time Purchase Button")
      e.preventDefault()
      onSubmit({ variant: selectedVariant, quantity })
    },
    [selectedVariant, quantity, onSubmit]
  )

  useEffect(() => {
    segment.track("S2-Add to Next Box Only btn shown")
  }, [])

  return (
    <div {...props}>
      {selectedVariant && (
        <StyledPricingLayout>
          {subscriptionWithMaxDiscount && (
            <StyledAccountProductFormPricing
              label="Subscription"
              variant={selectedVariant}
              quantity={quantity}
              discounts={[subscriptionWithMaxDiscount.value]}
            />
          )}

          <StyledAccountProductFormPricing
            label="One-Time Purchase"
            variant={selectedVariant}
            quantity={quantity}
          />
        </StyledPricingLayout>
      )}

      <StyledPricingLayout>
        {selectedVariant && subscriptionWithMaxDiscount && (
          <StyledButtonLayout>
            <StrokedButton
              disabled={!selectedVariant || !editable}
              variant={VARIANT_PRIMARY}
              size={SIZE_LARGE}
              onClick={handleSubscribe}
            >
              Subscribe &amp; Save
            </StrokedButton>
            <StyledAdditionalInfo>
              <StyledAdditionalInfoUl>
                <StyledAdditionalInfoLi>
                  Cancel or Change Anytime
                </StyledAdditionalInfoLi>
                <StyledAdditionalInfoLi>
                  Free Shipping on Orders $25+
                </StyledAdditionalInfoLi>
                <StyledAdditionalInfoLi>
                  Discreet Delivery
                </StyledAdditionalInfoLi>
                <StyledAdditionalInfoLi>
                  FSA/HSA Eligible
                </StyledAdditionalInfoLi>
              </StyledAdditionalInfoUl>
            </StyledAdditionalInfo>
          </StyledButtonLayout>
        )}

        <StyledButtonLayout>
          <StrokedButton
            disabled={!selectedVariant || !editable}
            size={SIZE_LARGE}
            onClick={handlePurchase}
          >
            Add to Next Box Only
          </StrokedButton>
          <StyledAdditionalInfo>
            <StyledGuarantedImg src={guarantedImg} />
          </StyledAdditionalInfo>
        </StyledButtonLayout>
      </StyledPricingLayout>
    </div>
  )
}

const StyledPricingLayout = styled.div`
  display: flex;
  gap: 24px;
  padding-top: 22px;
`

const StyledAccountProductFormPricing = styled(AccountProductFormPricing)`
  flex: 1;
`

const StyledButtonLayout = styled.div`
  flex: 1;
`

const StyledAdditionalInfo = styled.div`
  padding-top: 22px;
`

const StyledAdditionalInfoUl = styled.ul`
  list-style: none;
`

const StyledAdditionalInfoLi = styled.li`
  &::before {
    content: "\\2022";
    color: #3ce2cf;
    font-weight: 700;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`

const StyledGuarantedImg = styled.img`
  max-height: 85px;
`

export default AccountPDPFormActionSubAndAdd
