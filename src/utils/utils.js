import base64 from "base-64"
import isBase64 from "is-base64"
import { add, format, isSameMonth, isSameYear } from "date-fns"
import {
  CHECKOUT_STATE_CLOSED,
  INVOICE_LINK_TEMPLATE,
  PAGE_NAME_QUERY,
} from "../const"

/**
 * Check if given URL contains parameter `view=funnel`
 * @param {String} url - URL to search
 * @returns {Boolean} -
 */
export const isFunnelView = (url) => {
  const urlParams = new URLSearchParams(url)
  return urlParams.has("view") ? urlParams.get("view") === "funnel" : false
}

/**
 * Calculate the 'Estimated Delivery Date' string
 * @param {String} createdAt - String representing the initial date
 * @param {Number} minDays - count of days to add
 * @param {Number} maxDays - count of days to add
 * @returns {String} - 'Estimated Delivery Date' string
 */
export const getDeliveryRange = (createdAt, minDays, maxDays) => {
  if (!createdAt || !minDays || !maxDays) {
    return null
  }

  const createdDate = new Date(createdAt)
  if (!createdDate) {
    console.error(`cannot parse new Date() from ${createdAt}`)
    return null
  }

  const minDeliveryDate = add(createdDate, { days: minDays })
  const maxDeliveryDate = add(createdDate, { days: maxDays })
  const withinSameMonth = isSameMonth(minDeliveryDate, maxDeliveryDate)
  const withinSameYear = isSameYear(minDeliveryDate, maxDeliveryDate)

  if (!withinSameYear) {
    return `${format(minDeliveryDate, "MM/dd/yy")} - ${format(
      maxDeliveryDate,
      "MM/dd/yy"
    )}`
  }

  if (!withinSameMonth) {
    return `${format(minDeliveryDate, "MMM dd")} - ${format(
      maxDeliveryDate,
      "MMM dd"
    )}, ${format(maxDeliveryDate, "yyyy")}`
  }

  return `${format(minDeliveryDate, "MMM dd")} - ${format(
    maxDeliveryDate,
    "dd"
  )}, ${format(maxDeliveryDate, "yyyy")}`
}

/**
 * Return formatted date at
 * @param {String|Date} date date
 * @param {Number} [days=0] at days count
 * @returns {String} formatted date string
 */
export const getFormattedDateAt = (date, days = 0) => {
  if (!date) {
    return null
  }

  const d = new Date(date)

  if (!d) {
    console.error(`cannot parse new Date() from ${date}`)
    return null
  }

  return format(add(d, { days }), "MM/dd/yyyy")
}

export const saveJsonParse = (val) => {
  if (!val) {
    return null
  }

  try {
    return JSON.parse(val)
  } catch (e) {
    return null
  }
}

export const formatPhone = (rawPhoneString = "") => {
  if (!rawPhoneString || !rawPhoneString.substring) {
    return rawPhoneString || "N/A"
  }
  const noCountryCodePhone = rawPhoneString.replace("+1", "")

  return [
    ` (${noCountryCodePhone.substring(0, 3)}) `,
    [
      noCountryCodePhone.substring(3, 6),
      noCountryCodePhone.substring(6, noCountryCodePhone.length),
    ].join("-"),
  ].join("")
}

export const formatAddress = (addressObject) => {
  if (!addressObject) {
    return null
  }

  return [
    addressObject.address1,
    addressObject.address2,
    addressObject.city,
    [addressObject.province, addressObject.zip]
      .filter((s) => Boolean(s))
      .join(" "),
    addressObject.country,
  ]
    .filter((s) => Boolean(s))
    .join(", ")
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date))
}

export const formatDateAndTime = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date))
}

export const formatDollarPrice = (amount) => {
  let parsedAmount = parseFloat(amount)

  if (isNaN(parsedAmount)) {
    parsedAmount = 0
  }

  return `$${parsedAmount.toFixed(2)}`
}

export const formatOrderPrice = (amount) => {
  return typeof amount === "string"
    ? amount
    : formatDollarPrice((amount || 0) / 100)
}

export const formatOrderName = (name) => `#${name.replace("#", "")}`

export const applyStyleIfHasProperty =
  (propertyName, css, otherwise = "inherit") =>
  (props) =>
    props[propertyName] ? css : otherwise

export const noop = () => {}

export const emptyArray = []

export const isFunction = (val) => typeof val === "function"

/**
 * Check is value are object
 * @param {*} val checked value
 * @returns {Boolean} true if value object
 */
export const isObject = (val) =>
  val && typeof val === "object" && !Array.isArray(val)

/**
 * Return is id encoded and not null
 * @param {String} id id
 * @returns {Boolean}
 */
export const isEncodedId = (id) => id && isBase64(id)

export const encodeId = (id) => (isEncodedId(id) ? id : base64.encode(id))

export const decodeId = (id) => (isEncodedId(id) ? base64.decode(id) : id)

/**
 * Is Storefront Id
 * @param {String} id id
 * @returns {Boolean}
 */
export const isStorefrontId = (id) => id && /^gid:\/\//.test(id)

/**
 * ProductId from
 * @param {String} productId productId or storefrontProductId or encoded storefrontProductId
 * @returns {String} ProductId
 */
export function getProductId(productId) {
  const decodedId = decodeId(productId)
  return isStorefrontId(decodedId)
    ? decodedId.match(/gid:\/\/shopify\/Product\/(\d+)/)[1]
    : decodedId
}

/**
 * Return shop id
 * @param {String} storeId StoreId as (base64 or storefrontId or shop id)
 * @returns {Number} id
 */
export function sanitizeStorefrontId(storeId) {
  const decodedId = decodeId(storeId)
  return Number(
    isStorefrontId(decodedId) ? decodedId.split("/").pop() : decodedId
  )
}

/**
 * Return encoded storefront product id
 * @param {String} productId product id
 * @returns {String} encoded storefront product id
 */
export function getStorefrontProductId(productId) {
  const decodedId = decodeId(productId)
  return isStorefrontId(decodedId)
    ? decodedId
    : `gid://shopify/Product/${decodedId}`
}

export function getStorefrontProductVariantId(productVariantId) {
  const decodedId = decodeId(productVariantId)
  return isStorefrontId(decodedId)
    ? decodedId
    : `gid://shopify/ProductVariant/${decodedId}`
}

export function getVariantIdFromCheckoutLineItemId(checkoutId, lineItemId) {
  return base64.encode(
    `gid://shopify/CheckoutLineItem/${lineItemId}?checkout=${checkoutId}`
  )
}

export function getVariantIdFromCheckoutLineItemVariantId(lineItemVariantId) {
  const decodeString = base64.decode(lineItemVariantId)
  return decodeString.match(/gid:\/\/shopify\/ProductVariant\/(\d+)/)[1]
}

export const removeEmptyFromObject = (obj) =>
  !obj
    ? obj
    : Object.entries(obj).reduce(
        (acc, [key, value]) => (!value ? acc : { ...acc, [key]: value }),
        {}
      )

const fetchRequest = (
  url,
  { method = "POST", useCookie = true, ...params } = {
    method: "POST",
    useCookie: true,
  }
) =>
  fetch(url, {
    credentials: useCookie ? "include" : undefined,
    method,
    ...params,
  }).then((response) => {
    const isJSON = response.headers
      .get("content-type")
      .includes("application/json")

    if (response.ok) {
      return isJSON ? response.json() : response.text()
    }
    // else
    return (isJSON ? response.json() : response.text()).then((error) => {
      console.error(error)

      throw error && error.code
        ? error
        : "Something went wrong with API request"
    })
  })

export const makeGetRequest = (url, data = null, params = {}) =>
  fetchRequest(
    `${url}${data ? `?${new URLSearchParams(data).toString()}` : ""}`,
    {
      method: "GET",
      ...params,
    }
  )

export const makePostRequest = (
  url,
  data = {},
  { headers = { "Content-Type": "application/json" }, ...params } = {}
) =>
  fetchRequest(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers,
    ...params,
  })

export const makePutRequest = (
  url,
  data = {},
  { headers = { "Content-Type": "application/json" }, ...params } = {}
) =>
  fetchRequest(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers,
    ...params,
  })

export const makeDeleteRequest = (
  url,
  data = {},
  { headers = { "Content-Type": "application/json" }, ...params } = {}
) =>
  fetchRequest(url, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers,
    ...params,
  })

export const makePatchRequest = (
  url,
  data = {},
  { headers = { "Content-Type": "application/json" }, ...params } = {}
) =>
  fetchRequest(url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers,
    ...params,
  })

export const groupVariantByOptions = (productOptions = [], variants = []) => {
  return productOptions?.reduce((result, productOption, productOptionIndex) => {
    result[productOption] = variants?.reduce((acc, variant) => {
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

export const flattenQueryResult = (data = {}) => {
  let result = data

  if (!data) {
    return data
  } else if (Array.isArray(data)) {
    result = data.map(flattenQueryResult)
  } else if (typeof data === "object") {
    if ("edges" in data) {
      result = flattenQueryResult(data.edges)
    } else if ("node" in data) {
      result = flattenQueryResult(data.node)
    } else {
      result = Object.entries(data).reduce((r, [key, value]) => {
        r[key] = flattenQueryResult(value)
        return r
      }, {})
    }
  }
  return result
}

export const openNewTabWithURL = (url) => {
  const link = document.createElement("a")
  link.href = url
  link.target = "_blank"
  link.click()
}

/**
 * Check isString
 * @param {*} value value
 * @returns {Boolean} is string value
 */
export const isString = (value) => typeof value === "string"

/**
 * Check isUndefined
 * @param {*} value value
 * @returns {Boolean} is value is undefined
 */
export const isUndef = (value) => typeof value === "undefined"

/**
 * Check is object are empty
 * @param {Object} obj object
 * @returns {Boolean} true if empty
 */
export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0

/**
 * Return true if callback define and not noop
 * @param {Function} callback function
 * @returns {Boolean}
 */
export const isDefineCallback = (callback) => callback && callback !== noop

/**
 * Trimmed all object field value
 * @param {Object} obj -
 * @returns {Object} -
 */
export const trimObject = (obj = {}) =>
  Object.entries(obj).reduce((sum, [key, value]) => {
    sum[key] = isString(value) ? value.trim() : value
    return sum
  }, {})

/**
 * Return new array without index item
 * @param {Array} arr Array
 * @param {Number} index remove index
 * @returns {Array} new array
 */
export const arrayRemoveIndex = (arr = [], index = 0) =>
  arr.slice(0, index).concat(arr.slice(index + 1))

/** Compare two arrays
 * @param {Array} arr1 arr1
 * @param {Array} arr2 arr2
 * @returns {Boolean} equal
 */
export const arrayEqual = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false
  }

  if (arr1.length !== arr2.length) {
    return false
  }

  return arr1.every((v, i) => arr2[i] === v)
}

export const getInvoiceDownloadUrlFromOrder = (order) =>
  INVOICE_LINK_TEMPLATE.replace("{name}", order?.name.replace("#", ""))

export const validateEmail = (email) => email.match(/[^@]+@[^@]+/)

export const loadUsingDataLoadingState = (
  apiMethod,
  state,
  setData,
  setState
) => {
  if (!state.loading && !state.loaded && !state.error) {
    apiMethod()
      .then((response) => {
        setData(response)
        setState({ loaded: true })
      })
      .catch((error) => {
        setState({ error })
        console.error(error)
      })
      .finally(() => setState({ loading: false }))

    setState({ loading: true })
  }
}

/**
 * Get difference in days
 * @param {Date} start start date
 * @param {Date} end  end data
 * @returns {Number} days count
 */
export const getDifferenceInDays = (start, end) => {
  const startTimestamp = new Date(start).getTime()
  const endTimestamp = new Date(end).getTime()
  const dayMS = 86400000

  return Math.floor((startTimestamp - endTimestamp) / dayMS)
}

/**
 * Trim and upper case string for compare
 * @param {String} str string
 * @returns {String} normalized string
 */
export const normalizeString = (str) => {
  return !str ? "" : str.trim().toUpperCase()
}

/**
 * Normalize product option value
 * @param {String} value variant option value
 * @returns {String} Normalized option value
 */
export const normalizeProductVariantOptionValue = (value = "") => {
  return !value ? "" : value.toString().replace(/\s/g, "").toUpperCase()
}

/**
 * Compare product option value
 * @param {String} val1 value 1
 * @param {String} val2 value 2
 * @returns {Boolean} is equal
 */
export const isEqualProductVariantOptionValue = (val1 = "", val2 = "") => {
  return (
    val1 === val2 ||
    normalizeProductVariantOptionValue(val1) ===
      normalizeProductVariantOptionValue(val2)
  )
}

/**
 * Compare name with names
 * @param {String} name option name
 * @param {String|Array<String>} eqlName eql name or array of name
 * @returns {Boolean} equal or not
 */
export const isEqualOptionName = (name, eqlName) => {
  if (!name || !eqlName) {
    return false
  }

  const arr = Array.isArray(eqlName) ? eqlName : [eqlName]
  const normalizedName = normalizeString(name)

  return arr.some((findName) => normalizeString(findName) === normalizedName)
}

/**
 * !! ONLY FOR liquid Product format
 * Find product variant by options.
 * Return first variant if find option is empty.
 *
 * @param {Object} options - Selected options
 * @param {Array} variants - Current product variants
 * @param {Object} productOptionsIndex - Product option index map ({ Size: 0, Color: 1 })
 * @returns {Object} - product variant
 */
export const findVariantByOptions = (
  options,
  variants,
  productOptionsIndex
) => {
  if (isEmptyObject(options)) {
    return variants[0]
  }

  const entries = Object.entries(options)

  return variants.find(({ options: variantOptions }) => {
    return entries.every(([key, value]) =>
      isEqualProductVariantOptionValue(
        variantOptions[productOptionsIndex[key]],
        value
      )
    )
  })
}

/**
 * !! ONLY FOR liquid Product format
 * Find product variant by option.
 * Return first variant if not find by new option
 *
 * @param {String} key option key
 * @param {String} value option value
 * @param {Object} currentOptions current variant option map
 * @param {Array} variants current product variants
 * @param {Object} productOptionsIndex product option index map ({ Size: 0, Color: 1 })
 * @returns {Object} product variant
 */
export const findVariantByOption = (
  key,
  value,
  currentOptions,
  variants = [],
  productOptionsIndex
) => {
  const keyIndex = productOptionsIndex[key]
  const availableVariants = variants.filter(({ options }) =>
    isEqualProductVariantOptionValue(options[keyIndex], value)
  )

  if (!availableVariants || !availableVariants.length) {
    return variants[0]
  }

  const newOptions = {
    ...currentOptions,
    [key]: value,
  }

  return (
    findVariantByOptions(newOptions, variants, productOptionsIndex) ||
    availableVariants[0]
  )
}

/**
 * Group variant options
 * @param {Object} variant variant
 * @returns {Object} grouped options
 */
export const groupVariantOptions = (variant) =>
  variant?.selectedOptions?.reduce((sum, { name, value }) => {
    sum[name] = value
    return sum
  }, {}) ?? {}

/**
 * Find variant by grouped options
 * @param {Array} variants variants
 * @param {Object} options options
 * @returns {Object} result variant
 */
export const findVariantByGroupedOptions = (variants, options) => {
  if (isEmptyObject(options)) {
    return variants[0]
  }

  const entries = Object.entries(options)

  return variants.find(({ selectedOptions }) => {
    return entries.every(([key, value]) =>
      isEqualProductVariantOptionValue(
        selectedOptions.find(({ name }) => name === key)?.value,
        value
      )
    )
  })
}

/**
 * Has tag
 * @param {Array} tags tags
 * @param {String} tag tag
 * @returns {Boolean} return true if has tag. Tag will be normalized before compare
 */
export const hasTag = (tags = [], tag = "") => {
  if (!tag || !tags) {
    return null
  }
  const normTag = normalizeString(tag)
  return tags.find((item) => normTag === normalizeString(item))
}

/**
 * Find and return value from tags by tag option name
 * tags: [name=value, ...]
 * @param {Array} tags tags
 * @param {String} name tag option name
 * @returns {String} tag option value
 */
export const getTagOptionValue = (tags = [], name = "") => {
  if (!name || !tags) {
    return null
  }

  const regexp = new RegExp(`^${name}=`)
  return tags.find((item) => regexp.test(item?.trim()))?.split("=")[1]
}

/**
 * Return defaultOptions from tags
 * @param {Array} tags tags
 * @returns {Object|null} Default options or null
 */
export const getDefaultOptionsFromTags = (tags = []) => {
  const values = getTagOptionValue(tags, "defaultOptions")

  if (!values) {
    return null
  }

  return values.split(";").reduce((acc, str) => {
    const [key, value] = str.split(":").map((v) => v.trim())
    acc[key] = value
    return acc
  }, {})
}

export const getRemovedOptionsFromTags = (tags = []) => {
  const values = getTagOptionValue(tags, "removedOptions")?.replace(
    /^\[(.+)\]$/,
    "$1"
  )

  if (!values) {
    return null
  }

  return values
    .split(";")
    .map((v) => v.trim().replace(/^[\'\"\`](.+)[\'\"\`]$/, "$1")) // eslint-disable-line no-useless-escape
}

/**
 * Remove duplicate value from array
 * @param  {Array} array array
 * @returns {Array} array witch out duplicate value
 */
export const arrayUnique = (array) => {
  const set = new Set(array)
  return [...set]
}

/**
 * Remove arr2 from arr1
 * @param {Array} arr1 array
 * @param {Array} arr2 array
 * @returns {Array} return new array (arr1 without value of arr2)
 */
export const arrayRemoveArray = (arr1, arr2) => {
  if (!arr2 || !arr2.length) {
    return [...arr1]
  }

  return arr1.filter((item) => arr2.indexOf(item) < 0)
}

/**
 * Compare string with normalize
 * @param {String} str1 string 1
 * @param {String} str2 string 2
 * @returns {Boolean} true if normalized str1 and str2 are equals
 */
export const isStringEqualNormalized = (str1, str2) =>
  str1 === str2 || normalizeString(str1) === normalizeString(str2)

/**
 * Group metafields
 * From: [{ namespace, key, value }] to: { [namespace]: { [key]: value } }
 * @param {Array} metafields metafields
 * @returns {Object} grouped metafields by `namespace`
 */
export const groupMetafields = (metafields = []) =>
  metafields?.reduce((sum, meta) => {
    if (!meta) {
      return sum
    }

    const { namespace, key, value } = meta

    if (!sum[namespace]) {
      sum[namespace] = {}
    }

    sum[namespace][key] = saveJsonParse(value)

    return sum
  }, {})

/**
 * Return random integer value
 * @param {Number} [min = Number.MIN_SAFE_INTEGER] minimum random value
 * @param {Number} [max = Number.MAX_SAFE_INTEGER] maximum random value
 * @returns {Number} Random value between `min` and `max`
 */
export const getRandomInt = (
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
) => {
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * Set expiry local storage value
 * @param {String} key - storage key
 * @param {*} value - value
 * @param {Number} [ttl = 0] - time to leave (ms)
 */
export const setLocalStorageExpiry = (key, value, ttl = 0) => {
  if (!key || !value) {
    return
  }

  localStorage.setItem(
    key,
    JSON.stringify({
      value,
      expiry: Date.now() + ttl,
    })
  )
}

/**
 * Get expiry local storage value and expired flag
 * @param {String} key storage key
 * @returns {Array<*, Boolean>} storage value and expired flag
 */
export const getLocalStorageWithExpiredFlag = (key) => {
  if (!key) {
    return [undefined, true]
  }

  const json = saveJsonParse(localStorage.getItem(key))

  const isExpired = !json || !json?.expiry || json.expiry <= Date.now()

  return [json?.value, isExpired]
}

/**
 * Get expiry local storage value
 * @param {String} key storage key
 * @returns {*} storage value if exist or not expired
 */
export const getLocalStorageExpiry = (key) => {
  const [value] = getLocalStorageWithExpiredFlag(key)
  return value
}

/**
 * Return product view count
 * @param {String} productId product id
 * @param {Number} [step = 10] randomly step count
 * @param {Number} [minValue = 50] minimum possible value
 * @param {Number} [maxValue = 500] maximum possible value
 * @param {Number} [ttl = 3600000] how long save
 * @returns {Number} view count
 */
export const getProductViewCount = (
  productId,
  step = 10,
  minValue = 50,
  maxValue = 500,
  ttl = 1000 * 60 * 60
) => {
  const id = getProductId(productId)
  const key = `vc:${id}`
  const [storageValue, isExpired] = getLocalStorageWithExpiredFlag(key)

  if (!isExpired) {
    return storageValue
  }

  const min = storageValue || minValue
  const max = min + step
  let newValue =
    max < maxValue
      ? getRandomInt(min, max)
      : getRandomInt(minValue, minValue + step)

  setLocalStorageExpiry(key, newValue, ttl)

  return newValue
}

/**
 * Create query string
 * @param {Object} params - query params
 * @param {Boolean} extend -
 * @returns {String} - query string
 */
export const createQueryString = (params, extend = false) => {
  const p = new URLSearchParams(extend ? location.search : {})

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      p.set(key, value)
    })
  }

  return p.toString()
}

/**
 * Create href to page
 *
 * @param {String} page page name
 * @param {Object} params query params
 * @param {Boolean} extend extend current params. If true extend current page param
 * @returns {String}
 */
export const createHrefToPage = (page, params, extend = false) => {
  const p = createQueryString(
    {
      ...params,
      [PAGE_NAME_QUERY]: page,
    },
    extend
  )

  return `${location.pathname}?${p}`
}

export const isTouchScreenDevice = () => {
  try {
    document.createEvent("TouchEvent")
    return true
  } catch (e) {
    return false
  }
}

export const isMobile = () =>
  Boolean(window.matchMedia && window.matchMedia("(max-width: 480px)").matches)

export const isTablet = () =>
  Boolean(window.matchMedia && window.matchMedia("(max-width: 1024px)").matches)

/**
 * Compare string
 * @param {String} str1 string 1
 * @param {String} str2 string 2
 * @returns {Number} 0 or 1 or -1
 */
export const compareString = (str1 = "", str2 = "") => {
  const s1 = str1.toUpperCase()
  const s2 = str2.toUpperCase()

  if (s1 < s2) {
    return -1
  }

  if (s1 > s2) {
    return 1
  }

  return 0
}

/**
 * Find and return metafiled value
 * @param {Array} metafields metafields
 * @param {String} namespace namespace
 * @param {String} key key
 * @returns {any} value
 */
export const getMetafieldValue = (metafields, namespace, key) => {
  if (!metafields?.length) {
    return
  }

  const value = metafields.find(
    (meta) => meta && meta.namespace === namespace && meta.key === key
  )?.value

  return saveJsonParse(value)
}

/**
 * Return metafiled namespace
 * @param {Array} metafields metafields
 * @param {String} namespace namespace
 * @returns {Object} key values for namespace or null if not found
 */
export const getMetafieldNamespace = (metafields, namespace) => {
  if (!metafields?.length) {
    return null
  }

  const groped = metafields.reduce((acc, meta) => {
    if (!meta) {
      return acc
    }

    const { namespace: name, key, value } = meta

    if (name === namespace) {
      acc[key] = saveJsonParse(value)
    }

    return acc
  }, {})

  return isEmptyObject(groped) ? null : groped
}

/**
 * Save function for positive
 * @param {String|Boolean} value -
 * @returns {Boolean} true if value true or 'true'
 */
export const isTrue = (value) => {
  return saveJsonParse(value) === true
}

/**
 * Throttle function call
 * @param {Function} func function
 * @param {Number} [delay=1000] delay ms
 * @returns {Function} throttled function
 */
export const throttle = (func, delay = 1000) => {
  let timerId = null

  function clear() {
    clearTimeout(timerId)
    timerId = null
  }

  return function throttled(...args) {
    if (timerId) {
      clear()
    }

    timerId = setTimeout(() => {
      func(...args)
      clear()
    }, delay)
  }
}

/**
 * Throttle async function call
 * @param {Function} asyncFunc async function
 * @param {Number} [delay=1000] delay ms
 * @returns {Function<Promise>} async throttled function
 */
export const throttleAsync = (asyncFunc, delay = 1000) => {
  let timerId = null

  function clear() {
    clearTimeout(timerId)
    timerId = null
  }

  return function throttledAsync(...args) {
    if (timerId) {
      clear()
    }

    return new Promise((rs, rj) => {
      const currentTimerId = setTimeout(() => {
        asyncFunc(...args)
          .then((...res) => {
            if (timerId === currentTimerId) {
              rs(...res)
            }
            clear()
          })
          .catch((...res) => {
            if (timerId === currentTimerId) {
              rj(...res)
            }
            clear()
          })
      }, delay)

      timerId = currentTimerId
    })
  }
}

/**
 * Return true if checkout is trial
 * @param {Object} checkout perche checkout
 * @returns {Boolean} true if checkout is trial
 */
export const isTrialCheckout = (checkout) => {
  return checkout?.items?.some(({ isTrial }) => isTrial) ?? false
}

/**
 * Return true if checkout is closed
 * @param {Object} checkout perche checkout
 * @returns {Boolean} true if checkout is closed
 */
export const isClosedCheckout = (checkout) =>
  checkout?.state === CHECKOUT_STATE_CLOSED

/**
 * Deep merge objects
 * @param {Object} target target object
 * @param {Object} source source object
 * @returns {Object} merged object
 */
export const deepMerge = (target, source) => {
  if (!source || !isObject(target) || !isObject(source)) {
    return target
  }
  return Object.entries(source).reduce((acc, [key, sourceValue]) => {
    if (!isObject(sourceValue)) {
      return Object.assign(acc, { [key]: sourceValue })
    }
    if (!isObject(acc[key])) {
      acc[key] = { [key]: {} }
    }

    return Object.assign(acc, deepMerge(acc[key], sourceValue))
  }, target)
}

/**
 * Return search param value
 * @param {String} name param name
 * @returns {String} search param value
 */
export const getUrlParameter = (name) => {
  const search = new URLSearchParams(location.search)
  return search.get(name)
}

/**
 * Find option by names
 * @param {Array<Object>} options array of options
 * @param {Array<String>} names array of options name
 * @returns {Object|null} option
 */
export const findOptionByNames = (options, names) => {
  if (!options?.length || !names?.length) {
    return null
  }

  return options.find(({ name }) => isEqualOptionName(name, names))
}

/**
 * Rounding price amount
 * @param {Number} amount price amount
 * @param {Number} [precision] precision (default: 2)
 * @returns {Number} rounded amount
 */
export const roundPriceAmount = (amount, precision = 2) => {
  const mul = Math.pow(10, precision)
  return Math.round(amount * mul) / mul
}
