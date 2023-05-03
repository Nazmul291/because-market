import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { PencilIcon } from "../../rUI/icons/PencilIcon"

AccountDetailsRow.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.node,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onAction: PropTypes.func,
}

export function AccountDetailsRow({
  icon,
  title,
  children,
  disabled,
  onAction,
  ...props
}) {
  return (
    <StyledRow {...props}>
      {Boolean(icon) && <StyledRowIcon>{icon}</StyledRowIcon>}
      <StyledRowInfo>
        <StyledRowTitle>{title}</StyledRowTitle>
        <StyledRowContent>{children}</StyledRowContent>
      </StyledRowInfo>
      <StyledRowAction disabled={disabled} onClick={onAction}>
        <StyledPencilIcon /> <StyledActionText>Edit</StyledActionText>
      </StyledRowAction>
    </StyledRow>
  )
}

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
`

const StyledRowIcon = styled.div`
  flex: 0 0 38px;
  margin-top: 3px;
`

const StyledRowInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  margin-left: 15px;

  @media screen and (max-width: 1024px) {
    margin-right: 15px;
  }
`

const StyledRowTitle = styled.h3`
  color: #747e92;
  font-family: "Graphik Regular";
  font-size: 14px;
  text-align: left;
  margin: 0;
  padding: 0;
`

const StyledRowContent = styled.div`
  word-break: break-all;
  color: #566582;
  font-family: "Graphik Semibold";
  font-size: 16px;
  font-weight: 600;
  line-height: 29px;
  text-align: left;
`

const StyledRowAction = styled.button`
  width: auto;
  min-width: 40px;
  height: 50px;
  padding: 0;
  margin-top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #566582;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;

  &:disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.5;
  }

  &:hover,
  &:active {
    background-color: #566582;
    color: #fff;
  }

  &:hover svg,
  &:active svg {
    fill: #fff;
  }

  @media screen and (max-width: 1024px) {
    height: 40px;
  }
`

const StyledActionText = styled.span`
  display: inline-block;
  min-width: 95px;
  font-family: "Graphik Medium";
  font-weight: 500;
  text-decoration: none;
  text-align: center;

  font-size: 16px;

  @media screen and (max-width: 1024px) {
    min-width: auto;
    display: none;
  }
`

const StyledPencilIcon = styled(PencilIcon)`
  width: 14px;
  fill: #566582;
  display: none;

  @media screen and (max-width: 1024px) {
    display: block;
  }
`
