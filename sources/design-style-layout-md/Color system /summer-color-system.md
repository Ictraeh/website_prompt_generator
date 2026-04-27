# Coolors Palette Color System (AI-Ready Foundation)

This file organizes the Coolors palette `#8ECAE6 #219EBC #023047 #FFB703 #FB8500` into a complete design and development token system for landing pages, brand pages, and application UI.

## Source Notes
- Source palette: `8ecae6-219ebc-023047-ffb703-fb8500`.
- Palette mapping used: primary `#219EBC`, secondary `#023047`, accents `#FFB703/#FB8500`, support `#8ECAE6`.

## Structured Color System

<Brand Colors>
<Primary Color> : <#219EBC> <!-- Main brand color, used for primary actions and highlights -->
<Secondary Color> : <#023047> <!-- Complementary color to the primary, used for accents and secondary actions -->

<Accent Colors>
<Accent Color 1> : <#FFB703> <!-- Color that adds vibrancy, often used for buttons or highlights, derived from primary or secondary colors -->
<Accent Color 2> : <#FB8500> <!-- Additional accent color for variety, can be a lighter or darker shade of the primary or secondary color -->

<Neutral Colors>
<Neutral Light> : <#F4F8FB> <!-- Light grey for backgrounds, cards, and light elements, typically a lighter shade of neutral dark -->
<Neutral Dark> : <#1F2A37> <!-- Dark grey for text and borders, provides contrast against light backgrounds -->
<Neutral Black> : <#000000> <!-- Pure black, used for text and high-contrast elements -->
<Neutral White> : <#FFFFFF> <!-- Pure white, used for backgrounds and light elements -->

<Feedback/Status Colors>
<Success Color> : <#219EBC> <!-- Indicates successful actions, often a shade of green, should contrast well with neutral light -->
<Error Color> : <#D64545> <!-- Indicates errors or warnings, typically a shade of red, should be distinct from success color -->
<Warning Color> : <#FFB703> <!-- Used for cautionary messages, often in yellow or amber, should be noticeable against neutral backgrounds -->
<Info Color> : <#8ECAE6> <!-- Used for informational messages, typically a shade of blue or teal, should contrast with both light and dark backgrounds -->

<Component Colors>
<Button Primary> : <#219EBC> <!-- Primary button color, usually matches the primary brand color for visibility -->
<Button Secondary> : <#E7EDF2> <!-- Secondary button color, often aligns with the neutral light color for subtlety -->
<Alert Success Background> : <#E9F7FB> <!-- Background color for success alerts, relates to the success color -->
<Alert Error Background> : <#FDECEC> <!-- Background color for error alerts, relates to the error color -->
<Alert Warning Background> : <#FFF6D9> <!-- Background color for warning alerts, relates to the warning color -->
<Alert Info Background> : <#EAF4FA> <!-- Background color for informational alerts, relates to the info color -->

<Utility Colors>
<Border Light> : <#D5DEE7> <!-- Light border color, typically a lighter shade of neutral dark for subtle separation -->
<Border Dark> : <#404B54> <!-- Darker border color for emphasis, can be a darker neutral -->
<Shadow Light> : <#0000001A> <!-- Light shadow color, often a transparent black for subtle depth -->
<Shadow Dark> : <#00000066> <!-- Dark shadow color, used for more pronounced shadow effects, can be a darker shade of neutral black -->

<Global Colors>
<Primary Brand Color> : <#219EBC> <!-- Main brand color, foundational for the overall color scheme -->
<Secondary Brand Color> : <#023047> <!-- Secondary brand color, complements the primary brand color -->
<Accent Color 1> : <#FFB703> <!-- First accent color, derived from primary or secondary colors -->
<Accent Color 2> : <#FB8500> <!-- Second accent color, provides additional vibrancy -->
<Neutral Light> : <#F4F8FB> <!-- Light neutral color for backgrounds -->
<Neutral Dark> : <#1F2A37> <!-- Dark neutral color for text and elements -->
<Neutral Black> : <#000000> <!-- Pure black for high contrast -->
<Neutral White> : <#FFFFFF> <!-- Pure white for light backgrounds -->
<Feedback Success> : <#219EBC> <!-- Color for success messages -->
<Feedback Error> : <#D64545> <!-- Color for error messages -->
<Feedback Warning> : <#FFB703> <!-- Color for warning messages -->
<Feedback Info> : <#8ECAE6> <!-- Color for informational messages -->

<Documentation and Implementation>
<Design Token: Brand Primary> : <#219EBC> <!-- Token for primary brand color in CSS or design system -->
<Design Token: Brand Secondary> : <#023047> <!-- Token for secondary brand color -->
<Design Token: Neutral Light> : <#F4F8FB> <!-- Token for light neutral color -->
<Design Token: Feedback Success> : <#219EBC> <!-- Token for success feedback color -->
<Design Token: Feedback Error> : <#D64545> <!-- Token for error feedback color -->

## System-Level Color Palettes (`color100` to `color1000`)
Naming convention: `color.<family>.color100` ... `color.<family>.color1000`

### `primary`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.primary.color100` | `#D3ECF2` | `#94A5A9` |
| `color.primary.color200` | `#A6D8E4` | `#7497A0` |
| `color.primary.color300` | `#7AC5D7` | `#558A96` |
| `color.primary.color400` | `#4DB1C9` | `#367C8D` |
| `color.primary.color500` | `#219EBC` | `#176F84` |
| `color.primary.color600` | `#1A7E96` | `#125869` |
| `color.primary.color700` | `#145F71` | `#0E424F` |
| `color.primary.color800` | `#0D3F4B` | `#092C34` |
| `color.primary.color900` | `#072026` | `#05161B` |
| `color.primary.color1000` | `#000000` | `#000000` |

### `secondary`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.secondary.color100` | `#CCD6DA` | `#8F9699` |
| `color.secondary.color200` | `#9AACB5` | `#6C787F` |
| `color.secondary.color300` | `#678391` | `#485C66` |
| `color.secondary.color400` | `#35596C` | `#253E4C` |
| `color.secondary.color500` | `#023047` | `#012232` |
| `color.secondary.color600` | `#022639` | `#011B28` |
| `color.secondary.color700` | `#011D2B` | `#01141E` |
| `color.secondary.color800` | `#01131C` | `#010D14` |
| `color.secondary.color900` | `#000A0E` | `#00070A` |
| `color.secondary.color1000` | `#000000` | `#000000` |

### `accent1`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.accent1.color100` | `#FFF1CD` | `#B2A990` |
| `color.accent1.color200` | `#FFE29A` | `#B29E6C` |
| `color.accent1.color300` | `#FFD468` | `#B29449` |
| `color.accent1.color400` | `#FFC535` | `#B28A25` |
| `color.accent1.color500` | `#FFB703` | `#B28002` |
| `color.accent1.color600` | `#CC9202` | `#8F6601` |
| `color.accent1.color700` | `#996E02` | `#6B4D01` |
| `color.accent1.color800` | `#664901` | `#473301` |
| `color.accent1.color900` | `#332501` | `#241A01` |
| `color.accent1.color1000` | `#000000` | `#000000` |

### `accent2`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.accent2.color100` | `#FEE7CC` | `#B2A28F` |
| `color.accent2.color200` | `#FDCE99` | `#B1906B` |
| `color.accent2.color300` | `#FDB666` | `#B17F47` |
| `color.accent2.color400` | `#FC9D33` | `#B06E24` |
| `color.accent2.color500` | `#FB8500` | `#B05D00` |
| `color.accent2.color600` | `#C96A00` | `#8D4A00` |
| `color.accent2.color700` | `#975000` | `#6A3800` |
| `color.accent2.color800` | `#643500` | `#462500` |
| `color.accent2.color900` | `#321B00` | `#231300` |
| `color.accent2.color1000` | `#000000` | `#000000` |

### `support`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.support.color100` | `#E8F4FA` | `#A2ABAF` |
| `color.support.color200` | `#D2EAF5` | `#93A4AC` |
| `color.support.color300` | `#BBDFF0` | `#839CA8` |
| `color.support.color400` | `#A5D5EB` | `#7395A4` |
| `color.support.color500` | `#8ECAE6` | `#638DA1` |
| `color.support.color600` | `#72A2B8` | `#507181` |
| `color.support.color700` | `#55798A` | `#3B5561` |
| `color.support.color800` | `#39515C` | `#283940` |
| `color.support.color900` | `#1C282E` | `#141C20` |
| `color.support.color1000` | `#000000` | `#000000` |

### `neutral`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.neutral.color100` | `#F4F8FB` | `#ABAEB0` |
| `color.neutral.color200` | `#E7EDF2` | `#A2A6A9` |
| `color.neutral.color300` | `#D5DEE7` | `#959BA2` |
| `color.neutral.color400` | `#A8B7C5` | `#76808A` |
| `color.neutral.color500` | `#7A8A99` | `#55616B` |
| `color.neutral.color600` | `#5A6772` | `#3F4850` |
| `color.neutral.color700` | `#404B54` | `#2D343B` |
| `color.neutral.color800` | `#2D3640` | `#1F262D` |
| `color.neutral.color900` | `#1F2A37` | `#161D26` |
| `color.neutral.color1000` | `#000000` | `#000000` |

### `success`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.success.color100` | `#D3ECF2` | `#94A5A9` |
| `color.success.color200` | `#A6D8E4` | `#7497A0` |
| `color.success.color300` | `#7AC5D7` | `#558A96` |
| `color.success.color400` | `#4DB1C9` | `#367C8D` |
| `color.success.color500` | `#219EBC` | `#176F84` |
| `color.success.color600` | `#1A7E96` | `#125869` |
| `color.success.color700` | `#145F71` | `#0E424F` |
| `color.success.color800` | `#0D3F4B` | `#092C34` |
| `color.success.color900` | `#072026` | `#05161B` |
| `color.success.color1000` | `#000000` | `#000000` |

### `error`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.error.color100` | `#F7DADA` | `#AD9999` |
| `color.error.color200` | `#EFB5B5` | `#A77F7F` |
| `color.error.color300` | `#E68F8F` | `#A16464` |
| `color.error.color400` | `#DE6A6A` | `#9B4A4A` |
| `color.error.color500` | `#D64545` | `#963030` |
| `color.error.color600` | `#AB3737` | `#782626` |
| `color.error.color700` | `#802929` | `#5A1D1D` |
| `color.error.color800` | `#561C1C` | `#3C1414` |
| `color.error.color900` | `#2B0E0E` | `#1E0A0A` |
| `color.error.color1000` | `#000000` | `#000000` |

### `warning`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.warning.color100` | `#FFF1CD` | `#B2A990` |
| `color.warning.color200` | `#FFE29A` | `#B29E6C` |
| `color.warning.color300` | `#FFD468` | `#B29449` |
| `color.warning.color400` | `#FFC535` | `#B28A25` |
| `color.warning.color500` | `#FFB703` | `#B28002` |
| `color.warning.color600` | `#CC9202` | `#8F6601` |
| `color.warning.color700` | `#996E02` | `#6B4D01` |
| `color.warning.color800` | `#664901` | `#473301` |
| `color.warning.color900` | `#332501` | `#241A01` |
| `color.warning.color1000` | `#000000` | `#000000` |

### `info`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.info.color100` | `#E8F4FA` | `#A2ABAF` |
| `color.info.color200` | `#D2EAF5` | `#93A4AC` |
| `color.info.color300` | `#BBDFF0` | `#839CA8` |
| `color.info.color400` | `#A5D5EB` | `#7395A4` |
| `color.info.color500` | `#8ECAE6` | `#638DA1` |
| `color.info.color600` | `#72A2B8` | `#507181` |
| `color.info.color700` | `#55798A` | `#3B5561` |
| `color.info.color800` | `#39515C` | `#283940` |
| `color.info.color900` | `#1C282E` | `#141C20` |
| `color.info.color1000` | `#000000` | `#000000` |

## Core CSS Variables
```css
:root {
  --brand-primary: #219EBC;
  --brand-secondary: #023047;
  --accent-1: #FFB703;
  --accent-2: #FB8500;
  --neutral-light: #F4F8FB;
  --neutral-dark: #1F2A37;
  --feedback-success: #219EBC;
  --feedback-error: #D64545;
}
[data-theme="dark"] {
  --brand-primary: #176F84;
  --brand-secondary: #012232;
  --accent-1: #B28002;
  --accent-2: #B05D00;
  --neutral-light: #ABAEB0;
  --neutral-dark: #161D26;
  --feedback-success: #176F84;
  --feedback-error: #963030;
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
