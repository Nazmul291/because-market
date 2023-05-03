/* eslint-disable react/no-multi-comp */
import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  CarouselProvider,
  Image,
  Slide,
  Slider,
  Dot,
} from "pure-react-carousel"
import { styled } from "@linaria/react"

const shopifyImage = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  altText: PropTypes.string,
})

CustomDotGroup.defaultProps = {
  size: "mini",
}

CustomDotGroup.propTypes = {
  slides: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(shopifyImage),
  size: PropTypes.string,
}

function CustomDotGroup({ images }) {
  return (
    <StyledDotGroup className="dot-group">
      <StyledDotGroupInner className="dot-group-inner">
        {images.map((image, index) => (
          <Dot slide={index} key={image.id}>
            <img src={image.src} className="thumbnail" alt={image.altText} />
          </Dot>
        ))}
      </StyledDotGroupInner>
    </StyledDotGroup>
  )
}

const ImageCarousel = ({ images }) => (
  <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    totalSlides={images.length}
  >
    {/* Remove classNameAnimation if you want the carousel to slide instead of jump. */}
    <Slider classNameAnimation="NoSlide">
      {images.map((image, index) => (
        <Slide key={`${image}-${index}`} tag="a" index={index}>
          <Image size="large" src={image.src} alt={image.altText} />
        </Slide>
      ))}
    </Slider>
    <CustomDotGroup slides={images.length} images={images} />
  </CarouselProvider>
)

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(shopifyImage),
}

export class AccountProductGallery extends Component {
  componentDidMount() {
    try {
      this.switchImageOnHover()
    } catch {
      console.error("Error in ProductCarousel.componentDidMount()")
    }
  }

  // Marks all images inactive. Visually, desaturates image previews.
  removeActiveImages() {
    document.querySelectorAll(".carousel__dot").forEach((item) => {
      try {
        item.classList.remove("carousel__dot--selected")
        item.removeAttribute("disabled")
      } catch {
        console.error("Error in ProductCarousel.removeActiveImages().")
      }
    })
  }

  // Marks all slides hidden and screen-reader not-selected.
  defaultSlides() {
    document.querySelectorAll(".carousel__slide").forEach((item) => {
      try {
        item.classList.remove("carousel__slide--visible")
        item.classList.add("carousel__slide--hidden")
        item.tabIndex = "-1"
        item.setAttribute("aria-selected", false)
      } catch {
        console.error("Error in ProductCarousel.defaultSlides().")
      }
    })
  }

  // On mouse hover, switches active image to hovered one.
  switchImageOnHover = () => {
    const carouselSliderTray = document.querySelector(
      ".carousel__slider-tray--horizontal"
    )
    const carouselSlides = carouselSliderTray.children
    const sliderTrayStyle = carouselSliderTray.style
    const numberOfPictures = carouselSlides.length

    // On mouse hover, deactivates all active images,
    //    activates the hovered one, displays it, and
    //    sets class and accessbility info accordingly.
    document.querySelectorAll(".carousel__dot").forEach((item) => {
      item.addEventListener("mouseover", (event) => {
        try {
          this.removeActiveImages()
          this.defaultSlides()

          const button = event.target.parentNode
          const buttons = button.parentNode

          // Find which picture was hovered over.
          let imageIndex
          for (let i = 0; i < numberOfPictures; ++i) {
            if (buttons.children[i] === button) {
              imageIndex = i
            }
          }

          // Activates the hovered image and displays it.
          button.classList.add("carousel__dot--selected")
          button.setAttribute("disabled", true)
          sliderTrayStyle.transform = `translateX(-${
            (100.0 / numberOfPictures) * imageIndex
          }%)`

          // Set library class information appropriately.
          carouselSlides[imageIndex].classList.remove("carousel__slide--hidden")
          carouselSlides[imageIndex].classList.add("carousel__slide--visible")
          carouselSlides[imageIndex].tabIndex = "0"
          carouselSlides[imageIndex].setAttribute("aria-selected", true)
        } catch {
          console.error("Error in ProductCarousel.switchImageOnHover().")
        }
      })
    })
  }

  render() {
    const { images, funnelView, ...props } = this.props
    return funnelView ? (
      <StyledGalleryFunnelContainer {...props}>
        {images && (
          <ImageCarousel
            images={images}
            removeActiveImages={this.removeActiveImages}
            defaultSlides={this.defaultSlides}
            switchImageOnHover={this.switchImageOnHover}
          />
        )}
      </StyledGalleryFunnelContainer>
    ) : (
      <StyledGalleryContainer
        className={funnelView ? "funnelGallery" : ""}
        {...props}
      >
        {images && (
          <ImageCarousel
            images={images}
            removeActiveImages={this.removeActiveImages}
            defaultSlides={this.defaultSlides}
            switchImageOnHover={this.switchImageOnHover}
          />
        )}
      </StyledGalleryContainer>
    )
  }
}

AccountProductGallery.propTypes = {
  images: PropTypes.arrayOf(shopifyImage),
  funnelView: PropTypes.bool,
}

const StyledGalleryFunnelContainer = styled.section`
  margin: 0 28px;

  & .carousel {
    width: 100%;

    &__slider {
      position: relative;
      overflow: hidden;
      max-height: 355px;
      width: 100%;
    }

    &__slider-tray {
      display: block;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &__slide {
      float: left;
      position: relative;
      display: block;
      box-sizing: border-box;
      height: 0;
      margin: 0;
      list-style-type: none;
    }

    &__inner-slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &__image {
      display: block;
      width: 100%;
      height: 100%;
      text-align: center;
      margin: 0 auto;
      object-fit: contain;
      border-left: 10px solid #ffffff;
      border-right: 10px solid #ffffff;
    }

    &__dot {
      min-width: 85px;
      min-height: 85px;
      width: 85px;
      height: 85px;
      padding: 0;
      border: none;
      opacity: 0.33;
      background-color: #d8d8d8;
      margin: 0 5px;

      &--selected {
        border: 1px solid #566582;
        background-color: #fff;
        opacity: 1;
      }
    }

    &__dot img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`
const StyledGalleryContainer = styled.section`
  margin: 0 28px;

  & .carousel {
    width: 100%;

    &__slider {
      position: relative;
      overflow: hidden;
      max-height: 355px;
      width: 100%;
    }

    &__slider-tray {
      display: block;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &__slide {
      float: left;
      position: relative;
      display: block;
      box-sizing: border-box;
      height: 0;
      margin: 0;
      list-style-type: none;
    }

    &__inner-slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &__image {
      display: block;
      width: 100%;
      height: 100%;
      text-align: center;
      margin: 0 auto;
      object-fit: contain;
      max-height: 355px;
      border-left: 10px solid #ffffff;
      border-right: 10px solid #ffffff;
    }
    .funnelGallery {
      &__image {
        height: 100%;
        max-height: unset;
      }
    }

    &__dot {
      min-width: 85px;
      min-height: 85px;
      width: 85px;
      height: 85px;
      padding: 0;
      border: none;
      opacity: 0.33;
      background-color: #d8d8d8;
      margin: 0 5px;

      &--selected {
        border: 1px solid #566582;
        background-color: #fff;
        opacity: 1;
      }
    }

    &__dot img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`

const StyledDotGroup = styled.div`
  width: 100%;
  margin: 16px 0 0 0;
  padding: 0 0 5px;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #eee;
  }
`

const StyledDotGroupInner = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  font-size: 0;
  vertical-align: initial;
  margin: 0 0.25em 0 0;
`
