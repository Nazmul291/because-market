import { PageAccount } from "./pages/PageAccount.jsx"
import { PageOrderHistory } from "./pages/PageOrderHistory.jsx"
import { PageSubscription } from "./pages/PageSubscription.jsx"
import { PageHelpCenter } from "./pages/PageHelpCenter.jsx"
import { PageNotFound } from "./pages/PageNotFound.jsx"
import { PageAllProducts } from "./pages/PageAllProducts.jsx"
import { PageAccountCancel } from "./pages/PageAccountCancel.jsx"

import { PackageIcon } from "../rUI/icons/PackageIcon.jsx"
import { HistoryIcon } from "../rUI/icons/HistoryIcon.jsx"
import { QuestionIcon } from "../rUI/icons/QuestionIcon.jsx"
import { UserIcon } from "../rUI/icons/UserIcon.jsx"
import { ProductsIcon } from "../rUI/icons/ProductsIcon.jsx"

import {
  ACCOUNT_DETAIL,
  ALL_PRODUCTS,
  DEFAULT_PAGE,
  ERROR_NOT_FOUND,
  HELP_CENTER,
  ORDER_HISTORY,
  SUBSCRIPTIONS,
  ACCOUNT_CANCEL,
  allProductsCategories,
} from "./route-const.js"

export const PAGES = {
  [DEFAULT_PAGE]: {
    title: "My Subscription",
    mobileTitle: "Subscription",
    component: PageSubscription,
    icon: PackageIcon,
  },
  [ACCOUNT_DETAIL]: {
    title: "My Account",
    mobileTitle: "Account",
    component: PageAccount,
    icon: UserIcon,
  },
  [ALL_PRODUCTS]: {
    title: "All Products",
    mobileTitle: "Products",
    component: PageAllProducts,
    icon: ProductsIcon,
    subMenu: allProductsCategories?.map(({ object, title }) => ({
      id: `collection-${object.handle}`,
      title,
    })),
  },
  [ORDER_HISTORY]: {
    title: "Order History",
    mobileTitle: "History",
    component: PageOrderHistory,
    icon: HistoryIcon,
  },
  [SUBSCRIPTIONS]: {
    title: "My Subscription",
    mobileTitle: "Subscription",
    component: PageSubscription,
    icon: PackageIcon,
  },
  [HELP_CENTER]: {
    title: "Help Center",
    mobileTitle: "Help Center",
    component: PageHelpCenter,
    icon: QuestionIcon,
  },
  [ERROR_NOT_FOUND]: {
    title: "Not Found",
    mobileTitle: "404",
    component: PageNotFound,
  },
  [ACCOUNT_CANCEL]: {
    title: "Account Cancel",
    mobileTitle: "Cancel",
    component: PageAccountCancel,
  },
}
