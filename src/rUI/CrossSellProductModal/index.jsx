import { withLoadingModal } from "../../hocs/withLoadingModal"
import CrossSellProductModal from "./CrossSellProductModal"
import CrossSellProductModalAnnoy from "./CrossSellProductModalAnnoy"

export const CrossSellProductModalAnnoyWithLoading = withLoadingModal(
  CrossSellProductModalAnnoy
)

export const CrossSellProductModalWithLoading = withLoadingModal(
  CrossSellProductModal
)
