# Candy Pop Color System (AI-Ready Foundation)

This file organizes the Candy Pop palette into a complete design + development token system for landing pages, brand pages, and product UI usage.

## Source Notes
- Source palette: `#9B5DE5 #F15BB5 #FEE440 #00BBF9 #00F5D4`.
- Mapping: primary `#9B5DE5`, secondary `#00BBF9`, accents `#F15BB5/#FEE440`, support `#00F5D4`.

## Structured Color System

<Brand Colors>
<Primary Color> : <#9B5DE5> <!-- Main brand color, used for primary actions and highlights -->
<Secondary Color> : <#00BBF9> <!-- Complementary color to the primary, used for accents and secondary actions -->

<Accent Colors>
<Accent Color 1> : <#F15BB5> <!-- Color that adds vibrancy, often used for buttons or highlights, derived from primary or secondary colors -->
<Accent Color 2> : <#FEE440> <!-- Additional accent color for variety, can be a lighter or darker shade of the primary or secondary color -->

<Neutral Colors>
<Neutral Light> : <#F7F7FB> <!-- Light grey for backgrounds, cards, and light elements, typically a lighter shade of neutral dark -->
<Neutral Dark> : <#2A2A3A> <!-- Dark grey for text and borders, provides contrast against light backgrounds -->
<Neutral Black> : <#000000> <!-- Pure black, used for text and high-contrast elements -->
<Neutral White> : <#FFFFFF> <!-- Pure white, used for backgrounds and light elements -->

<Feedback/Status Colors>
<Success Color> : <#00F5D4> <!-- Indicates successful actions, often a shade of green, should contrast well with neutral light -->
<Error Color> : <#F15BB5> <!-- Indicates errors or warnings, typically a shade of red, should be distinct from success color -->
<Warning Color> : <#FEE440> <!-- Used for cautionary messages, often in yellow or amber, should be noticeable against neutral backgrounds -->
<Info Color> : <#00BBF9> <!-- Used for informational messages, typically a shade of blue or teal, should contrast with both light and dark backgrounds -->

<Component Colors>
<Button Primary> : <#9B5DE5> <!-- Primary button color, usually matches the primary brand color for visibility -->
<Button Secondary> : <#ECECF3> <!-- Secondary button color, often aligns with the neutral light color for subtlety -->
<Alert Success Background> : <#E6FCF8> <!-- Background color for success alerts, relates to the success color -->
<Alert Error Background> : <#FDEBF6> <!-- Background color for error alerts, relates to the error color -->
<Alert Warning Background> : <#FFF9DA> <!-- Background color for warning alerts, relates to the warning color -->
<Alert Info Background> : <#E8F7FD> <!-- Background color for informational alerts, relates to the info color -->

<Utility Colors>
<Border Light> : <#DCDCE8> <!-- Light border color, typically a lighter shade of neutral dark for subtle separation -->
<Border Dark> : <#4B4B60> <!-- Darker border color for emphasis, can be a darker neutral -->
<Shadow Light> : <#0000001A> <!-- Light shadow color, often a transparent black for subtle depth -->
<Shadow Dark> : <#00000066> <!-- Dark shadow color, used for more pronounced shadow effects, can be a darker shade of neutral black -->

<Global Colors>
<Primary Brand Color> : <#9B5DE5> <!-- Main brand color, foundational for the overall color scheme -->
<Secondary Brand Color> : <#00BBF9> <!-- Secondary brand color, complements the primary brand color -->
<Accent Color 1> : <#F15BB5> <!-- First accent color, derived from primary or secondary colors -->
<Accent Color 2> : <#FEE440> <!-- Second accent color, provides additional vibrancy -->
<Neutral Light> : <#F7F7FB> <!-- Light neutral color for backgrounds -->
<Neutral Dark> : <#2A2A3A> <!-- Dark neutral color for text and elements -->
<Neutral Black> : <#000000> <!-- Pure black for high contrast -->
<Neutral White> : <#FFFFFF> <!-- Pure white for light backgrounds -->
<Feedback Success> : <#00F5D4> <!-- Color for success messages -->
<Feedback Error> : <#F15BB5> <!-- Color for error messages -->
<Feedback Warning> : <#FEE440> <!-- Color for warning messages -->
<Feedback Info> : <#00BBF9> <!-- Color for informational messages -->

<Documentation and Implementation>
<Design Token: Brand Primary> : <#9B5DE5> <!-- Token for primary brand color in CSS or design system -->
<Design Token: Brand Secondary> : <#00BBF9> <!-- Token for secondary brand color -->
<Design Token: Neutral Light> : <#F7F7FB> <!-- Token for light neutral color -->
<Design Token: Feedback Success> : <#00F5D4> <!-- Token for success feedback color -->
<Design Token: Feedback Error> : <#F15BB5> <!-- Token for error feedback color -->

## System-Level Color Palettes (`color100` to `color1000`)
Naming convention: `color.<family>.color100` ... `color.<family>.color1000`

### `primary`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.primary.color100` | `#EBDFFA` | `#A49CAF` |
| `color.primary.color200` | `#D7BEF5` | `#9685AC` |
| `color.primary.color300` | `#C39EEF` | `#886FA7` |
| `color.primary.color400` | `#AF7DEA` | `#7A58A4` |
| `color.primary.color500` | `#9B5DE5` | `#6C41A0` |
| `color.primary.color600` | `#7C4AB7` | `#573480` |
| `color.primary.color700` | `#5D3889` | `#412760` |
| `color.primary.color800` | `#3E255C` | `#2B1A40` |
| `color.primary.color900` | `#1F132E` | `#160D20` |
| `color.primary.color1000` | `#000000` | `#000000` |

### `secondary`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.secondary.color100` | `#CCF1FE` | `#8FA9B2` |
| `color.secondary.color200` | `#99E4FD` | `#6BA0B1` |
| `color.secondary.color300` | `#66D6FB` | `#4796B0` |
| `color.secondary.color400` | `#33C9FA` | `#248DAF` |
| `color.secondary.color500` | `#00BBF9` | `#0083AE` |
| `color.secondary.color600` | `#0096C7` | `#00698B` |
| `color.secondary.color700` | `#007095` | `#004E68` |
| `color.secondary.color800` | `#004B64` | `#003446` |
| `color.secondary.color900` | `#002532` | `#001A23` |
| `color.secondary.color1000` | `#000000` | `#000000` |

### `accent1`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.accent1.color100` | `#FCDEF0` | `#B09BA8` |
| `color.accent1.color200` | `#F9BDE1` | `#AE849E` |
| `color.accent1.color300` | `#F79DD3` | `#AD6E94` |
| `color.accent1.color400` | `#F47CC4` | `#AB5789` |
| `color.accent1.color500` | `#F15BB5` | `#A9407F` |
| `color.accent1.color600` | `#C14991` | `#873366` |
| `color.accent1.color700` | `#91376D` | `#66264C` |
| `color.accent1.color800` | `#602448` | `#431932` |
| `color.accent1.color900` | `#301224` | `#220D19` |
| `color.accent1.color1000` | `#000000` | `#000000` |

### `accent2`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.accent2.color100` | `#FFFAD9` | `#B2AF98` |
| `color.accent2.color200` | `#FFF4B3` | `#B2AB7D` |
| `color.accent2.color300` | `#FEEF8C` | `#B2A762` |
| `color.accent2.color400` | `#FEE966` | `#B2A347` |
| `color.accent2.color500` | `#FEE440` | `#B2A02D` |
| `color.accent2.color600` | `#CBB633` | `#8E7F24` |
| `color.accent2.color700` | `#988926` | `#6A601B` |
| `color.accent2.color800` | `#665B1A` | `#474012` |
| `color.accent2.color900` | `#332E0D` | `#242009` |
| `color.accent2.color1000` | `#000000` | `#000000` |

### `support`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.support.color100` | `#CCFDF6` | `#8FB1AC` |
| `color.support.color200` | `#99FBEE` | `#6BB0A7` |
| `color.support.color300` | `#66F9E5` | `#47AEA0` |
| `color.support.color400` | `#33F7DD` | `#24AD9B` |
| `color.support.color500` | `#00F5D4` | `#00AC94` |
| `color.support.color600` | `#00C4AA` | `#008977` |
| `color.support.color700` | `#00937F` | `#006759` |
| `color.support.color800` | `#006255` | `#00453B` |
| `color.support.color900` | `#00312A` | `#00221D` |
| `color.support.color1000` | `#000000` | `#000000` |

### `neutral`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.neutral.color100` | `#F7F7FB` | `#ADADB0` |
| `color.neutral.color200` | `#ECECF3` | `#A5A5AA` |
| `color.neutral.color300` | `#DCDCE8` | `#9A9AA2` |
| `color.neutral.color400` | `#B6B6C9` | `#7F7F8D` |
| `color.neutral.color500` | `#8D8DA3` | `#636372` |
| `color.neutral.color600` | `#686883` | `#49495C` |
| `color.neutral.color700` | `#4B4B60` | `#343443` |
| `color.neutral.color800` | `#353547` | `#252532` |
| `color.neutral.color900` | `#2A2A3A` | `#1D1D29` |
| `color.neutral.color1000` | `#000000` | `#000000` |

### `success`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.success.color100` | `#CCFDF6` | `#8FB1AC` |
| `color.success.color200` | `#99FBEE` | `#6BB0A7` |
| `color.success.color300` | `#66F9E5` | `#47AEA0` |
| `color.success.color400` | `#33F7DD` | `#24AD9B` |
| `color.success.color500` | `#00F5D4` | `#00AC94` |
| `color.success.color600` | `#00C4AA` | `#008977` |
| `color.success.color700` | `#00937F` | `#006759` |
| `color.success.color800` | `#006255` | `#00453B` |
| `color.success.color900` | `#00312A` | `#00221D` |
| `color.success.color1000` | `#000000` | `#000000` |

### `error`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.error.color100` | `#FCDEF0` | `#B09BA8` |
| `color.error.color200` | `#F9BDE1` | `#AE849E` |
| `color.error.color300` | `#F79DD3` | `#AD6E94` |
| `color.error.color400` | `#F47CC4` | `#AB5789` |
| `color.error.color500` | `#F15BB5` | `#A9407F` |
| `color.error.color600` | `#C14991` | `#873366` |
| `color.error.color700` | `#91376D` | `#66264C` |
| `color.error.color800` | `#602448` | `#431932` |
| `color.error.color900` | `#301224` | `#220D19` |
| `color.error.color1000` | `#000000` | `#000000` |

### `warning`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.warning.color100` | `#FFFAD9` | `#B2AF98` |
| `color.warning.color200` | `#FFF4B3` | `#B2AB7D` |
| `color.warning.color300` | `#FEEF8C` | `#B2A762` |
| `color.warning.color400` | `#FEE966` | `#B2A347` |
| `color.warning.color500` | `#FEE440` | `#B2A02D` |
| `color.warning.color600` | `#CBB633` | `#8E7F24` |
| `color.warning.color700` | `#988926` | `#6A601B` |
| `color.warning.color800` | `#665B1A` | `#474012` |
| `color.warning.color900` | `#332E0D` | `#242009` |
| `color.warning.color1000` | `#000000` | `#000000` |

### `info`
| Token | Light | Dark (algorithm) |
|---|---|---|
| `color.info.color100` | `#CCF1FE` | `#8FA9B2` |
| `color.info.color200` | `#99E4FD` | `#6BA0B1` |
| `color.info.color300` | `#66D6FB` | `#4796B0` |
| `color.info.color400` | `#33C9FA` | `#248DAF` |
| `color.info.color500` | `#00BBF9` | `#0083AE` |
| `color.info.color600` | `#0096C7` | `#00698B` |
| `color.info.color700` | `#007095` | `#004E68` |
| `color.info.color800` | `#004B64` | `#003446` |
| `color.info.color900` | `#002532` | `#001A23` |
| `color.info.color1000` | `#000000` | `#000000` |

## Core CSS Variables
```css
:root {
  --brand-primary: #9B5DE5;
  --brand-secondary: #00BBF9;
  --accent-1: #F15BB5;
  --accent-2: #FEE440;
  --neutral-light: #F7F7FB;
  --neutral-dark: #2A2A3A;
  --feedback-success: #00F5D4;
  --feedback-error: #F15BB5;
}
[data-theme="dark"] {
  --brand-primary: #6C41A0;
  --brand-secondary: #0083AE;
  --accent-1: #A9407F;
  --accent-2: #B2A02D;
  --neutral-light: #ADADB0;
  --neutral-dark: #1D1D29;
  --feedback-success: #00AC94;
  --feedback-error: #A9407F;
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
