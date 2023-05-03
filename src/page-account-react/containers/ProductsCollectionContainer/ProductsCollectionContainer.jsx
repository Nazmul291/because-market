import React, { useMemo, useEffect } from "react"
import { PropTypes } from "prop-types"
import { fetchProductsFromCollection } from "../../../api/storefrontApi"
import { useAsyncState } from "../../../hooks/useAsyncState"
import { noop } from "../../../utils"
import { ProductsCollection } from "../../components/ProductsCollection"

ProductsCollectionContainer.propTypes = {
  collection: PropTypes.object,
  productLimit: PropTypes.number,
  imageFloat: PropTypes.string,
  onViewProductDetails: PropTypes.func,
}

function ProductsCollectionContainer({
  collection,
  productLimit = 10,
  imageFloat = "left",
  onViewProductDetails = noop,
  ...props
}) {
  const [{ loading, data }, req] = useAsyncState(fetchProductsFromCollection)

  const { title, viewBtnText } = useMemo(
    () => ({
      title: collection.title?.replace(/^portal:/i, "").trim() || "Title",
      viewBtnText:
        collection?.metafields?.portal?.view_button_text || "Explore",
    }),
    [collection]
  )

  useEffect(() => {
    req(collection.handle, productLimit)
  }, [collection, productLimit, req])

  return (
    <ProductsCollection
      {...props}
      loading={loading}
      name={collection.handle}
      title={title}
      imageFloat={imageFloat}
      onViewProductDetails={onViewProductDetails}
      descriptionHtml={collection.body_html}
      viewBtnText={viewBtnText}
      imageUrl={collection.image.src}
      products={data}
    />
  )
}

export default ProductsCollectionContainer
