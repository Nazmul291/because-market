import React from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { StrokedButton } from "../../rUI"
import { noop } from "../../utils"
import segment from "../../integrations/segment"

AccountProductSubscriptionActions.propTypes = {
  onRemove: PropTypes.func,
}

export function AccountProductSubscriptionActions({
  onRemove = noop,
  ...props
}) {
  segment.track("S2-Add to Next Box Only btn shown")

  return (
    <StyledActionsContainer {...props}>
      <StyledStrokedButton type="button" onClick={onRemove}>
        Subscribe & Save
      </StyledStrokedButton>
      <StyledStrokedButton type="submit" className="primary">
        Add to Next Box Only
      </StyledStrokedButton>
    </StyledActionsContainer>
  )
}

const StyledActionsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 24px;
`

const StyledStrokedButton = styled(StrokedButton)`
  height: 65px;
  line-height: 65px;

  &.primary {
    background-color: #10e4da;
    border-color: #10e4da;
  }
`
