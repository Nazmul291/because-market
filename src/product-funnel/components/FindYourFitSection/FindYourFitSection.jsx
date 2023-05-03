import React, { memo, useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import menImg from "../../../../assets/find_your_fit_men.png"
import womenImg from "../../../../assets/find_your_fit_women.png"
import SizingTableContainer from "./SizingTableContainer"

FindYourFitSection.propTypes = {
  product: PropTypes.object,
}

function FindYourFitSection({ product, ...props }) {
  const isForMen = useMemo(() => {
    return (
      product?.title?.toLowerCase().includes("men") &&
      !product?.title?.toLowerCase().includes("women")
    )
  }, [product])

  return (
    <Wrapper {...props}>
      <div className="col-lg-6 col-md-12 col-sm-12">
        <ImageWrapper>
          <img src={isForMen ? menImg : womenImg} alt="" />
        </ImageWrapper>
      </div>
      <div className="col-lg-6 col-md-12 col-sm-12">
        <SizingTableContainer />
      </div>
    </Wrapper>
  )
}

export default memo(FindYourFitSection)

const Wrapper = styled.div`
  margin: 2rem -0.8rem 0 0;
  display: flex;
  align-items: start;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: grid !important;
    iframe {
      width: 100% !important;
    }
  }
`

const ImageWrapper = styled.div`
  width: 100%;

  & img {
    display: block;
    width: 456px;
    margin-left: -13px;
  }

  @media (max-width: 768px) {
    width: 100%;

    & img {
      margin-left: 0;
    }
  }
`
