export const groupVariantByOptions = (productOptions = [], variants = []) => {
  return productOptions.reduce((result, productOption, productOptionIndex) => {
    result[productOption] = variants.reduce((acc, variant) => {
      if (!variant.options) {
        return acc
      }

      const name = variant.options[productOptionIndex]

      if (acc.indexOf(name) < 0) {
        acc.push(name)
      }

      return acc
    }, [])

    return result
  }, {})
}
