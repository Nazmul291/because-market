import React from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"

import { CheckoutCard, RenderNode } from "../../../rUI"

CheckoutOrderSummaryLayout.propTypes = {
  title: PropTypes.string,
  titleImg: PropTypes.string,
  subTitle: PropTypes.string,
  subTitleImg: PropTypes.string,
  isTrial: PropTypes.bool,
  body: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  isMonthly: PropTypes.bool,
}

function CheckoutOrderSummaryLayout({
  title,
  titleImg,
  isMonthly,
  subTitle,
  subTitleImg,
  isTrial,
  body,
  children,
  footer,
  ...props
}) {
  const bodyNode = body || children

  return (
    <StyledCheckoutCard {...props}>
      <StyledHeader>
        {title && isTrial && (
          <StyledTitleTrial className={isMonthly ? "monthlyHeader" : ""}>
            <RenderNode node={title} />
          </StyledTitleTrial>
        )}
        {title && !isTrial && (
          <StyledTitle>
            <RenderNode node={title} />
          </StyledTitle>
        )}
        {titleImg && <StyledImg src={titleImg} />}
      </StyledHeader>

      {subTitle && isTrial && (
        <StyledSubTitleHolder>
          {subTitleImg && <StyledSubImg src={subTitleImg} />}
          <StyledSubTitleTrial>
            <RenderNode node={subTitle} />
          </StyledSubTitleTrial>
        </StyledSubTitleHolder>
      )}

      {subTitle && !isTrial && (
        <StyledSubTitle>
          <RenderNode node={subTitle} />
        </StyledSubTitle>
      )}
      <RenderNode node={bodyNode} />

      {footer && (
        <StyledFooter>
          <RenderNode node={footer} />
        </StyledFooter>
      )}
    </StyledCheckoutCard>
  )
}

const StyledImg = styled.img`
  display: none;
  width: 76px;
  height: 74px;
  @media (max-width: 768px) {
    display: block;
  }
`
const StyledSubTitleHolder = styled.div`
  line-height: 1.31;
  display: flex;
  justify-content: center;
  margin-top: 2px;
  text-align: center;
  font-size: 16px;
  color: #212121;
`

const StyledSubImg = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 5px;
`
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .monthlyHeader {
    font-size: 20px !important;
    font-weight: bold;
    margin: auto;
    justify-content: center;
    color: #212121;
  }
`

const StyledCheckoutCard = styled(CheckoutCard)`
  padding: 18px;
  @media (max-width: 768px) {
    padding: 8px;
  }
`
const StyledTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  font-family: "Cooper Lt BT W05 Regular";
`
const StyledTitleTrial = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  font-family: "Helvetica Neue", Arial, sans-serif;
`

const StyledSubTitleTrial = styled.h3`
  margin-bottom: 0;
  line-height: 1.31;
  margin-top: 2px;
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  text-align: left;
  font-family: "Helvetica Neue", Arial, sans-serif;
`
const StyledSubTitle = styled.h3`
  margin-top: 0px;
  margin-bottom: 0;
  font-size: 18px;
  font-weight: normal;
  text-align: center;
  font-family: "Cooper Lt BT W05 Regular";
`
const StyledFooter = styled.div`
  border-top: 1px solid #dadada;

  padding-top: 10px;
`

export default CheckoutOrderSummaryLayout
