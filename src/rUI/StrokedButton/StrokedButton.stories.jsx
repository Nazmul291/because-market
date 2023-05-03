import React from "react"
import StrokedButton, {
  SIZE_DEFAULT,
  SIZE_LARGE,
  SIZE_SMALL,
  VARIANT_APPLY,
  VARIANT_DEFAULT,
  VARIANT_PRIMARY,
} from "./StrokedButton"

const SIZES = [SIZE_SMALL, SIZE_DEFAULT, SIZE_LARGE]
const VARIANTS = [VARIANT_DEFAULT, VARIANT_PRIMARY, VARIANT_APPLY]

export default {
  title: "rUI/StrokedButton",
  component: StrokedButton,
}

function render() {
  return (
    <section
      style={{
        display: "grid", // eslint-disable-line quote-props
        "grid-template-columns": "repeat(1,1fr)",
        "grid-row-gap": "24px",
      }}
    >
      {SIZES.map((size) => (
        <div key={size}>
          {VARIANTS.map((variant) => (
            <StrokedButton variant={variant} size={size} key={size}>
              Size: {size}; Variant: {variant}
            </StrokedButton>
          ))}
        </div>
      ))}
    </section>
  )
}

export const Default = () => render()
