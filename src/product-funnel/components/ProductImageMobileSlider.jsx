import React from "react"
import PropTypes from "prop-types"
import ProductSlider from "./ProductSlider"

ProductImageMobileSlider.propTypes = {
  images: PropTypes.array,
}

function ProductImageMobileSlider({ images }) {
  const imageOptions = images?.map((image, index) => (
    <img
      size="large"
      src={image.src}
      alt={image.altText}
      key={`slider-image-mobile-slide-${index}`}
      style={{
        margin: "10px",
        maxWidth: "95%",
        borderRadius: "6px",
        maxHeight: "100%",
        width: "85%",
      }}
    />
  ))

  return (
    <>
      <ProductSlider
        autoStart={false}
        options={imageOptions}
        showDots={true}
        showArrows={false}
      />
    </>
  )
}

export default ProductImageMobileSlider
