import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../utils"

SubscriptionDetailsTitle.propTypes = {
  active: PropTypes.bool,
  onCancel: PropTypes.func,
  subscriptions: PropTypes.arrayOf(PropTypes.shape({})),
}

export function SubscriptionDetailsTitle({
  active,
  subscriptions,
  onCancel = noop,
  ...props
}) {
  return (
    <StyledPlanStatusContainer {...props}>
      <StyledPlanStatus>
        Your plan is currently <strong>{active ? "Active" : "Inactive"}</strong>
      </StyledPlanStatus>
      {subscriptions.length && (
        <StyledPlanControl
          onClick={() => {
            onCancel()
          }}
        >
          Pause or Cancel
        </StyledPlanControl>
      )}
    </StyledPlanStatusContainer>
  )
}

const StyledPlanStatusContainer = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  color: #9699a3;
  font-family: Helvetica, sans-serif;
  font-size: 17px;
  line-height: 24px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const StyledPlanStatus = styled.span`
  display: inline-block;
  padding: 0 16px;
  margin-left: 8px;
  border-left: 2px solid #566582;

  @media screen and (max-width: 1024px) {
    border-left: none;
    padding-left: 0;
    margin-left: 0;
  }
`

const StyledPlanControl = styled.span`
  text-decoration: underline;
  color: #566582;
  cursor: pointer;
`
