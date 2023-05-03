import React from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"

WideSticker.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.node,
}

export function WideSticker({ icon, children, ...props }) {
  return (
    <StyledStickerContainerWrapper {...props}>
      <StyledStickerContainer>
        {Boolean(icon) && (
          <StyledStickerIconContainer>{icon}</StyledStickerIconContainer>
        )}
        <StyledStickerContent>{children}</StyledStickerContent>
      </StyledStickerContainer>
    </StyledStickerContainerWrapper>
  )
}

const StyledStickerContainerWrapper = styled.div`
  position: relative;
  padding-top: 35px;
`

const StyledStickerContainer = styled.section`
  background-color: #566582;
  position: relative;
  border-radius: 3px;
  padding: 35px 20px 20px;
  font-family: helvetica, sans-serif;
  font-weight: 400;
  color: #fff;
  text-align: center;
  box-sizing: border-box;

  &:after {
    content: "";
    display: block;
    position: absolute;
    border-style: solid;
    width: 24px;
    height: 24px;
    bottom: 0;
    left: 0;
    border-width: 0 24px 24px 0;
    border-color: #fff #9effd9 #fff #fff;
  }

  a {
    cursor: pointer;
    color: #3ce2cf;
    text-decoration: none;
  }
`

const StyledStickerIconContainer = styled.figure`
  position: absolute;
  width: 70px;
  height: 70px;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 2px solid #566582;
  color: #566582;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    width: auto;
    height: 35px;
    fill: #566582;
  }
`

const StyledStickerContent = styled.div`
  font-size: 26px;
  padding: 28px 14px;
  font-family: "Graphik Regular";
  color: #fff;
  box-sizing: border-box;

  @media screen and (max-width: 1024px) {
    padding: 28px 0;
  }
`
