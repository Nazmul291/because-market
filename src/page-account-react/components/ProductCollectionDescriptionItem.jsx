import React from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { Image, RenderHtml, StrokedButton } from "../../rUI"
import { noop } from "../../utils"

ProductCollectionDescriptionItem.propTypes = {
  title: PropTypes.string,
  descriptionHtml: PropTypes.string,
  viewBtnText: PropTypes.string,
  imageUrl: PropTypes.string,
  imageFloat: PropTypes.string,
  onViewDetailsClick: PropTypes.func,
}

export function ProductCollectionDescriptionItem({
  title,
  descriptionHtml,
  viewBtnText,
  imageUrl,
  imageFloat,
  onViewDetailsClick = noop,
  ...props
}) {
  return (
    <StyledProductCollectionDescriptionItemContainer {...props}>
      {imageFloat !== "right" && (
        <StyledItemLayout>
          <StyledDescriptionImage src={imageUrl} />
        </StyledItemLayout>
      )}
      <StyledProductDetails>
        <StyledTitle>{title}</StyledTitle>

        <StyledDescription>
          {descriptionHtml && <RenderHtml html={descriptionHtml} />}
        </StyledDescription>
        <StrokedButton onClick={onViewDetailsClick}>
          {viewBtnText}
        </StrokedButton>
      </StyledProductDetails>
      {imageFloat === "right" && (
        <StyledItemLayout>
          <StyledDescriptionImage src={imageUrl} />
        </StyledItemLayout>
      )}
    </StyledProductCollectionDescriptionItemContainer>
  )
}

const StyledProductCollectionDescriptionItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 441px;
  grid-column-gap: 15px;
  padding: 10px;

  @media screen and (max-width: 1024px) {
    padding: 24px;
    display: grid;
    height: auto;
  }

  & figure {
    padding: 0 !important;
  }

  & section {
    padding: 15px 10px 15px 0;
    display: block;
    margin: 15%;

    @media screen and (max-width: 390px) {
      padding: 0;
      margin: 0;
    }
  }

  & strong {
    margin-bottom: 24px;
  }

  & button {
    background-color: #0cb9b0 !important;
    height: 59px !important;
    width: 300px !important;
    border-radius: 5px;
    border: 0px;
    cursor: pointer;
    color: #fff !important;
    font-family: "Graphik Semibold" !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    line-height: 42px;

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
`

const StyledItemLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  overflow: auto;
`

const StyledDescriptionImage = styled(Image)`
  margin: 0 auto;
  height: auto;
  max-height: 100%;

  @media screen and (max-width: 1024px) {
    display: inline;
    height: auto;
  }
`

const StyledProductDetails = styled.section`
  margin: 0;
  padding: 0;
  display: grid;
  vertical-align: center;

  @media screen and (max-width: 1024px) {
    display: inline;
  }
`
const StyledDescription = styled.h3`
  flex: 1;
  margin: 5px 0 25px 0;
  padding: 14px 0 0;
  text-align: left;
  overflow: visible;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 900;
  line-height: 20px;
  color: #566582;
  font-family: "Cooper Lt BT W05 Regular";
  font-weight: 300;
`

const StyledTitle = styled.h2`
  flex: 1;
  margin: 5px 0 0;
  padding: 14px 0 0;
  text-align: left;
  overflow: visible;
  text-overflow: ellipsis;
  color: #566582;
  font-family: "Graphik Semibold";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #566582;
  letter-spacing: -0.86px;
  margin-bottom: 0;
  max-width: 350px;
  color: #566582;
  font-family: Merriweather;
  font-size: 30px;
  letter-spacing: -0.86px;
  line-height: 36px;
  margin-bottom: 0;
`
