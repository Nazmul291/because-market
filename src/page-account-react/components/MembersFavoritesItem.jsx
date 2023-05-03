import React from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { StrokedButton } from "../../rUI"
import { noop } from "../../utils"

MembersFavoritesItem.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.string,
  large: PropTypes.bool,
  onViewDetailsClick: PropTypes.func,
}

export function MembersFavoritesItem({
  title,
  imageUrl,
  price,
  large,
  onViewDetailsClick = noop,
}) {
  return (
    <StyledMembersFavoritesItemContainer className={large ? "large" : null}>
      <StyledImage style={{ backgroundImage: `url('${imageUrl}')` }} />
      <StyledItemDetails>
        <StyledTitle>{title}</StyledTitle>
        <StyledPrice>{price}</StyledPrice>
        <StrokedButton onClick={onViewDetailsClick}>View Details</StrokedButton>
      </StyledItemDetails>
    </StyledMembersFavoritesItemContainer>
  )
}

const StyledMembersFavoritesItemContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  box-sizing: border-box;
  padding: 30px 24px;

  @media screen and (max-width: 1024px) {
    padding: 24px;
  }

  &.large {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
    padding: 10px;
  }

  &.large h3 {
    overflow: visible;
    flex: 1 1;
    font-family: "Cooper Md BT W05 Regular";
    font-size: 30px;
    font-weight: 500;
    letter-spacing: -0.09px;
    line-height: 36px;
    word-break: normal;
    padding: 0;
  }

  &.large figure {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  &.large section {
    padding: 15px 10px 15px 0;
  }

  &.large strong {
    margin-bottom: 24px;
  }

  &.large button {
    max-width: 186px;
  }
`

const StyledImage = styled.figure`
  width: 50%;
  padding-top: 50%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
  margin: 0 auto;
`

const StyledItemDetails = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0;
  padding: 0;
`

const StyledTitle = styled.h3`
  flex: 1;
  margin: 5px 0 0;
  padding: 14px 0 0;
  text-align: left;
  overflow: visible;
  text-overflow: ellipsis;
  color: #566582;
  font-family: "Graphik Semibold";
  font-size: 14px;
  font-weight: 900;
  line-height: 20px;
`

const StyledPrice = styled.strong`
  color: #30d9c5;
  text-decoration: none;
  font-family: Merriweather;
  font-size: 16px;
  font-weight: 900;
  line-height: 42px;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`
