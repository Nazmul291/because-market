import { css } from "@linaria/core"

export default css`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";

  --theme-color--dark: rgb(33, 37, 41);
  --theme-color--gray: #d3d3d3;
  --theme-color--gray2: #dadada;
  --theme-color--gray3: #495057;
  --theme-color--gray4: #6c757d;
  --theme-color--gray5: #747474;
  --theme-color--black: black;
  --theme-color--white: white;
  --theme-color--blue: #667799;

  --theme-button-primary--color: var(--theme-color--white);
  --theme-button-primary--background-color: #d3593c;
  --theme-button-primary--border-color: #a3452e;

  --theme-checkout-card--color: var(--theme-color--dark);
  --theme-checkout-card--background-color: var(--theme-color--white);
  --theme-checkout-card--border-color: var(--theme-color--gray2);

  --theme-checkout-items--shipping-color: var(--theme-color--gray5);
  --theme-checkout-items--border-color: var(--theme-color--gray);

  --theme-inputs--color: var(--theme-color--gray3);
  --theme-inputs--placeholder-color: var(--theme-color--gray4);

  // styled for react-tooltip
  --rt-opacity: 1;
`
