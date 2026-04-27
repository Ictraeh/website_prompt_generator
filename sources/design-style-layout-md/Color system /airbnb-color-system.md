# Airbnb Color System (AI-Ready Foundation)

This document combines Airbnb current web palette and legacy brand palette references into a single consistent color foundation for product design and frontend development tokens.

## Source Notes
- Current/app-web oriented colors: Radical Red `#FF385C`, Mine Shaft `#222222`, White `#FFFFFF`.
- Legacy Airbnb brand colors included for compatibility: Rausch `#FF5A5F`, Babu `#00A699`, Arches `#FC642D`, Hof `#484848`, Foggy `#767676`.

## Structured Color System

<Brand Colors>
    <Primary Color> : <#FF385C>  <!-- Main brand color, used for primary actions and highlights -->
    <Secondary Color> : <#00A699>  <!-- Complementary color to the primary, used for accents and secondary actions -->

<Accent Colors>
    <Accent Color 1> : <#FC642D>  <!-- Color that adds vibrancy, often used for buttons or highlights, derived from primary or secondary colors -->
    <Accent Color 2> : <#FF5A5F>  <!-- Additional accent color for variety, can be a lighter or darker shade of the primary or secondary color -->

<Neutral Colors>
    <Neutral Light> : <#F7F7F7>  <!-- Light grey for backgrounds, cards, and light elements, typically a lighter shade of neutral dark -->
    <Neutral Dark> : <#222222>  <!-- Dark grey for text and borders, provides contrast against light backgrounds -->
    <Neutral Black> : <#000000>  <!-- Pure black, used for text and high-contrast elements -->
    <Neutral White> : <#FFFFFF>  <!-- Pure white, used for backgrounds and light elements -->

<Feedback/Status Colors>
    <Success Color> : <#00A699>  <!-- Indicates successful actions, often a shade of green, should contrast well with neutral light -->
    <Error Color> : <#FF385C>  <!-- Indicates errors or warnings, typically a shade of red, should be distinct from success color -->
    <Warning Color> : <#FC642D>  <!-- Used for cautionary messages, often in yellow or amber, should be noticeable against neutral backgrounds -->
    <Info Color> : <#008489>  <!-- Used for informational messages, typically a shade of blue or teal, should contrast with both light and dark backgrounds -->

<Component Colors>
    <Button Primary> : <#FF385C>  <!-- Primary button color, usually matches the primary brand color for visibility -->
    <Button Secondary> : <#F2F2F2>  <!-- Secondary button color, often aligns with the neutral light color for subtlety -->
    <Alert Success Background> : <#E6F6F4>  <!-- Background color for success alerts, relates to the success color -->
    <Alert Error Background> : <#FFE7ED>  <!-- Background color for error alerts, relates to the error color -->
    <Alert Warning Background> : <#FFF0E8>  <!-- Background color for warning alerts, relates to the warning color -->
    <Alert Info Background> : <#E8F6F7>  <!-- Background color for informational alerts, relates to the info color -->

<Utility Colors>
    <Border Light> : <#DDDDDD>  <!-- Light border color, typically a lighter shade of neutral dark for subtle separation -->
    <Border Dark> : <#484848>  <!-- Darker border color for emphasis, can be a darker neutral -->
    <Shadow Light> : <#0000001A>  <!-- Light shadow color, often a transparent black for subtle depth -->
    <Shadow Dark> : <#00000066>  <!-- Dark shadow color, used for more pronounced shadow effects, can be a darker shade of neutral black -->

<Global Colors>
    <Primary Brand Color> : <#FF385C>  <!-- Main brand color, foundational for the overall color scheme -->
    <Secondary Brand Color> : <#00A699>  <!-- Secondary brand color, complements the primary brand color -->
    <Accent Color 1> : <#FC642D>  <!-- First accent color, derived from primary or secondary colors -->
    <Accent Color 2> : <#FF5A5F>  <!-- Second accent color, provides additional vibrancy -->
    <Neutral Light> : <#F7F7F7>  <!-- Light neutral color for backgrounds -->
    <Neutral Dark> : <#222222>  <!-- Dark neutral color for text and elements -->
    <Neutral Black> : <#000000>  <!-- Pure black for high contrast -->
    <Neutral White> : <#FFFFFF>  <!-- Pure white for light backgrounds -->
    <Feedback Success> : <#00A699>  <!-- Color for success messages -->
    <Feedback Error> : <#FF385C>  <!-- Color for error messages -->
    <Feedback Warning> : <#FC642D>  <!-- Color for warning messages -->
    <Feedback Info> : <#008489>  <!-- Color for informational messages -->

<Documentation and Implementation>
    <Design Token: Brand Primary> : <#FF385C>  <!-- Token for primary brand color in CSS or design system -->
    <Design Token: Brand Secondary> : <#00A699>  <!-- Token for secondary brand color -->
    <Design Token: Neutral Light> : <#F7F7F7>  <!-- Token for light neutral color -->
    <Design Token: Feedback Success> : <#00A699>  <!-- Token for success feedback color -->
    <Design Token: Feedback Error> : <#FF385C>  <!-- Token for error feedback color -->

## System-Level Color Palettes (`color100` ... `color1000`)

Naming convention: `color.<family>.color100` ... `color.<family>.color1000`

### `primary`

| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.primary.color100` | `#FFD7DE` | `#B2969B` |
| `color.primary.color200` | `#FFAFBE` | `#B27A85` |
| `color.primary.color300` | `#FF889D` | `#B25F6E` |
| `color.primary.color400` | `#FF607D` | `#B24358` |
| `color.primary.color500` | `#FF385C` | `#B22740` |
| `color.primary.color600` | `#CC2D4A` | `#8F1F34` |
| `color.primary.color700` | `#992237` | `#6B1826` |
| `color.primary.color800` | `#661625` | `#470F1A` |
| `color.primary.color900` | `#330B12` | `#24080D` |
| `color.primary.color1000` | `#000000` | `#000000` |

### `secondary`

| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.secondary.color100` | `#CCEDEB` | `#8FA6A4` |
| `color.secondary.color200` | `#99DBD6` | `#6B9996` |
| `color.secondary.color300` | `#66CAC2` | `#478D88` |
| `color.secondary.color400` | `#33B8AD` | `#248179` |
| `color.secondary.color500` | `#00A699` | `#00746B` |
| `color.secondary.color600` | `#00857A` | `#005D55` |
| `color.secondary.color700` | `#00645C` | `#004640` |
| `color.secondary.color800` | `#00423D` | `#002E2B` |
| `color.secondary.color900` | `#00211F` | `#001716` |
| `color.secondary.color1000` | `#000000` | `#000000` |

### `accent1`

| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.accent1.color100` | `#FEE0D5` | `#B29D95` |
| `color.accent1.color200` | `#FEC1AB` | `#B28778` |
| `color.accent1.color300` | `#FDA281` | `#B1715A` |
| `color.accent1.color400` | `#FD8357` | `#B15C3D` |
| `color.accent1.color500` | `#FC642D` | `#B0461F` |
| `color.accent1.color600` | `#CA5024` | `#8D3819` |
| `color.accent1.color700` | `#973C1B` | `#6A2A13` |
| `color.accent1.color800` | `#652812` | `#471C0D` |
| `color.accent1.color900` | `#321409` | `#230E06` |
| `color.accent1.color1000` | `#000000` | `#000000` |

### `accent2`

| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.accent2.color100` | `#FFDEDF` | `#B29B9C` |
| `color.accent2.color200` | `#FFBDBF` | `#B28486` |
| `color.accent2.color300` | `#FF9C9F` | `#B26D6F` |
| `color.accent2.color400` | `#FF7B7F` | `#B25659` |
| `color.accent2.color500` | `#FF5A5F` | `#B23F42` |
| `color.accent2.color600` | `#CC484C` | `#8F3235` |
| `color.accent2.color700` | `#993639` | `#6B2628` |
| `color.accent2.color800` | `#662426` | `#47191B` |
| `color.accent2.color900` | `#331213` | `#240D0D` |
| `color.accent2.color1000` | `#000000` | `#000000` |

### `neutral`

| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.neutral.color100` | `#F7F7F7` | `#ADADAD` |
| `color.neutral.color200` | `#EEEEEE` | `#A7A7A7` |
| `color.neutral.color300` | `#DDDDDD` | `#9B9B9B` |
| `color.neutral.color400` | `#BBBBBB` | `#838383` |
| `color.neutral.color500` | `#767676` | `#535353` |
| `color.neutral.color600` | `#484848` | `#323232` |
| `color.neutral.color700` | `#303030` | `#222222` |
| `color.neutral.color800` | `#222222` | `#181818` |
| `color.neutral.color900` | `#111111` | `#0C0C0C` |
| `color.neutral.color1000` | `#000000` | `#000000` |

### `success`

| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.success.color100` | `#CCEDEB` | `#8FA6A4` |
| `color.success.color200` | `#99DBD6` | `#6B9996` |
| `color.success.color300` | `#66CAC2` | `#478D88` |
| `color.success.color400` | `#33B8AD` | `#248179` |
| `color.success.color500` | `#00A699` | `#00746B` |
| `color.success.color600` | `#00857A` | `#005D55` |
| `color.success.color700` | `#00645C` | `#004640` |
| `color.success.color800` | `#00423D` | `#002E2B` |
| `color.success.color900` | `#00211F` | `#001716` |
| `color.success.color1000` | `#000000` | `#000000` |

### `error`

| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.error.color100` | `#FFD7DE` | `#B2969B` |
| `color.error.color200` | `#FFAFBE` | `#B27A85` |
| `color.error.color300` | `#FF889D` | `#B25F6E` |
| `color.error.color400` | `#FF607D` | `#B24358` |
| `color.error.color500` | `#FF385C` | `#B22740` |
| `color.error.color600` | `#CC2D4A` | `#8F1F34` |
| `color.error.color700` | `#992237` | `#6B1826` |
| `color.error.color800` | `#661625` | `#470F1A` |
| `color.error.color900` | `#330B12` | `#24080D` |
| `color.error.color1000` | `#000000` | `#000000` |

### `warning`

| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.warning.color100` | `#FEE0D5` | `#B29D95` |
| `color.warning.color200` | `#FEC1AB` | `#B28778` |
| `color.warning.color300` | `#FDA281` | `#B1715A` |
| `color.warning.color400` | `#FD8357` | `#B15C3D` |
| `color.warning.color500` | `#FC642D` | `#B0461F` |
| `color.warning.color600` | `#CA5024` | `#8D3819` |
| `color.warning.color700` | `#973C1B` | `#6A2A13` |
| `color.warning.color800` | `#652812` | `#471C0D` |
| `color.warning.color900` | `#321409` | `#230E06` |
| `color.warning.color1000` | `#000000` | `#000000` |

### `info`

| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.info.color100` | `#CCE6E7` | `#8FA1A2` |
| `color.info.color200` | `#99CED0` | `#6B9092` |
| `color.info.color300` | `#66B5B8` | `#477F81` |
| `color.info.color400` | `#339DA1` | `#246E71` |
| `color.info.color500` | `#008489` | `#005C60` |
| `color.info.color600` | `#006A6E` | `#004A4D` |
| `color.info.color700` | `#004F52` | `#003739` |
| `color.info.color800` | `#003537` | `#002526` |
| `color.info.color900` | `#001A1B` | `#001213` |
| `color.info.color1000` | `#000000` | `#000000` |

## Core CSS Variables (Design + Dev Foundation)

```css
:root {
  --brand-primary: #FF385C;
  --brand-secondary: #00A699;
  --accent-1: #FC642D;
  --accent-2: #FF5A5F;
  --neutral-light: #F7F7F7;
  --neutral-dark: #222222;
  --feedback-success: #00A699;
  --feedback-error: #FF385C;
  --feedback-warning: #FC642D;
  --feedback-info: #008489;
}

[data-theme="dark"] {
  --brand-primary: #B22740;
  --brand-secondary: #00746B;
  --accent-1: #B0461F;
  --accent-2: #B23F42;
  --neutral-light: #ADADAD;
  --neutral-dark: #181818;
  --feedback-success: #00746B;
  --feedback-error: #B22740;
  --feedback-warning: #B0461F;
  --feedback-info: #005C60;
}
```

## Dark Mode Algorithm (Applied)
```js
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return [r, g, b];
}

function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function convertToDarkMode(hexColor, adjustmentFactor = 0.3) {
  const [r, g, b] = hexToRgb(hexColor);
  const newR = Math.max(0, Math.round(r * (1 - adjustmentFactor)));
  const newG = Math.max(0, Math.round(g * (1 - adjustmentFactor)));
  const newB = Math.max(0, Math.round(b * (1 - adjustmentFactor)));
  return rgbToHex(newR, newG, newB);
}
```
