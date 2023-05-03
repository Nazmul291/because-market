import { createHash } from "node:crypto"
import { execSync } from "node:child_process"
import { createRequire } from "node:module"
import dotenv from "dotenv"
import svelte from "rollup-plugin-svelte"
import babel from "@rollup/plugin-babel" // eslint-disable-line import/no-named-as-default
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import image from "@rollup/plugin-image"
import json from "@rollup/plugin-json"
import terser from "@rollup/plugin-terser"
import linaria from "@linaria/rollup"
import css from "rollup-plugin-css-only"
import cssModulesSvelte from "svelte-preprocess-cssmodules"
import graphql from "@rollup/plugin-graphql"
import copy from "rollup-plugin-copy"
import imageExport from "./rollup-plugins/rollup-plugin-export-image.js"
const createdRequire = createRequire(import.meta.url)
const pkg = createdRequire("./package.json")

dotenv.config()

const production = !process.env.ROLLUP_WATCH
const interactive = Boolean(process.env.ROLLUP_INTERACTIVE)
const isServe = !production && !interactive
const isTerser = production && !interactive

const SVELTE_IGNORE_WARN = new Set(["a11y-click-events-have-key-events"])

const commitHash = execSync("git rev-parse --short HEAD")?.toString()?.trim()
const userName = execSync("id -un")?.toString()?.trim()
const userHex = createHash("sha256")
  .update(userName)
  .digest("hex")
  .substring(0, 7)
const banner =
  production && !interactive
    ? `/*! (${userHex}) version: ${pkg.version}; commit: ${commitHash} */`
    : undefined

const replaceValue = {
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  "process.env.FREE_SHIPPING_AMOUNT": JSON.stringify(
    process.env.FREE_SHIPPING_AMOUNT
  ),
  "process.env.STORE_DOMAIN": JSON.stringify(process.env.STORE_DOMAIN),
  "process.env.STOREFRONT_TOKEN": JSON.stringify(process.env.STOREFRONT_TOKEN),
  "process.env.RECURLY_KEY": JSON.stringify(process.env.RECURLY_KEY),
  "process.env.PERCHE_API_URL": JSON.stringify(process.env.PERCHE_API_URL),
  "process.env.FUNNEL_QUIZ_URL": JSON.stringify(process.env.FUNNEL_QUIZ_URL),
  "process.env.SMARTYSTREETS_PUBLIC_KEY": JSON.stringify(
    process.env.SMARTYSTREETS_PUBLIC_KEY
  ),
  "process.env.MIXPANEL_TOKEN": JSON.stringify(process.env.MIXPANEL_TOKEN),
  "process.env.MIXPANEL_ALLOW_DOMAINS": JSON.stringify(
    process.env.MIXPANEL_ALLOW_DOMAINS
  ),
  "process.env.YOTPO_TOKEN": JSON.stringify(process.env.YOTPO_TOKEN),
  "process.env.MOUSEFLOW_TOKEN": JSON.stringify(process.env.MOUSEFLOW_TOKEN),
  "process.env.GLADLY_API_URL": JSON.stringify(process.env.GLADLY_API_URL),
  "process.env.GLADLY_ORIGINAL_ID": JSON.stringify(
    process.env.GLADLY_ORIGINAL_ID
  ),
  "process.env.GLADLY_BRAND_ID": JSON.stringify(process.env.GLADLY_BRAND_ID),
  "process.env.GLADLY_CDN_URL": JSON.stringify(process.env.GLADLY_CDN_URL),
}

function serve() {
  return {
    writeBundle() {},
  }
}

const getBundleFor = (name, indexFile) => ({
  input: indexFile,
  output: {
    sourcemap: true,
    format: "iife",
    name: name,
    entryFileNames: `${name}.bundle.js`,
    assetFileNames: "[name].bundle[extname]",
    // file: `${name}.bundle.js`,
    dir: "assets",
    banner,
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: replaceValue,
    }),
    json(),
    graphql(),
    image(),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: `${name}.bundle.css` }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    isServe && serve(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    isTerser && terser(),
  ],
  watch: {
    clearScreen: false,
  },
})

const getSvelteBundleFor = (name, indexFile, compilerOptions = {}) => ({
  input: indexFile,
  output: {
    sourcemap: true,
    format: "iife",
    name: name,
    entryFileNames: `${name}.bundle.js`,
    assetFileNames: "[name].bundle[extname]",
    //  file: `${name}.bundle.js`,
    dir: "assets",
    banner,
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: replaceValue,
    }),
    json(),
    graphql(),
    svelte({
      preprocess: [cssModulesSvelte()],
      compilerOptions: {
        ...compilerOptions,
        // enable run-time checks when not in production
        dev: interactive || !production,
      },
      onwarn: (warning, handler) => {
        if (SVELTE_IGNORE_WARN.has(warning?.code)) {
          return
        }
        handler(warning)
      },
    }),
    image(),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: `${name}.bundle.css` }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    isServe && serve(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    isTerser && terser(),
  ],
  watch: {
    clearScreen: false,
  },
})

const getReactBundleFor = (name, indexFile) => ({
  external: ["react", "react-dom"],
  input: indexFile,
  output: {
    sourcemap: true,
    format: "iife",
    name: name,
    entryFileNames: `${name}.bundle.js`,
    assetFileNames: "[name].bundle[extname]",
    //  file: `${name}.bundle.js`,
    dir: "assets",
    banner,
    globals: {
      // eslint-disable-next-line quote-props
      react: "React",
      "react-dom": "ReactDOM",
    },
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: replaceValue,
    }),
    json(),
    resolve({
      browser: true,
      extensions: [".js", ".json", ".jsx", ".mjs"],
    }),
    graphql(),
    imageExport({ globalVar: `IMAGES_${name.toUpperCase()}` }),
    linaria({
      sourceMap: process.env.NODE_ENV !== "production",
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: `${name}.bundle.css` }),
    commonjs(),
    babel({
      babelrc: true,
      babelHelpers: "bundled",
    }),

    copy({
      targets: [
        {
          src: `node_modules/react/umd/react.${
            isTerser ? "production.min" : "development"
          }.js`,
          dest: "assets",
          rename: "react.bundle.js",
        },
        {
          src: `node_modules/react-dom/umd/react-dom.${
            isTerser ? "production.min" : "development"
          }.js`,
          dest: "assets",
          rename: "react-dom.bundle.js",
        },
      ],
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    isServe && serve(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    isTerser && terser(),
  ],
  watch: {
    clearScreen: false,
  },
})

export default [
  // just compile js
  getBundleFor("productFaq", "src/product-faq/index.js"),
  getBundleFor("theme", "src/theme/index.js"),
  getBundleFor(
    "pagePartnerCreateCheckout",
    "src/page-partner-create-checkout/index.js"
  ),
  // svelte app
  getSvelteBundleFor("cart", "src/cart/index.js"),
  getSvelteBundleFor("product", "src/product/index.js"),
  getSvelteBundleFor("productSlideShow", "src/product-slideshow/index.js"),
  // react app
  getReactBundleFor("pageCheckout", "src/page-checkout-react/index.jsx"),
  getReactBundleFor(
    "pageCheckoutSuccess",
    "src/page-checkout-success-react/index.jsx"
  ),
  getReactBundleFor("pageAccount", "src/page-account-react/index.jsx"),
  getReactBundleFor("pageLogin", "src/page-login/index.jsx"),
  getReactBundleFor("productFunnelReact", "src/product-funnel/index.jsx"),
]
