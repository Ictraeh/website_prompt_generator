# Starbucks Color System (AI-Ready Foundation)

This markdown organizes Starbucks brand colors into a complete design + development token system for landing pages, brand pages, and application UI.

## Source Notes
- Main Starbucks colors: Fun Green `#00754A`, Black `#000000`, Skeptic `#D4E9E2`, White `#FFFFFF`.
- Starbucks Creative color architecture includes: Starbucks Green, Accent Green, Light Green, House Green, Black, Warm Neutral, Cool Neutral, White.

## Structured Color System

<Brand Colors>
<Primary Color> : <#00754A> <!-- Main brand color, used for primary actions and highlights -->
<Secondary Color> : <#D4E9E2> <!-- Complementary color to the primary, used for accents and secondary actions -->

<Accent Colors>
<Accent Color 1> : <#1E3932> <!-- Color that adds vibrancy, often used for buttons or highlights, derived from primary or secondary colors -->
<Accent Color 2> : <#00A862> <!-- Additional accent color for variety, can be a lighter or darker shade of the primary or secondary color -->

<Neutral Colors>
<Neutral Light> : <#F4F4F2> <!-- Light grey for backgrounds, cards, and light elements, typically a lighter shade of neutral dark -->
<Neutral Dark> : <#1F1F1F> <!-- Dark grey for text and borders, provides contrast against light backgrounds -->
<Neutral Black> : <#000000> <!-- Pure black, used for text and high-contrast elements -->
<Neutral White> : <#FFFFFF> <!-- Pure white, used for backgrounds and light elements -->

<Feedback/Status Colors>
<Success Color> : <#00754A> <!-- Indicates successful actions, often a shade of green, should contrast well with neutral light -->
<Error Color> : <#C62828> <!-- Indicates errors or warnings, typically a shade of red, should be distinct from success color -->
<Warning Color> : <#F9A825> <!-- Used for cautionary messages, often in yellow or amber, should be noticeable against neutral backgrounds -->
<Info Color> : <#0B6E99> <!-- Used for informational messages, typically a shade of blue or teal, should contrast with both light and dark backgrounds -->

<Component Colors>
<Button Primary> : <#00754A> <!-- Primary button color, usually matches the primary brand color for visibility -->
<Button Secondary> : <#E6E6E3> <!-- Secondary button color, often aligns with the neutral light color for subtlety -->
<Alert Success Background> : <#E8F5F0> <!-- Background color for success alerts, relates to the success color -->
<Alert Error Background> : <#FDECEC> <!-- Background color for error alerts, relates to the error color -->
<Alert Warning Background> : <#FFF8E8> <!-- Background color for warning alerts, relates to the warning color -->
<Alert Info Background> : <#E9F4FA> <!-- Background color for informational alerts, relates to the info color -->

<Utility Colors>
<Border Light> : <#D4D4D0> <!-- Light border color, typically a lighter shade of neutral dark for subtle separation -->
<Border Dark> : <#4F4F4F> <!-- Darker border color for emphasis, can be a darker neutral -->
<Shadow Light> : <#0000001A> <!-- Light shadow color, often a transparent black for subtle depth -->
<Shadow Dark> : <#00000066> <!-- Dark shadow color, used for more pronounced shadow effects, can be a darker shade of neutral black -->

<Global Colors>
<Primary Brand Color> : <#00754A> <!-- Main brand color, foundational for the overall color scheme -->
<Secondary Brand Color> : <#D4E9E2> <!-- Secondary brand color, complements the primary brand color -->
<Accent Color 1> : <#1E3932> <!-- First accent color, derived from primary or secondary colors -->
<Accent Color 2> : <#00A862> <!-- Second accent color, provides additional vibrancy -->
<Neutral Light> : <#F4F4F2> <!-- Light neutral color for backgrounds -->
<Neutral Dark> : <#1F1F1F> <!-- Dark neutral color for text and elements -->
<Neutral Black> : <#000000> <!-- Pure black for high contrast -->
<Neutral White> : <#FFFFFF> <!-- Pure white for light backgrounds -->
<Feedback Success> : <#00754A> <!-- Color for success messages -->
<Feedback Error> : <#C62828> <!-- Color for error messages -->
<Feedback Warning> : <#F9A825> <!-- Color for warning messages -->
<Feedback Info> : <#0B6E99> <!-- Color for informational messages -->

<Documentation and Implementation>
<Design Token: Brand Primary> : <#00754A> <!-- Token for primary brand color in CSS or design system -->
<Design Token: Brand Secondary> : <#D4E9E2> <!-- Token for secondary brand color -->
<Design Token: Neutral Light> : <#F4F4F2> <!-- Token for light neutral color -->
<Design Token: Feedback Success> : <#00754A> <!-- Token for success feedback color -->
<Design Token: Feedback Error> : <#C62828> <!-- Token for error feedback color -->

## System-Level Color Palettes (`color100` to `color1000`)
Naming convention: `color.<family>.color100` ... `color.<family>.color1000`

### `primary`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.primary.color100` | `#CCE3DB` | `#8F9F99` |
| `color.primary.color200` | `#99C8B7` | `#6B8C80` |
| `color.primary.color300` | `#66AC92` | `#477866` |
| `color.primary.color400` | `#33916E` | `#24664D` |
| `color.primary.color500` | `#00754A` | `#005234` |
| `color.primary.color600` | `#005E3B` | `#004229` |
| `color.primary.color700` | `#00462C` | `#00311F` |
| `color.primary.color800` | `#002F1E` | `#002115` |
| `color.primary.color900` | `#00170F` | `#00100A` |
| `color.primary.color1000` | `#000000` | `#000000` |

### `secondary`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.secondary.color100` | `#F6FBF9` | `#ACB0AE` |
| `color.secondary.color200` | `#EEF6F3` | `#A7ACAA` |
| `color.secondary.color300` | `#E5F2EE` | `#A0A9A7` |
| `color.secondary.color400` | `#DDEDE8` | `#9BA6A2` |
| `color.secondary.color500` | `#D4E9E2` | `#94A39E` |
| `color.secondary.color600` | `#AABAB5` | `#77827F` |
| `color.secondary.color700` | `#7F8C88` | `#59625F` |
| `color.secondary.color800` | `#555D5A` | `#3B413F` |
| `color.secondary.color900` | `#2A2F2D` | `#1D211F` |
| `color.secondary.color1000` | `#000000` | `#000000` |

### `accent1`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.accent1.color100` | `#D2D7D6` | `#939696` |
| `color.accent1.color200` | `#A5B0AD` | `#737B79` |
| `color.accent1.color300` | `#788884` | `#545F5C` |
| `color.accent1.color400` | `#4B615B` | `#344440` |
| `color.accent1.color500` | `#1E3932` | `#152823` |
| `color.accent1.color600` | `#182E28` | `#11201C` |
| `color.accent1.color700` | `#12221E` | `#0D1815` |
| `color.accent1.color800` | `#0C1714` | `#08100E` |
| `color.accent1.color900` | `#060B0A` | `#040807` |
| `color.accent1.color1000` | `#000000` | `#000000` |

### `accent2`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.accent2.color100` | `#CCEEE0` | `#8FA79D` |
| `color.accent2.color200` | `#99DCC0` | `#6B9A86` |
| `color.accent2.color300` | `#66CBA1` | `#478E71` |
| `color.accent2.color400` | `#33B981` | `#24825A` |
| `color.accent2.color500` | `#00A862` | `#007645` |
| `color.accent2.color600` | `#00864E` | `#005E37` |
| `color.accent2.color700` | `#00653B` | `#004729` |
| `color.accent2.color800` | `#004327` | `#002F1B` |
| `color.accent2.color900` | `#002214` | `#00180E` |
| `color.accent2.color1000` | `#000000` | `#000000` |

### `neutral`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.neutral.color100` | `#F4F4F2` | `#ABABA9` |
| `color.neutral.color200` | `#E6E6E3` | `#A1A19F` |
| `color.neutral.color300` | `#D4D4D0` | `#949492` |
| `color.neutral.color400` | `#AFAFAC` | `#7A7A78` |
| `color.neutral.color500` | `#767676` | `#535353` |
| `color.neutral.color600` | `#4F4F4F` | `#373737` |
| `color.neutral.color700` | `#3A3A3A` | `#292929` |
| `color.neutral.color800` | `#1F1F1F` | `#161616` |
| `color.neutral.color900` | `#111111` | `#0C0C0C` |
| `color.neutral.color1000` | `#000000` | `#000000` |

### `success`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.success.color100` | `#CCE3DB` | `#8F9F99` |
| `color.success.color200` | `#99C8B7` | `#6B8C80` |
| `color.success.color300` | `#66AC92` | `#477866` |
| `color.success.color400` | `#33916E` | `#24664D` |
| `color.success.color500` | `#00754A` | `#005234` |
| `color.success.color600` | `#005E3B` | `#004229` |
| `color.success.color700` | `#00462C` | `#00311F` |
| `color.success.color800` | `#002F1E` | `#002115` |
| `color.success.color900` | `#00170F` | `#00100A` |
| `color.success.color1000` | `#000000` | `#000000` |

### `error`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.error.color100` | `#F4D4D4` | `#AB9494` |
| `color.error.color200` | `#E8A9A9` | `#A27676` |
| `color.error.color300` | `#DD7E7E` | `#9B5858` |
| `color.error.color400` | `#D15353` | `#923A3A` |
| `color.error.color500` | `#C62828` | `#8B1C1C` |
| `color.error.color600` | `#9E2020` | `#6F1616` |
| `color.error.color700` | `#771818` | `#531111` |
| `color.error.color800` | `#4F1010` | `#370B0B` |
| `color.error.color900` | `#280808` | `#1C0606` |
| `color.error.color1000` | `#000000` | `#000000` |

### `warning`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.warning.color100` | `#FEEED3` | `#B2A794` |
| `color.warning.color200` | `#FDDCA8` | `#B19A76` |
| `color.warning.color300` | `#FBCB7C` | `#B08E57` |
| `color.warning.color400` | `#FAB951` | `#AF8239` |
| `color.warning.color500` | `#F9A825` | `#AE761A` |
| `color.warning.color600` | `#C7861E` | `#8B5E15` |
| `color.warning.color700` | `#956516` | `#68470F` |
| `color.warning.color800` | `#64430F` | `#462F0A` |
| `color.warning.color900` | `#322207` | `#231805` |
| `color.warning.color1000` | `#000000` | `#000000` |

### `info`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.info.color100` | `#CEE2EB` | `#909EA4` |
| `color.info.color200` | `#9DC5D6` | `#6E8A96` |
| `color.info.color300` | `#6DA8C2` | `#4C7688` |
| `color.info.color400` | `#3C8BAD` | `#2A6179` |
| `color.info.color500` | `#0B6E99` | `#084D6B` |
| `color.info.color600` | `#09587A` | `#063E55` |
| `color.info.color700` | `#07425C` | `#052E40` |
| `color.info.color800` | `#042C3D` | `#031F2B` |
| `color.info.color900` | `#02161F` | `#010F16` |
| `color.info.color1000` | `#000000` | `#000000` |

## Core CSS Variables
```css
:root {
  --brand-primary: #00754A;
  --brand-secondary: #D4E9E2;
  --neutral-light: #F4F4F2;
  --neutral-dark: #1F1F1F;
  --feedback-success: #00754A;
  --feedback-error: #C62828;
}
[data-theme="dark"] {
  --brand-primary: #005234;
  --brand-secondary: #94A39E;
  --neutral-light: #ABABA9;
  --neutral-dark: #161616;
  --feedback-success: #005234;
  --feedback-error: #8B1C1C;
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
