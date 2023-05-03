import { addMouseFlow } from "../integrations/mouseflow"

const slate = (window.slate = window.slate || {})
const theme = (window.theme = window.theme || {})
const DEBUG = true

/*================ Slate ================*/
/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */

slate.a11y = {
  /**
   * For use when focus shifts to a container rather than a link
   * eg for In-page links, after scroll, focus shifts to content area so that
   * next `tab` is where user expects if focusing a link, just $link.focus();
   *
   * @param {JQuery} $element - The element to be acted upon
   */
  pageLinkFocus: function ($element) {
    var focusClass = "js-focus-hidden"

    $element
      .first()
      .attr("tabIndex", "-1")
      .focus()
      .addClass(focusClass)
      .one("blur", callback)

    function callback() {
      $element.first().removeClass(focusClass).removeAttr("tabindex")
    }
  },

  /**
   * If there's a hash in the url, focus the appropriate element
   */
  focusHash: function () {
    var hash = window.location.hash

    // is there a hash in the url? is it an element on the page?
    if (hash && document.getElementById(hash.slice(1))) {
      this.pageLinkFocus($(hash))
    }
  },

  /**
   * When an in-page (url w/hash) link is clicked, focus the appropriate element
   */
  bindInPageLinks: function () {
    $("a[href*=#]").on(
      "click",
      function (evt) {
        this.pageLinkFocus($(evt.currentTarget.hash))
      }.bind(this)
    )
  },

  /**
   * Traps the focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  trapFocus: function (options) {
    var eventName = options.namespace
      ? "focusin." + options.namespace
      : "focusin"

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container
    }

    options.$container.attr("tabindex", "-1")
    options.$elementToFocus.focus()

    $(document).on(eventName, function (evt) {
      if (
        options.$container[0] !== evt.target &&
        !options.$container.has(evt.target).length
      ) {
        options.$container.focus()
      }
    })
  },

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  removeTrapFocus: function (options) {
    var eventName = options.namespace
      ? "focusin." + options.namespace
      : "focusin"

    if (options.$container && options.$container.length) {
      options.$container.removeAttr("tabindex")
    }

    $(document).off(eventName)
  },
}

/**
 * Cart Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Cart template.
 *
 * @namespace cart
 */

slate.cart = {
  /**
   * Browser cookies are required to use the cart. This function checks if
   * cookies are enabled in the browser.
   */
  cookiesEnabled: function () {
    var cookieEnabled = navigator.cookieEnabled

    if (!cookieEnabled) {
      document.cookie = "testcookie"
      cookieEnabled = document.cookie.indexOf("testcookie") !== -1
    }
    return cookieEnabled
  },
}

/**
 * Utility helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions for dealing with arrays and objects
 *
 * @namespace utils
 */

slate.utils = {
  /**
   * Return an object from an array of objects that matches the provided key and value
   *
   * @param {array} array - Array of objects
   * @param {string} key - Key to match the value against
   * @param {string} value - Value to get match of
   */
  findInstance: function (array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i]
      }
    }
  },

  /**
   * Remove an object from an array of objects by matching the provided key and value
   *
   * @param {array} array - Array of objects
   * @param {string} key - Key to match the value against
   * @param {string} value - Value to get match of
   */
  removeInstance: function (array, key, value) {
    var i = array.length
    while (i--) {
      if (array[i][key] === value) {
        array.splice(i, 1)
        break
      }
    }

    return array
  },

  /**
   * _.compact from lodash
   * Remove empty/false items from array
   * Source: https://github.com/lodash/lodash/blob/master/compact.js
   *
   * @param {array} array
   */
  compact: function (array) {
    var index = -1
    var length = array == null ? 0 : array.length
    var resIndex = 0
    var result = []

    while (++index < length) {
      var value = array[index]
      if (value) {
        result[resIndex++] = value
      }
    }
    return result
  },

  /**
   * _.defaultTo from lodash
   * Checks `value` to determine whether a default value should be returned in
   * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
   * or `undefined`.
   * Source: https://github.com/lodash/lodash/blob/master/defaultTo.js
   *
   * @param {*} value - Value to check
   * @param {*} defaultValue - Default value
   * @returns {*} - Returns the resolved value
   */
  defaultTo: function (value, defaultValue) {
    return value == null || value !== value ? defaultValue : value
  },
}

/**
 * Rich Text Editor
 * -----------------------------------------------------------------------------
 * Wrap iframes and tables in div tags to force responsive/scrollable layout.
 *
 * @namespace rte
 */

slate.rte = {
  /**
   * Wrap tables in a container div to make them scrollable when needed
   *
   * @param {object} options - Options to be used
   * @param {jquery} options.$tables - jquery object(s) of the table(s) to wrap
   * @param {string} options.tableWrapperClass - table wrapper class name
   */
  wrapTable: function (options) {
    var tableWrapperClass =
      typeof options.tableWrapperClass === "undefined"
        ? ""
        : options.tableWrapperClass

    options.$tables.wrap('<div class="' + tableWrapperClass + '"></div>')
  },

  /**
   * Wrap iframes in a container div to make them responsive
   *
   * @param {object} options - Options to be used
   * @param {jquery} options.$iframes - jquery object(s) of the iframe(s) to wrap
   * @param {string} options.iframeWrapperClass - class name used on the wrapping div
   */
  wrapIframe: function (options) {
    var iframeWrapperClass =
      typeof options.iframeWrapperClass === "undefined"
        ? ""
        : options.iframeWrapperClass

    options.$iframes.each(function () {
      // Add wrapper to make video responsive
      $(this).wrap('<div class="' + iframeWrapperClass + '"></div>')

      // Re-set the src attribute on each iframe after page load
      // for Chrome's "incorrect iFrame content on 'back'" bug.
      // https://code.google.com/p/chromium/issues/detail?id=395791
      // Need to specifically target video and admin bar
      this.src = this.src
    })
  },
}

slate.Sections = function Sections() {
  this.constructors = {}
  this.instances = []

  $(document)
    .on("shopify:section:load", this._onSectionLoad.bind(this))
    .on("shopify:section:unload", this._onSectionUnload.bind(this))
    .on("shopify:section:select", this._onSelect.bind(this))
    .on("shopify:section:deselect", this._onDeselect.bind(this))
    .on("shopify:section:reorder", this._onReorder.bind(this))
    .on("shopify:block:select", this._onBlockSelect.bind(this))
    .on("shopify:block:deselect", this._onBlockDeselect.bind(this))
}

slate.Sections.prototype = $.extend({}, slate.Sections.prototype, {
  _createInstance: function (container, constructor) {
    var $container = $(container)
    var id = $container.attr("data-section-id")
    var type = $container.attr("data-section-type")

    constructor = constructor || this.constructors[type]

    if (typeof constructor === "undefined") {
      return
    }

    var instance = $.extend(new constructor(container), {
      id: id,
      type: type,
      container: container,
    })

    this.instances.push(instance)
  },

  _onSectionLoad: function (evt) {
    var container = $("[data-section-id]", evt.target)[0]
    if (container) {
      this._createInstance(container)
    }
  },

  _onSectionUnload: function (evt) {
    var instance = slate.utils.findInstance(
      this.instances,
      "id",
      evt.detail.sectionId
    )

    if (!instance) {
      return
    }

    if (typeof instance.onUnload === "function") {
      instance.onUnload(evt)
    }

    this.instances = slate.utils.removeInstance(
      this.instances,
      "id",
      evt.detail.sectionId
    )
  },

  _onSelect: function (evt) {
    var instance = slate.utils.findInstance(
      this.instances,
      "id",
      evt.detail.sectionId
    )

    if (instance && typeof instance.onSelect === "function") {
      instance.onSelect(evt)
    }
  },

  _onDeselect: function (evt) {
    var instance = slate.utils.findInstance(
      this.instances,
      "id",
      evt.detail.sectionId
    )

    if (instance && typeof instance.onDeselect === "function") {
      instance.onDeselect(evt)
    }
  },

  _onReorder: function (evt) {
    var instance = slate.utils.findInstance(
      this.instances,
      "id",
      evt.detail.sectionId
    )

    if (instance && typeof instance.onReorder === "function") {
      instance.onReorder(evt)
    }
  },

  _onBlockSelect: function (evt) {
    var instance = slate.utils.findInstance(
      this.instances,
      "id",
      evt.detail.sectionId
    )

    if (instance && typeof instance.onBlockSelect === "function") {
      instance.onBlockSelect(evt)
    }
  },

  _onBlockDeselect: function (evt) {
    var instance = slate.utils.findInstance(
      this.instances,
      "id",
      evt.detail.sectionId
    )

    if (instance && typeof instance.onBlockDeselect === "function") {
      instance.onBlockDeselect(evt)
    }
  },

  register: function (type, constructor) {
    this.constructors[type] = constructor

    $("[data-section-type=" + type + "]").each(
      function (index, container) {
        this._createInstance(container, constructor)
      }.bind(this)
    )
  },
})

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */

slate.Currency = (function () {
  var moneyFormat = "${{amount}}"

  /**
   * Format money values based on your shop currency settings
   * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
   * or 3.00 dollars
   * @param  {String} format - shop money_format setting
   * @return {String} value - formatted value
   */
  function formatMoney(cents, format) {
    if (typeof cents === "string") {
      cents = cents.replace(".", "")
    }
    var value = ""
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/
    var formatString = format || moneyFormat

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = slate.utils.defaultTo(precision, 2)
      thousands = slate.utils.defaultTo(thousands, ",")
      decimal = slate.utils.defaultTo(decimal, ".")

      if (isNaN(number) || number == null) {
        return 0
      }

      number = (number / 100.0).toFixed(precision)

      var parts = number.split(".")
      var dollarsAmount = parts[0].replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        "$1" + thousands
      )
      var centsAmount = parts[1] ? decimal + parts[1] : ""

      return dollarsAmount + centsAmount
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case "amount":
        value = formatWithDelimiters(cents, 2)
        break
      case "amount_no_decimals":
        value = formatWithDelimiters(cents, 0)
        break
      case "amount_with_comma_separator":
        value = formatWithDelimiters(cents, 2, ".", ",")
        break
      case "amount_no_decimals_with_comma_separator":
        value = formatWithDelimiters(cents, 0, ".", ",")
        break
      case "amount_no_decimals_with_space_separator":
        value = formatWithDelimiters(cents, 0, " ")
        break
      case "amount_with_apostrophe_separator":
        value = formatWithDelimiters(cents, 2, "'")
        break
    }

    return formatString.replace(placeholderRegex, value)
  }

  return {
    formatMoney: formatMoney,
  }
})()

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

slate.Image = (function () {
  /**
   * Preloads an image in memory and uses the browsers cache to store it until needed.
   *
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute
   */

  function preload(images, size) {
    if (typeof images === "string") {
      images = [images]
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i]
      this.loadImage(this.getSizedImageUrl(image, size))
    }
  }

  /**
   * Loads and caches an image in the browsers cache.
   * @param {string} path - An image url
   */
  function loadImage(path) {
    new Image().src = path
  }

  /**
   * Find the Shopify image attribute size
   *
   * @param {string} src
   * @returns {null}
   */
  function imageSize(src) {
    var match = src.match(
      /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/
    )

    if (match) {
      return match[1]
    } else {
      return null
    }
  }

  /**
   * Adds a Shopify size attribute to a URL
   *
   * @param src
   * @param size
   * @returns {*}
   */
  function getSizedImageUrl(src, size) {
    if (size === null) {
      return src
    }

    if (size === "master") {
      return this.removeProtocol(src)
    }

    var match = src.match(
      /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
    )

    if (match) {
      var prefix = src.split(match[0])
      var suffix = match[0]

      return this.removeProtocol(prefix[0] + "_" + size + suffix)
    } else {
      return null
    }
  }

  function removeProtocol(path) {
    return path.replace(/http(s)?:/, "")
  }

  return {
    preload: preload,
    loadImage: loadImage,
    imageSize: imageSize,
    getSizedImageUrl: getSizedImageUrl,
    removeProtocol: removeProtocol,
  }
})()

/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist. Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */

slate.Variants = (function () {
  /**
   * Variant constructor
   *
   * @param {object} options - Settings from `product.js`
   */
  function Variants(options) {
    this.$container = options.$container
    this.product = options.product
    this.singleOptionSelector = options.singleOptionSelector
    this.originalSelectorId = options.originalSelectorId
    this.enableHistoryState = options.enableHistoryState
    this.currentVariant = this._getVariantFromOptions()

    $(this.singleOptionSelector, this.$container).on(
      "change",
      this._onSelectChange.bind(this)
    )
  }

  Variants.prototype = $.extend({}, Variants.prototype, {
    /**
     * Get the currently selected options from add-to-cart form. Works with all
     * form input elements.
     *
     * @return {array} options - Values of currently selected variants
     */
    _getCurrentOptions: function () {
      var currentOptions = $.map(
        $(this.singleOptionSelector, this.$container),
        function (element) {
          var $element = $(element)
          var type = $element.attr("type")
          var currentOption = {}

          if (type === "radio" || type === "checkbox") {
            if ($element[0].checked) {
              currentOption.value = $element.val()
              currentOption.index = $element.data("index")

              return currentOption
            } else {
              return false
            }
          } else {
            currentOption.value = $element.val()
            currentOption.index = $element.data("index")

            return currentOption
          }
        }
      )

      // remove any unchecked input values if using radio buttons or checkboxes
      currentOptions = slate.utils.compact(currentOptions)

      return currentOptions
    },

    /**
     * Find variant based on selected values.
     *
     * @param  {array} selectedValues - Values of variant inputs
     * @return {object || undefined} found - Variant object from product.variants
     */
    _getVariantFromOptions: function () {
      var selectedValues = this._getCurrentOptions()
      var variants = this.product.variants
      var found = false

      variants.forEach(function (variant) {
        var satisfied = true

        selectedValues.forEach(function (option) {
          if (satisfied) {
            satisfied = option.value === variant[option.index]
          }
        })

        if (satisfied) {
          found = variant
        }
      })

      return found || null
    },

    /**
     * Event handler for when a variant input changes.
     */
    _onSelectChange: function () {
      var variant = this._getVariantFromOptions()

      this.$container.trigger({
        type: "variantChange",
        variant: variant,
      })

      if (!variant) {
        return
      }

      this._updateMasterSelect(variant)
      this._updateImages(variant)
      this._updatePrice(variant)
      this.currentVariant = variant

      if (this.enableHistoryState) {
        this._updateHistoryState(variant)
      }
    },

    /**
     * Trigger event when variant image changes
     *
     * @param  {object} variant - Currently selected variant
     * @return {event}  variantImageChange
     */
    _updateImages: function (variant) {
      var variantImage = variant.featured_image || {}
      var currentVariantImage = this.currentVariant.featured_image || {}

      if (
        !variant.featured_image ||
        variantImage.src === currentVariantImage.src
      ) {
        return
      }

      this.$container.trigger({
        type: "variantImageChange",
        variant: variant,
      })
    },

    /**
     * Trigger event when variant price changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantPriceChange
     */
    _updatePrice: function (variant) {
      if (
        variant.price === this.currentVariant.price &&
        variant.compare_at_price === this.currentVariant.compare_at_price
      ) {
        return
      }

      this.$container.trigger({
        type: "variantPriceChange",
        variant: variant,
      })
    },

    /**
     * Update history state for product deeplinking
     *
     * @param {object} variant - Currently selected variant
     */
    _updateHistoryState: function (variant) {
      if (!history.replaceState || !variant) {
        return
      }

      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?variant=" +
        variant.id
      window.history.replaceState({ path: newurl }, "", newurl)
    },

    /**
     * Update hidden master select of variant change
     *
     * @param {object} variant - Currently selected variant
     */
    _updateMasterSelect: function (variant) {
      $(this.originalSelectorId, this.$container)[0].value = variant.id
    },
  })

  return Variants
})()

/*================ Sections ================*/
window.isYoutubeAPILoaded = false
function loadYouTubeLibrary() {
  if (window.isYoutubeAPILoaded) {
    return
  } else {
    // Load Youtube API script
    var tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    var firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }
}
function onYouTubeIframeAPIReady() {
  window.isYoutubeAPILoaded = true
  $("body").trigger("youtubeAPIReady")
}

window.isPlyrLoaded = false
function loadPlyr() {
  if (window.isPlyrLoaded) {
    return
  } else {
    // Load Youtube API script
    try {
      window.Shopify.loadFeatures(
        [
          {
            name: "video-ui",
            version: "1.0",
            onLoad: handleShopifyXRLoadError,
          },
        ],
        plyrLoaded
      )
    } catch (error) {
      console.log("An error occured while loading the Shopify Video interface")
      throw error
    }
  }
}
function plyrLoaded() {
  window.isPlyrLoaded = true
  $("body").trigger("plyrReady")
}

function handleShopifyXRLoadError(error) {
  if (error) {
    throw error
  }
}

theme.TouchDetect = (function () {
  var touchDevice = false

  function setTouch() {
    touchDevice = true
  }

  function isTouch() {
    return touchDevice
  }

  return {
    setTouch: setTouch,
    isTouch: isTouch,
  }
})()

/**
 * Media
 * ------------------------------------------------------------------------------
 * This object powers both the product templates and the quick-view
 *
 * @namespace Media
 */
theme.mediaInstances = {}
theme.Media = (function () {
  var selectors = {
    productSlideshow: "[data-product-slideshow]",
    productThumbs: "[data-product-thumbs]",
    productImage: "[data-product-image]",
    videoPlayer: "[data-video]",
    modelViewer: "[data-model]",
    zoomWrapper: "[data-zoom-wrapper]",
  }

  var thumbIcons = {
    model:
      '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-media-model" viewBox="0 0 26 26"><path d="M1 25h24V1H1z"/><path class="icon-media-model-outline" d="M.5 25v.5h25V.5H.5z" fill="none"/><path class="icon-media-model-element" d="M19.13 8.28L14 5.32a2 2 0 0 0-2 0l-5.12 3a2 2 0 0 0-1 1.76V16a2 2 0 0 0 1 1.76l5.12 3a2 2 0 0 0 2 0l5.12-3a2 2 0 0 0 1-1.76v-6a2 2 0 0 0-.99-1.72zm-6.4 11.1l-5.12-3a.53.53 0 0 1-.26-.38v-6a.53.53 0 0 1 .27-.46l5.12-3a.53.53 0 0 1 .53 0l5.12 3-4.72 2.68a1.33 1.33 0 0 0-.67 1.2v6a.53.53 0 0 1-.26 0z" opacity=".6" style="isolation:isolate"/></svg>',
    video:
      '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-media-video" viewBox="0 0 26 26"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 25h24V1H1v24z"/><path class="icon-media-video-outline" d="M.5 25v.5h25V.5H.5V25z"/><path class="icon-media-video-element" fill-rule="evenodd" clip-rule="evenodd" d="M9.718 6.72a1 1 0 0 0-1.518.855v10.736a1 1 0 0 0 1.562.827l8.35-5.677a1 1 0 0 0-.044-1.682l-8.35-5.06z" opacity=".6"/></svg>',
    external_video:
      '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-media-video" viewBox="0 0 26 26"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 25h24V1H1v24z"/><path class="icon-media-video-outline" d="M.5 25v.5h25V.5H.5V25z"/><path class="icon-media-video-element" fill-rule="evenodd" clip-rule="evenodd" d="M9.718 6.72a1 1 0 0 0-1.518.855v10.736a1 1 0 0 0 1.562.827l8.35-5.677a1 1 0 0 0-.044-1.682l-8.35-5.06z" opacity=".6"/></svg>',
  }

  function Media(container) {
    this.container = container
    this.$container = $(container)
    this.id = this.$container.attr("data-section-id")
    this.tallLayout = this.$container.data("tall-layout")
    this.players = {}
    this.selectors = selectors
  }

  Media.prototype = $.extend({}, Media.prototype, {
    init: function () {
      this.detectVideo()
      this.detect3d()
      this.launch3d()
      this.initZoom()
      this.createSlider()
    },
    createSlider: function () {
      var instance = this
      $(selectors.productSlideshow, this.$container)
        .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
          var $currentMedia = $(slick.$slides[currentSlide]),
            $newMedia = $(slick.$slides[nextSlide])
          $currentMedia.trigger("mediaHidden")
          $newMedia.removeClass("media--hidden")
        })
        .on("afterChange", function (event, slick, currentSlide) {
          var $currentMedia = $(slick.$slides[currentSlide]),
            $otherMedia = $currentMedia.siblings(),
            mediaType = $(slick.$slides[currentSlide]).attr("data-type"),
            isFocusEnabled = $("body").hasClass("focus-enabled")

          $otherMedia.addClass("media--hidden")
          $currentMedia.trigger("mediaVisible")
          // disable swipe on 3d models and videos
          if (
            mediaType === "model" ||
            mediaType === "video" ||
            mediaType === "external_video"
          ) {
            // fisrt boolean sets value, second option false to prevent refresh
            slick.slickSetOption("swipe", false, false)
          } else {
            slick.slickSetOption("swipe", true, false)
          }

          setTimeout(function () {
            $(".slick-dots li").attr("aria-hidden", false)
          }, 100)

          if (isFocusEnabled) {
            $currentMedia.focus()
          }
        })

      // if the first element is a model or video, disable swipe
      $(selectors.productSlideshow, this.$container).on(
        "init",
        function (event, slick) {
          var firstType = $(slick.$slides[0]).attr("data-type")
          var $productThumbImages = instance.$container.find("[data-thumbnail]")

          $productThumbImages
            .on("click", function (e) {
              e.preventDefault()
            })
            .on("keyup", function (e) {
              // On keypress Enter move the focus to the first focusable element in the related slide
              if (e.keyCode === 13) {
                var mediaId = $(this).data("media-id")
                $(slick.$slides)
                  .filter('[data-media-id="' + mediaId + '"]')
                  .find(
                    'model-viewer, video, iframe, button, [href], input, [tabindex]:not([tabindex="-1"])'
                  )
                  .eq(0)
                  .focus()
                  .select()
              }
            })

          if (
            firstType === "model" ||
            firstType === "video" ||
            firstType === "external_video"
          ) {
            slick.slickSetOption("swipe", false, false)
            slick.slickSetOption("accessibility", false, false)
          }

          setTimeout(function () {
            $(".slick-dots li").attr("aria-hidden", false)
          }, 100)
        }
      )

      $(selectors.productSlideshow, this.$container).slick({
        focusOnSelect: true,
        adaptiveHeight: true,
        dots: true,
        arrows: false,
        accessibility: false,
        fade: true,
        swipe: true,
        speed: 500,
        cssEase: "linear",
        // eslint-disable-next-line
        appendDots: $(selectors.productThumbs, this.$container),
        customPaging: function (slider, i) {
          var type = $(slider.$slides[i]).data("type")
          var mediaId = $(slider.$slides[i]).data("media-id")
          var thumb = $(slider.$slides[i]).data("thumb")
          var thumbAlt = $(slider.$slides[i])
            .find("[aria-label]")
            .attr("aria-label")
          var thumbIcon = thumbIcons[type] ? thumbIcons[type] : ""
          if (thumbAlt === undefined) {
            thumbAlt = $(slider.$slides[i]).attr("aria-label")
          }

          return (
            '<a href="' +
            thumb +
            '" class="thumb--' +
            type +
            '" data-thumbnail data-media-id="' +
            mediaId +
            '"><img alt="' +
            thumbAlt +
            '" src="' +
            thumb +
            '">' +
            thumbIcon +
            "</a>"
          )
        },
      })
    },
    detect3d: function () {
      var $modelViewerElements = $(selectors.modelViewer, this.$container)
      if ($modelViewerElements.length) {
        theme.ProductModel.init($modelViewerElements, this.id)
      }
    },
    launch3d: function () {
      var instance = this
      $(document).on("shopify_xr_launch", function () {
        var $currentMedia = $(
          instance.selectors.modelViewer + ":not(.media--hidden)",
          instance.$container
        )

        $currentMedia.trigger("xrLaunch")
      })
    },
    detectVideo: function () {
      var playerElements = this.container.querySelectorAll(
        selectors.videoPlayer
      )
      var hasYouTube = false
      var hasNative = false

      for (var i = 0; i < playerElements.length; i++) {
        var newPlayerID = playerElements[i].getAttribute("id")
        var newPlayerType = playerElements[i].getAttribute("data-type")
        var newPlayerMediaId = playerElements[i].getAttribute("data-media-id")

        this.players[newPlayerID] = {}
        this.players[newPlayerID].id = newPlayerID
        this.players[newPlayerID].type = newPlayerType
        this.players[newPlayerID].mediaId = newPlayerMediaId
        this.players[newPlayerID].container = playerElements[i]
        this.players[newPlayerID].element =
          playerElements[i].querySelector("iframe, video")

        if (!this.players[newPlayerID].element) return

        if (newPlayerType === "external_video") {
          var youtubeID = playerElements[i].getAttribute("data-youtube-id")
          this.players[newPlayerID].externalID = youtubeID
          hasYouTube = true
        } else if (newPlayerType === "video") {
          hasNative = true
        }
      }

      if (hasNative) {
        if (window.isPlyrLoaded) {
          this.nativeInitCallback()
        } else {
          // Load Plyr
          window.loadPlyr()
          $("body").on("plyrReady", this.nativeInitCallback.bind(this))
        }
      }

      if (hasYouTube) {
        if (window.isYoutubeAPILoaded) {
          this.youTubeInitCallback()
        } else {
          // Load Youtube API
          window.loadYouTubeLibrary()
          $("body").on("youtubeAPIReady", this.youTubeInitCallback.bind(this))
        }
      }
    },
    youTubeInitCallback: function () {
      var self = this
      for (var currentPlayerID in this.players) {
        if (this.players[currentPlayerID].type === "external_video") {
          var currentPlayer = this.players[currentPlayerID],
            enableLooping =
              this.players[currentPlayerID].container.getAttribute(
                "data-video-looping"
              ) === "true"
          this.players[currentPlayerID].player = new YT.Player(
            currentPlayer.element,
            {
              videoId: currentPlayer.externalID,
              playerVars: {
                cc_load_policy: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                playsinline: 1,
                autohide: 0,
                controls: 1,
                branding: 0,
                showinfo: 0,
                rel: 0,
                fs: 0,
                wmode: "opaque",
              },
              events: {
                onStateChange: function (e) {
                  if (e.data === 0 && enableLooping) e.target.seekTo(0)
                  var currentMediaId = $(e.target.a)
                    .closest("[data-media-id]")
                    .attr("data-media-id")
                  if (e.data === 1) self.pauseOtherMedia(currentMediaId)
                },
              },
            }
          )

          $(this.players[currentPlayerID].container).on(
            "mediaHidden xrLaunch",
            function (event) {
              if (typeof event.target.dataset.playerId === "undefined") return
              var newID = event.target.dataset.playerId
              var sectionID = event.target.dataset.mediaKey
              var newPlayer =
                window.theme.mediaInstances[sectionID].players[newID]
              if (newPlayer.player && newPlayer.player.pauseVideo) {
                newPlayer.player.pauseVideo()
              }
            }
          )

          $(this.players[currentPlayerID].container).on(
            "mediaVisible",
            function (event) {
              if (theme.TouchDetect.isTouch()) return
              if (typeof event.target.dataset.playerId === "undefined") return
              var newID = event.target.dataset.playerId
              var sectionID = event.target.dataset.mediaKey
              var newPlayer =
                window.theme.mediaInstances[sectionID].players[newID]
              if (newPlayer.player && newPlayer.player.playVideo) {
                newPlayer.player.playVideo()
              }
            }
          )
        }
      }
    },
    nativeInitCallback: function () {
      var self = this
      for (var currentPlayerID in this.players) {
        if (this.players[currentPlayerID].type === "video") {
          var currentPlayer = this.players[currentPlayerID],
            enableLooping =
              this.players[currentPlayerID].container.getAttribute(
                "data-video-looping"
              ) === "true"

          this.players[currentPlayerID].player = new Shopify.Plyr(
            currentPlayer.element,
            {
              loop: { active: enableLooping },
            }
          )
          this.players[currentPlayerID].player.on("play", function (event) {
            var currentMediaId = $(event.target)
              .closest("[data-media-id]")
              .attr("data-media-id")
            if (currentMediaId) {
              self.pauseOtherMedia(currentMediaId)
            }
          })

          $(this.players[currentPlayerID].container).on(
            "mediaHidden xrLaunch",
            function (event) {
              if (typeof event.target.dataset.playerId === "undefined") return
              var newID = event.target.dataset.playerId
              var sectionID = event.target.dataset.mediaKey
              var newPlayer =
                window.theme.mediaInstances[sectionID].players[newID]
              if (newPlayer.player && newPlayer.player.pause) {
                newPlayer.player.pause()
              }
            }
          )

          $(this.players[currentPlayerID].container).on(
            "mediaVisible",
            function (event) {
              if (theme.TouchDetect.isTouch()) return
              if (typeof event.target.dataset.playerId === "undefined") return
              var newID = event.target.dataset.playerId
              var sectionID = event.target.dataset.mediaKey
              var newPlayer =
                window.theme.mediaInstances[sectionID].players[newID]
              if (newPlayer.player && newPlayer.player.play) {
                newPlayer.player.play()
              }
            }
          )
        }
      }
    },

    pauseOtherMedia: function (mediaId) {
      var $currentMedia = $(
          "[data-product-single-media-wrapper]" +
            '[data-media-id="' +
            mediaId +
            '"]'
        ),
        $otherMedia = $("[data-product-single-media-wrapper]").not(
          $currentMedia
        )

      $currentMedia.removeClass("media--hidden")
      $otherMedia.trigger("mediaHidden").addClass("media--hidden")
    },

    initZoom: function () {
      var zoomEnable = this.$container.data("image-zoom-enable")
      if (!Modernizr.touch && zoomEnable) {
        $(this.selectors.productImage).magnificPopup({
          type: "image",
          mainClass: "mfp-fade",
          closeOnBgClick: true,
          closeBtnInside: false,
          closeOnContentClick: true,
          tLoading: "",
          removalDelay: 200,
        })
      }
    },

    removeSectionVideos: function (sectionId) {
      for (var key in videos) {
        if (videos.hasOwnProperty(key)) {
          var video = videos[key]

          if (video.sectionId === sectionId) {
            if (video.player) video.player.destroy()
            delete videos[key]
          }
        }
      }

      delete theme.mediaInstances[sectionId]
    },

    onUnload: function () {
      this.$container.off(this.namespace)
      this.removeSectionVideos(this.id)
    },
  })

  return Media
})()

theme.ProductModel = (function () {
  var modelJsonSections = {}
  var models = {}
  var xrButtons = {}
  var selectors = {
    productMediaWrapper: "[data-product-single-media-wrapper]",
  }

  function init(modelViewerContainers, sectionId) {
    modelJsonSections[sectionId] = {
      loaded: false,
    }

    modelViewerContainers.each(function (index) {
      var $modelViewerContainer = $(this)
      var mediaId = $modelViewerContainer.data("media-id")
      var $modelViewerElement = $($modelViewerContainer.find("model-viewer")[0])

      var modelId = $modelViewerElement.data("model-id")

      if (index === 0) {
        var $xrButton = $modelViewerContainer
          .closest("[data-product-wrapper]")
          .find("[data-shopify-xr]")

        xrButtons[sectionId] = {
          $element: $xrButton,
          defaultId: modelId,
        }
      }

      models[mediaId] = {
        modelId: modelId,
        mediaId: mediaId,
        sectionId: sectionId,
        $container: $modelViewerContainer,
        $element: $modelViewerElement,
      }
    })

    window.Shopify.loadFeatures([
      {
        name: "shopify-xr",
        version: "1.0",
        onLoad: setupShopifyXr,
      },
      {
        name: "model-viewer-ui",
        version: "1.0",
        onLoad: setupModelViewerUi,
      },
    ])
  }

  function setupShopifyXr(errors) {
    if (errors) {
      console.warn(errors)
      return
    }
    if (!window.ShopifyXR) {
      document.addEventListener("shopify_xr_initialized", function () {
        setupShopifyXr()
      })
      return
    }

    for (var sectionId in modelJsonSections) {
      if (modelJsonSections.hasOwnProperty(sectionId)) {
        var modelSection = modelJsonSections[sectionId]
        if (modelSection.loaded) continue

        var $modelJson = $("#ModelJson-" + sectionId)
        if ($modelJson.length) {
          window.ShopifyXR.addModels(JSON.parse($modelJson.html()))
          modelSection.loaded = true
        }
      }
    }
    window.ShopifyXR.setupXRElements()
  }

  function setupModelViewerUi(errors) {
    if (errors) {
      console.warn(errors)
      return
    }

    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key]
        if (!model.modelViewerUi) {
          model.modelViewerUi = new Shopify.ModelViewerUI(model.$element)
        }
        setupModelViewerListeners(model)
      }
    }
  }

  function setupModelViewerListeners(model) {
    var xrButton = xrButtons[model.sectionId]

    model.$container
      .on("mediaVisible", function (event) {
        var newModel = event.target.dataset.modelId || xrButton.defaultId
        xrButton.$element.attr("data-shopify-model3d-id", newModel)

        pauseOtherMedia(model.mediaId)

        if (theme.TouchDetect.isTouch()) return
        model.modelViewerUi.play()
      })
      .on("mediaHidden", function () {
        model.modelViewerUi.pause()
      })
      .on("xrLaunch", function () {
        model.modelViewerUi.pause()
      })

    model.$element.on("shopify_model_viewer_ui_toggle_play", function () {
      pauseOtherMedia(model.mediaId)
    })
  }

  function pauseOtherMedia(mediaId) {
    var $currentMedia = $(
        "[data-product-single-media-wrapper]" +
          '[data-media-id="' +
          mediaId +
          '"]'
      ),
      $otherMedia = $("[data-product-single-media-wrapper]").not($currentMedia)

    $currentMedia.removeClass("media--hidden")
    $otherMedia.trigger("mediaHidden").addClass("media--hidden")
  }

  function removeSectionModels(sectionId) {
    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key]
        if (model.sectionId === sectionId) {
          delete models[key]
        }
      }
    }
    delete modelJsonSections[sectionId]
    delete theme.mediaInstances[sectionId]
  }

  return {
    init: init,
    removeSectionModels: removeSectionModels,
  }
})()

/*================ Sections ================*/
/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */

theme.Product = (function () {
  var selectors = {
    addToCart: "[data-add-to-cart]",
    addToCartText: "[data-add-to-cart-text]",
    comparePrice: "[data-compare-price]",
    comparePriceText: "[data-compare-text]",
    formWrapper: "[data-form-wrapper]",
    originalSelectorId: "[data-product-select]",
    priceWrapper: "[data-price-wrapper]",
    productFeaturedImage: "[data-product-featured-image]",
    productSlideshow: "[data-product-slideshow]",
    productImage: "[data-product-image]",
    productJson: "[data-product-json]",
    productPrice: "[data-product-price]",
    productThumbs: "[data-product-thumbs]",
    singleOptionSelector: "[data-single-option-selector]",
  }

  /**
   * Product section constructor. Runs on page load as well as Theme Editor
   * `section:load` events.
   * @param {string} container - selector for the section container DOM element
   */
  function Product(container) {
    this.container = container
    this.$container = $(container)
    var sectionId = this.$container.attr("data-section-id")
    this.id = sectionId

    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$(selectors.productJson, this.$container).html()) {
      return
    }

    this.init()

    this.accordion()
    this.tabs()
    this.tabsSpaceCheck()

    var currentScope = this
    $(window)
      .resize(function () {
        currentScope.tabsSpaceCheck()
      })
      .resize()

    this.productSingleObject = JSON.parse(
      $(selectors.productJson, this.$container).html()
    )

    var options = {
      $container: this.$container,
      enableHistoryState: this.$container.data("enable-history-state") || false,
      singleOptionSelector: selectors.singleOptionSelector,
      originalSelectorId: selectors.originalSelectorId,
      product: this.productSingleObject,
    }

    this.settings = {}
    this.namespace = ".product"
    this.variants = new slate.Variants(options)
    this.$featuredImage = $(selectors.productFeaturedImage, this.$container)

    this.$container.on(
      "variantChange" + this.namespace,
      this.updateAddToCartState.bind(this)
    )
    this.$container.on(
      "variantPriceChange" + this.namespace,
      this.updateProductPrices.bind(this)
    )
    this.$container.on(
      "variantImageChange" + this.namespace,
      this.updateProductImage.bind(this)
    )
  }

  Product.prototype = $.extend({}, Product.prototype, {
    init: function () {
      theme.mediaInstances[this.id] = new theme.Media(this.container)
      theme.mediaInstances[this.id].init()
    },
    /**
     * Updates the DOM state of the add to cart button
     *
     * @param {boolean} enabled - Decides whether cart is enabled or disabled
     * @param {string} text - Updates the text notification content of the cart
     */
    updateAddToCartState: function (evt) {
      var variant = evt.variant

      if (variant) {
        $(selectors.priceWrapper, this.$container).removeClass("hide")
      } else {
        $(selectors.addToCart, this.$container).prop("disabled", true)
        $(selectors.addToCartText, this.$container).html(
          theme.strings.unavailable
        )
        $(selectors.formWrapper, this.$container)
          .removeClass("variant--soldout")
          .addClass("variant--unavailabe")
        return
      }

      if (variant.available) {
        $(selectors.addToCart, this.$container).prop("disabled", false)
        $(selectors.addToCartText, this.$container).html(
          theme.strings.addToCart
        )
        $(selectors.formWrapper, this.$container).removeClass(
          "variant--soldout variant--unavailabe"
        )
      } else {
        $(selectors.addToCart, this.$container).prop("disabled", true)
        $(selectors.addToCartText, this.$container).html(theme.strings.soldOut)
        $(selectors.formWrapper, this.$container)
          .removeClass("variant--unavailabe")
          .addClass("variant--soldout")
        $(selectors.priceWrapper, this.$container).removeClass("hide")
      }
    },

    /**
     * Updates the DOM with specified prices
     *
     * @param {string} productPrice - The current price of the product
     * @param {string} comparePrice - The original price of the product
     */
    updateProductPrices: function (evt) {
      var variant = evt.variant
      var $comparePrice = $(selectors.comparePrice, this.$container)

      $(selectors.productPrice, this.$container).html(
        slate.Currency.formatMoney(variant.price, theme.moneyFormat)
      )

      if (variant.compare_at_price > variant.price) {
        $comparePrice.html(
          slate.Currency.formatMoney(
            variant.compare_at_price,
            theme.moneyFormat
          )
        )
      } else {
        $comparePrice.html("")
      }
    },

    /**
     * Updates the DOM with the specified image URL
     *
     * @param {string} src - Image src URL
     */
    updateProductImage: function (evt) {
      var variant = evt.variant

      if (variant) {
        // Update variant image, if one is set
        if (variant.featured_media) {
          var newImg = $(
            selectors.productImage +
              '[data-image-id="' +
              variant.featured_media.id +
              '"]',
            this.$container
          )
          var newPosition = newImg
            .closest(".product__photo")
            .attr("data-slick-index")

          // Slider not loaded
          if (newPosition === undefined) {
          } else {
            $(selectors.productSlideshow, this.$container).slick(
              "slickGoTo",
              newPosition
            )
          }
        }
      }
    },
    accordion: function () {
      $(".accordion-js", this.$container).click(function () {
        if ($(this).next("div").is(":visible")) {
          $(this).next("div").slideUp("fast")
          $(this).toggleClass("accordion--open")
        } else {
          $(this).next("div").slideDown("fast")
          $(this).toggleClass("accordion--open")
        }
      })
    },
    tabs: function () {
      $(".tab-content-0", this.$container).addClass("current")
      $(".tab-link-0", this.$container).addClass("current")
      $("ul.tabs > li", this.$container).click(function () {
        var tab_id = $(this).attr("data-tab")
        $("ul.tabs > li", this.$container).removeClass("current")
        $(".tab-content", this.$container).removeClass("current")
        $(this).addClass("current")
        $(".tab-content-" + tab_id, this.$container).addClass("current")
      })
    },
    tabsSpaceCheck: function () {
      var tabsWidth = $(".tabs", this.$container).width()
      var tabsWrapper = $(".productTabsWrapper", this.$container).width() - 31
      if (tabsWidth >= tabsWrapper) {
        $(".product-tabs", this.$container).css({
          position: "absolute",
          left: "-9999px",
          display: "table",
        })
        $(".product-accordion", this.$container).show()
      } else {
        $(".product-tabs", this.$container).removeAttr("style")
        $(".product-accordion", this.$container).hide()
      }
    },
    /**
     * Event callback for Theme Editor `section:unload` event
     */
    onUnload: function () {
      this.$container.off(this.namespace)
    },
  })

  return Product
})()

theme.Related = (function () {
  function Related(container) {
    var $container = (this.$container = $(container))
    var sectionId = $container.attr("data-section-id")
    this.init()
  }
  Related.prototype = $.extend({}, Related.prototype, {
    init: function () {
      var $relatedSection = $("[data-related-section]")
      var productId = $relatedSection.data("product-id")
      var limit = $relatedSection.data("limit")
      var requestUrl =
        "/recommendations/products?section_id=related&limit=" +
        limit +
        "&product_id=" +
        productId

      $.get(requestUrl).done(function (data) {
        $relatedSection.hide().html(data).slideDown("slow")
      })
    },
  })
  return Related
})()

theme.Parallax = (function () {
  function Parallax(container) {
    var $container = (this.$container = $(container))
    var id = (this.id = $container.attr("data-section-id"))
    var $featuredImage = (this.$featuredImage = $("#FeaturedImage-" + id))
    var featuredImageSelector = (this.featuredImageSelector =
      "#FeaturedImage-" + id)
    var parallaxSliderSelector = (this.parallaxSliderSelector =
      "#FeaturedImage-" + id + " .parallax-slider")
    var $sectionBelow = (this.$sectionBelow = this.$container
      .closest(".shopify-section")
      .next())
    var $sectionAbove = (this.$sectionAbove = this.$container
      .closest(".shopify-section")
      .prev())

    this.layout()
    this.init()
    theme.transparentHeader()
  }

  Parallax.prototype = $.extend({}, Parallax.prototype, {
    init: function () {
      var parallaxSliderSelector = (this.parallaxSliderSelector =
        "#FeaturedImage-" + this.id + " .parallax-slider")

      if (this.$sectionBelow) {
        var parallaxBelow = (this.parallaxBelow = this.$sectionBelow
          .children()
          .first()
          .attr("data-parallax-src"))
      }
      if (this.$sectionAbove) {
        var parallaxAbove = (this.parallaxAbove = this.$sectionAbove
          .children()
          .first()
          .attr("data-parallax-src"))
        this.$sectionAbove.children().first().attr("data-parallax-src")
      }
      var bleedAmount = (this.bleedAmount = 0)
      if (this.parallaxBelow == undefined && this.parallaxAbove == undefined) {
        this.bleedAmount = 60
      }

      if (this.$featuredImage.attr("data-parallax-src")) {
        this.$featuredImage.parallax({
          src: this.$featuredImage.data("parallax-src"),
          parallax: "scroll",
          bleed: this.bleedAmount,
          excludeAgents: /(iPod)/,
          mirrorSelector: this.featuredImageSelector,
        })

        var parallaxSlider = this.parallaxSliderSelector
        $.each($(this.featuredImageSelector).data(), function (key, val) {
          if (key == "widths") {
            val = "[" + val + "]"
          }
          var kebabKey = "data-" + key
          kebabKey = kebabKey.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
          $(parallaxSlider).attr(kebabKey, val)
        })
        $(parallaxSlider).addClass("lazyload")
      }
    },

    layout: function () {
      var $sectionBelow = (this.$sectionBelow = this.$container
        .closest(".shopify-section")
        .next())
      var hasOverlapBelow = (this.hasOverlapBelow = this.$sectionBelow
        .find("[data-overlay]")
        .attr("data-overlay"))
      var tallest = this.$sectionBelow.children().first().data("tallest")

      if (this.hasOverlapBelow == "true") {
        var topOffset = tallest + $(".timeshow__date").innerHeight()
        this.$sectionBelow.addClass("timeshow--offset")

        // prevent layout conflicts by adding padding-bottom to hero text wrapper and min height to image
        $(".hero__content__wrapper", this.$container).css(
          "padding-bottom",
          function () {
            return topOffset + 30
          }
        )
        $("[data-prevent-overflow]", this.$container).css(
          "min-height",
          function () {
            heroHeight = $(
              "[data-prevent-overflow-content]",
              this.$container
            ).outerHeight(true)
            return topOffset + heroHeight
          }
        )
        $(".scroll_icon_wrap", this.$container).hide()

        // Pull date and images into the hero
        $(".timeshow__wrapper", this.$sectionBelow).css(
          "transform",
          "translateY(-" + topOffset + "px)"
        )
        var currentScope = this
        $(".timeshow__wrapper", this.$sectionBelow).css("height", function () {
          var tallestText = 0
          $(".timeshow__text", this.$sectionBelow).each(function () {
            if ($(this).height() > tallestText) {
              tallestText = $(this).height()
            }
          })
          return tallestText + 60
        })
        $(window).trigger("resize")
      } else {
        this.$sectionBelow.removeClass("timeshow--offset")
        $(".timeshow__wrapper", this.$sectionBelow).css(
          "transform",
          "translateY(0px)"
        )
        $(".timeshow__wrapper", this.$sectionBelow).css("height", "auto")
        $(".hero__content__wrapper").css("padding-bottom", "0px")
        $(".scroll_icon_wrap").show()
        $(window).trigger("resize")
      }
    },
    onReorder: function () {
      this.layout()
      theme.transparentHeader()
    },
    onUnload: function () {
      this.layout()
      if (this.$featuredImage.attr("data-img-src")) {
        this.$featuredImage.parallax("destroy")
      }
    },
  })

  return Parallax
})()

theme.IndexCollection = (function () {
  function IndexCollection(container) {
    var $container = (this.$container = $(container))
    var sectionId = $container.attr("data-section-id")
    var slideshow = (this.slideshow = "[data-index-collection-slideshow]")
    var $slideshow = (this.$slideshow = $(this.slideshow, this.$container))

    this.init()
  }

  IndexCollection.prototype = $.extend({}, IndexCollection.prototype, {
    init: function () {
      this.$slideshow.flickity({
        cellAlign: "left",
        groupCells: false,
        pageDots: false,
        freeScroll: true,
        contain: true,
      })
    },
    onUnload: function () {
      this.$slideshow.flickity("destroy")
    },
  })
  return IndexCollection
})()

theme.Collection = (function () {
  function Collection(container) {
    var $container = (this.$container = $(container))
    this.sortEnabled = $container.data("sort-enabled")

    this.init()
  }

  Collection.prototype = $.extend({}, Collection.prototype, {
    init: function () {
      this.stringOverrides()

      if (this.sortEnabled) {
        this.collectionSorting()
      }
    },

    stringOverrides: function () {
      // Override defaults in theme.strings with potential
      // template overrides

      theme.collectionStrings = theme.collectionStrings || {}
      $.extend(theme.strings, theme.collectionStrings)
    },

    collectionSorting: function () {
      Shopify.queryParams = {}
      if (location.search.length && location.search.indexOf("sort_by")) {
        for (
          var aKeyValue, i = 0, aCouples = location.search.substr(1).split("&");
          i < aCouples.length;
          i++
        ) {
          aKeyValue = aCouples[i].split("=")
          if (aKeyValue.length > 1) {
            Shopify.queryParams[decodeURIComponent(aKeyValue[0])] =
              decodeURIComponent(aKeyValue[1])
          }
        }
      }

      $(function () {
        $("#SortBy--desktop, #SortBy--mobile")
          .val(theme.strings.sortBy)
          .bind("change", function () {
            Shopify.queryParams.sort_by = $(this).val()
            location.search = jQuery.param(Shopify.queryParams)
          })
      })
    },
  })

  return Collection
})()

theme.Map = (function () {
  var config = {
    zoom: 14,
  }
  var apiStatus = null
  var mapsToLoad = []

  function Map(container) {
    theme.$currentMapContainer = this.$container = $(container)
    var key = this.$container.data("api-key")

    if (typeof key !== "string" || key === "") {
      return
    }

    if (apiStatus === "loaded") {
      var self = this

      // Check if the script has previously been loaded with this key
      var $script = $('script[src*="' + key + '&"]')
      if ($script.length === 0) {
        $.getScript("https://maps.googleapis.com/maps/api/js?key=" + key).then(
          function () {
            apiStatus = "loaded"
            self.createMap()
          }
        )
      } else {
        this.createMap()
      }
    } else {
      mapsToLoad.push(this)

      if (apiStatus !== "loading") {
        apiStatus = "loading"
        if (typeof window.google === "undefined") {
          $.getScript(
            "https://maps.googleapis.com/maps/api/js?key=" + key
          ).then(function () {
            apiStatus = "loaded"
            initAllMaps()
          })
        }
      }
    }
  }

  function initAllMaps() {
    // API has loaded, load all Map instances in queue
    $.each(mapsToLoad, function (index, instance) {
      instance.createMap()
    })
  }

  function geolocate($map) {
    var deferred = $.Deferred()
    var geocoder = new google.maps.Geocoder()
    var address = $map.data("address-setting")

    geocoder.geocode({ address: address }, function (results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        deferred.reject(status)
      }

      deferred.resolve(results)
    })

    return deferred
  }

  Map.prototype = $.extend({}, Map.prototype, {
    createMap: function () {
      var $map = this.$container.find(".map__container")

      return geolocate($map)
        .then(
          function (results) {
            var mapOptions = {
              zoom: config.zoom,
              styles: config.styles,
              center: results[0].geometry.location,
              draggable: false,
              clickableIcons: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              disableDefaultUI: true,
            }

            var map = (this.map = new google.maps.Map($map[0], mapOptions))
            var center = (this.center = map.getCenter())

            //eslint-disable-next-line no-unused-vars
            var marker = new google.maps.Marker({
              map: map,
              position: center,
            })

            google.maps.event.addDomListener(window, "resize", function () {
              google.maps.event.trigger(map, "resize")
              map.setCenter(center)
            })
          }.bind(this)
        )
        .fail(function () {
          var errorMessage

          switch (status) {
            case "ZERO_RESULTS":
              errorMessage = theme.strings.addressNoResults
              break
            case "OVER_QUERY_LIMIT":
              errorMessage = theme.strings.addressQueryLimit
              break
            default:
              errorMessage = theme.strings.addressError
              break
          }

          // Only show error in the theme editor
          if (Shopify.designMode) {
            var $mapContainer = $map.parents(".map")

            $mapContainer.addClass("page-width map--load-error")
            $mapContainer
              .find(".map__wrapper")
              .html(
                '<div class="errors text-center">' + errorMessage + "</div>"
              )
          }
        })
    },

    onUnload: function () {
      if (typeof window.google !== "undefined") {
        google.maps.event.clearListeners(this.map, "resize")
      }
    },
  })

  return Map
})()

// Global function called by Google on auth errors.
// Show an auto error message on all map instances.
// eslint-disable-next-line camelcase, no-unused-vars
function gm_authFailure() {
  if (!Shopify.designMode) return

  theme.$currentMapContainer.addClass("page-width map--load-error")
  theme.$currentMapContainer
    .find(".map__wrapper")
    .html(
      '<div class="errors text-center">' + theme.strings.authError + "</div>"
    )
}

theme.IndexTimeline = (function () {
  function IndexTimeline(container) {
    var $container = (this.$container = $(container))
    var sectionId = $container.attr("data-section-id")
    var timelineOverlay = (this.timelineOverlay =
      $container.attr("data-overlay"))
    var slideshow = (this.slideshow = "[data-index-timeline-slideshow]")
    var images = (this.images = "[data-image-height]")
    var offset = (this.offset = "[data-image-offset]")
    var $slideshow = (this.$slideshow = $(this.slideshow, this.$container))

    this.init()
    this.layout()

    var currentScope = this
    var layoutWait
    $(window).on("resize", function (e) {
      clearTimeout(layoutWait)
      layoutWait = setTimeout(function () {
        currentScope.layout()
      }, 225)
    })
  }

  IndexTimeline.prototype = $.extend({}, IndexTimeline.prototype, {
    init: function () {
      this.$slideshow.flickity({
        cellAlign: "left",
        adaptiveHeight: false,
        groupCells: false,
        pageDots: false,
        freeScroll: true,
        contain: true,
      })
    },
    layout: function () {
      var $sectionAbove = (this.$sectionAbove = this.$container
        .closest(".shopify-section")
        .prev())
      var hasImageAbove = (this.hasImageAbove =
        this.$sectionAbove.hasClass("can-overlay"))

      var tallest = 0
      $(this.images, this.$container).each(function () {
        if ($(this).height() > tallest) {
          tallest = $(this).height()
        }
      })
      // set tallest attribute for use by hero section
      this.$container.attr("data-tallest", tallest) //setter

      $(this.images, this.$container).css("padding-top", function () {
        var height = $(this).height()
        var offset = (tallest - height) / 2
        return offset
      })
      $(this.images, this.$container).css("padding-bottom", function () {
        var height = $(this).height()
        var offset = (tallest - height) / 2
        return offset
      })

      $(".flickity-button", this.$container).css("margin-top", function () {
        var height = $(this).height()
        var offset = tallest - 135
        return offset
      })
      if (this.hasImageAbove && this.timelineOverlay == "true") {
        var topOffset = tallest + $(".timeshow__date").innerHeight()
        this.$container.addClass("timeshow--offset")
        this.$sectionAbove.addClass("timeshow--overlayed")

        // prevent layout conflicts by adding padding-bottom to hero text wrapper and min height to image
        $(".hero__content__wrapper", this.$sectionAbove).css(
          "padding-bottom",
          function () {
            return topOffset + 30
          }
        )
        $("[data-prevent-overflow]", this.$sectionAbove).css(
          "min-height",
          function () {
            heroHeight = $(
              "[data-prevent-overflow-content]",
              this.$sectionAbove
            ).outerHeight(true)
            return topOffset + heroHeight
          }
        )
        $(".scroll_icon_wrap", this.$sectionAbove).hide()

        // Pull date and images into the hero
        $(".timeshow__wrapper", this.$container).css(
          "transform",
          "translateY(-" + topOffset + "px)"
        )
        var currentScope = this
        $(".timeshow__wrapper", this.$container).css("height", function () {
          var tallestText = 0
          $(".timeshow__text", this.$container).each(function () {
            if ($(this).height() > tallestText) {
              tallestText = $(this).height()
            }
          })
          return tallestText + 60
        })
      } else {
        // Reset to overlap attributes if the overlap is no longer valid
        this.$container.removeClass("timeshow--offset")
        this.$sectionAbove.removeClass("timeshow--overlayed")
        $(".timeshow__wrapper", this.$container).css(
          "transform",
          "translateY(0px)"
        )
        $(".timeshow__wrapper", this.$sectionBelow).css("height", "auto")
        $(".hero__content__wrapper").css("padding-bottom", "0px")
        $(".scroll_icon_wrap").show()
      }
    },
    onReorder: function () {
      this.layout()
    },
    onBlockSelect: function (evt) {
      var $slideshow = $(this.slideshow)

      // Ignore the cloned version
      var $slide = $(".timeshow__block--" + evt.detail.blockId)
      var slideIndex = $slide.index()

      // Go to selected slide, pause autoplay
      $slideshow.flickity("select", parseInt(slideIndex))
    },
    onUnload: function () {
      this.$slideshow.flickity("destroy")
    },
  })
  return IndexTimeline
})()

theme.Video = (function () {
  function Video(container) {
    var $container = (this.$container = $(container))
    var id = (this.id = $container.attr("data-section-id"))
    var $featuredImage = (this.$featuredImage = $("#FeaturedImage-" + id))
    var featuredImageSelector = (this.featuredImageSelector =
      "#FeaturedImage-" + id)
    var parallaxSliderSelector = (this.parallaxSliderSelector =
      "#FeaturedImage-" + id + " .parallax-slider")
    var $sectionBelow = (this.$sectionBelow = this.$container
      .closest(".shopify-section")
      .next())
    var $sectionAbove = (this.$sectionAbove = this.$container
      .closest(".shopify-section")
      .prev())

    var $currentVideo = $container.find(".popupVideo")

    $currentVideo.magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      closeBtnInside: false,
      preloader: false,
      fixedContentPos: false,
      iframe: {
        patterns: {
          youtube: {
            src: "//www.youtube.com/embed/%id%?autoplay=1&rel=0&showinfo=0",
          },
        },
      },
    })

    this.init()
    theme.transparentHeader()
  }

  Video.prototype = $.extend({}, Video.prototype, {
    init: function () {
      var parallaxSliderSelector = (this.parallaxSliderSelector =
        "#FeaturedImage-" + this.id + " .parallax-slider")

      if (this.$sectionBelow) {
        var parallaxBelow = (this.parallaxBelow = this.$sectionBelow
          .children()
          .first()
          .attr("data-parallax-src"))
      }
      if (this.$sectionAbove) {
        var parallaxAbove = (this.parallaxAbove = this.$sectionAbove
          .children()
          .first()
          .attr("data-parallax-src"))
        this.$sectionAbove.children().first().attr("data-parallax-src")
      }
      var bleedAmount = (this.bleedAmount = 0)
      if (this.parallaxBelow == undefined && this.parallaxAbove == undefined) {
        this.bleedAmount = 60
      }

      if (this.$featuredImage.attr("data-parallax-src")) {
        this.$featuredImage.parallax({
          src: this.$featuredImage.data("parallax-src"),
          parallax: "scroll",
          bleed: this.bleedAmount,
          excludeAgents: /(iPod)/,
          mirrorSelector: this.featuredImageSelector,
        })

        var parallaxSlider = this.parallaxSliderSelector
        $.each($(this.featuredImageSelector).data(), function (key, val) {
          if (key == "widths") {
            val = "[" + val + "]"
          }
          var kebabKey = "data-" + key
          kebabKey = kebabKey.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
          $(parallaxSlider).attr(kebabKey, val)
        })
        $(parallaxSlider).addClass("lazyload")
      }
    },
    onUnload: function () {
      if (this.$container.attr("data-img-src")) {
        this.$container.parallax("destroy")
      }
      var magnificObject = this.$container.find(".popupVideo")
      magnificObject.off("click.magnificpopup")
      magnificObject.removeData("magnificPopup")
    },
  })

  return Video
})()

theme.Slideshow = (function () {
  function Slideshow(container) {
    var $container = (this.$container = $(container))
    var sectionId = $container.attr("data-section-id")
    var slideshow = (this.slideshow = "#slideshow-" + sectionId)
    var $slideshow = (this.$slideshow = $(this.slideshow))

    this.init()
    theme.transparentHeader()
  }

  Slideshow.prototype = $.extend({}, Slideshow.prototype, {
    init: function () {
      this.$slideshow.slick({
        autoplay: this.$slideshow.data("autoplay"),
        autoplaySpeed: this.$slideshow.data("speed"),
        adaptiveHeight: false,
        fade: true,
        cssEase: "linear",
        arrows: false,
        dots: true,
        //appendDots: "div.homepage-slideshow div.hero__content__wrapper"
      })
    },
    onUnload: function () {
      this.$slideshow.slick("unslick")
    },
    onBlockSelect: function (evt) {
      var $slideshow = $(this.slideshow)

      // Ignore the cloned version
      var $slide = $(
        ".slideshow__slide--" + evt.detail.blockId + ":not(.slick-cloned)"
      )
      var slideIndex = $slide.data("slick-index")

      // Go to selected slide, pause autoplay
      $slideshow.slick("slickGoTo", slideIndex).slick("slickPause")
    },
  })
  return Slideshow
})()

theme.Team = (function () {
  function Team(container) {}
  Team.prototype = $.extend({}, Team.prototype, {
    onBlockSelect: function (evt) {
      var mediaQuerySmall = "screen and (max-width: 750px)"
      enquire.register(mediaQuerySmall, {
        match: function () {
          $(".team__button-" + evt.detail.blockId)
            .magnificPopup({
              items: {
                src: "#popup-" + evt.detail.blockId,
                type: "inline",
              },
            })
            .magnificPopup("open")
        },
      })
    },
    onBlockDeselect: function (evt) {
      var mediaQuerySmall = "screen and (max-width: 750px)"
      enquire.register(mediaQuerySmall, {
        match: function () {
          $(".team__button-" + evt.detail.blockId).magnificPopup("close")
        },
      })
    },
  })
  return Team
})()

theme.Accordion = (function () {
  function Accordion(container) {
    var $container = (this.$container = $(container))
    var sectionId = $container.attr("data-section-id")

    this.init()
  }

  Accordion.prototype = $.extend({}, Accordion.prototype, {
    init: function () {
      $(".accordion-js", this.$container).click(function () {
        if ($(this).next("div").is(":visible")) {
          $(this).next("div").slideUp("fast")
          $(this).toggleClass("accordion--open")
        } else {
          $(this).next("div").slideDown("fast")
          $(this).toggleClass("accordion--open")
        }
      })
    },
    onBlockSelect: function (evt) {
      var content = ".accordion-content--" + evt.detail.blockId
      var toggle = ".accordion-toggle--" + evt.detail.blockId
      $(content).slideDown("fast")
      $(toggle).addClass("accordion--open")
    },
  })
  return Accordion
})()

theme.Reviews = (function () {
  function Reviews(container) {
    var $container = (this.$container = $(container))
    var sectionId = $container.attr("data-section-id")
    var slideshow = (this.slideshow = "[data-reviews-slideshow]")
    var $slideshow = (this.$slideshow = $(this.slideshow, this.$container))
    this.init()
  }
  Reviews.prototype = $.extend({}, Reviews.prototype, {
    init: function () {
      this.$slideshow.flickity({
        cellAlign: "left",
        autoPlay: false,
        groupCells: false,
        pageDots: false,
        freeScroll: true,
        contain: true,
        lazyLoad: 1,
        setGallerySize: true,
      })
    },
    onBlockSelect: function (evt) {
      var $slideshow = $(this.slideshow)

      // Ignore the cloned version
      var $slide = $(".slide--" + evt.detail.blockId)
      var slideIndex = $slide.index()

      // Go to selected slide, pause autoplay
      $slideshow.flickity("select", parseInt(slideIndex))
    },
    onUnload: function () {
      this.$slideshow.flickity("destroy")
    },
  })
  return Reviews
})()

/*================ Templates ================*/
/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

theme.customerAddresses = (function () {
  var $newAddressForm = $("#AddressNewForm")

  if (!$newAddressForm.length) {
    return
  }

  // Initialize observers on address selectors, defined in shopify_common.js
  if (Shopify) {
    new Shopify.CountryProvinceSelector(
      "AddressCountryNew",
      "AddressProvinceNew",
      {
        hideElement: "AddressProvinceContainerNew",
      }
    )
  }

  // Initialize each edit form's country/province selector
  $(".address-country-option").each(function () {
    var formId = $(this).data("form-id")
    var countrySelector = "AddressCountry_" + formId
    var provinceSelector = "AddressProvince_" + formId
    var containerSelector = "AddressProvinceContainer_" + formId

    new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
      hideElement: containerSelector,
    })
  })

  // Toggle new/edit address forms
  $(".address-new-toggle").on("click", function () {
    $newAddressForm.toggleClass("hide")
  })

  $(".address-edit-toggle").on("click", function () {
    var formId = $(this).data("form-id")
    $("#EditAddress_" + formId).toggleClass("hide")
  })

  $(".address-delete").on("click", function () {
    var $el = $(this)
    var formId = $el.data("form-id")
    var confirmMessage = $el.data("confirm-message")
    if (
      confirm(confirmMessage || "Are you sure you wish to delete this address?")
    ) {
      Shopify.postLink("/account/addresses/" + formId, {
        parameters: { _method: "delete" },
      })
    }
  })
})()

/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

theme.customerLogin = (function () {
  var config = {
    recoverPasswordForm: "#RecoverPassword",
    hideRecoverPasswordLink: "#HideRecoverPasswordLink",
  }

  if (!$(config.recoverPasswordForm).length) {
    return
  }

  checkUrlHash()
  resetPasswordSuccess()

  $(config.recoverPasswordForm).on("click", onShowHidePasswordForm)
  $(config.hideRecoverPasswordLink).on("click", onShowHidePasswordForm)

  function onShowHidePasswordForm(evt) {
    evt.preventDefault()
    toggleRecoverPasswordForm()
  }

  function checkUrlHash() {
    var hash = window.location.hash

    // Allow deep linking to recover password form
    if (hash === "#recover") {
      toggleRecoverPasswordForm()
    }
  }

  /**
   *  Show/Hide recover password form
   */
  function toggleRecoverPasswordForm() {
    $("#RecoverPasswordForm").toggleClass("hide")
    $("#CustomerLoginForm").toggleClass("hide")
  }

  /**
   *  Show reset password success message
   */
  function resetPasswordSuccess() {
    var $formState = $(".reset-password-success")

    // check if reset password form was successfully submited.
    if (!$formState.length) {
      return
    }

    // show success message
    $("#ResetSuccess").removeClass("hide")
  }
})()

/**
 * Global functions
 * ------------------------------------------------------------------------------
 * Functions that should execute everywhere
 *
 */

/**
 * If the element has ariaToggle then toggle the expanded class for whatever ID is set in aria-controls
 */
theme.ariaToggle = function () {
  $("body").on("click", ".ariaToggle", function (event) {
    var $currentTarget = $(event.currentTarget)
    $currentTarget.attr(
      "aria-expanded",
      $currentTarget.attr("aria-expanded") == "false" ? "true" : "false"
    )
    var toggleID = $currentTarget.attr("aria-controls")
    $("#" + toggleID).toggleClass("expanded")
  })

  $(".header--desktop .main-menu > li > a.nav-link")
    .focus(function () {
      $(this).parent("li").addClass("active").siblings().removeClass("active")
    })
    .blur(function () {
      $(this).parent("li").siblings().removeClass("active")
    })
    .last()
    .blur(function () {
      $(this).parent("li").removeClass("active")
    })

  $(".header--desktop .main-menu > li > a.nav-link").hover(function () {
    $(this).parent("li").siblings().removeClass("active")
  })
}

/**
 * Hide desktop menu if overflow menu item and show mobile menu
 */
$(() => {
  const el = document.querySelector(".header--desktop .nav.nav-new ")

  if (!el) return

  const isOverflowing = el.clientWidth < el.scrollWidth

  if (isOverflowing) {
    document.querySelector(".header--desktop").style.cssText =
      "display: none!important;"
    document.querySelector(".header--touch").style.cssText =
      "display: block!important;"
  }
})

/**
 * Focus search input on first click, enable button once element is focused
 */
theme.mobileNav = function () {
  $(".searchInput").focusin(function () {
    $(".searchSubmit").addClass("clickable")
  })
}

theme.smoothScroll = function () {
  $('a[href*="#"]:not([href="#"]):not([data-toggle*="collapse"])').click(
    function (event) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") ||
        location.hostname == this.hostname
      ) {
        var target = $(this.hash)
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]")
        if (target.length) {
          event.preventDefault()
          $("html,body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000
          )
        }
      }
    }
  )
}

theme.transparentHeader = function () {
  var $headerSection = $(".header__section")
  var $underlay = $("#MainContent > .shopify-section:first-child")
  var $underlayChild = $underlay.children().first()
  if ($headerSection.hasClass("header--transparent")) {
    if ($underlay.hasClass("borderless")) {
      $underlay.find(".hero__content").css("margin-top", function () {
        return $headerSection.outerHeight() + 15
      })
    } else if (
      $underlayChild.hasClass("index--white") ||
      $underlayChild.hasClass("index--gray")
    ) {
      $underlayChild.css("padding-top", function () {
        return $headerSection.outerHeight() + 30
      })
    }
  } else {
    if ($underlay.hasClass("borderless")) {
      $underlay.find(".hero__content").css("margin-top", function () {
        return 60
      })
    }
  }
}

theme.lazyImage = function () {
  document.addEventListener("lazyloaded", function (e) {
    $(e.target).parent(".lazy-image").css("background-image", "none")
  })
}

theme.searchPopup = function () {
  $(".search-popup-js").on("click", function (event) {
    event.preventDefault()
    var $currentTarget = $(event.currentTarget)
    var $toggle = $($currentTarget.attr("data-show"))
    if ($toggle.is(":visible")) {
      $toggle.fadeOut("fast")
      $currentTarget.toggleClass("search--open")
    } else {
      $toggle.fadeIn("fast")
      $currentTarget.toggleClass("search--open")
      $("#HeaderSearch").focus()
    }
  })
}

theme.floatLabels = function () {
  $(function () {
    $("input, textarea")
      .on("checkval", function () {
        var label = $(this).prev("label")
        if (this.value !== "") {
          label.addClass("label--float ")
        } else {
          label.removeClass("label--float ")
        }
      })
      .on("keyup", function () {
        $(this).trigger("checkval")
      })
    $("input, textarea").val(function (index, value) {
      if (value.length) {
        var label = $(this).prev("label")
        label.addClass("label--float ")
      }
      return value
    })
  })
}

theme.toggleFilters = function () {
  var $toggleFilterBtn = $("#toggleFilters")
  var $collectionFilters = $("#collectionFilters")
  if ($collectionFilters.length) {
    $toggleFilterBtn.on("click", function () {
      $toggleFilterBtn.toggleClass("is-active")
      $collectionFilters.slideToggle(200)
    })
  }
  var mediaQuerySmall = "screen and (max-width: 990px)"
  enquire.register(mediaQuerySmall, {
    match: function () {
      $collectionFilters.hide()
    },
    unmatch: function () {
      $collectionFilters.show()
    },
  })
}

theme.quantitySelectors = function () {
  // Setup listeners to add/subtract from the input
  $(".js-qty__adjust").on("click", function () {
    var el = $(this),
      qtySelector = el.siblings(".js-qty__num"),
      qty = parseInt(qtySelector.val().replace(/\D/g, ""))

    qtySelector.focus()

    // Make sure we have a valid integer
    if (parseFloat(qty) == parseInt(qty) && !isNaN(qty)) {
      // We have a number!
    } else {
      // Not a number. Default to 1.
      qty = 1
    }
    // Add or subtract from the current quantity
    if (el.hasClass("js-qty__adjust--plus")) {
      qty = qty + 1
    } else {
      qty = qty - 1
      const minValueFromAttr = Number(qtySelector.attr("min"))
      const minValue = Number.isNaN(minValueFromAttr) ? 1 : minValueFromAttr
      if (qty <= minValue) {
        qty = minValue
      }
    }
    // Update the input's number
    qtySelector.val(qty).trigger("change")

    $("[data-update]").addClass("cart--dirty")
    $("[data-update]").addClass("heartBeat")
    setTimeout(function () {
      $("[data-update]").removeClass("heartBeat")
    }, 1300)
  })
}

theme.moveTags = function () {
  $(".index--white:not(.wide-image)").parent().addClass("adjust--white")
  $(".index--gray:not(.wide-image)").parent().addClass("adjust--gray")
}

theme.mfpInit = function () {
  if ($(".mfp").length) {
    $(".mfp").magnificPopup({
      type: "inline",
      alignTop: true,
      fixedContentPos: true,
    })
    $("[data-zoomable]").magnificPopup({
      type: "image",
      mainClass: "mfp-fade",
      closeOnBgClick: true,
      closeBtnInside: false,
      closeOnContentClick: true,
      tLoading: "",
      removalDelay: 200,
    })
  }
}

theme.init = function () {
  theme.floatLabels()
  theme.smoothScroll()
  theme.toggleFilters()
  theme.transparentHeader()
  theme.quantitySelectors()
  theme.ariaToggle()
  theme.searchPopup()
  theme.mobileNav()
  theme.lazyImage()
  theme.moveTags()
  theme.mfpInit()
}

$(theme.init)

$(window).resize(function () {
  clearTimeout(window.debouncedResize)
  window.debouncedResize = setTimeout(function () {
    theme.transparentHeader()
  }, 250)
})

/**
 * Dot animations
 * ------------------------------------------------------------------------------
 *
 */

window.dots = window.dots || {}

dots.down = function () {
  var dotsDown = anime.timeline({
    loop: true,
    easing: "easeInBack",
    elasticity: function (el, i, l) {
      return 200 + i * 200
    },
  })
  dotsDown
    .add({
      targets: ".dots--down .row-1",
      scale: [
        { value: 1, duration: 4000 },
        { value: 1, duration: 10 },
        { value: 2, duration: 950 },
        { value: 1.5, duration: 250 },
        { value: 1, duration: 100 },
      ],
    })
    .add({
      targets: ".dots--down .row-2",
      scale: [
        { value: 1, duration: 4000 },
        { value: 1, duration: 10 },
        { value: 2, duration: 950 },
        { value: 1.5, duration: 250 },
        { value: 1, duration: 100 },
      ],
      offset: 100,
    })
    .add({
      targets: ".dots--down .row-3",
      scale: [
        { value: 1, duration: 4000 },
        { value: 1, duration: 10 },
        { value: 2, duration: 950 },
        { value: 1.5, duration: 250 },
        { value: 1, duration: 100 },
      ],
      offset: 200,
    })
    .add({
      targets: ".dots--down .row-4",
      scale: [
        { value: 1, duration: 4000 },
        { value: 1, duration: 10 },
        { value: 2, duration: 950 },
        { value: 1.5, duration: 250 },
        { value: 1, duration: 100 },
      ],
      offset: 300,
    })
}

dots.right = function () {
  var dotsDown = anime.timeline({
    loop: true,
    easing: "easeInBack",
    elasticity: function (el, i, l) {
      return 200 + i * 200
    },
  })
  dotsDown
    .add({
      targets: ".dots--right .column-1",
      scale: [
        { value: 1, duration: 4000 },
        { value: 1, duration: 10 },
        { value: 2, duration: 950 },
        { value: 1.5, duration: 250 },
        { value: 1, duration: 100 },
      ],
    })
    .add({
      targets: ".dots--right .column-2",
      scale: [
        { value: 1, duration: 4000 },
        { value: 1, duration: 10 },
        { value: 2, duration: 950 },
        { value: 1.5, duration: 250 },
        { value: 1, duration: 100 },
      ],
      offset: 50,
    })
    .add({
      targets: ".dots--right .column-3",
      scale: [
        { value: 1, duration: 4000 },
        { value: 1, duration: 10 },
        { value: 2, duration: 950 },
        { value: 1.5, duration: 250 },
        { value: 1, duration: 100 },
      ],
      offset: 100,
    })
    .add({
      targets: ".dots--right .column-4",
      scale: [
        { value: 1, duration: 4000 },
        { value: 1, duration: 10 },
        { value: 2, duration: 950 },
        { value: 1.5, duration: 250 },
        { value: 1, duration: 100 },
      ],
      offset: 150,
    })
    .add({
      targets: ".dots--right .column-5",
      scale: [
        { value: 1, duration: 4000 },
        { value: 1, duration: 10 },
        { value: 2, duration: 950 },
        { value: 1.5, duration: 250 },
        { value: 1, duration: 100 },
      ],
      offset: 200,
    })
    .add({
      targets: ".dots--right .column-6",
      scale: [
        { value: 1, duration: 4000 },
        { value: 1, duration: 10 },
        { value: 2, duration: 950 },
        { value: 1.5, duration: 250 },
        { value: 1, duration: 100 },
      ],
      offset: 250,
    })
    .add({
      targets: ".dots--right .column-7",
      scale: [
        { value: 1, duration: 4000 },
        { value: 1, duration: 10 },
        { value: 2, duration: 950 },
        { value: 1.5, duration: 250 },
        { value: 1, duration: 100 },
      ],
      offset: 300,
    })
    .add({
      targets: ".dots--right .column-8",
      scale: [
        { value: 1, duration: 4000 },
        { value: 1, duration: 10 },
        { value: 2, duration: 950 },
        { value: 1.5, duration: 250 },
        { value: 1, duration: 100 },
      ],
      offset: 350,
    })
    .add({
      targets: ".dots--right .column-9",
      scale: [
        { value: 1, duration: 4000 },
        { value: 1, duration: 10 },
        { value: 2, duration: 950 },
        { value: 1.5, duration: 250 },
        { value: 1, duration: 100 },
      ],
      offset: 400,
    })
}

dots.init = function () {
  dots.down()
  dots.right()
}

if ($("body").hasClass("decoration-modern")) {
  $(dots.init)
}

$(document).on("shopify:section:load", theme.moveTags)

$(document).ready(function () {
  var sections = new slate.Sections()
  sections.register("product", theme.Product)
  sections.register("related", theme.Related)
  sections.register("collection", theme.Parallax)
  sections.register("banner", theme.Parallax)
  sections.register("index-collection", theme.IndexCollection)
  sections.register("index-collection-grid", theme.IndexGridCollection)
  sections.register("collection", theme.Collection)
  sections.register("index-map", theme.Map)
  sections.register("index-timeline", theme.IndexTimeline)
  sections.register("video", theme.Video)
  sections.register("slideshow", theme.Slideshow)
  sections.register("team", theme.Team)
  sections.register("accordion", theme.Accordion)
  sections.register("reviews", theme.Reviews)

  // Common a11y fixes
  slate.a11y.pageLinkFocus($(window.location.hash))

  $(".in-page-link").on("click", function (evt) {
    slate.a11y.pageLinkFocus($(evt.currentTarget.hash))
  })

  // Target tables to make them scrollable
  var tableSelectors = ".rte table"

  slate.rte.wrapTable({
    $tables: $(tableSelectors),
    tableWrapperClass: "rte__table-wrapper",
  })

  // Target iframes to make them responsive
  var iframeSelectors =
    '.rte iframe[src*="youtube.com/embed"],' +
    '.rte iframe[src*="player.vimeo"]'

  slate.rte.wrapIframe({
    $iframes: $(iframeSelectors),
    iframeWrapperClass: "rte__video-wrapper",
  })

  // Apply a specific class to the html element for browser support of cookies.
  if (slate.cart.cookiesEnabled()) {
    document.documentElement.className =
      document.documentElement.className.replace(
        "supports-no-cookies",
        "supports-cookies"
      )
  }

  if (window.AOS) {
    AOS.init({ once: true })
  }

  // Detect keyboard interaction
  $(document)
    .on("mousedown", function (event) {
      $("body").removeClass("focus-enabled")
    })
    .keyup(function (event) {
      // on TAB key press
      if (event.keyCode === 9) {
        $("body").addClass("focus-enabled")
      }
    })

  $(document).one("touchstart", function () {
    theme.TouchDetect.setTouch()
  })
})

// Because added JS Code to Website
function getCookie(name) {
  return (document.cookie.match("(^|; )" + name + "=([^;]*)") || 0)[2]
}

function setCookie(key, value, path = "/") {
  const expires = new Date()
  expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000)
  document.cookie = `${key}=${value}; path=${path}; expires=${expires.toUTCString()}`
}

function eraseCookie(name, domain = null) {
  document.cookie = `${name}=; Max-Age=-99999999; ${
    domain ? `domain=${domain}` : ""
  }`
}

function getUrlParameter(desired_param) {
  var url = window.location.search.substring(1)
  var url_params = url.split("&")
  for (var i = 0; i < url_params.length; i++) {
    var param_name = url_params[i].split("=")
    if (param_name[0] == desired_param) {
      return param_name[1]
    }
  }
}

function getUrlParams(search) {
  const hashes = search.slice(search.indexOf("?") + 1).split("&")
  const params = {}
  hashes.map((hash) => {
    const [key, val] = hash.split("=")
    params[key] = decodeURIComponent(val)
  })
  return params
}

const PERSIST_PARAMS = [
  "utm_medium",
  "utm_source",
  "utm_term",
  "utm_content",
  "utm_campaign",
  "did",
  "discount",
  "coupon_code",
]

window.getCookie = getCookie
window.setCookie = setCookie
window.eraseCookie = eraseCookie
window.getUrlParameter = getUrlParameter
window.getUrlParams = getUrlParams
window.PERSIST_PARAMS = PERSIST_PARAMS

$(() => {
  ;(function () {
    const params = new URLSearchParams(location.search)
    const utms = {}
    params.forEach(function (value, key) {
      if (key.indexOf("utm_") === 0) {
        utms[key] = value
      }
    })
    if (Object.keys(utms).length > 0) {
      document.cookie = `utm_params=${JSON.stringify(
        utms
      )}; path=/; domain=.becausemarket.com`
    }
  })()
  if (getCookie("clearshopifycart") == "true") {
    clearCart((done) => {
      eraseCookie("clearshopifycart", ".becausemarket.com")
    }, handleError)
    PERSIST_PARAMS.forEach((param) => eraseCookie(param))
  }
  PERSIST_PARAMS.forEach((param) => {
    const paramValue = getUrlParameter(param)
    const paramCookieValue = getCookie(param)
    if (
      paramValue &&
      paramValue !== "undefined" &&
      (!paramCookieValue ||
        paramCookieValue === "undefined" ||
        paramCookieValue !== paramValue)
    ) {
      setCookie(param, paramValue)
      if (param === "discount") {
        validateDiscounts()
      }
    }
  })
})

const clearCart = (success, error) => {
  $.ajax({
    url: "/cart/clear.js",
    type: "post",
    contentType: "application/json",
    dataType: "json",
    success: success,
    error: error,
  })
}

const handleError = (error) => {
  if (typeof error.description != "undefined") {
    alert(error.description)
  } else {
    console.error(error)
  }
}

function get_funnel_url() {
  const urlParams = getUrlParams(window.location.search)
  const defaultParams = {
    utm_campaign: "because_home_page",
    utm_medium: "get_started",
    utm_source: "get_website",
  }

  const params = {
    ...urlParams,
    ...defaultParams,
  }

  const FUNNEL_ENDPOINT =
    "https://try.becausemarket.com/api/v1/split/home?" + jQuery.param(params)

  return FUNNEL_ENDPOINT
}

window.get_funnel_url = get_funnel_url

const debug = (msg) => {
  if (DEBUG) {
    console.log(msg)
  }
}

document.documentElement.className = document.documentElement.className.replace(
  "no-js",
  "js"
)

// Mixpanel
;(function (c, a) {
  if (!a.__SV) {
    var b = window
    try {
      var d,
        m,
        j,
        k = b.location,
        f = k.hash
      d = function (a, b) {
        return (m = a.match(RegExp(b + "=([^&]*)"))) ? m[1] : null
      }
      f &&
        d(f, "state") &&
        ((j = JSON.parse(decodeURIComponent(d(f, "state")))),
        "mpeditor" === j.action &&
          (b.sessionStorage.setItem("_mpcehash", f),
          history.replaceState(
            j.desiredHash || "",
            c.title,
            k.pathname + k.search
          )))
    } catch (n) {}
    var l, h
    window.mixpanel = a
    a._i = []
    a.init = function (b, d, g) {
      function c(b, i) {
        var a = i.split(".")
        2 == a.length && ((b = b[a[0]]), (i = a[1]))
        b[i] = function () {
          b.push([i].concat(Array.prototype.slice.call(arguments, 0)))
        }
      }
      var e = a
      "undefined" !== typeof g ? (e = a[g] = []) : (g = "mixpanel")
      e.people = e.people || []
      e.toString = function (b) {
        var a = "mixpanel"
        "mixpanel" !== g && (a += "." + g)
        b || (a += " (stub)")
        return a
      }
      e.people.toString = function () {
        return e.toString(1) + ".people (stub)"
      }
      l =
        "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(
          " "
        )
      for (h = 0; h < l.length; h++) c(e, l[h])
      var f = "set set_once union unset remove delete".split(" ")
      e.get_group = function () {
        function a(c) {
          b[c] = function () {
            call2_args = arguments
            call2 = [c].concat(Array.prototype.slice.call(call2_args, 0))
            e.push([d, call2])
          }
        }
        for (
          var b = {},
            d = ["get_group"].concat(Array.prototype.slice.call(arguments, 0)),
            c = 0;
          c < f.length;
          c++
        )
          a(f[c])
        return b
      }
      a._i.push([b, d, g])
    }
    a.__SV = 1.2
    b = c.createElement("script")
    b.type = "text/javascript"
    b.async = !0
    b.src =
      "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL
        ? MIXPANEL_CUSTOM_LIB_URL
        : "file:" === c.location.protocol &&
          "//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)
        ? "https://cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js"
        : "//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js"
    d = c.getElementsByTagName("script")[0]
    d.parentNode.insertBefore(b, d)
  }
})(document, window.mixpanel || [])

const did = getUrlParameter("did")

const loadMixpanelAttempts = 0
const MAX_ATTEMPTS = 10

const clickedElementMixpanelPropertyBuilder = (clickedElement) => ({
  referrer: document.referrer,
  clickedNavLink: clickedElement.innerText.trim(),
})
function initMixpanel() {
  if (loadMixpanelAttempts >= MAX_ATTEMPTS) {
    console.error(
      `failed to load mixpanel, after ${MAX_ATTEMPTS} attempts, giving up!`
    )
    return
  }

  if (!mixpanel || !mixpanel.init) {
    loadMixpanelAttempt += 1
    setTimeout(initMixpanel, 100)
  }

  mixpanel.init(process.env.MIXPANEL_TOKEN)
  if (did) {
    mixpanel.identify(did)
  }

  trackLinksRegisterLinkText("a.nav-link", "BM NavLink Clicked")
  trackLinksRegisterLinkText(".hero__button__wrapper a", "BM Button Clicked")
}

initMixpanel()

function canTrackEvent(eventName) {
  const ALLOW_MIXPANEL_DOMAINS = (
    process.env.MIXPANEL_ALLOW_DOMAINS || ""
  ).split(",")
  if (!mixpanel) {
    console.error("failed to track Event, mixpanel does not exist on page!")
  }
  const enable = ALLOW_MIXPANEL_DOMAINS.indexOf(document.location.host) !== -1
  if (!enable) {
    const eventStr = eventName ? `You tried to fire "${eventName}". M` : "m"
    console.log(
      `${eventStr}ixpanel tracking is disabled for ${document.location.host}`
    )
  }
  return enable
}

function trackEvent(eventName, eventProperties, options, callback) {
  const defaultTrackLogging = () => console.log(`${eventName} tracked`)
  if (canTrackEvent(eventName)) {
    return mixpanel.track(
      eventName,
      eventProperties || {},
      options,
      callback || defaultTrackLogging
    )
  }
}

function trackLinks(querySelector, eventName, callbackOrProperties) {
  if (canTrackEvent()) {
    return mixpanel.track_links(querySelector, eventName, callbackOrProperties)
  }
}

function trackLinksRegisterLinkText(querySelector, eventName) {
  return trackLinks(
    querySelector,
    eventName,
    clickedElementMixpanelPropertyBuilder
  )
}

function trackForm(querySelector, eventName, options) {
  if (canTrackEvent()) {
    return mixpanel.track_form(querySelector, eventName, options)
  }
}

window.trackEvent = trackEvent
window.trackLinks = trackLinks
window.trackLinksRegisterLinkText = trackLinksRegisterLinkText
window.trackForm = trackForm

// Yotpo
;(function e() {
  var e = document.createElement("script")
  ;(e.type = "text/javascript"),
    (e.async = true),
    (e.src = `//staticw2.yotpo.com/${process.env.YOTPO_TOKEN}/widget.js`)
  var t = document.getElementsByTagName("script")[0]
  t.parentNode.insertBefore(e, t)
})()

window.addMouseFlow = addMouseFlow

const createUuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
window.createUuid = createUuid

const debounce = (func, wait) => {
  let timeout

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// This setting should be set in Chatra admin,
// but can be also be controlled with the api:
// (see https://chatra.com/help/api/#disabledonmobile )
// window.ChatraSetup = {
//     disabledOnMobile: true
// };

$(document).ready(function () {
  const userDataStr = getCookie("userData") || ""
  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr)
      if (userData && userData.fullName) {
        const linkToReplace = $(".js-header-username")
        const replaceStr = `Hi, ${userData.fullName}`
        linkToReplace.text(replaceStr).attr("href", "/profile")
      }
    } catch (e) {}
  }
})
