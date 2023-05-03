import React, { useCallback, useEffect } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { Modal } from "../../../rUI"
import { noop } from "../../../utils"
import { trackEvent } from "../../../integrations/tracker"
import imgOto from "./img/onetimeoffer.png"
import imgOtoMob from "./img/onetimeoffer_mobile.png"
import ModalTrialCheckoutUpgradeTitle from "./ModalTrialCheckoutUpgradeTitle"
import ModalTrialCheckoutUpgradeProduct from "./ModalTrialCheckoutUpgradeProduct"
import ModalTrialCheckoutUpgradeBackquote from "./ModalTrialCheckoutUpgradeBackquote"
import ModalTrialCheckoutUpgradeReviews from "./ModalTrialCheckoutUpgradeReviews"
import useSelectedVariantByIdForSkipTrial from "../../hooks/useSelectedVariantByIdForSkipTrial"

ModalTrialCheckoutUpgrade.propTypes = {
  product: PropTypes.object,
  selectedVariantId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.number,
  discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
}

function ModalTrialCheckoutUpgrade({
  product,
  selectedVariantId,
  quantity = 1,
  discount = 0,
  onApply = noop,
  onCancel = noop,
  ...props
}) {
  const selectedVariant = useSelectedVariantByIdForSkipTrial(
    product,
    selectedVariantId
  )

  const handleApply = useCallback(
    (args) => {
      trackEvent("Post Purchase Upgrade Load Click", { value: "Taken" })
      onApply(args)
    },
    [onApply]
  )

  useEffect(() => {
    trackEvent("Post Purchase Upgrade Load")
  }, [])

  return (
    <StyledModal {...props} onCloseClick={onCancel}>
      <ModalTrialCheckoutUpgradeTitle discount={discount} />
      <StyledModalTrialCheckoutUpgradeProduct
        product={product}
        selectedVariant={selectedVariant}
        quantity={quantity}
        discount={discount}
        onApply={handleApply}
        onCancel={onCancel}
      />
      <StyledModalTrialCheckoutUpgradeBackquote />
      <ModalTrialCheckoutUpgradeReviews />
      <StyledHint>
        * This {discount}% discount will override any other discounts you may
        have applied to your order.
      </StyledHint>
      <StyledLabel style={{ backgroundImage: `url(${imgOto})` }} />
      <StyledLabelMobile style={{ backgroundImage: `url(${imgOtoMob})` }} />
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  --body-padding: 100px 40px 40px;
  --body-padding__mobile: 90px 13px 27px 13px;
  --close-button__color: #000;
`

const StyledModalTrialCheckoutUpgradeProduct = styled(
  ModalTrialCheckoutUpgradeProduct
)`
  margin-top: 40px;

  @media only screen and (max-width: 1023px) {
    margin-bottom: 20px;
  }
`

const StyledModalTrialCheckoutUpgradeBackquote = styled(
  ModalTrialCheckoutUpgradeBackquote
)`
  margin-top: 50px;
`

const StyledHint = styled.p`
  margin-bottom: 0;
  text-align: left;
  font-size: 16px;
  margin-top: 15px;
  color: #777;
  line-height: 1.5em;

  @media only screen and (max-width: 1023px) {
    text-align: center;
  }
`

const StyledLabel = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  width: 232px;
  height: 232px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  @media only screen and (max-width: 767px) {
    width: 100%;
    height: 80px;
    max-width: 170px;
    top: -22px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
  }
`

const StyledLabelMobile = styled(StyledLabel)`
  display: none;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`

export default ModalTrialCheckoutUpgrade
