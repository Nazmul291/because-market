Instructions to setup shopfiy theme development:

# Before start

0. Install theme-cli-kit https://shopify.dev/themes/tools/theme-kit/getting-started
1. Create `.env` file on project root with

```
SHOPIFY_THEME_CLI_PASS=<password>
SHOPIFY_THEME_ID=<theme id>
FREE_SHIPPING_AMOUNT=2500
STORE_DOMAIN=dev.store2.becausemarket.com
STOREFRONT_TOKEN=b1d1b23efcc850e4c524b6024e0f0cbb
RECURLY_KEY=ewr1-m2Vor2Iowlz36TjvuBF54J
PERCHE_API_URL=https://api.dev.perche.store2.becausemarket.com
FUNNEL_QUIZ_URL=https://funnel-frontend-master.perche.127team.com/quiz
SMARTYSTREETS_PUBLIC_KEY=128865450052477936
MIXPANEL_TOKEN=78ae381db4c6ffa8e1bbe275639cc1db
MIXPANEL_ALLOW_DOMAINS=perche-market-dev.myshopify.com
YOTPO_TOKEN=qtDmssHwWOnmJ4Rkr1A3kwYhVWX7Xw6dKZQ7J5n4
MOUSEFLOW_TOKEN=c494857b-c28b-43c3-8ab5-757b297b5a9a
GLADLY_API_URL=https://sandbox.gladly.qa
GLADLY_ORIGINAL_ID=UFZEvcKeRIegzhF9cQ8ScQ
GLADLY_BRAND_ID=vLMcdrJKQd29Alt3-O7QOQ
GLADLY_CDN_URL=https://cdn.gladly.qa
ATTENTIVE_PRIVATE_TOKEN=ZGdVRjk0RnprNkVJY2NKTTgyMWlJWlM4T2NuQ01PUTI3NjM3
ATTENTIVE_BASE_URL=https://api.attentivemobile.com/v1/subscriptions
ATTENTIVE_SIGNUPID=272968
```

# Develope

0. Run rollup for rebuild js code `npm run dev`
1. Run theme-kit for sync file for your theme `theme watch --themeid=<theme id> --store=becausemarket-dev.myshopify.com --password=<theme cli pass> --ignored-file=.shopifyignore`
2. Open browser with your theme `https://dev.store2.becausemarket.com/?preview_theme_id=<theme id>`

# Deploy

0. build `npm run build`
1. run `theme deploy --env=shop --allow-live --ignored-file=.shopifyignore`

# Upload config

`theme download config/settings_data.json config/settings_schema.json -t <theme id> -p <theme cli pass> -s becausemarket-dev.myshopify.com`
