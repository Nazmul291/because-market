## [2.10.0] - now

- [PER-1103], [PER-1104] - addition widget on product page and on collections page
- [PER-1036] - Order Summary UI updates
- [PER-1144] Add postpone `code` params. Use `postpone` api
- Deny robots from config
- [PER-1112] Fixed `CrossSellProductModal` for mobile
- [PER-1149] Fixed font family on funnel pdp absorbency switcher
- [PER-1153] Fixed account sign in styles
- [PER-1103] Addition pdp bottom widget
- [PER-1144] Implement ability to postpone an order by following an email link
- [PER-1055] Fixed images
- [PER-1111] Fix buttons
- [PER-1115] Fixed mobile checkout header
- [PER-1128] Delivery frequency for cross-sell modal on checkout success
- [PER-1115] Fixed mobile checkout header
- [PER-1133] Thank You page text changed
- [PER-1136] Bimonthly subscription type changed to 2month
- [PER-1130] Insufficient spacing between reviews fixed

## [2.9.1] - 20.04.2023

- Fixed funnel PDP absorbency buttons size for mobile
- [PER-1107] Fix PayPal image size
- [PER-874] Fix typo

## [2.9.0] - 19.04.2023

- Fix funnel pdp when change product
- Changed "Select Size" to "Size"
- [PER-1129] PDP added custom mobile styles
- [PER-1107] Mobile Trial Checkout UI issues
- [PER-1105] Customize user feedback by product tags
- [PER-1036] Changed UI for Order Summary
- [PER-1055] Changed pdp image size
- [PER-874] Skip Trial: Support Skip Trial pop up on mobile
- [PER-1110] Fixed mobile images
- [PER-1069] Changed font on PDP
- [PER-1114] Thank you page's texts updates
- [PER-1072] Fix pdp mobile layout
- [PER-1106] Changed pdp icon
- [PER-1101] Rename fb event and edit request data
- [PER-753] Order absorbency variants
- [PER-753] Support absorbency variants
- [PER-1091] Customize header for checkout and checkout success
- Fixed image size
- Update dependencies
- [PER-1101] Send capi purchase to segment
- [PER-1065] Fixed how it works trial titles
- [PER-1055] Fixed css for pdp slider image
- Dropping images from react bundles to assets folder. Reduces react bundles size.

## [2.8.1] - 11.04.2023

- [PER-1108] Fix mobile trial layout logo image

## [2.8.0] - 10.04.2023

- Fix mixpanel call
- [PER-873] - mobile version of funnel thank you page
- [PER-1083] - fix mobile pdp slider
- [PER-1069] - resize options buttons on PDP
- [PER-1011] Rounding price amount to up in trial checkout next monthly plan
- [PER-1101] - Set up FB capi frontend
- `ReactDOM` moved out of bundles
- `PageCheckout` reduce bundle size from: `228KB` to `142KB` gzipped
- [PER-792] Applying an invalid promo code causes page to collapse
- [PER-1096] Fix free shipping price on checkout
- [PER-1011] Calc handling fee for full pack in trial checkout success page
- React moved out of bundles
- [PER-1009] - Chat now btn moved up
- Add build to test workflows
- Fix `(plugin linaria) EvalError: Element is not defined in` on build
- Fix error on account page
- [Product slider] added adaptive width
- [PER-1074] - Product funnel. fixed styles
- Fix checkout and checkout-success
- Add circle config for test source. Remove husky hooks.
- Change eslint rule `react/no-unescaped-entities`
- [PER-1066] - change trial to starter text
- Update dependencies
- [PER-1004] - fix style
- [PER-1043] - cross-sell css updates
- [PER-1064] Thank you page fixed text about 250000 customers
- [PER-961] Mobile skip trial checkout
- [PER-1073] added useTouchEvent to scroll sliders on mobiles
- [Checkout funnel] hide lady and added footer
- [PDP] throw "quantity" query param
- [PER-1015] Thank You Page -> Typo and hardcoded price and date in FAQ
- [PER-873] - mobile version of funnel thank you page
- caniuse-lite actualized & .gitignore improved

## [2.7.10] - 05.04.2023

- [PER-1093] Entering phone number during checkout causes shipping fee amount to disappear

## [2.7.9] - 03.04.2023

- [PER-1058] Remove the text below Today's Total for the trial Checkout

## [2.7.8] - 29.03.2023

- Fixed thank you page texts

## [2.7.7] - 28.03.2023

- [PER-1054] Fixed provide selected `variantId` from funnel pdp

## [2.7.6] - 28.03.2023

- [PER-1029] Product option `Size` and `Select Size` are equal
- Fixed `Get FREE starter pack` button

## [2.7.5] - 28.03.2023

- [PER-1029] Fix funnel pdp size description

## [2.7.4] - 27.03.2023

- Hotfix text (white space) for thank you page

## [2.7.3] - 27.03.2023

- Hotfix [PER-1039] Fix product funnel form height
- Hotfix [PER-1030] - price to amount on checkout page

## [2.7.2] - 24.03.2023

- Hotfix [PER-1035] PDP -> Price per piece UI enhancements
- Hotfix [PER-1040] PDP -> The scroll should be only when there are too many pictures to display

## [2.7.1] - 23.03.2023

- [PER-1027] Fix account pdp
- Select options and variant from query on PDP funnel page
- [PER-1020] [Portal] Fixed Cannot add cross-sell product
- [Funnel PDP] - used meta yotpo id by default
- [PER-1008] PDP -> Size is null additional fix
- [PER-962] Fix discount duplicated

## [2.7.0] - 23.03.2023

- Thank you page - fix monthly subscription
- [PER-1018] - fixed columns width
- [PER-1023] - fix texts fo pdp
- [PER-1002] PDP -> Remove the scrollbar from the product picture gallery
- refactoring: SubscriptionDetails reorganized & some linter warnings eliminated
- Fix Trial next monthly plan for Full Pack
- [PDP] fixed npe
- [Checkout] hide header action button
- [Checkout success] updated modal header styles
- Fix Trial order summary
- Fix Trial Cross Sell
- Fix Newer spam disclaim to checkout
- [PER-1011] Fix next plan price
- [PER-861] thank you page and FAQ for trial
- [PER-1010] PDP -> Incorrect line break
- [PER-1008] PDP -> Size is null
- [PER-1003] PDP -> Remove the color options
- Add disclaim for normal checkout. Fixes checkout tooltip style
- [PER-812] Added funnel footer
- [PER-962] change price on change options
- PropTypes added into ModalTrialCheckoutUpgrade
- [PER-1006] PDP -> Correct styles on regular/desktop
- [PER-812] Added funnel theme
- code cleanup: 'className' instead of 'class' for React components
- `eslint-plugin-import` added & `.eslintrc` improved a bit
- Add `eslint` and `husky` pre-commit script for lint code before commit to git
- [PER-965] Fix `SimpleTooltip` opacity
- Fixed crush funnel pdp
- Fixed import `../../integrations/tracker`
- [PER-969] Funnel checkout events
- [PER-812] Add googleoptimize
- [PER-965] Add checkout tooltip
- [PER-988] Funnel -> PDP -> FAQ duplicated /not correct
- [PER-776] PDP: Section separator intersects with review bars
- [PER-944] Additional changes for Find your fit section
- [PER-949] Fix shipping price text for trial checkout
- [PER-905] Minor-text-changes
- [PER-972] Fix skip trial product price
- [PER-715] Fix isTrialFlag and css for trial FAQ
- [PER-944] Find your fit section
- [PER-870] Pass utm params on redirect from funnel product page
- [PER-937] Show only more info without description
- [PER-963] There is no error message when phone number is not valid
- [PER-878] The cursor changes position after every new character input
- [PER-960] One Time Only Offer label is missing
- [PER-723] Post-purchase: support cross-sell products for trial funnels
- Fixed `rUI/Price` for negative amount
- [PER-782] Use new checkout api
- [PER-782] Checkout for trial product
- [PER-782] Checkout success for trial product
- Refactoring of `product-funnel`
- [PER-939] When sizes are changing then on the funnel PDP, then size text should change dynamically
- Add user hash to bundle banner (first 7 symbols from sha-256 of user name digest as hex)
- Add banner for bundle with version and commit hash
- Fixed PropType in 'Modal' which throwed an error when 'View Size Guide' on Funnel PDP was clicked
- [PER-943] Styles in the Funnel PDP page
- Fixed `rUI/Modal` for log content
- [PER-934] PDP -> fixed video mobile layout
- [PER-770] PDP -> Implement logic for icon display
- [PER-719] - fixed display: none for empty div for desktop
- Basic realization to only developing selected applications
- Upgrade package dependencies
- [PER-719] Add PortalSlider and mobile PDP page for funnel
- [PER-857] Hide "Select Pack Size" option if view=funnel
- [PER-883] Portal: Upgrade my monthly order doesn't work

## [2.6.2] - 28.02.2023

- Fixed collection items price for one time product

## [2.6.1] - 28.02.2023

- Fixed collection items price

## [2.6.0] - 28.02.2023

- Hotfix: reverted formatting of snippets (#502) [426eb311

## [2.5.1] - 22.02.2023

- Fixed account cross sell modal

## [2.5.0] - 21.02.2023

- Unuse `CrossSellProductModalAnnoyContainer`
- [PER-877] Restore Deleted ' - Because Market' reference in Multiple Page Titles
- [PER-884] Portal -> Pop-up "Are you sure" should close after user added item to the box
- Refactoring: some liquid code is cleaned up
- Remove storefront api url from environment variable
- [PER-837] Underwear Pricing As Displayed on 3 Collections Pages Needs Correction
- [PER-771] Portal -> Additional pop-up "Are you sure you don't want to add to your order?"
- [PER-844] Add new content to the bottom of 5 PDP Pages and Confirm content on Collections pages
- [PER-845] Add H1 Tags in the Head to three pages (Privacy, Unsubscribe, Terms and Conditions)

## [2.4.3] - 23.02.2023

- [PER-897] Add missing pdp events

## [2.4.2] - 15.02.2023

- Fixed attentive price

## [2.4.1] - 13.02.2023

- [PER-849] Fix weekly offers price without discount

## [2.4.0] - 9.02.2023

- [PER-836] SEO - Remove <noscript> tag from the Head Section on Multiple Pages
- [PER-835] Missing Content on Two Collection Pages in S2
- [PER-830] S2 Portal -> Account page is compressed and does not scroll well when window is minimized
- [PER-832] S2 Portal events on segment
- [PER-778] Portal -> Endless loader after user clicks Buy It Now
- [PER-712] Checkout trial notify
- [PER-763] Portal -> My Account -> Cross-sell pop-up after shipping date was change should not display the product from the box
- [PER-476] Collections -> Width of Collection description is small
- [PER-805] Remove Staging Names from Page Titles - SEO / Marketing
- [PER-823] Account -> Scrolling position is not reset upon tabs navigation
- [PER-632] Portal -> PDP -> Need to show "Price after discount" for weekly offers

## [2.3.7] - 7.02.2023

- Fixed yotpo product id for aggregate rating

## [2.3.6] - 31.01.2023

- [PER-795] Review (and Modify) Schema Missing from PDP Pages

## [2.3.5] - 30.01.2023

- [PER-833] Fill checkout address street line manual

## [2.3.4] - 25.01.2023

- Fixed Account menu position

## [2.3.3] - 24.01.2023

- [PER-817] Add mouseflow to account page

## [2.3.2] - 24.01.2023

- Fixed Account Edit PDP if no have price

## [2.3.1] - 24.01.2023

- Show current price on account pdp for next shipment item

## [2.3.0] - 24.01.2023

- [PER-822] Add Mixpanel tracker to account page
- [PER-800] Restore Missing H1 Tags on All Collections Pages
- [PER-256] Additional fix for: Remove multiple H1 tags
- [PER-806] Checkout -> Next box button should be grayed out for the active user with an empty cart
- [PER-769] Resize the Product Details section
- [PER-725] Checkout -> If user removed all items from the cart we need to gray out check-out button
- Fixed babelHelpers: 'bundled' option was used by default warning
- [PER-781] Portal -> Show product price on PDP page in Next Shipment
- [PER-762] Portal -> All Product sections should be sticky

## [2.2.3] - 18.01.2023

- [PER-788] - Remove unused attentive and add missing user

## [2.2.2] - 11.01.2023

- Fixed `WeeklyOffers`

## [2.2.1] - 10.01.2023

- Fixed `MyAccount` page `Subscription details` product variant

## [2.2.0] - 09.01.2023

- Fixed `fetchFilteredWeeklyOffers` method
- [ER-448] Added new field `Weekly Offer Begin Date` into `Metafields`. Filtered weekly offers depending of this field
- [PER-737] Add a user friendly error message for errors on Checkout when a phone number or email has been taken
- [PER-416] CTA is off center
- [PER-761] Portal -> My Account: Every word should be from the capital letter
- [PER-732] Typo "It's looks like you already have an account with us"
- [PER-430] Stage - Thank you description is off center
- Fixed `checkout` shipping price for trial
- Fixed `checkout success` page
- [PER-256] Remove multiple H1 tags
- [PER-727] Mobile -> Checkout: Add terms and conditions under list of products
- [PER-265] Funnel PDP to react

## [2.1.3] - 09.01.2023

- Add missing attentive user information

## [2.1.2] - 30.12.2022

- Fixed load cross sell collection on change date

## [2.1.1] - 29.12.2022

- Update graphql api version from `2021-10` to `2022-10-current`

## [2.1.0] - 16.12.2022

- Fixed cross sell for undefined product description
- Refactor use `DOMPurify` via component `RenderHtml`
- [PER-636] Show cross sell modal on change subscription date
- Update dependencies
- Fixed broken storybook
- [PER-411] Portal - Weekly Offers - Style the variant buttons more likely it is done in Store 1
- [PER-619] No subscriptions looks different from S1
- [PER-573] Increase spacing on title text
- [PER-654] Fixed prices reloaded if change SMS check mark
- [PER-265] Funnel PDP init
- Refactoring: no more default imports for hooks
- Fixed uncontrolled input
- [PER-539] Order history: show order status for mobile view
- [PER-676] Added more fields to GTM purchase dataLayer variables
- [PER-642] Portal: display a pop-up question after user removed item from the box
- [PER-635] Added Surveys functionality
- Removed SplashPopup unused component
- Added Segment Analytics support
- Added ModalWindow.stories

## [2.0.8] - 23.12.2022

- [PER-777] - Fixed create checkout with null attribute

## [2.0.7] - 16.12.2022

- Apply `cherry-pick` from Fix uncontrolled input (#374) (commit: 516d3d432d4048123ba5b2f0b7bd39820bc4bfc7)
- [PER-759] Fixed account edit

## [2.0.6] - 15.12.2022

- [PER-750] - Fixed post purchase cross-sell modals for website shouldn't say trial

## [2.0.5] - 14.12.2022

- [PER-742] Fixed utm for one time one-time purchase

## [2.0.4] - 13.12.2022

- [PER-684] Fixed total on account thanks popup
- [PER-706] Fixed product title in `OrderHistory`
- [PER-728] Fixed typo in `ModalAddToNext`. `Shipping` to `Shopping`
- [PER-672] Checkout show discount price

## [2.0.3] - 08.12.2022

- Fixed account address change
- Fixed input uncontrolled

## [2.0.2] - 06.12.2022

- [PER-726] Fixed cart with identical item

## [2.0.1] - 02.12.2022

- Fixed Portal collection image

## [2.0.0] - 01.12.2022

- First release
