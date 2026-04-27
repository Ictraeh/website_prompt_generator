# Frontend Color Palette Tokens (AI-Ready)

This file defines a scalable color system for web and app UI usage with three layers: global, semantic, and component tokens.

## Design Objectives
- Brand identity with clear primary and accent ownership.
- Platform-ready usage for responsive web and native apps.
- Accessibility-oriented token mapping (target WCAG 2.2 contrasts).
- Scalable structure for multi-brand and future dark mode expansion.
- Maintainable naming with predictable taxonomy.
- Reduced decision fatigue for designers and frontend engineers.

## Token Naming Convention
- Global: `color.global.<family>.<step>`
- Semantic: `color.semantic.<role>.<variant>`
- Component: `color.component.<component>.<slot>.<state>`
- Step scale: `0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000`

> Relax rule: all light-mode global swatches are softened by **15%** toward white to improve visual comfort and reuse in AI-generated UI drafts.

> Dark-mode rule: dark tokens are generated from relaxed light tokens using the provided RGB brightness algorithm with `adjustmentFactor = 0.3` (30% darker).

## 1) Global Colors (Light Mode, 15% Relaxed)

### `primary`

| Token | Hex |
|---|---|
| `color.global.primary.0` | `#FFFFFF` |
| `color.global.primary.50` | `#ECF1FD` |
| `color.global.primary.100` | `#DAE5FC` |
| `color.global.primary.200` | `#B5CAF8` |
| `color.global.primary.300` | `#90AFF5` |
| `color.global.primary.400` | `#6B95F1` |
| `color.global.primary.500` | `#467AEE` |
| `color.global.primary.600` | `#4069C6` |
| `color.global.primary.700` | `#39589E` |
| `color.global.primary.800` | `#334876` |
| `color.global.primary.900` | `#2C374E` |
| `color.global.primary.1000` | `#262626` |

### `secondary`

| Token | Hex |
|---|---|
| `color.global.secondary.0` | `#FFFFFF` |
| `color.global.secondary.50` | `#F4EEFD` |
| `color.global.secondary.100` | `#E9DEFC` |
| `color.global.secondary.200` | `#D3BCF9` |
| `color.global.secondary.300` | `#BC9BF6` |
| `color.global.secondary.400` | `#A679F3` |
| `color.global.secondary.500` | `#9058F0` |
| `color.global.secondary.600` | `#7A4DC8` |
| `color.global.secondary.700` | `#65449F` |
| `color.global.secondary.800` | `#513A77` |
| `color.global.secondary.900` | `#3C304E` |
| `color.global.secondary.1000` | `#262626` |

### `accent`

| Token | Hex |
|---|---|
| `color.global.accent.0` | `#FFFFFF` |
| `color.global.accent.50` | `#EBF7F7` |
| `color.global.accent.100` | `#D6F0F0` |
| `color.global.accent.200` | `#ADE0E0` |
| `color.global.accent.300` | `#84D1D0` |
| `color.global.accent.400` | `#5BC2C1` |
| `color.global.accent.500` | `#32B2B2` |
| `color.global.accent.600` | `#309696` |
| `color.global.accent.700` | `#2D7A7A` |
| `color.global.accent.800` | `#2B5E5E` |
| `color.global.accent.900` | `#294242` |
| `color.global.accent.1000` | `#262626` |

### `neutral`

| Token | Hex |
|---|---|
| `color.global.neutral.0` | `#FFFFFF` |
| `color.global.neutral.50` | `#F2F3F5` |
| `color.global.neutral.100` | `#E5E7EB` |
| `color.global.neutral.200` | `#CACFD8` |
| `color.global.neutral.300` | `#B0B8C4` |
| `color.global.neutral.400` | `#96A1B0` |
| `color.global.neutral.500` | `#7B899C` |
| `color.global.neutral.600` | `#6A7585` |
| `color.global.neutral.700` | `#59626D` |
| `color.global.neutral.800` | `#484D56` |
| `color.global.neutral.900` | `#373A3E` |
| `color.global.neutral.1000` | `#262626` |

### `success`

| Token | Hex |
|---|---|
| `color.global.success.0` | `#FFFFFF` |
| `color.global.success.50` | `#EBF7F0` |
| `color.global.success.100` | `#D7F0E0` |
| `color.global.success.200` | `#B0E0C2` |
| `color.global.success.300` | `#88D0A2` |
| `color.global.success.400` | `#61C084` |
| `color.global.success.500` | `#39B165` |
| `color.global.success.600` | `#369558` |
| `color.global.success.700` | `#317A4C` |
| `color.global.success.800` | `#2E5E40` |
| `color.global.success.900` | `#2A4233` |
| `color.global.success.1000` | `#262626` |

### `warning`

| Token | Hex |
|---|---|
| `color.global.warning.0` | `#FFFFFF` |
| `color.global.warning.50` | `#FCF3EA` |
| `color.global.warning.100` | `#F8E8D4` |
| `color.global.warning.200` | `#F2D1AA` |
| `color.global.warning.300` | `#EBB980` |
| `color.global.warning.400` | `#E6A256` |
| `color.global.warning.500` | `#DF8B2B` |
| `color.global.warning.600` | `#BA772A` |
| `color.global.warning.700` | `#95632A` |
| `color.global.warning.800` | `#704F28` |
| `color.global.warning.900` | `#4B3B27` |
| `color.global.warning.1000` | `#262626` |

### `error`

| Token | Hex |
|---|---|
| `color.global.error.0` | `#FFFFFF` |
| `color.global.error.50` | `#FCECEC` |
| `color.global.error.100` | `#F9DADA` |
| `color.global.error.200` | `#F3B5B5` |
| `color.global.error.300` | `#ED9090` |
| `color.global.error.400` | `#E76B6B` |
| `color.global.error.500` | `#E14747` |
| `color.global.error.600` | `#BC4040` |
| `color.global.error.700` | `#963A3A` |
| `color.global.error.800` | `#713333` |
| `color.global.error.900` | `#4C2D2D` |
| `color.global.error.1000` | `#262626` |

### `info`

| Token | Hex |
|---|---|
| `color.global.info.0` | `#FFFFFF` |
| `color.global.info.50` | `#EAF5FA` |
| `color.global.info.100` | `#D4EAF6` |
| `color.global.info.200` | `#A9D5EC` |
| `color.global.info.300` | `#7EC0E2` |
| `color.global.info.400` | `#53ACD9` |
| `color.global.info.500` | `#2896CF` |
| `color.global.info.600` | `#2880AD` |
| `color.global.info.700` | `#27698B` |
| `color.global.info.800` | `#27536A` |
| `color.global.info.900` | `#263C48` |
| `color.global.info.1000` | `#262626` |

## 2) Global Colors (Dark Mode, Calculated)

### `primary`

| Token | Hex | Source (Light) |
|---|---|---|
| `color.global.dark.primary.0` | `#B2B2B2` | `color.global.primary.0` |
| `color.global.dark.primary.50` | `#A5A9B1` | `color.global.primary.50` |
| `color.global.dark.primary.100` | `#99A0B0` | `color.global.primary.100` |
| `color.global.dark.primary.200` | `#7F8DAE` | `color.global.primary.200` |
| `color.global.dark.primary.300` | `#657AAC` | `color.global.primary.300` |
| `color.global.dark.primary.400` | `#4B68A9` | `color.global.primary.400` |
| `color.global.dark.primary.500` | `#3155A7` | `color.global.primary.500` |
| `color.global.dark.primary.600` | `#2D4A8B` | `color.global.primary.600` |
| `color.global.dark.primary.700` | `#283E6F` | `color.global.primary.700` |
| `color.global.dark.primary.800` | `#243253` | `color.global.primary.800` |
| `color.global.dark.primary.900` | `#1F2637` | `color.global.primary.900` |
| `color.global.dark.primary.1000` | `#1B1B1B` | `color.global.primary.1000` |

### `secondary`

| Token | Hex | Source (Light) |
|---|---|---|
| `color.global.dark.secondary.0` | `#B2B2B2` | `color.global.secondary.0` |
| `color.global.dark.secondary.50` | `#ABA7B1` | `color.global.secondary.50` |
| `color.global.dark.secondary.100` | `#A39BB0` | `color.global.secondary.100` |
| `color.global.dark.secondary.200` | `#9484AE` | `color.global.secondary.200` |
| `color.global.dark.secondary.300` | `#846CAC` | `color.global.secondary.300` |
| `color.global.dark.secondary.400` | `#7455AA` | `color.global.secondary.400` |
| `color.global.dark.secondary.500` | `#653EA8` | `color.global.secondary.500` |
| `color.global.dark.secondary.600` | `#55368C` | `color.global.secondary.600` |
| `color.global.dark.secondary.700` | `#47306F` | `color.global.secondary.700` |
| `color.global.dark.secondary.800` | `#392953` | `color.global.secondary.800` |
| `color.global.dark.secondary.900` | `#2A2237` | `color.global.secondary.900` |
| `color.global.dark.secondary.1000` | `#1B1B1B` | `color.global.secondary.1000` |

### `accent`

| Token | Hex | Source (Light) |
|---|---|---|
| `color.global.dark.accent.0` | `#B2B2B2` | `color.global.accent.0` |
| `color.global.dark.accent.50` | `#A4ADAD` | `color.global.accent.50` |
| `color.global.dark.accent.100` | `#96A8A8` | `color.global.accent.100` |
| `color.global.dark.accent.200` | `#799D9D` | `color.global.accent.200` |
| `color.global.dark.accent.300` | `#5C9292` | `color.global.accent.300` |
| `color.global.dark.accent.400` | `#408887` | `color.global.accent.400` |
| `color.global.dark.accent.500` | `#237D7D` | `color.global.accent.500` |
| `color.global.dark.accent.600` | `#226969` | `color.global.accent.600` |
| `color.global.dark.accent.700` | `#1F5555` | `color.global.accent.700` |
| `color.global.dark.accent.800` | `#1E4242` | `color.global.accent.800` |
| `color.global.dark.accent.900` | `#1D2E2E` | `color.global.accent.900` |
| `color.global.dark.accent.1000` | `#1B1B1B` | `color.global.accent.1000` |

### `neutral`

| Token | Hex | Source (Light) |
|---|---|---|
| `color.global.dark.neutral.0` | `#B2B2B2` | `color.global.neutral.0` |
| `color.global.dark.neutral.50` | `#A9AAAC` | `color.global.neutral.50` |
| `color.global.dark.neutral.100` | `#A0A2A4` | `color.global.neutral.100` |
| `color.global.dark.neutral.200` | `#8D9197` | `color.global.neutral.200` |
| `color.global.dark.neutral.300` | `#7B8189` | `color.global.neutral.300` |
| `color.global.dark.neutral.400` | `#69717B` | `color.global.neutral.400` |
| `color.global.dark.neutral.500` | `#56606D` | `color.global.neutral.500` |
| `color.global.dark.neutral.600` | `#4A525D` | `color.global.neutral.600` |
| `color.global.dark.neutral.700` | `#3E454C` | `color.global.neutral.700` |
| `color.global.dark.neutral.800` | `#32363C` | `color.global.neutral.800` |
| `color.global.dark.neutral.900` | `#26292B` | `color.global.neutral.900` |
| `color.global.dark.neutral.1000` | `#1B1B1B` | `color.global.neutral.1000` |

### `success`

| Token | Hex | Source (Light) |
|---|---|---|
| `color.global.dark.success.0` | `#B2B2B2` | `color.global.success.0` |
| `color.global.dark.success.50` | `#A4ADA8` | `color.global.success.50` |
| `color.global.dark.success.100` | `#96A89D` | `color.global.success.100` |
| `color.global.dark.success.200` | `#7B9D88` | `color.global.success.200` |
| `color.global.dark.success.300` | `#5F9271` | `color.global.success.300` |
| `color.global.dark.success.400` | `#44865C` | `color.global.success.400` |
| `color.global.dark.success.500` | `#287C47` | `color.global.success.500` |
| `color.global.dark.success.600` | `#26683E` | `color.global.success.600` |
| `color.global.dark.success.700` | `#225535` | `color.global.success.700` |
| `color.global.dark.success.800` | `#20422D` | `color.global.success.800` |
| `color.global.dark.success.900` | `#1D2E24` | `color.global.success.900` |
| `color.global.dark.success.1000` | `#1B1B1B` | `color.global.success.1000` |

### `warning`

| Token | Hex | Source (Light) |
|---|---|---|
| `color.global.dark.warning.0` | `#B2B2B2` | `color.global.warning.0` |
| `color.global.dark.warning.50` | `#B0AAA4` | `color.global.warning.50` |
| `color.global.dark.warning.100` | `#AEA294` | `color.global.warning.100` |
| `color.global.dark.warning.200` | `#A99277` | `color.global.warning.200` |
| `color.global.dark.warning.300` | `#A4825A` | `color.global.warning.300` |
| `color.global.dark.warning.400` | `#A1713C` | `color.global.warning.400` |
| `color.global.dark.warning.500` | `#9C611E` | `color.global.warning.500` |
| `color.global.dark.warning.600` | `#82531D` | `color.global.warning.600` |
| `color.global.dark.warning.700` | `#68451D` | `color.global.warning.700` |
| `color.global.dark.warning.800` | `#4E371C` | `color.global.warning.800` |
| `color.global.dark.warning.900` | `#34291B` | `color.global.warning.900` |
| `color.global.dark.warning.1000` | `#1B1B1B` | `color.global.warning.1000` |

### `error`

| Token | Hex | Source (Light) |
|---|---|---|
| `color.global.dark.error.0` | `#B2B2B2` | `color.global.error.0` |
| `color.global.dark.error.50` | `#B0A5A5` | `color.global.error.50` |
| `color.global.dark.error.100` | `#AE9999` | `color.global.error.100` |
| `color.global.dark.error.200` | `#AA7F7F` | `color.global.error.200` |
| `color.global.dark.error.300` | `#A66565` | `color.global.error.300` |
| `color.global.dark.error.400` | `#A24B4B` | `color.global.error.400` |
| `color.global.dark.error.500` | `#9E3232` | `color.global.error.500` |
| `color.global.dark.error.600` | `#842D2D` | `color.global.error.600` |
| `color.global.dark.error.700` | `#692929` | `color.global.error.700` |
| `color.global.dark.error.800` | `#4F2424` | `color.global.error.800` |
| `color.global.dark.error.900` | `#351F1F` | `color.global.error.900` |
| `color.global.dark.error.1000` | `#1B1B1B` | `color.global.error.1000` |

### `info`

| Token | Hex | Source (Light) |
|---|---|---|
| `color.global.dark.info.0` | `#B2B2B2` | `color.global.info.0` |
| `color.global.dark.info.50` | `#A4ACAF` | `color.global.info.50` |
| `color.global.dark.info.100` | `#94A4AC` | `color.global.info.100` |
| `color.global.dark.info.200` | `#7695A5` | `color.global.info.200` |
| `color.global.dark.info.300` | `#58869E` | `color.global.info.300` |
| `color.global.dark.info.400` | `#3A7898` | `color.global.info.400` |
| `color.global.dark.info.500` | `#1C6991` | `color.global.info.500` |
| `color.global.dark.info.600` | `#1C5A79` | `color.global.info.600` |
| `color.global.dark.info.700` | `#1B4A61` | `color.global.info.700` |
| `color.global.dark.info.800` | `#1B3A4A` | `color.global.info.800` |
| `color.global.dark.info.900` | `#1B2A32` | `color.global.info.900` |
| `color.global.dark.info.1000` | `#1B1B1B` | `color.global.info.1000` |

## 3) Semantic Tokens

### Light Mode Semantic Mapping

| Semantic Token | Global Ref | Hex |
|---|---|---|
| `color.semantic.bg.canvas` | `color.global.neutral.0` | `#FFFFFF` |
| `color.semantic.bg.surface` | `color.global.neutral.50` | `#F2F3F5` |
| `color.semantic.bg.elevated` | `color.global.neutral.100` | `#E5E7EB` |
| `color.semantic.bg.brand` | `color.global.primary.500` | `#467AEE` |
| `color.semantic.bg.success-soft` | `color.global.success.100` | `#D7F0E0` |
| `color.semantic.bg.warning-soft` | `color.global.warning.100` | `#F8E8D4` |
| `color.semantic.bg.error-soft` | `color.global.error.100` | `#F9DADA` |
| `color.semantic.bg.info-soft` | `color.global.info.100` | `#D4EAF6` |
| `color.semantic.text.primary` | `color.global.neutral.900` | `#373A3E` |
| `color.semantic.text.secondary` | `color.global.neutral.700` | `#59626D` |
| `color.semantic.text.inverse` | `color.global.neutral.0` | `#FFFFFF` |
| `color.semantic.text.brand` | `color.global.primary.700` | `#39589E` |
| `color.semantic.text.success` | `color.global.success.700` | `#317A4C` |
| `color.semantic.text.warning` | `color.global.warning.700` | `#95632A` |
| `color.semantic.text.error` | `color.global.error.700` | `#963A3A` |
| `color.semantic.text.info` | `color.global.info.700` | `#27698B` |
| `color.semantic.border.subtle` | `color.global.neutral.200` | `#CACFD8` |
| `color.semantic.border.default` | `color.global.neutral.300` | `#B0B8C4` |
| `color.semantic.border.strong` | `color.global.neutral.500` | `#7B899C` |
| `color.semantic.border.brand` | `color.global.primary.500` | `#467AEE` |
| `color.semantic.icon.primary` | `color.global.neutral.800` | `#484D56` |
| `color.semantic.icon.secondary` | `color.global.neutral.600` | `#6A7585` |
| `color.semantic.icon.inverse` | `color.global.neutral.0` | `#FFFFFF` |
| `color.semantic.icon.brand` | `color.global.primary.600` | `#4069C6` |

### Dark Mode Semantic Mapping (Calculated References)

| Semantic Token | Global Ref (Dark) | Hex |
|---|---|---|
| `color.semantic.bg.canvas` | `color.global.dark.neutral.1000` | `#1B1B1B` |
| `color.semantic.bg.surface` | `color.global.dark.neutral.900` | `#26292B` |
| `color.semantic.bg.elevated` | `color.global.dark.neutral.800` | `#32363C` |
| `color.semantic.bg.brand` | `color.global.dark.primary.700` | `#283E6F` |
| `color.semantic.bg.success-soft` | `color.global.dark.success.900` | `#1D2E24` |
| `color.semantic.bg.warning-soft` | `color.global.dark.warning.900` | `#34291B` |
| `color.semantic.bg.error-soft` | `color.global.dark.error.900` | `#351F1F` |
| `color.semantic.bg.info-soft` | `color.global.dark.info.900` | `#1B2A32` |
| `color.semantic.text.primary` | `color.global.dark.neutral.50` | `#A9AAAC` |
| `color.semantic.text.secondary` | `color.global.dark.neutral.200` | `#8D9197` |
| `color.semantic.text.inverse` | `color.global.dark.neutral.1000` | `#1B1B1B` |
| `color.semantic.text.brand` | `color.global.dark.primary.100` | `#99A0B0` |
| `color.semantic.text.success` | `color.global.dark.success.100` | `#96A89D` |
| `color.semantic.text.warning` | `color.global.dark.warning.100` | `#AEA294` |
| `color.semantic.text.error` | `color.global.dark.error.100` | `#AE9999` |
| `color.semantic.text.info` | `color.global.dark.info.100` | `#94A4AC` |
| `color.semantic.border.subtle` | `color.global.dark.neutral.700` | `#3E454C` |
| `color.semantic.border.default` | `color.global.dark.neutral.600` | `#4A525D` |
| `color.semantic.border.strong` | `color.global.dark.neutral.400` | `#69717B` |
| `color.semantic.border.brand` | `color.global.dark.primary.400` | `#4B68A9` |
| `color.semantic.icon.primary` | `color.global.dark.neutral.100` | `#A0A2A4` |
| `color.semantic.icon.secondary` | `color.global.dark.neutral.300` | `#7B8189` |
| `color.semantic.icon.inverse` | `color.global.dark.neutral.1000` | `#1B1B1B` |
| `color.semantic.icon.brand` | `color.global.dark.primary.200` | `#7F8DAE` |

## 4) Component Tokens (Starter Set)

| Component Token | Light Mode Ref | Dark Mode Ref |
|---|---|---|
| `color.component.button.primary.bg.default` | `color.semantic.bg.brand` | `color.semantic.bg.brand` |
| `color.component.button.primary.bg.hover` | `primary.600` | `dark.primary.600` |
| `color.component.button.primary.bg.pressed` | `primary.700` | `dark.primary.700` |
| `color.component.button.primary.text` | `color.semantic.text.inverse` | `color.semantic.text.inverse` |
| `color.component.button.secondary.bg.default` | `neutral.100` | `dark.neutral.100` |
| `color.component.button.secondary.bg.hover` | `neutral.200` | `dark.neutral.200` |
| `color.component.button.secondary.text` | `color.semantic.text.primary` | `color.semantic.text.primary` |
| `color.component.input.bg` | `color.semantic.bg.surface` | `color.semantic.bg.surface` |
| `color.component.input.border` | `color.semantic.border.default` | `color.semantic.border.default` |
| `color.component.input.border.focus` | `color.semantic.border.brand` | `color.semantic.border.brand` |
| `color.component.input.text` | `color.semantic.text.primary` | `color.semantic.text.primary` |
| `color.component.badge.success.bg` | `success.100` | `dark.success.100` |
| `color.component.badge.success.text` | `success.700` | `dark.success.700` |
| `color.component.badge.error.bg` | `error.100` | `dark.error.100` |
| `color.component.badge.error.text` | `error.700` | `dark.error.700` |

## 5) Accessibility and Usage Notes
- Validate text/background pairs with WCAG 2.2 contrast checks before production lock.
- Prefer semantic tokens in UI code; avoid consuming global tokens directly in product surfaces.
- Keep brand accent tokens static only where brand recognition is required across modes.
- For hover/pressed/loading, prefer opacity layers or step shifts over ad-hoc custom colors.
- Run visual regression checks across mobile + desktop breakpoints in both modes.

## 6) Algorithm Reference (Implemented)
```js
function convertToDarkMode(hexColor, adjustmentFactor = 0.3) {
  const [r, g, b] = hexToRgb(hexColor);
  const newR = Math.max(0, Math.round(r * (1 - adjustmentFactor)));
  const newG = Math.max(0, Math.round(g * (1 - adjustmentFactor)));
  const newB = Math.max(0, Math.round(b * (1 - adjustmentFactor)));
  return rgbToHex(newR, newG, newB);
}
```
