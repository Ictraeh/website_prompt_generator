# Atlassian Color System (AI-Ready Foundation)

This file organizes Atlassian color palette tokens into a complete design + development foundation using your requested structure and includes algorithm-generated dark variants.

## Source Notes
- Source palette: Atlassian Design color palette ramps (Lime, Red, Orange, Yellow, Green, Teal, Blue, Purple, Magenta, light/dark neutrals, alpha neutrals).
- Naming in this file maps to `color.palette.*` values from Atlassian token data.

## Structured Color System

<Brand Colors>
<Primary Color> : <#1868DB> <!-- Main brand color, used for primary actions and highlights -->
<Secondary Color> : <#227D9B> <!-- Complementary color to the primary, used for accents and secondary actions -->

<Accent Colors>
<Accent Color 1> : <#964AC0> <!-- Color that adds vibrancy, often used for buttons or highlights, derived from primary or secondary colors -->
<Accent Color 2> : <#AE4787> <!-- Additional accent color for variety, can be a lighter or darker shade of the primary or secondary color -->

<Neutral Colors>
<Neutral Light> : <#F8F8F8> <!-- Light grey for backgrounds, cards, and light elements, typically a lighter shade of neutral dark -->
<Neutral Dark> : <#292A2E> <!-- Dark grey for text and borders, provides contrast against light backgrounds -->
<Neutral Black> : <#000000> <!-- Pure black, used for text and high-contrast elements -->
<Neutral White> : <#FFFFFF> <!-- Pure white, used for backgrounds and light elements -->

<Feedback/Status Colors>
<Success Color> : <#1F845A> <!-- Indicates successful actions, often a shade of green, should contrast well with neutral light -->
<Error Color> : <#C9372C> <!-- Indicates errors or warnings, typically a shade of red, should be distinct from success color -->
<Warning Color> : <#BD5B00> <!-- Used for cautionary messages, often in yellow or amber, should be noticeable against neutral backgrounds -->
<Info Color> : <#1868DB> <!-- Used for informational messages, typically a shade of blue or teal, should contrast with both light and dark backgrounds -->

<Component Colors>
<Button Primary> : <#1868DB> <!-- Primary button color, usually matches the primary brand color for visibility -->
<Button Secondary> : <#F0F1F2> <!-- Secondary button color, often aligns with the neutral light color for subtlety -->
<Alert Success Background> : <#DCFFF1> <!-- Background color for success alerts, relates to the success color -->
<Alert Error Background> : <#FFECEB> <!-- Background color for error alerts, relates to the error color -->
<Alert Warning Background> : <#FFF5DB> <!-- Background color for warning alerts, relates to the warning color -->
<Alert Info Background> : <#E9F2FE> <!-- Background color for informational alerts, relates to the info color -->

<Utility Colors>
<Border Light> : <#DDDEE1> <!-- Light border color, typically a lighter shade of neutral dark for subtle separation -->
<Border Dark> : <#6B6E76> <!-- Darker border color for emphasis, can be a darker neutral -->
<Shadow Light> : <#0B120E24> <!-- Light shadow color, often a transparent black for subtle depth -->
<Shadow Dark> : <#050C1F75> <!-- Dark shadow color, used for more pronounced shadow effects, can be a darker shade of neutral black -->

<Global Colors>
<Primary Brand Color> : <#1868DB> <!-- Main brand color, foundational for the overall color scheme -->
<Secondary Brand Color> : <#227D9B> <!-- Secondary brand color, complements the primary brand color -->
<Accent Color 1> : <#964AC0> <!-- First accent color, derived from primary or secondary colors -->
<Accent Color 2> : <#AE4787> <!-- Second accent color, provides additional vibrancy -->
<Neutral Light> : <#F8F8F8> <!-- Light neutral color for backgrounds -->
<Neutral Dark> : <#292A2E> <!-- Dark neutral color for text and elements -->
<Neutral Black> : <#000000> <!-- Pure black for high contrast -->
<Neutral White> : <#FFFFFF> <!-- Pure white for light backgrounds -->
<Feedback Success> : <#1F845A> <!-- Color for success messages -->
<Feedback Error> : <#C9372C> <!-- Color for error messages -->
<Feedback Warning> : <#BD5B00> <!-- Color for warning messages -->
<Feedback Info> : <#1868DB> <!-- Color for informational messages -->

<Documentation and Implementation>
<Design Token: Brand Primary> : <#1868DB> <!-- Token for primary brand color in CSS or design system -->
<Design Token: Brand Secondary> : <#227D9B> <!-- Token for secondary brand color -->
<Design Token: Neutral Light> : <#F8F8F8> <!-- Token for light neutral color -->
<Design Token: Feedback Success> : <#1F845A> <!-- Token for success feedback color -->
<Design Token: Feedback Error> : <#C9372C> <!-- Token for error feedback color -->

## System-Level Color Palettes (Complete)

Includes all Atlassian palette ramps: `100/200/250/300/400/500/600/700/800/850/900/1000`, light/dark neutrals, and alpha neutrals.

### `Lime`
| Token | Atlassian Source | Light | Dark (algorithm) |
|---|---|---|---|
| `color.lime.color100` | `color.palette.Lime100` | `#EFFFD6` | `#A7B296` |
| `color.lime.color200` | `color.palette.Lime200` | `#D3F1A7` | `#94A975` |
| `color.lime.color250` | `color.palette.Lime250` | `#BDE97C` | `#84A357` |
| `color.lime.color300` | `color.palette.Lime300` | `#B3DF72` | `#7D9C50` |
| `color.lime.color400` | `color.palette.Lime400` | `#94C748` | `#688B32` |
| `color.lime.color500` | `color.palette.Lime500` | `#82B536` | `#5B7F26` |
| `color.lime.color600` | `color.palette.Lime600` | `#6A9A23` | `#4A6C18` |
| `color.lime.color700` | `color.palette.Lime700` | `#5B7F24` | `#405919` |
| `color.lime.color800` | `color.palette.Lime800` | `#4C6B1F` | `#354B16` |
| `color.lime.color850` | `color.palette.Lime850` | `#3F5224` | `#2C3919` |
| `color.lime.color900` | `color.palette.Lime900` | `#37471F` | `#263216` |
| `color.lime.color1000` | `color.palette.Lime1000` | `#28311B` | `#1C2213` |

### `Red`
| Token | Atlassian Source | Light | Dark (algorithm) |
|---|---|---|---|
| `color.red.color100` | `color.palette.Red100` | `#FFECEB` | `#B2A5A4` |
| `color.red.color200` | `color.palette.Red200` | `#FFD5D2` | `#B29593` |
| `color.red.color250` | `color.palette.Red250` | `#FFB8B2` | `#B2817D` |
| `color.red.color300` | `color.palette.Red300` | `#FD9891` | `#B16A66` |
| `color.red.color400` | `color.palette.Red400` | `#F87168` | `#AE4F49` |
| `color.red.color500` | `color.palette.Red500` | `#F15B50` | `#A94038` |
| `color.red.color600` | `color.palette.Red600` | `#E2483D` | `#9E322B` |
| `color.red.color700` | `color.palette.Red700` | `#C9372C` | `#8D261F` |
| `color.red.color800` | `color.palette.Red800` | `#AE2E24` | `#7A2019` |
| `color.red.color850` | `color.palette.Red850` | `#872821` | `#5E1C17` |
| `color.red.color900` | `color.palette.Red900` | `#5D1F1A` | `#411612` |
| `color.red.color1000` | `color.palette.Red1000` | `#42221F` | `#2E1816` |

### `Orange`
| Token | Atlassian Source | Light | Dark (algorithm) |
|---|---|---|---|
| `color.orange.color100` | `color.palette.Orange100` | `#FFF5DB` | `#B2AC99` |
| `color.orange.color200` | `color.palette.Orange200` | `#FCE4A6` | `#B0A074` |
| `color.orange.color250` | `color.palette.Orange250` | `#FBD779` | `#B09655` |
| `color.orange.color300` | `color.palette.Orange300` | `#FBC828` | `#B08C1C` |
| `color.orange.color400` | `color.palette.Orange400` | `#FCA700` | `#B07500` |
| `color.orange.color500` | `color.palette.Orange500` | `#F68909` | `#AC6006` |
| `color.orange.color600` | `color.palette.Orange600` | `#E06C00` | `#9D4C00` |
| `color.orange.color700` | `color.palette.Orange700` | `#BD5B00` | `#844000` |
| `color.orange.color800` | `color.palette.Orange800` | `#9E4C00` | `#6F3500` |
| `color.orange.color850` | `color.palette.Orange850` | `#7A3B00` | `#552900` |
| `color.orange.color900` | `color.palette.Orange900` | `#693200` | `#4A2300` |
| `color.orange.color1000` | `color.palette.Orange1000` | `#3A2C1F` | `#291F16` |

### `Yellow`
| Token | Atlassian Source | Light | Dark (algorithm) |
|---|---|---|---|
| `color.yellow.color100` | `color.palette.Yellow100` | `#FEF7C8` | `#B2AD8C` |
| `color.yellow.color200` | `color.palette.Yellow200` | `#F5E989` | `#ACA360` |
| `color.yellow.color250` | `color.palette.Yellow250` | `#EFDD4E` | `#A79B37` |
| `color.yellow.color300` | `color.palette.Yellow300` | `#EED12B` | `#A7921E` |
| `color.yellow.color400` | `color.palette.Yellow400` | `#DDB30E` | `#9B7D0A` |
| `color.yellow.color500` | `color.palette.Yellow500` | `#CF9F02` | `#916F01` |
| `color.yellow.color600` | `color.palette.Yellow600` | `#B38600` | `#7D5E00` |
| `color.yellow.color700` | `color.palette.Yellow700` | `#946F00` | `#684E00` |
| `color.yellow.color800` | `color.palette.Yellow800` | `#7F5F01` | `#594201` |
| `color.yellow.color850` | `color.palette.Yellow850` | `#614A05` | `#443404` |
| `color.yellow.color900` | `color.palette.Yellow900` | `#533F04` | `#3A2C03` |
| `color.yellow.color1000` | `color.palette.Yellow1000` | `#332E1B` | `#242013` |

### `Green`
| Token | Atlassian Source | Light | Dark (algorithm) |
|---|---|---|---|
| `color.green.color100` | `color.palette.Green100` | `#DCFFF1` | `#9AB2A9` |
| `color.green.color200` | `color.palette.Green200` | `#BAF3DB` | `#82AA99` |
| `color.green.color250` | `color.palette.Green250` | `#97EDC9` | `#6AA68D` |
| `color.green.color300` | `color.palette.Green300` | `#7EE2B8` | `#589E81` |
| `color.green.color400` | `color.palette.Green400` | `#4BCE97` | `#34906A` |
| `color.green.color500` | `color.palette.Green500` | `#2ABB7F` | `#1D8359` |
| `color.green.color600` | `color.palette.Green600` | `#22A06B` | `#18704B` |
| `color.green.color700` | `color.palette.Green700` | `#1F845A` | `#165C3F` |
| `color.green.color800` | `color.palette.Green800` | `#216E4E` | `#174D37` |
| `color.green.color850` | `color.palette.Green850` | `#19573D` | `#123D2B` |
| `color.green.color900` | `color.palette.Green900` | `#164B35` | `#0F3425` |
| `color.green.color1000` | `color.palette.Green1000` | `#1C3329` | `#14241D` |

### `Teal`
| Token | Atlassian Source | Light | Dark (algorithm) |
|---|---|---|---|
| `color.teal.color100` | `color.palette.Teal100` | `#E7F9FF` | `#A2AEB2` |
| `color.teal.color200` | `color.palette.Teal200` | `#C6EDFB` | `#8BA6B0` |
| `color.teal.color250` | `color.palette.Teal250` | `#B1E4F7` | `#7CA0AD` |
| `color.teal.color300` | `color.palette.Teal300` | `#9DD9EE` | `#6E98A7` |
| `color.teal.color400` | `color.palette.Teal400` | `#6CC3E0` | `#4C889D` |
| `color.teal.color500` | `color.palette.Teal500` | `#42B2D7` | `#2E7D96` |
| `color.teal.color600` | `color.palette.Teal600` | `#2898BD` | `#1C6A84` |
| `color.teal.color700` | `color.palette.Teal700` | `#227D9B` | `#18586C` |
| `color.teal.color800` | `color.palette.Teal800` | `#206A83` | `#164A5C` |
| `color.teal.color850` | `color.palette.Teal850` | `#1A5265` | `#123947` |
| `color.teal.color900` | `color.palette.Teal900` | `#164555` | `#0F303B` |
| `color.teal.color1000` | `color.palette.Teal1000` | `#1E3137` | `#152226` |

### `Blue`
| Token | Atlassian Source | Light | Dark (algorithm) |
|---|---|---|---|
| `color.blue.color100` | `color.palette.Blue100` | `#E9F2FE` | `#A3A9B2` |
| `color.blue.color200` | `color.palette.Blue200` | `#CFE1FD` | `#919EB1` |
| `color.blue.color250` | `color.palette.Blue250` | `#ADCBFB` | `#798EB0` |
| `color.blue.color300` | `color.palette.Blue300` | `#8FB8F6` | `#6481AC` |
| `color.blue.color400` | `color.palette.Blue400` | `#669DF1` | `#476EA9` |
| `color.blue.color500` | `color.palette.Blue500` | `#4688EC` | `#315FA5` |
| `color.blue.color600` | `color.palette.Blue600` | `#357DE8` | `#2558A2` |
| `color.blue.color700` | `color.palette.Blue700` | `#1868DB` | `#114999` |
| `color.blue.color800` | `color.palette.Blue800` | `#1558BC` | `#0F3E84` |
| `color.blue.color850` | `color.palette.Blue850` | `#144794` | `#0E3268` |
| `color.blue.color900` | `color.palette.Blue900` | `#123263` | `#0D2345` |
| `color.blue.color1000` | `color.palette.Blue1000` | `#1C2B42` | `#141E2E` |

### `Purple`
| Token | Atlassian Source | Light | Dark (algorithm) |
|---|---|---|---|
| `color.purple.color100` | `color.palette.Purple100` | `#F8EEFE` | `#AEA7B2` |
| `color.purple.color200` | `color.palette.Purple200` | `#EED7FC` | `#A796B0` |
| `color.purple.color250` | `color.palette.Purple250` | `#E3BDFA` | `#9F84AF` |
| `color.purple.color300` | `color.palette.Purple300` | `#D8A0F7` | `#9770AD` |
| `color.purple.color400` | `color.palette.Purple400` | `#C97CF4` | `#8D57AB` |
| `color.purple.color500` | `color.palette.Purple500` | `#BF63F3` | `#8645AA` |
| `color.purple.color600` | `color.palette.Purple600` | `#AF59E1` | `#7A3E9E` |
| `color.purple.color700` | `color.palette.Purple700` | `#964AC0` | `#693486` |
| `color.purple.color800` | `color.palette.Purple800` | `#803FA5` | `#5A2C73` |
| `color.purple.color850` | `color.palette.Purple850` | `#673286` | `#48235E` |
| `color.purple.color900` | `color.palette.Purple900` | `#48245D` | `#321941` |
| `color.purple.color1000` | `color.palette.Purple1000` | `#35243F` | `#25192C` |

### `Magenta`
| Token | Atlassian Source | Light | Dark (algorithm) |
|---|---|---|---|
| `color.magenta.color100` | `color.palette.Magenta100` | `#FFECF8` | `#B2A5AE` |
| `color.magenta.color200` | `color.palette.Magenta200` | `#FDD0EC` | `#B192A5` |
| `color.magenta.color250` | `color.palette.Magenta250` | `#FCB6E1` | `#B07F9E` |
| `color.magenta.color300` | `color.palette.Magenta300` | `#F797D2` | `#AD6A93` |
| `color.magenta.color400` | `color.palette.Magenta400` | `#E774BB` | `#A25183` |
| `color.magenta.color500` | `color.palette.Magenta500` | `#DA62AC` | `#994578` |
| `color.magenta.color600` | `color.palette.Magenta600` | `#CD519D` | `#90396E` |
| `color.magenta.color700` | `color.palette.Magenta700` | `#AE4787` | `#7A325E` |
| `color.magenta.color800` | `color.palette.Magenta800` | `#943D73` | `#682B50` |
| `color.magenta.color850` | `color.palette.Magenta850` | `#77325B` | `#532340` |
| `color.magenta.color900` | `color.palette.Magenta900` | `#50253F` | `#381A2C` |
| `color.magenta.color1000` | `color.palette.Magenta1000` | `#3D2232` | `#2B1823` |

### `Neutral`
| Token | Atlassian Source | Light | Dark (algorithm) |
|---|---|---|---|
| `color.neutral.color0` | `color.palette.Neutral0` | `#FFFFFF` | `#B2B2B2` |
| `color.neutral.color100` | `color.palette.Neutral100` | `#F8F8F8` | `#AEAEAE` |
| `color.neutral.color200` | `color.palette.Neutral200` | `#F0F1F2` | `#A8A9A9` |
| `color.neutral.color300` | `color.palette.Neutral300` | `#DDDEE1` | `#9B9B9E` |
| `color.neutral.color400` | `color.palette.Neutral400` | `#B7B9BE` | `#808285` |
| `color.neutral.color500` | `color.palette.Neutral500` | `#8C8F97` | `#62646A` |
| `color.neutral.color600` | `color.palette.Neutral600` | `#7D818A` | `#585A61` |
| `color.neutral.color700` | `color.palette.Neutral700` | `#6B6E76` | `#4B4D53` |
| `color.neutral.color800` | `color.palette.Neutral800` | `#505258` | `#38393E` |
| `color.neutral.color900` | `color.palette.Neutral900` | `#3B3D42` | `#292B2E` |
| `color.neutral.color1000` | `color.palette.Neutral1000` | `#292A2E` | `#1D1D20` |
| `color.neutral.color1100` | `color.palette.Neutral1100` | `#1E1F21` | `#151617` |

### `NeutralA`
| Token | Atlassian Source | Light | Dark (algorithm) |
|---|---|---|---|
| `color.neutrala.color100A` | `color.palette.Neutral100A` | `#17171708` | `#10101008` |
| `color.neutrala.color200A` | `color.palette.Neutral200A` | `#0515240F` | `#040F190F` |
| `color.neutrala.color300A` | `color.palette.Neutral300A` | `#0B120E24` | `#080D0A24` |
| `color.neutrala.color400A` | `color.palette.Neutral400A` | `#080F214A` | `#060A174A` |
| `color.neutrala.color500A` | `color.palette.Neutral500A` | `#050C1F75` | `#04081675` |

### `DarkNeutral`
| Token | Atlassian Source | Light | Dark (algorithm) |
|---|---|---|---|
| `color.darkneutral.color-100` | `color.palette.DarkNeutral-100` | `#111213` | `#0C0D0D` |
| `color.darkneutral.color0` | `color.palette.DarkNeutral0` | `#18191A` | `#111212` |
| `color.darkneutral.color100` | `color.palette.DarkNeutral100` | `#1F1F21` | `#161617` |
| `color.darkneutral.color200` | `color.palette.DarkNeutral200` | `#242528` | `#191A1C` |
| `color.darkneutral.color250` | `color.palette.DarkNeutral250` | `#2B2C2F` | `#1E1F21` |
| `color.darkneutral.color300` | `color.palette.DarkNeutral300` | `#303134` | `#222224` |
| `color.darkneutral.color350` | `color.palette.DarkNeutral350` | `#3D3F43` | `#2B2C2F` |
| `color.darkneutral.color400` | `color.palette.DarkNeutral400` | `#4B4D51` | `#343639` |
| `color.darkneutral.color500` | `color.palette.DarkNeutral500` | `#63666B` | `#45474B` |
| `color.darkneutral.color600` | `color.palette.DarkNeutral600` | `#7E8188` | `#585A5F` |
| `color.darkneutral.color700` | `color.palette.DarkNeutral700` | `#96999E` | `#696B6F` |
| `color.darkneutral.color800` | `color.palette.DarkNeutral800` | `#A9ABAF` | `#76787A` |
| `color.darkneutral.color900` | `color.palette.DarkNeutral900` | `#BFC1C4` | `#868789` |
| `color.darkneutral.color1000` | `color.palette.DarkNeutral1000` | `#CECFD2` | `#909193` |
| `color.darkneutral.color1100` | `color.palette.DarkNeutral1100` | `#E2E3E4` | `#9E9FA0` |

### `DarkNeutralA`
| Token | Atlassian Source | Light | Dark (algorithm) |
|---|---|---|---|
| `color.darkneutrala.color-100A` | `color.palette.DarkNeutral-100A` | `#01040475` | `#01030375` |
| `color.darkneutrala.color100A` | `color.palette.DarkNeutral100A` | `#BDBDBD0A` | `#8484840A` |
| `color.darkneutrala.color200A` | `color.palette.DarkNeutral200A` | `#CECED912` | `#90909812` |
| `color.darkneutrala.color250A` | `color.palette.DarkNeutral250A` | `#D9DAE71A` | `#9899A21A` |
| `color.darkneutrala.color300A` | `color.palette.DarkNeutral300A` | `#E3E4F21F` | `#9FA0A91F` |
| `color.darkneutrala.color350A` | `color.palette.DarkNeutral350A` | `#E8EDFD2E` | `#A2A6B12E` |
| `color.darkneutrala.color400A` | `color.palette.DarkNeutral400A` | `#E5E9F640` | `#A0A3AC40` |
| `color.darkneutrala.color500A` | `color.palette.DarkNeutral500A` | `#E9F0FB5C` | `#A3A8B05C` |

## Core CSS Variables
```css
:root {
  --brand-primary: #1868DB;
  --brand-secondary: #227D9B;
  --neutral-light: #F8F8F8;
  --neutral-dark: #292A2E;
  --feedback-success: #1F845A;
  --feedback-error: #C9372C;
}
[data-theme="dark"] {
  --brand-primary: #114999;
  --brand-secondary: #18586C;
  --neutral-light: #AEAEAE;
  --neutral-dark: #1D1D20;
  --feedback-success: #165C3F;
  --feedback-error: #8D261F;
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
