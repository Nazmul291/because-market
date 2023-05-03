import createStoreProductsById from "./products"

export default () => {
  const productsById = createStoreProductsById()

  return {
    productsById,
  }
}
