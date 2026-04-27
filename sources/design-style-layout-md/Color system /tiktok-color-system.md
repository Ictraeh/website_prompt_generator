# TikTok Color System (AI-Ready Foundation)

This file organizes TikTok brand colors into a structured design + development token foundation for landing pages, brand pages, and app product UI usage.

## Source Notes
- Main TikTok brand colors: Black `#000000`, White `#FFFFFF`, Razzmatazz `#FE2C55`, Splash `#25F4EE`.
- Supplemental palette tones from community palette reference: `#040404`, `#DE8C9D`, `#FE2858`, `#2AF0EA`, `#397684`.

## Structured Color System

<Brand Colors>
<Primary Color> : <#FE2C55> <!-- Main brand color, used for primary actions and highlights -->
<Secondary Color> : <#25F4EE> <!-- Complementary color to the primary, used for accents and secondary actions -->

<Accent Colors>
<Accent Color 1> : <#DE8C9D> <!-- Color that adds vibrancy, often used for buttons or highlights, derived from primary or secondary colors -->
<Accent Color 2> : <#397684> <!-- Additional accent color for variety, can be a lighter or darker shade of the primary or secondary color -->

<Neutral Colors>
<Neutral Light> : <#F5F5F5> <!-- Light grey for backgrounds, cards, and light elements, typically a lighter shade of neutral dark -->
<Neutral Dark> : <#040404> <!-- Dark grey for text and borders, provides contrast against light backgrounds -->
<Neutral Black> : <#000000> <!-- Pure black, used for text and high-contrast elements -->
<Neutral White> : <#FFFFFF> <!-- Pure white, used for backgrounds and light elements -->

<Feedback/Status Colors>
<Success Color> : <#25F4EE> <!-- Indicates successful actions, often a shade of green, should contrast well with neutral light -->
<Error Color> : <#FE2C55> <!-- Indicates errors or warnings, typically a shade of red, should be distinct from success color -->
<Warning Color> : <#DE8C9D> <!-- Used for cautionary messages, often in yellow or amber, should be noticeable against neutral backgrounds -->
<Info Color> : <#397684> <!-- Used for informational messages, typically a shade of blue or teal, should contrast with both light and dark backgrounds -->

<Component Colors>
<Button Primary> : <#FE2C55> <!-- Primary button color, usually matches the primary brand color for visibility -->
<Button Secondary> : <#F2F2F2> <!-- Secondary button color, often aligns with the neutral light color for subtlety -->
<Alert Success Background> : <#E6FCFB> <!-- Background color for success alerts, relates to the success color -->
<Alert Error Background> : <#FFE8EE> <!-- Background color for error alerts, relates to the error color -->
<Alert Warning Background> : <#FDF1F4> <!-- Background color for warning alerts, relates to the warning color -->
<Alert Info Background> : <#EDF4F6> <!-- Background color for informational alerts, relates to the info color -->

<Utility Colors>
<Border Light> : <#CCCCCC> <!-- Light border color, typically a lighter shade of neutral dark for subtle separation -->
<Border Dark> : <#262626> <!-- Darker border color for emphasis, can be a darker neutral -->
<Shadow Light> : <#0000001A> <!-- Light shadow color, often a transparent black for subtle depth -->
<Shadow Dark> : <#00000066> <!-- Dark shadow color, used for more pronounced shadow effects, can be a darker shade of neutral black -->

<Global Colors>
<Primary Brand Color> : <#FE2C55> <!-- Main brand color, foundational for the overall color scheme -->
<Secondary Brand Color> : <#25F4EE> <!-- Secondary brand color, complements the primary brand color -->
<Accent Color 1> : <#DE8C9D> <!-- First accent color, derived from primary or secondary colors -->
<Accent Color 2> : <#397684> <!-- Second accent color, provides additional vibrancy -->
<Neutral Light> : <#F5F5F5> <!-- Light neutral color for backgrounds -->
<Neutral Dark> : <#040404> <!-- Dark neutral color for text and elements -->
<Neutral Black> : <#000000> <!-- Pure black for high contrast -->
<Neutral White> : <#FFFFFF> <!-- Pure white for light backgrounds -->
<Feedback Success> : <#25F4EE> <!-- Color for success messages -->
<Feedback Error> : <#FE2C55> <!-- Color for error messages -->
<Feedback Warning> : <#DE8C9D> <!-- Color for warning messages -->
<Feedback Info> : <#397684> <!-- Color for informational messages -->

<Documentation and Implementation>
<Design Token: Brand Primary> : <#FE2C55> <!-- Token for primary brand color in CSS or design system -->
<Design Token: Brand Secondary> : <#25F4EE> <!-- Token for secondary brand color -->
<Design Token: Neutral Light> : <#F5F5F5> <!-- Token for light neutral color -->
<Design Token: Feedback Success> : <#25F4EE> <!-- Token for success feedback color -->
<Design Token: Feedback Error> : <#FE2C55> <!-- Token for error feedback color -->

## System-Level Color Palettes (`color100` to `color1000`)
Naming convention: `color.<family>.color100` ... `color.<family>.color1000`

### `primary`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.primary.color100` | `#FFD5DD` | `#B2959B` |
| `color.primary.color200` | `#FFABBB` | `#B27883` |
| `color.primary.color300` | `#FE8099` | `#B25A6B` |
| `color.primary.color400` | `#FE5677` | `#B23C53` |
| `color.primary.color500` | `#FE2C55` | `#B21F3B` |
| `color.primary.color600` | `#CB2344` | `#8E1830` |
| `color.primary.color700` | `#981A33` | `#6A1224` |
| `color.primary.color800` | `#661222` | `#470D18` |
| `color.primary.color900` | `#330911` | `#24060C` |
| `color.primary.color1000` | `#000000` | `#000000` |

### `secondary`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.secondary.color100` | `#D3FDFC` | `#94B1B0` |
| `color.secondary.color200` | `#A8FBF8` | `#76B0AE` |
| `color.secondary.color300` | `#7CF8F5` | `#57AEAC` |
| `color.secondary.color400` | `#51F6F1` | `#39ACA9` |
| `color.secondary.color500` | `#25F4EE` | `#1AABA7` |
| `color.secondary.color600` | `#1EC3BE` | `#158885` |
| `color.secondary.color700` | `#16928F` | `#0F6664` |
| `color.secondary.color800` | `#0F625F` | `#0A4542` |
| `color.secondary.color900` | `#073130` | `#052222` |
| `color.secondary.color1000` | `#000000` | `#000000` |

### `accent1`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.accent1.color100` | `#F8E8EB` | `#AEA2A4` |
| `color.accent1.color200` | `#F2D1D8` | `#A99297` |
| `color.accent1.color300` | `#EBBAC4` | `#A48289` |
| `color.accent1.color400` | `#E5A3B1` | `#A0727C` |
| `color.accent1.color500` | `#DE8C9D` | `#9B626E` |
| `color.accent1.color600` | `#B2707E` | `#7D4E58` |
| `color.accent1.color700` | `#85545E` | `#5D3B42` |
| `color.accent1.color800` | `#59383F` | `#3E272C` |
| `color.accent1.color900` | `#2C1C1F` | `#1F1416` |
| `color.accent1.color1000` | `#000000` | `#000000` |

### `accent2`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.accent2.color100` | `#D7E4E6` | `#96A0A1` |
| `color.accent2.color200` | `#B0C8CE` | `#7B8C90` |
| `color.accent2.color300` | `#88ADB5` | `#5F797F` |
| `color.accent2.color400` | `#61919D` | `#44666E` |
| `color.accent2.color500` | `#397684` | `#28535C` |
| `color.accent2.color600` | `#2E5E6A` | `#20424A` |
| `color.accent2.color700` | `#22474F` | `#183237` |
| `color.accent2.color800` | `#172F35` | `#102125` |
| `color.accent2.color900` | `#0B181A` | `#081112` |
| `color.accent2.color1000` | `#000000` | `#000000` |

### `neutral`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.neutral.color100` | `#F5F5F5` | `#ACACAC` |
| `color.neutral.color200` | `#E5E5E5` | `#A0A0A0` |
| `color.neutral.color300` | `#CCCCCC` | `#8F8F8F` |
| `color.neutral.color400` | `#9B9B9B` | `#6C6C6C` |
| `color.neutral.color500` | `#767676` | `#535353` |
| `color.neutral.color600` | `#4D4D4D` | `#363636` |
| `color.neutral.color700` | `#262626` | `#1B1B1B` |
| `color.neutral.color800` | `#121212` | `#0D0D0D` |
| `color.neutral.color900` | `#040404` | `#030303` |
| `color.neutral.color1000` | `#000000` | `#000000` |

### `success`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.success.color100` | `#D3FDFC` | `#94B1B0` |
| `color.success.color200` | `#A8FBF8` | `#76B0AE` |
| `color.success.color300` | `#7CF8F5` | `#57AEAC` |
| `color.success.color400` | `#51F6F1` | `#39ACA9` |
| `color.success.color500` | `#25F4EE` | `#1AABA7` |
| `color.success.color600` | `#1EC3BE` | `#158885` |
| `color.success.color700` | `#16928F` | `#0F6664` |
| `color.success.color800` | `#0F625F` | `#0A4542` |
| `color.success.color900` | `#073130` | `#052222` |
| `color.success.color1000` | `#000000` | `#000000` |

### `error`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.error.color100` | `#FFD5DD` | `#B2959B` |
| `color.error.color200` | `#FFABBB` | `#B27883` |
| `color.error.color300` | `#FE8099` | `#B25A6B` |
| `color.error.color400` | `#FE5677` | `#B23C53` |
| `color.error.color500` | `#FE2C55` | `#B21F3B` |
| `color.error.color600` | `#CB2344` | `#8E1830` |
| `color.error.color700` | `#981A33` | `#6A1224` |
| `color.error.color800` | `#661222` | `#470D18` |
| `color.error.color900` | `#330911` | `#24060C` |
| `color.error.color1000` | `#000000` | `#000000` |

### `warning`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.warning.color100` | `#F8E8EB` | `#AEA2A4` |
| `color.warning.color200` | `#F2D1D8` | `#A99297` |
| `color.warning.color300` | `#EBBAC4` | `#A48289` |
| `color.warning.color400` | `#E5A3B1` | `#A0727C` |
| `color.warning.color500` | `#DE8C9D` | `#9B626E` |
| `color.warning.color600` | `#B2707E` | `#7D4E58` |
| `color.warning.color700` | `#85545E` | `#5D3B42` |
| `color.warning.color800` | `#59383F` | `#3E272C` |
| `color.warning.color900` | `#2C1C1F` | `#1F1416` |
| `color.warning.color1000` | `#000000` | `#000000` |

### `info`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.info.color100` | `#D7E4E6` | `#96A0A1` |
| `color.info.color200` | `#B0C8CE` | `#7B8C90` |
| `color.info.color300` | `#88ADB5` | `#5F797F` |
| `color.info.color400` | `#61919D` | `#44666E` |
| `color.info.color500` | `#397684` | `#28535C` |
| `color.info.color600` | `#2E5E6A` | `#20424A` |
| `color.info.color700` | `#22474F` | `#183237` |
| `color.info.color800` | `#172F35` | `#102125` |
| `color.info.color900` | `#0B181A` | `#081112` |
| `color.info.color1000` | `#000000` | `#000000` |

## Core CSS Variables
```css
:root {
  --brand-primary: #FE2C55;
  --brand-secondary: #25F4EE;
  --neutral-light: #F5F5F5;
  --neutral-dark: #040404;
  --feedback-success: #25F4EE;
  --feedback-error: #FE2C55;
}
[data-theme="dark"] {
  --brand-primary: #B21F3B;
  --brand-secondary: #1AABA7;
  --neutral-light: #ACACAC;
  --neutral-dark: #030303;
  --feedback-success: #1AABA7;
  --feedback-error: #B21F3B;
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
