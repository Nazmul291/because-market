import { makePostRequest } from "../utils"

export const cartClear = () => makePostRequest("/cart/clear.js")
