import React, { useEffect, useState, useRef, useCallback } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { useTouchEvent } from "../../hooks/useTouchEvent"

ProductSlider.propTypes = {
  autoStart: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        alt: PropTypes.string,
        id: PropTypes.number,
        position: PropTypes.number,
        preview_image: PropTypes.shape({
          aspect_ratio: PropTypes.number,
          height: PropTypes.number,
          width: PropTypes.number,
          src: PropTypes.string,
        }),
        aspect_ratio: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number,
        src: PropTypes.string,
      }),
      PropTypes.string,
    ])
  ),
  showDots: PropTypes.bool,
  showArrows: PropTypes.bool,
}

const CONTENT_WIDTH_COMPENSATOR = 75
function ProductSlider({ autoStart, options, showDots, showArrows }) {
  const currentTimeoutId = useRef(null)
  const optionsLength = options?.length || 0
  const [slideIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef()

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= optionsLength - 1) {
        return 0
      }
      return prev + 1
    })
    startSlideShow()
  }, [optionsLength, startSlideShow])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev - 1 < 0) {
        return optionsLength - 1
      }
      return prev - 1
    })
    startSlideShow()
  }, [optionsLength, startSlideShow])

  const startSlideShow = useCallback(() => {
    if (!autoStart) {
      return
    }
    if (currentTimeoutId.current) {
      clearTimeout(currentTimeoutId.current)
    }
    currentTimeoutId.current = setTimeout(() => {
      next()
    }, 3000)
  }, [autoStart, next])

  const onRightSwipe = useCallback(() => {
    next()
  }, [next])

  const onLeftSwipe = useCallback(() => {
    prev()
  }, [prev])

  useEffect(() => {
    startSlideShow()
    return () => {
      clearTimeout(currentTimeoutId.current)
    }
  }, [autoStart, startSlideShow])

  useTouchEvent(sliderRef.current, {
    onRightSwipe,
    onLeftSwipe,
  })

  return (
    <StyledSliderHolder>
      <StyledMobileCarouselContainer>
        <StyledSimpleSlider>
          <StyledSliderWrapper
            ref={sliderRef}
            style={{
              transform: `translateX(calc((100vw - ${CONTENT_WIDTH_COMPENSATOR}px) * -${slideIndex}))`,
              transitionDuration: "1000ms",
            }}
          >
            {options.map((option, index) => (
              <StyledSlide
                key={`slider-slide-${index}`}
                className={showArrows ? "textSlide" : ""}
              >
                {option}
              </StyledSlide>
            ))}
            <StyledSlide className={showArrows ? "textSlide" : ""}>
              {options?.[0]}
            </StyledSlide>
          </StyledSliderWrapper>
          {showDots && (
            <StyledSliderImageDotsContainer>
              {options?.map((image, index) => (
                <StyledSliderMobileDot
                  key={index}
                  style={index === slideIndex ? { background: "#667799" } : {}}
                >
                  <StyledSliderDotButton
                    type="button"
                    onClick={() => {
                      setCurrentIndex(index)
                    }}
                  >
                    {index}
                  </StyledSliderDotButton>
                </StyledSliderMobileDot>
              ))}
            </StyledSliderImageDotsContainer>
          )}
          {showArrows && (
            <>
              <StyledPrevButton onClick={prev}>
                <i className="fa fa-2x fa-angle-left" />
              </StyledPrevButton>
              <StyledNextButton onClick={next}>
                <i className="fa fa-2x fa-angle-right" />
              </StyledNextButton>
            </>
          )}
        </StyledSimpleSlider>
      </StyledMobileCarouselContainer>
    </StyledSliderHolder>
  )
}

const StyledMobileCarouselContainer = styled.div`
  @media (max-width: 768px) {
    border-radius: 7px;
    background-color: #fff;
    margin-top: 0.7rem;
    overflow: hidden;
    margin-bottom: 0.7rem;
  }
`

const StyledSliderHolder = styled.div`
  display: none;
  position: relative;
  width: 100%;
  @media (max-width: 768px) {
    display: block;
    .textSlide {
      font-size: 13px;
    }
  }
`

const StyledSliderMobileDot = styled.div`
  margin: 4px;
  border-radius: 50%;
  background-color: #cbcbcb;
  font-size: 0;
  line-height: 0;
  display: block;
  width: 20px;
  height: 20px;
  padding: 5px;
  cursor: pointer;
  color: transparent;
  border: 0;
  outline: none;
`

const StyledSliderDotButton = styled.button`
  border: 0;
  background: transparent;
`

const StyledSliderWrapper = styled.div`
  height: 100%;
  display: inline-flex;
  position: relative;
  text-align: center;
  margin: 0 10px;
  transform: translateX(0px);
  transition-duration: 0ms;
  transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
`

const StyledSimpleSlider = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  text-align: center;
`

const StyledSliderImageDotsContainer = styled.div`
  display: inline-flex;
  padding: 4px;
  margin-bottom: 20px;
`

const StyledSlide = styled.div`
  background-size: cover;
  background-position: center top;
  font-weight: bold;
  height: 100%;
  // TODO calc(100vw - CONTENT_WIDTH_COMPENSATOR)
  width: calc(100vw - 75px);
  float: left;
  margin: 10px 0;
  position: relative;
`

const StyledPrevButton = styled.div`
  width: 30px;
  top: 50%;
  cursor: pointer;
  background-repeat: no-repeat;
  position: absolute;
  transform: translate(0, -50%);
  height: 34px;
  text-align: left;
  color: #6c757d;
  background-image: none !important;
  left: 2px;
  background-position: left;
`

const StyledNextButton = styled.div`
  width: 30px;
  top: 50%;
  cursor: pointer;
  background-repeat: no-repeat;
  position: absolute;
  transform: translate(0, -50%);
  height: 34px;
  text-align: right;
  color: #6c757d;
  background-image: none !important;
  right: 2px;
  background-position: right;
`

export default ProductSlider
