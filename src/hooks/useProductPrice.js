import { useMemo } from "react"
import { PRODUCT_PACK_SIZE_OPTION } from "../const"

function savePasePackSizeOption(packSizeOption) {
  const res = parseInt(packSizeOption.value, 10)
  return isNaN(res) ? 1 : res
}

export function useProductPrice({
  variant,
  quantity = 1,
  discounts = [],
} = {}) {
  return useMemo(() => {
    const packSizeOption = variant?.selectedOptions?.find(
      ({ name }) => name === PRODUCT_PACK_SIZE_OPTION
    )
    const hasPerPiece = Boolean(packSizeOption)
    const { amount, currency } = variant?.price || {}
    const price = parseFloat(amount || 0) * quantity
    const totalDiscount =
      discounts && discounts.length
        ? discounts.reduce((acc, discount) => acc * (1 - discount / 100), 1)
        : 0
    const finalPrice = totalDiscount ? price * totalDiscount : price

    return {
      hasPerPiece,
      totalDiscount,
      priceV2: { amount: price, currency },
      pricePerPieceV2: hasPerPiece
        ? {
            amount:
              price / (savePasePackSizeOption(packSizeOption, 10) * quantity),
            currency,
          }
        : null,
      finalPriceV2: { amount: finalPrice, currency },
      finalPricePerPieceV2: hasPerPiece
        ? {
            amount:
              finalPrice /
              (savePasePackSizeOption(packSizeOption, 10) * quantity),
            currency,
          }
        : null,
    }
  }, [variant, quantity, discounts])
}
