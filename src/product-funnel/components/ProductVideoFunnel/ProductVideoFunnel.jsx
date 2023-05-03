import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { defaultData } from "./default-data.js"
import {
  PRODUCT_METAFIELD_KEY_CUSTOM_VIDEO_FUNNEL,
  PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
} from "../../../const.js"
import useProductMetafieldValue from "../../../hooks/useProductMetafieldValue.js"

ProductVideoFunnel.propTypes = {
  product: PropTypes.object,
}

function ProductVideoFunnel({ product, ...props }) {
  const video =
    useProductMetafieldValue(
      product,
      PRODUCT_METAFIELD_NAMESPACE_CUSTOM,
      PRODUCT_METAFIELD_KEY_CUSTOM_VIDEO_FUNNEL
    ) ?? defaultData
  const link = video?.video_link
  const width = video?.video_width || 560
  const height = video?.video_height || 315
  const descriptionTitle = video?.title
  const descriptionImg = video?.img
  const descriptionText = video?.text

  return (
    link && (
      <VideoLayout {...props}>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <IFrameWrapper>
            <iframe
              width={width}
              height={height}
              src={link}
              allowFullScreen=""
              allow="autoplay; encrypted-media"
            />
          </IFrameWrapper>
        </div>
        <DescriptionWrapper className="col-lg-6 col-md-12 col-sm-12">
          <Description>
            <img src={descriptionImg} alt="" />
            <div>
              <DescriptionTitle>{descriptionTitle}</DescriptionTitle>
              <DescriptionText>{descriptionText}</DescriptionText>
            </div>
            <BottomLine />
          </Description>
        </DescriptionWrapper>
      </VideoLayout>
    )
  )
}

export default ProductVideoFunnel

const VideoLayout = styled.div`
  margin: 2rem -0.8rem 0 0;
  display: flex;
  @media (max-width: 768px) {
    display: grid !important;
    iframe {
      width: 100% !important;
    }
  }
`

const DescriptionWrapper = styled.div`
  @media (max-width: 768px) {
    height: inherit;
    width: 100%;
    margin-top: 330px;
    padding: 0px;
  }
`

const IFrameWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Description = styled.div`
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 15px 5px 15px;

  img {
    width: 130px;
  }

  @media (max-width: 768px) {
    border-radius: 7px;
  }
`

const DescriptionTitle = styled.div`
  padding-top: 15px;
  color: #667799;
  font-family: "Merriweather", serif;
  font-size: 22px;
  font-weight: bold;
  line-height: 34px;
  text-align: center;
`

const DescriptionText = styled.div`
  color: #000000;
  font-family: "Roboto", serif;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
`

const BottomLine = styled.div`
  margin: 1.5rem 0;
  border-bottom: 1px solid rgba(102, 119, 153, 0.5);
  width: 22%;
`
