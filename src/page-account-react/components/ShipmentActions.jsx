import React from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { AccountAddPromo, StrokedButton } from "../../rUI"
import { SIZE_SMALL } from "../../rUI/StrokedButton/StrokedButton"
import { noop } from "../../utils"
import segment from "../../integrations/segment"

const PROMO_ERROR_TEXT = {
  COUPON_REACHED_MAX_REDEMPTIONS_ACCOUNT:
    "Promo code once has been redeemed on this account the maximum number of allowed times.",
  COUPON_NOT_REDEEMABLE: "Promo code not redeemable.",
}

ShipmentActions.propTypes = {
  promo: PropTypes.arrayOf(PropTypes.string),
  promoState: PropTypes.object,
  onChangeDate: PropTypes.func,
  onPromoSubmit: PropTypes.func,
}

export function ShipmentActions({
  promo,
  promoState,
  onChangeDate = noop,
  onPromoSubmit = noop,
  ...props
}) {
  const promoErrorText = promoState?.error
    ? PROMO_ERROR_TEXT[promoState?.error?.code] ??
      promoState?.error?.error ??
      String(promoState?.error)
    : null

  return (
    <ShipmentActionsContainer {...props}>
      <StyledActionLayout>
        <StrokedButton size={SIZE_SMALL} onClick={onChangeDate}>
          Change Date
        </StrokedButton>
      </StyledActionLayout>
      <StyledActionLayout>
        <AccountAddPromo
          value={promo}
          loading={promoState?.loading}
          error={promoErrorText}
          onSubmit={onPromoSubmit}
          onOpenForm={() => segment.track("S2-Portal add promo button clicked")}
        />
      </StyledActionLayout>
    </ShipmentActionsContainer>
  )
}

const ShipmentActionsContainer = styled.section`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

const StyledActionLayout = styled.div`
  width: auto;
  min-width: 129px;

  @media screen and (max-width: 1024px) {
    gap: 5px;
    min-width: 150px;
  }
`
