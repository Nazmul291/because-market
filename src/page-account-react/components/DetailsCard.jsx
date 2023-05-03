import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { StrokedButton } from "../../rUI"
import { noop } from "../../utils"

DetailsCard.propTypes = {
  title: PropTypes.node,
  action: PropTypes.string,
  actionDisabled: PropTypes.bool,
  children: PropTypes.node,
  onActionClick: PropTypes.func,
}

export function DetailsCard({
  title,
  action,
  actionDisabled = false,
  children,
  onActionClick = noop,
  ...props
}) {
  return (
    <StyledDetailsCard {...props}>
      {Boolean(title) && <StyledTitle>{title}</StyledTitle>}
      {children}
      {Boolean(action) && onActionClick !== noop && (
        <StyledStrokedButton onClick={onActionClick} disabled={actionDisabled}>
          {action}
        </StyledStrokedButton>
      )}
    </StyledDetailsCard>
  )
}

const StyledDetailsCard = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid rgba(86, 101, 130, 0.17);
  background-color: #f5f7f9;
`

const StyledTitle = styled.h3`
  padding: 0;
  margin: 0 0 16px;
  color: #566582;
  font-family: "Graphik Semibold", sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  & a {
    text-decoration: none;
    color: #566582;
  }

  & a:hover {
    text-decoration: underline;
  }
`

const StyledStrokedButton = styled(StrokedButton)`
  margin-top: 16px;
`
