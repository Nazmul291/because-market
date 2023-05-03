export const STOREFRONT_API_URL = "/api/2022-10/graphql"
export const APP_CONTEXT = "APP_CONTEXT"
export const GLOBAL_CONFIG_CONTEXT = "GLOBAL_CONFIG_CONTEXT"

export const FREE_SHIPPING_AMOUNT =
  parseInt(process.env.FREE_SHIPPING_AMOUNT, 10) || 0
export const SHOW_ADDITIONAL_MODAL_QUERY = "showModal"
export const SHOW_SKIP_TRIAL_MODAL_QUERY = "showSkipTrial"
export const TEMPLATE_NAME_QUERY = "view"
export const CHECKOUT_SUCCESS_FUNNEL_TEMPLATE_NAME = "checkout-success.funnel"
export const CHECKOUT_ID_QUERY = "checkoutID"
export const MIXPANEL_ID_QUERY = "userID"
export const PAGE_NAME_QUERY = "page"
export const PAGE_ANCHOR_QUERY = "anchor"
export const INVOICE_LINK_TEMPLATE = `${process.env.PERCHE_API_URL}/account/invoice/{name}/pdf`
export const CHECKOUT_SMS_NOTIFICATION_ATTRIBUTES = "smsNotification" // Transactional SMS
export const CHECKOUT_SMS_MARKETING_NOTIFICATION_ATTRIBUTES =
  "smsMarketingNotification" // Marketing SMS from Attentive
export const CHECKOUT_CUSTOM_ATTRIBUTE_DISCOUNTS = "discounts"
export const CHECKOUT_CUSTOM_ATTRIBUTE_UTM = "utm"
export const CHECKOUT_ITEM_CUSTOM_ATTRIBUTE_SUBSCRIPTION = "subscription"
export const CHECKOUT_STATE_CLOSED = "Closed"
export const ADD_TO_NEXT_CHECKOUT_ID_QUERY = "addToNextCheckoutID"
export const WEEKLY_OFFER_PRODUCT_PREVIEW_ID = "productId"

export const CART_VARIANTS_QUERY = "vars"
export const CART_DISCOUNTS_QUERY = "discounts"

export const TRY_SOMETHING_NEW_PAGE_PATH = "/account?page=allProducts"
export const SUPPORT_EMAIL_ADDRESS = "help@becausemarket.com"
export const RETRIAL_GOOGLE_FORM_URL =
  "https://thebecausemarket.typeform.com/to/mBZZiIfq#source=portal&email="
export const ADD_MORE_ITEMS_URL = `${process.env.PERCHE_API_URL}/collections/demo-collection`
export const START_SHOPPING_URL = "/"
export const SCROLL_TO_ANCHOR_OFFSET = 500

// profile
export const PROFILE_URL = `${process.env.PERCHE_API_URL}/account/profile`

export const NO_TRIAL_SHIPPING_PROVINCE_CODE = ["AK", "HI"]

// Payment methods
export const PAYMENT_METHOD_CARD = "CARD"
export const PAYMENT_METHOD_PAYPAL = "PAYPAL"

// If product have not options, shopify add option automatic. And we have visual bug with select option 'Title'
export const PRODUCT_EXCLUDE_OPTIONS_IF_ONE = ["Title"]

// Product tags (use this tag for disable PayPal for product payment)
export const PRODUCT_TAG_DISABLE_PAYPAL = "disable-paypal"
// Product tag option for show price from on pdp
export const PRODUCT_TAG_PRICE_FROM = "fromPrice"
// Show price jy pdp header if that tag exists
export const PRODUCT_TAG_SHOW_PRICE_PIECE = "show_price/piece"

export const PRODUCT_TAG_BUY_NOW = "BuyNow"

// Product short description selector
export const PRODUCT_SHORT_DESCRIPTION_SELECTOR = ".product-short-description"

// Product option names
export const PRODUCT_PACK_SIZE_OPTION = "Select Pack Size"
export const PRODUCT_SIZE_OPTION = "Size"
export const PRODUCT_SELECT_SIZE_OPTION = "Select Size"
export const PRODUCT_COLOR_OPTION = "Color"
export const PRODUCT_SIZE_OPTIONS = [
  PRODUCT_SIZE_OPTION,
  PRODUCT_SELECT_SIZE_OPTION,
]

// Default cross sell product collection name
// Load this product for display default cross sell products
export const CROSS_SELL_PRODUCT_DEFAULT_COLLECTION =
  "cross-sell-product-default-collection"

export const MEMBERS_FAVORITES_COLLECTION_HANDLE = "members-favorites"
export const MEMBERS_FAVORITES_PRODUCTS_LIMIT = 6

export const PRODUCT_TYPE_UNDERWEAR = "Underwear"

export const PRODUCT_METAFIELD_NAMESPACE_SUBSCRIPTION = "subscription"
export const PRODUCT_METAFIELD_KEY_SUBSCRIPTION_BI_MONTHLY = "2month"
export const PRODUCT_METAFIELD_KEY_SUBSCRIPTION_MONTHLY = "monthly"
export const PRODUCT_METAFIELD_KEY_SUBSCRIPTION_WEEKLY = "weekly"
export const PRODUCT_METAFIELD_KEY_SUBSCRIPTION_DAILY = "daily"
export const PRODUCT_METAFIELD_NAMESPACE_YOTPO = "yotpo"
export const PRODUCT_METAFIELD_KEY_YOTPO_PRODUCT_ID = "product_id"
export const PRODUCT_METAFIELD_NAMESPACE_CUSTOM = "custom"
export const PRODUCT_METAFIELD_KEY_CUSTOM_VARIANT_DESCRIPTION =
  "variant_description"
export const PRODUCT_METAFIELD_KEY_CUSTOM_FAQ_FUNNEL = "faq_funnel"
export const PRODUCT_METAFIELD_KEY_CUSTOM_VIDEO_FUNNEL = "video_funnel"
export const PRODUCT_METAFIELD_KEY_CUSTOM_CUSTOMER_FEEDBACK = "customerfeedback"
export const PRODUCT_METAFIELD_KEY_CUSTOM_TAG_ICONS = "tagicons"
export const PRODUCT_METAFIELD_KEY_CUSTOM_HAPPY_CUSTOMERS = "happy_customers"
export const PRODUCT_METAFIELD_KEY_CUSTOM_FUNNEL_STORIES = "funnel_stories"
export const PRODUCT_METAFIELD_KEY_CUSTOM_BENEFITS_UNDERWEAR =
  "benefits_underwear"
export const PRODUCT_METAFIELD_KEY_CUSTOM_BENEFITS_PADS = "benefits_pads"
export const PRODUCT_METAFIELD_KEY_CUSTOM_DETAILS_FUNNEL = "details_funnel"
export const PRODUCT_METAFIELD_NAMESPACE_FEE = "fee"
export const PRODUCT_METAFIELD_KEY_FEE_HANDLING = "handling"
export const PRODUCT_METAFIELD_NAMESPACE_GLOBAL = "global"
export const PRODUCT_METAFIELD_KEY_GLOBAL_BRAND = "brand"

export const PRODUCT_SUBSCRIPTION_ORDER = [
  PRODUCT_METAFIELD_KEY_SUBSCRIPTION_BI_MONTHLY,
  PRODUCT_METAFIELD_KEY_SUBSCRIPTION_MONTHLY,
  PRODUCT_METAFIELD_KEY_SUBSCRIPTION_WEEKLY,
  PRODUCT_METAFIELD_KEY_SUBSCRIPTION_DAILY,
]

export const PORTAL_SURVEY = {
  items: [
    {
      eventCode: 1,
      eventName: "Shipping Date Changed",
      question:
        "Your next shipment’s date has been successfully changed! In order to help us improve, can you share why you needed to change the date?",
      reasons: [
        {
          reasonId: 11,
          reason: "I have too much product at home right now",
        },
        {
          reasonId: 12,
          reason: "I don't use bladder protection products consistently",
        },
        {
          reasonId: 13,
          reason: "I have travel plans and won't be home for the delivery",
        },
        {
          reasonId: 14,
          reason: "I can't afford the products right now",
        },
        {
          reasonId: 15,
          reason: "I received my last package early or late",
        },
        {
          reasonId: 16,
          reason: "I am still deciding if Because products are right for me",
        },
      ],
    },
    {
      eventCode: 2,
      eventName: "Product Removed From Next Shipment",
      question:
        "In order to help us improve, can you share why would like to remove this product from your next shipment?",
      reasons: [
        {
          reasonId: 21,
          reason: "The product is too expensive",
        },
        {
          reasonId: 22,
          reason: "I don't like the product",
        },
        {
          reasonId: 23,
          reason: "Product does not match description",
        },
        {
          reasonId: 24,
          reason: "I added the product by mistake",
        },
        {
          reasonId: 25,
          reason: "Product is no longer needed",
        },
        {
          reasonId: 26,
          reason: "I have too much product on hand",
        },
      ],
    },
  ],
}

export const PORTAL_SURVEY_THANKS = {
  title: "Thank you for your time",
  description:
    "We are always striving to create a better service and your input helps",
}
