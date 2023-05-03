import { PageSignIn } from "./pages/PageSignIn.jsx"
import { PageSuccess } from "./pages/PageSuccess.jsx"
import { DEFAULT_PAGE, EMAIL_SIGNIN, EMAIL_SUCCESS } from "./route-const.js"

export const PAGES = {
  [DEFAULT_PAGE]: {
    title: "Sign In",
    component: PageSignIn,
  },
  [EMAIL_SIGNIN]: {
    title: "Sign In",
    component: PageSignIn,
  },
  [EMAIL_SUCCESS]: {
    title: "Success",
    component: PageSuccess,
  },
}
