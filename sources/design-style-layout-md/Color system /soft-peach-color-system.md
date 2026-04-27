# Soft Peach Color System (AI-Ready Foundation)

This file organizes the Soft Peach palette into a complete design and development token system for landing pages, brand pages, and product UI usage.

## Source Notes
- Source palette: `#FEC5BB #FCD5CE #FAE1DD #F8EDEB #E8E8E4 #D8E2DC #ECE4DB #FFE5D9 #FFD7BA #FEC89A`.
- Mapping keeps all source colors represented across brand, accent, feedback, support, and utility roles.

## Structured Color System

<Brand Colors>
<Primary Color> : <#FEC5BB> <!-- Main brand color, used for primary actions and highlights -->
<Secondary Color> : <#FCD5CE> <!-- Complementary color to the primary, used for accents and secondary actions -->

<Accent Colors>
<Accent Color 1> : <#FAE1DD> <!-- Color that adds vibrancy, often used for buttons or highlights, derived from primary or secondary colors -->
<Accent Color 2> : <#F8EDEB> <!-- Additional accent color for variety, can be a lighter or darker shade of the primary or secondary color -->

<Neutral Colors>
<Neutral Light> : <#F8EDEB> <!-- Light grey for backgrounds, cards, and light elements, typically a lighter shade of neutral dark -->
<Neutral Dark> : <#6B6763> <!-- Dark grey for text and borders, provides contrast against light backgrounds -->
<Neutral Black> : <#000000> <!-- Pure black, used for text and high-contrast elements -->
<Neutral White> : <#FFFFFF> <!-- Pure white, used for backgrounds and light elements -->

<Feedback/Status Colors>
<Success Color> : <#D8E2DC> <!-- Indicates successful actions, often a shade of green, should contrast well with neutral light -->
<Error Color> : <#FEC89A> <!-- Indicates errors or warnings, typically a shade of red, should be distinct from success color -->
<Warning Color> : <#FFE5D9> <!-- Used for cautionary messages, often in yellow or amber, should be noticeable against neutral backgrounds -->
<Info Color> : <#ECE4DB> <!-- Used for informational messages, typically a shade of blue or teal, should contrast with both light and dark backgrounds -->

<Component Colors>
<Button Primary> : <#FEC5BB> <!-- Primary button color, usually matches the primary brand color for visibility -->
<Button Secondary> : <#EFE5E2> <!-- Secondary button color, often aligns with the neutral light color for subtlety -->
<Alert Success Background> : <#EDF3F0> <!-- Background color for success alerts, relates to the success color -->
<Alert Error Background> : <#FFF1E5> <!-- Background color for error alerts, relates to the error color -->
<Alert Warning Background> : <#FFF8F2> <!-- Background color for warning alerts, relates to the warning color -->
<Alert Info Background> : <#F4F0EB> <!-- Background color for informational alerts, relates to the info color -->

<Utility Colors>
<Border Light> : <#E4DBD7> <!-- Light border color, typically a lighter shade of neutral dark for subtle separation -->
<Border Dark> : <#7A746F> <!-- Darker border color for emphasis, can be a darker neutral -->
<Shadow Light> : <#0000001A> <!-- Light shadow color, often a transparent black for subtle depth -->
<Shadow Dark> : <#00000066> <!-- Dark shadow color, used for more pronounced shadow effects, can be a darker shade of neutral black -->

<Global Colors>
<Primary Brand Color> : <#FEC5BB> <!-- Main brand color, foundational for the overall color scheme -->
<Secondary Brand Color> : <#FCD5CE> <!-- Secondary brand color, complements the primary brand color -->
<Accent Color 1> : <#FAE1DD> <!-- First accent color, derived from primary or secondary colors -->
<Accent Color 2> : <#F8EDEB> <!-- Second accent color, provides additional vibrancy -->
<Neutral Light> : <#F8EDEB> <!-- Light neutral color for backgrounds -->
<Neutral Dark> : <#6B6763> <!-- Dark neutral color for text and elements -->
<Neutral Black> : <#000000> <!-- Pure black for high contrast -->
<Neutral White> : <#FFFFFF> <!-- Pure white for light backgrounds -->
<Feedback Success> : <#D8E2DC> <!-- Color for success messages -->
<Feedback Error> : <#FEC89A> <!-- Color for error messages -->
<Feedback Warning> : <#FFE5D9> <!-- Color for warning messages -->
<Feedback Info> : <#ECE4DB> <!-- Color for informational messages -->

<Documentation and Implementation>
<Design Token: Brand Primary> : <#FEC5BB> <!-- Token for primary brand color in CSS or design system -->
<Design Token: Brand Secondary> : <#FCD5CE> <!-- Token for secondary brand color -->
<Design Token: Neutral Light> : <#F8EDEB> <!-- Token for light neutral color -->
<Design Token: Feedback Success> : <#D8E2DC> <!-- Token for success feedback color -->
<Design Token: Feedback Error> : <#FEC89A> <!-- Token for error feedback color -->

## System-Level Color Palettes (`color100` to `color1000`)
Naming convention: `color.<family>.color100` ... `color.<family>.color1000`

### `primary`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.primary.color100` | `#FFF3F0` | `#B2AAA8` |
| `color.primary.color200` | `#FEE7E1` | `#B29F9D` |
| `color.primary.color300` | `#FEDBD2` | `#B29A93` |
| `color.primary.color400` | `#FECFC6` | `#B2908B` |
| `color.primary.color500` | `#FEC5BB` | `#B28983` |
| `color.primary.color600` | `#E4B1A8` | `#A07C76` |
| `color.primary.color700` | `#C99B92` | `#8D6D66` |
| `color.primary.color800` | `#AE857C` | `#7A5D57` |
| `color.primary.color900` | `#936F67` | `#674D48` |
| `color.primary.color1000` | `#7A5B54` | `#56403B` |

### `secondary`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.secondary.color100` | `#FFF6F4` | `#B2ACAB` |
| `color.secondary.color200` | `#FEEBE8` | `#B2A59F` |
| `color.secondary.color300` | `#FEE1DD` | `#B29E9B` |
| `color.secondary.color400` | `#FDDAD4` | `#B29A94` |
| `color.secondary.color500` | `#FCD5CE` | `#B19490` |
| `color.secondary.color600` | `#E2C0BA` | `#9E867F` |
| `color.secondary.color700` | `#C7AAA5` | `#8B7774` |
| `color.secondary.color800` | `#AC938F` | `#786764` |
| `color.secondary.color900` | `#917D7A` | `#655757` |
| `color.secondary.color1000` | `#776865` | `#534947` |

### `accent1`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.accent1.color100` | `#FFFAF9` | `#B2AFAE` |
| `color.accent1.color200` | `#FEF4F2` | `#B2AAA9` |
| `color.accent1.color300` | `#FDECE9` | `#B1A5A3` |
| `color.accent1.color400` | `#FBE6E2` | `#B0A19E` |
| `color.accent1.color500` | `#FAE1DD` | `#AF9E9B` |
| `color.accent1.color600` | `#E1CBC7` | `#9D8E8B` |
| `color.accent1.color700` | `#C7B4B0` | `#8B7E7B` |
| `color.accent1.color800` | `#AE9D99` | `#7A6E6B` |
| `color.accent1.color900` | `#948682` | `#685D5B` |
| `color.accent1.color1000` | `#7B706D` | `#564E4C` |

### `accent2`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.accent2.color100` | `#FFFDFD` | `#B2B1B1` |
| `color.accent2.color200` | `#FEF8F8` | `#B2ADAD` |
| `color.accent2.color300` | `#FDF3F2` | `#B1AAA9` |
| `color.accent2.color400` | `#FAF0EE` | `#AFA8A6` |
| `color.accent2.color500` | `#F8EDEB` | `#AEA6A4` |
| `color.accent2.color600` | `#DED6D4` | `#9B9695` |
| `color.accent2.color700` | `#C3BEBB` | `#898584` |
| `color.accent2.color800` | `#A8A6A3` | `#757473` |
| `color.accent2.color900` | `#8C8D8A` | `#626261` |
| `color.accent2.color1000` | `#72726F` | `#50504E` |

### `support`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.support.color100` | `#FFF7EF` | `#B2ACA7` |
| `color.support.color200` | `#FFF0E0` | `#B2A89D` |
| `color.support.color300` | `#FFE9D1` | `#B2A393` |
| `color.support.color400` | `#FFDFC6` | `#B29C8B` |
| `color.support.color500` | `#FFD7BA` | `#B29682` |
| `color.support.color600` | `#E6C2A8` | `#A18676` |
| `color.support.color700` | `#CCAD95` | `#8F7968` |
| `color.support.color800` | `#B39882` | `#7D6B5B` |
| `color.support.color900` | `#99836F` | `#6B5C4E` |
| `color.support.color1000` | `#7F705E` | `#594E42` |

### `neutral`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.neutral.color100` | `#F8EDEB` | `#AEA6A4` |
| `color.neutral.color200` | `#EFE5E2` | `#A7A09E` |
| `color.neutral.color300` | `#E4DBD7` | `#9F9996` |
| `color.neutral.color400` | `#CFC7C3` | `#918B88` |
| `color.neutral.color500` | `#B3ACA8` | `#7D7876` |
| `color.neutral.color600` | `#96908B` | `#696561` |
| `color.neutral.color700` | `#7A746F` | `#56514E` |
| `color.neutral.color800` | `#6B6763` | `#4B4845` |
| `color.neutral.color900` | `#4A4744` | `#343231` |
| `color.neutral.color1000` | `#000000` | `#000000` |

### `success`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.success.color100` | `#F2F6F4` | `#A9ACA9` |
| `color.success.color200` | `#ECF1EE` | `#A5A9A6` |
| `color.success.color300` | `#E4EBE8` | `#9FA4A2` |
| `color.success.color400` | `#DDE7E3` | `#9BA19F` |
| `color.success.color500` | `#D8E2DC` | `#979E9A` |
| `color.success.color600` | `#C1CBC6` | `#878E8B` |
| `color.success.color700` | `#AAB4B0` | `#767E7B` |
| `color.success.color800` | `#949D99` | `#686E6B` |
| `color.success.color900` | `#7D8783` | `#575F5C` |
| `color.success.color1000` | `#67716D` | `#484F4C` |

### `error`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.error.color100` | `#FFF5EB` | `#B2ACA4` |
| `color.error.color200` | `#FEEAD7` | `#B2A497` |
| `color.error.color300` | `#FEDFC3` | `#B29C89` |
| `color.error.color400` | `#FED4AF` | `#B2957B` |
| `color.error.color500` | `#FEC89A` | `#B28C6C` |
| `color.error.color600` | `#E4B486` | `#A07E5E` |
| `color.error.color700` | `#C99E72` | `#8D6F50` |
| `color.error.color800` | `#AE895E` | `#7A6042` |
| `color.error.color900` | `#93744B` | `#675235` |
| `color.error.color1000` | `#795F39` | `#55422A` |

### `warning`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.warning.color100` | `#FFF9F5` | `#B2AEAB` |
| `color.warning.color200` | `#FFF2EA` | `#B2A9A4` |
| `color.warning.color300` | `#FFECDF` | `#B2A59C` |
| `color.warning.color400` | `#FFE8D9` | `#B2A294` |
| `color.warning.color500` | `#FFE5D9` | `#B29F98` |
| `color.warning.color600` | `#E6CEC3` | `#A09188` |
| `color.warning.color700` | `#CCB7AE` | `#8F807A` |
| `color.warning.color800` | `#B3A098` | `#7D706B` |
| `color.warning.color900` | `#998A83` | `#6B605C` |
| `color.warning.color1000` | `#80746F` | `#59514E` |

### `info`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.info.color100` | `#F7F4F1` | `#ADA9A9` |
| `color.info.color200` | `#F3EEEA` | `#AAA7A4` |
| `color.info.color300` | `#F0E9E3` | `#A8A39F` |
| `color.info.color400` | `#EEE6DF` | `#A7A19C` |
| `color.info.color500` | `#ECE4DB` | `#A59F99` |
| `color.info.color600` | `#D4CCC4` | `#948F89` |
| `color.info.color700` | `#BBB4AD` | `#837D79` |
| `color.info.color800` | `#A29C96` | `#726D69` |
| `color.info.color900` | `#8A857F` | `#605D59` |
| `color.info.color1000` | `#726D68` | `#504C49` |

## Core CSS Variables
```css
:root {
  --brand-primary: #FEC5BB;
  --brand-secondary: #FCD5CE;
  --accent-1: #FAE1DD;
  --accent-2: #F8EDEB;
  --neutral-light: #F8EDEB;
  --neutral-dark: #6B6763;
  --feedback-success: #D8E2DC;
  --feedback-error: #FEC89A;
}
[data-theme="dark"] {
  --brand-primary: #B28983;
  --brand-secondary: #B19490;
  --accent-1: #AF9E9B;
  --accent-2: #AEA6A4;
  --neutral-light: #AEA6A4;
  --neutral-dark: #4B4845;
  --feedback-success: #979E9A;
  --feedback-error: #B28C6C;
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
