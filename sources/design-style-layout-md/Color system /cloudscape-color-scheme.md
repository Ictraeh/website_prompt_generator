# Cloudscape Color Scheme (Frontend + App)

This document maps official Cloudscape color tokens into a frontend-ready reference for web and app usage, using exact token names and hex values from Cloudscape design tokens.

## Source and Compliance
- Source tokens: `@cloudscape-design/design-tokens` (`index-visual-refresh.json`).
- Color usage intent aligns with Cloudscape guidance for highlighting/accent, status encoding, and accessibility contrast.
- Light and dark mode values below are official token values (not approximated).

## Token Format
- Token naming: `color-<category>-<item>-<state>`
- Mode values: `light` and `dark`

## Usage Categories
- `background`: Page, container, surface, and state backgrounds.
- `text`: Body, heading, link, status, and state-aware text colors.
- `border`: Default, focus, divider, status, and interactive borders.
- `foreground`: Foreground fills for core actions and controls.
- `charts`: Data visualization palette colors with contrast-index steps.
- `dropzone`: Upload/dropzone background and text interaction states.
- `board`: Board-specific surfaces and dividers.
- `drag`: Drag-and-drop visual feedback colors.
- `item`: Item-level status/background color.
- `tree`: Tree-view interaction color.

## Complete Cloudscape Color Tokens

### `background`

Usage: Page, container, surface, and state backgrounds.

| Token | Light | Dark | Description |
|---|---|---|---|
| `color-background-avatar-default` | `#424650` | `#424650` | The default background color of avatars. |
| `color-background-avatar-gen-ai` | `radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)` | `radial-gradient(circle farthest-corner at top right, #b8e7ff 0%, #0099ff 25%, #5c7fff 40% , #8575ff 60%, #962eff 80%)` | The gen-ai background color of avatars. |
| `color-background-button-link-active` | `#d1f1ff` | `#333843` | The background color of link buttons in active state. |
| `color-background-button-link-hover` | `#f0fbff` | `#1b232d` | The background color of link buttons in hover state. |
| `color-background-button-normal-active` | `#d1f1ff` | `#333843` | The background color of normal buttons in active state. |
| `color-background-button-normal-default` | `#ffffff` | `#161d26` | The default background color of normal buttons. |
| `color-background-button-normal-disabled` | `#ffffff` | `#161d26` | The background color of normal buttons in disabled state. |
| `color-background-button-normal-hover` | `#f0fbff` | `#1b232d` | The background color of normal buttons in hover state. |
| `color-background-button-primary-active` | `#002b66` | `#42b4ff` | The background color of primary buttons in active state. |
| `color-background-button-primary-default` | `#006ce0` | `#42b4ff` | The default background color of primary buttons. |
| `color-background-button-primary-disabled` | `#ebebf0` | `#232b37` | The background color of primary buttons in disabled state. |
| `color-background-button-primary-hover` | `#002b66` | `#75cfff` | The background color of primary buttons in hover state. |
| `color-background-cell-shaded` | `#f6f6f9` | `#1b232d` | The background color of shaded table cells. |
| `color-background-chat-bubble-incoming` | `#f6f6f9` | `#0f141a` | The background color of `incoming` chat bubble. |
| `color-background-chat-bubble-outgoing` | `transparent` | `transparent` | The background color of `outgoing` chat bubble. |
| `color-background-container-content` | `#ffffff` | `#161d26` | The background color of container main content areas. For example: content areas of form sections, containers, tables, and cards. |
| `color-background-container-header` | `#ffffff` | `#161d26` | The background color of container headers. For example: headers of form sections, containers, tables, and card collections. |
| `color-background-control-checked` | `#006ce0` | `#42b4ff` | The background color of a checked form control. For example: background fill of a selected radio button, checked checkbox, and toggle that is switched on. |
| `color-background-control-default` | `#ffffff` | `#161d26` | The default background color of form controls. For example: radio buttons and checkboxes default background fill color. |
| `color-background-control-disabled` | `#dedee3` | `#333843` | The background color of a disabled form control. For example: background fill of a disabled radio button and checkbox. |
| `color-background-dialog` | `#f0fbff` | `#001129` | The background color of the feedback/input dialogue box. |
| `color-background-dropdown-item-default` | `#ffffff` | `#1b232d` | The default background color of dropdown items. For example: select, multiselect, autosuggest, and datepicker dropdown backgrounds. |
| `color-background-dropdown-item-filter-match` | `#f0fbff` | `#333843` | The background color of text that matches a user's query. For example: the background of text matching a query entered into a table filter, select, multiselect, or autosuggest. |
| `color-background-dropdown-item-hover` | `#f3f3f7` | `#131920` | The background color of dropdown items on hover. For example: background of hovered items in select, multiselect, autosuggest, and datepicker dropdowns. |
| `color-background-home-header` | `#0f141a` | `#0f141a` | The background color of the home header, displayed on the Service's home page. |
| `color-background-input-default` | `#ffffff` | `#161d26` | The default background color of form inputs. For example: background fill of an input, textarea, autosuggest, and trigger of a select and multiselect. |
| `color-background-input-disabled` | `#ebebf0` | `#1b232d` | The background color of a disabled form input. For example: background fill of a disabled input, textarea, autosuggest, and trigger of a select and multiselect. |
| `color-background-item-selected` | `#f0fbff` | `#001129` | The background color of a selected item. For example: tokens, selected table rows, cards, and tile backgrounds. |
| `color-background-layout-main` | `#ffffff` | `#161d26` | The background color of the main content area on a page. For example: content area in app layout. |
| `color-background-layout-toggle-active` | `#424650` | `#424650` | The background color of the app layout toggle button when it's active. |
| `color-background-layout-toggle-default` | `#424650` | `#424650` | The default background color of the app layout toggle button. |
| `color-background-layout-toggle-hover` | `#656871` | `#656871` | The background color of the app layout toggle button on hover. |
| `color-background-layout-toggle-selected-active` | `#006ce0` | `#42b4ff` | The background color of the app layout toggle button when it's selected and active. |
| `color-background-layout-toggle-selected-default` | `#006ce0` | `#42b4ff` | The default background color of the app layout toggle button when it's selected. |
| `color-background-layout-toggle-selected-hover` | `#004a9e` | `#75cfff` | The background color of the app layout toggle button on hover when it's selected. |
| `color-background-loading-bar-gen-ai` | `linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)` | `linear-gradient(90deg, #b8e7ff 0%, #0099ff 10%, #5c7fff 24%, #8575ff 50%, #962eff 76%, #0099ff 90%, #b8e7ff 100%)` | The background color of gen-ai loading bars. |
| `color-background-notification-blue` | `#006ce0` | `#006ce0` | Background color for blue notifications. For example: blue badges and info flash messages. |
| `color-background-notification-green` | `#00802f` | `#00802f` | Background color for green notifications. For example: green badges and success flash messages. |
| `color-background-notification-grey` | `#424650` | `#656871` | Background color for grey notifications. For example: grey badges. |
| `color-background-notification-red` | `#db0000` | `#db0000` | Background color for red notifications. For example: red badges and error flash messages. |
| `color-background-notification-severity-critical` | `#870303` | `#d63f38` | Background color in a notification to represent a critical error or a critically high-level of severity. For example: "Sev-1" |
| `color-background-notification-severity-high` | `#ce3311` | `#fe6e73` | Background color in a notification to represent an error status or a high-level of severity. For example: "Failed" or "Sev-2" |
| `color-background-notification-severity-low` | `#f2cd54` | `#f2cd54` | Background color in a notification to represent a warning or a low-level of severity. For example: "Warning" or "Sev-4" |
| `color-background-notification-severity-medium` | `#f89256` | `#f89256` | Background color in a notification to represent a medium-level of severity. For example: "Sev-3" |
| `color-background-notification-severity-neutral` | `#656871` | `#656871` | Background color in a notification to represent a neutral status, a severity level of no impact, or the lowest-level of severity. For example: "Pending" or "Sev-5" |
| `color-background-notification-yellow` | `#ffe347` | `#ffe347` | Background color for yellow notifications. For example: yellow badges and warning flash messages. |
| `color-background-popover` | `#ffffff` | `#1b232d` | Background color for the popover container. |
| `color-background-progress-bar-default` | `#ebebf0` | `#333843` | The default background color of the progress bar. |
| `color-background-progress-bar-value-default` | `#006ce0` | `#42b4ff` | The default background color of the progress bar value. |
| `color-background-segment-active` | `#006ce0` | `#42b4ff` | The background color of the active segment in a segmented control. |
| `color-background-segment-default` | `#ffffff` | `#161d26` | The background color of inactive segments in a segmented control. |
| `color-background-segment-disabled` | `#ffffff` | `#161d26` | The background color of disabled segments in a segmented control. |
| `color-background-segment-hover` | `#f0fbff` | `#1b232d` | The background color of inactive segments in a segmented control on hover. |
| `color-background-slider-handle-active` | `#004a9e` | `#75cfff` | The background color of the slider handle in active state. |
| `color-background-slider-handle-default` | `#006ce0` | `#42b4ff` | The default background color of the slider handle. |
| `color-background-slider-range-active` | `#004a9e` | `#75cfff` | The background color of the slider range in active state. |
| `color-background-slider-range-default` | `#006ce0` | `#42b4ff` | The default background color of the slider range. |
| `color-background-slider-track-default` | `#8c8c94` | `#656871` | The default background color of the slider track. |
| `color-background-status-error` | `#fff5f5` | `#1f0000` | The background color of an item in error state. For example: error alerts. |
| `color-background-status-info` | `#f0fbff` | `#001129` | The background color of an informational item. For example: information alerts. |
| `color-background-status-success` | `#effff1` | `#001401` | The background color of an item in success state. For example: success alerts. |
| `color-background-status-warning` | `#fffef0` | `#191100` | The background color of an item in warning state. For example: warning alerts. |
| `color-background-toggle-button-normal-pressed` | `#d1f1ff` | `#333843` | The background color of normal toggle buttons in pressed state. |
| `color-background-toggle-checked-disabled` | `#b8e7ff` | `#002b66` | The background color of checked toggles in disabled state. |

### `text`

Usage: Body, heading, link, status, and state-aware text colors.

| Token | Light | Dark | Description |
|---|---|---|---|
| `color-text-accent` | `#006ce0` | `#42b4ff` | The accent text color used to guide a user. For example: the highlighted page in the side navigation, active tab text, selected day text color in date picker, and hover state in expandable section. |
| `color-text-avatar` | `#ffffff` | `#ffffff` | The text and icon color of avatars. |
| `color-text-body-default` | `#0f141a` | `#c6c6cd` | The default color of non-heading text and body content. For example: text in a paragraph tag, table cell data, form field labels and values. |
| `color-text-body-secondary` | `#424650` | `#c6c6cd` | The color of text that is secondary to base text. For example: text in the navigation and tools panels. |
| `color-text-breadcrumb-current` | `#656871` | `#8c8c94` | The text color that marks the breadcrumb item for the page the user is currently viewing. |
| `color-text-breadcrumb-icon` | `#8c8c94` | `#656871` | The color used for the icon delimiter between breadcrumb items. |
| `color-text-button-icon-disabled` | `#8c8c94` | `#8c8c94` | The color of icon buttons in disabled state. |
| `color-text-button-normal-active` | `#002b66` | `#75cfff` | The active text color of normal buttons. For example: Active text color in normal and link buttons. |
| `color-text-button-normal-default` | `#006ce0` | `#42b4ff` | The default text color of normal buttons. |
| `color-text-button-normal-disabled` | `#8c8c94` | `#8c8c94` | The text color of normal buttons in disabled state. |
| `color-text-button-normal-hover` | `#002b66` | `#75cfff` | The hover text color of normal buttons. |
| `color-text-button-primary-active` | `#ffffff` | `#0f141a` | The active text color of primary buttons. |
| `color-text-button-primary-default` | `#ffffff` | `#0f141a` | The default text color of primary buttons. |
| `color-text-button-primary-disabled` | `#8c8c94` | `#8c8c94` | The text color of primary buttons in disabled state. |
| `color-text-button-primary-hover` | `#ffffff` | `#0f141a` | The hover text color of primary buttons. |
| `color-text-chat-bubble-incoming` | `#0f141a` | `#c6c6cd` | Text color of `incoming` chat bubble. |
| `color-text-chat-bubble-outgoing` | `#0f141a` | `#c6c6cd` | Text color of `outgoing` chat bubble. |
| `color-text-counter` | `#656871` | `#a4a4ad` | The default color for counters. For example: counters in table headers |
| `color-text-dropdown-item-default` | `#0f141a` | `#dedee3` | The default text color of dropdown items. For example: label and label tag text color for autosuggest, select, and multiselect. |
| `color-text-dropdown-item-disabled` | `#b4b4bb` | `#656871` | The text color of disabled dropdown items. For example: label, label tag, description, and tag text color of a disabled item in a select, multiselect, and autosuggest. |
| `color-text-dropdown-item-filter-match` | `#006ce0` | `#75cfff` | The color of text matching a user's query. For example: the text matching a query entered into a table filter, select, multiselect, or autosuggest. |
| `color-text-dropdown-item-highlighted` | `#0f141a` | `#ebebf0` | The text color of hovered or selected dropdown items. For example: label text color of the item on hover in a select, multiselect, and autosuggest. |
| `color-text-empty` | `#656871` | `#dedee3` | The color of text in non-dropdown empty states. For example: tables, card collections, and attribute editor empty state text. |
| `color-text-form-default` | `#0f141a` | `#dedee3` | The default color of form field labels and values. For example: the label in form fields, checkboxes, radio buttons, toggles, and the value in inputs and text areas. |
| `color-text-form-secondary` | `#656871` | `#a4a4ad` | The color of secondary text in form fields and controls. For example: the description and constraint text in form fields, the descriptions in checkboxes, radio buttons, toggles, and any additional info in an attribute editor. |
| `color-text-group-label` | `#424650` | `#c6c6cd` | The default color for group labels. For example: group label in dropdown part of button dropdown, select, and multiselect, and group label in table and cards' preferences content selector. |
| `color-text-heading-default` | `#0f141a` | `#ebebf0` | The default color for headings 2-5. For example: headings in containers, form sections, forms, and app layout panels. |
| `color-text-heading-secondary` | `#424650` | `#a4a4ad` | The default color for secondary heading text such as page and container descriptions. For example: descriptions in containers such as form sections, tables, and card collections, as well as form page descriptions. |
| `color-text-home-header-default` | `#ebebf0` | `#ebebf0` | The color of the home header's text, displayed on the Service's home page. |
| `color-text-home-header-secondary` | `#c6c6cd` | `#c6c6cd` | The color of the home header's secondary text, displayed on the Service's home page. |
| `color-text-input-disabled` | `#b4b4bb` | `#656871` | The color of the text value in a disabled input. For example: text in a disabled input, autosuggest, datepicker, and the trigger of a select and multiselect. |
| `color-text-input-placeholder` | `#656871` | `#a4a4ad` | The color of placeholder text in an input. For example: placeholder text in an input, autosuggest, datepicker, and the trigger of a select and multiselect. |
| `color-text-interactive-active` | `#0f141a` | `#f9f9fa` | The color of clickable elements in their active state. For example: tabs and icons. |
| `color-text-interactive-default` | `#424650` | `#dedee3` | The color of clickable elements in their default state. For example: tabs, and icons. |
| `color-text-interactive-disabled` | `#b4b4bb` | `#656871` | The color of clickable elements in their disabled state. For example: disabled tabs, button text, and icons. |
| `color-text-interactive-hover` | `#0f141a` | `#f9f9fa` | The color of clickable elements on hover. For example: icons on hover. |
| `color-text-interactive-inverted-default` | `#dedee3` | `#dedee3` | The default color of clickable elements in the flashbar. For example: The dismiss icon button in a flashbar. |
| `color-text-interactive-inverted-hover` | `#f9f9fa` | `#f9f9fa` | The hover color of clickable elements in the flashbar. For example: The dismiss icon button in a flashbar. |
| `color-text-label` | `#0f141a` | `#dedee3` | The default color for non-form labels. For example: the key in key/value pairs and card's sections labels. |
| `color-text-label-gen-ai` | `#7300e5` | `#bf80ff` | The default color for labels indicating that content is produced by generative AI. |
| `color-text-layout-toggle` | `#ffffff` | `#ffffff` | The default color of the app layout toggle. |
| `color-text-layout-toggle-active` | `#ffffff` | `#161d26` | The color of the app layout toggle button when it's active. |
| `color-text-layout-toggle-hover` | `#006ce0` | `#42b4ff` | The color of the app layout toggle button on hover. |
| `color-text-layout-toggle-selected` | `#ffffff` | `#0f141a` | The color of the app layout toggle button when it's selected. |
| `color-text-link-default` | `#006ce0` | `#42b4ff` | The default color for links. For example: text in an anchor tag, info links, breadcrumb links, and icon links. |
| `color-text-link-hover` | `#002b66` | `#75cfff` | The hover color for links. For example: text in an anchor tag, info links, breadcrumb links, and icon links. |
| `color-text-notification-default` | `#f9f9fa` | `#f9f9fa` | Default text color for notifications. For example: the text on badges and flashes. |
| `color-text-notification-severity-critical` | `#f9f9fa` | `#000000` | Text color in a notification to represent a critical error or a critically high-level of severity. For example: "Sev-1" |
| `color-text-notification-severity-high` | `#f9f9fa` | `#0f141a` | Text color in a notification to represent an error status or a high-level of severity. For example: "Failed" or "Sev-2" |
| `color-text-notification-severity-low` | `#0f141a` | `#0f141a` | Text color in a notification to represent a warning or a low-level of severity. For example: "Warning" or "Sev-4" |
| `color-text-notification-severity-medium` | `#0f141a` | `#0f141a` | Text color in a notification to represent a medium-level of severity. For example: "Sev-3" |
| `color-text-notification-severity-neutral` | `#f9f9fa` | `#f9f9fa` | Text color in a notification to represent a neutral status, a severity level of no impact, or the lowest-level of severity. For example: "Pending" or "Sev-5" |
| `color-text-segment-active` | `#ffffff` | `#0f141a` | The text color of the active segment in a segmented control. |
| `color-text-segment-default` | `#424650` | `#dedee3` | The text color of inactive segments in a segmented control. |
| `color-text-segment-hover` | `#002b66` | `#75cfff` | The text color of inactive segments in a segmented control on hover. |
| `color-text-status-error` | `#db0000` | `#ff7a7a` | The color of error text and icons. For example: form field error text and error status indicators. |
| `color-text-status-inactive` | `#656871` | `#a4a4ad` | The color of inactive and loading text and icons. For example: table and card collection loading states icon and text and inactive and pending status indicators. |
| `color-text-status-info` | `#006ce0` | `#42b4ff` | The color of info text and icons. For example: info status indicators and info alert icon. |
| `color-text-status-success` | `#00802f` | `#2bb534` | The color of success text and icons. For example: success status indicators and success alert icon. |
| `color-text-status-warning` | `#855900` | `#fbd332` | The color of warning icons. |
| `color-text-toggle-button-icon-pressed` | `#0f141a` | `#f9f9fa` | The pressed text color of icon toggle buttons. |
| `color-text-toggle-button-normal-pressed` | `#002b66` | `#75cfff` | The pressed text color of normal toggle buttons. |
| `color-text-top-navigation-title` | `#0f141a` | `#f9f9fa` | The color of the title in the top navigation. |

### `border`

Usage: Default, focus, divider, status, and interactive borders.

| Token | Light | Dark | Description |
|---|---|---|---|
| `color-border-button-normal-active` | `#002b66` | `#75cfff` | The border color of normal buttons in active state. |
| `color-border-button-normal-default` | `#006ce0` | `#42b4ff` | The border color of normal buttons. |
| `color-border-button-normal-disabled` | `#b4b4bb` | `#656871` | The border color of normal buttons in disabled state. |
| `color-border-button-normal-hover` | `#002b66` | `#75cfff` | The border color of normal buttons in hover state. |
| `color-border-button-primary-disabled` | `#ebebf0` | `#232b37` | The border color of primary buttons in disabled state. |
| `color-border-container-top` | `transparent` | `transparent` | The top border color for containers and first item in dropdowns. For example: the top border of a card, dropdown, and table. |
| `color-border-control-default` | `#8c8c94` | `#8c8c94` | The default border color of form controls. For example: radio buttons and checkboxes. |
| `color-border-dialog` | `#006ce0` | `#42b4ff` | The border color of the feedback/input dialogue box. |
| `color-border-divider-default` | `#c6c6cd` | `#424650` | The default color for dividers. For example: dividers in column layout, expanding sections, side nav, help panel, between table rows and dropdown items, and inside containers. |
| `color-border-divider-secondary` | `#ebebf0` | `#232b37` | The border color for row dividers. For example: row dividers for table and collection preferences. |
| `color-border-dropdown-container` | `#b4b4bb` | `#656871` | The border color of the dropdown container. For example: border color of the dropdown container in button dropdown, select, and multi-select. |
| `color-border-dropdown-item-focused` | `#424650` | `#dedee3` | The color of focus states for dropdown items. For example: the focus ring around selectable elements in the dropdown of button dropdown, select, and multi-select. |
| `color-border-dropdown-item-hover` | `#8c8c94` | `#656871` | The border color of dropdown items on hover. For example: border of hovered items in select, multiselect, autosuggest, and hovered days in datepicker. |
| `color-border-input-default` | `#8c8c94` | `#656871` | The default border color of form inputs. For example: input, textarea, autosuggest, datepicker, select, and multiselect. |
| `color-border-input-focused` | `#006ce0` | `#42b4ff` | The color of focus states for form inputs. For example: input, textarea, autosuggest, datepicker, select, and multiselect. |
| `color-border-item-focused` | `#006ce0` | `#42b4ff` | The color of focus states. For example: the focus ring around interactive elements. |
| `color-border-item-selected` | `#006ce0` | `#42b4ff` | The border color of a selected item. For example: tokens, selected table rows, selected cards, and selected tile borders. |
| `color-border-popover` | `#b4b4bb` | `#656871` | The border color of the popover. |
| `color-border-segment-active` | `#424650` | `#dedee3` | Deprecated - this token is no longer in use. |
| `color-border-segment-default` | `#424650` | `#dedee3` | Deprecated - this token is no longer in use. |
| `color-border-segment-disabled` | `#424650` | `#dedee3` | Deprecated - this token is no longer in use. |
| `color-border-segment-hover` | `#424650` | `#dedee3` | Deprecated - this token is no longer in use. |
| `color-border-status-error` | `#db0000` | `#ff7a7a` | The border color of an item in error state. For example: error alerts. |
| `color-border-status-info` | `#006ce0` | `#42b4ff` | The border color of an informational item. For example: information alerts. |
| `color-border-status-success` | `#00802f` | `#2bb534` | The border color of an item in success state. For example: success alerts. |
| `color-border-status-warning` | `#855900` | `#fbd332` | The border color of an item in warning state. For example: warning alerts. |
| `color-border-toggle-button-normal-pressed` | `#006ce0` | `#42b4ff` | The border color of normal toggle buttons in pressed state. |

### `foreground`

Usage: Foreground fills for core actions and controls.

| Token | Light | Dark | Description |
|---|---|---|---|
| `color-foreground-control-default` | `#ffffff` | `#0f141a` | The color used to mark enabled form controls. For example: the checkmark on checkboxes, inner circle on radio buttons, and handle on toggles. |
| `color-foreground-control-disabled` | `#ffffff` | `#161d26` | The color used to mark disabled form controls. For example: the checkmark on checkboxes, inner circle on radio buttons, and handle on toggles. |
| `color-foreground-control-read-only` | `#656871` | `#a4a4ad` | The color used to mark readonly form controls. For example: the checkmark on checkboxes, inner circle on radio buttons, and handle on toggles. |

### `charts`

Usage: Data visualization palette colors with contrast-index steps.

| Token | Light | Dark | Description |
|---|---|---|---|
| `color-charts-blue-1-1000` | `#01437d` | `#b3e4f8` | Color from the 'blue-1' data visualization palette at a contrast ratio of 10:1 |
| `color-charts-blue-1-1100` | `#003c75` | `#caedfc` | Color from the 'blue-1' data visualization palette at a contrast ratio of 11:1 |
| `color-charts-blue-1-1200` | `#00366d` | `#ddf4ff` | Color from the 'blue-1' data visualization palette at a contrast ratio of 12:1 |
| `color-charts-blue-1-300` | `#529ccb` | `#00819c` | Color from the 'blue-1' data visualization palette at a contrast ratio of 3:1 |
| `color-charts-blue-1-400` | `#3184c2` | `#0497ba` | Color from the 'blue-1' data visualization palette at a contrast ratio of 4:1 |
| `color-charts-blue-1-500` | `#0273bb` | `#08aad2` | Color from the 'blue-1' data visualization palette at a contrast ratio of 5:1 |
| `color-charts-blue-1-600` | `#0166ab` | `#44b9dd` | Color from the 'blue-1' data visualization palette at a contrast ratio of 6:1 |
| `color-charts-blue-1-700` | `#015b9d` | `#63c6e7` | Color from the 'blue-1' data visualization palette at a contrast ratio of 7:1 |
| `color-charts-blue-1-800` | `#015292` | `#79d2f0` | Color from the 'blue-1' data visualization palette at a contrast ratio of 8:1 |
| `color-charts-blue-1-900` | `#014a87` | `#98dcf5` | Color from the 'blue-1' data visualization palette at a contrast ratio of 9:1 |
| `color-charts-blue-2-1000` | `#23379b` | `#d2dcff` | Color from the 'blue-2' data visualization palette at a contrast ratio of 10:1 |
| `color-charts-blue-2-1100` | `#1f3191` | `#dfe6ff` | Color from the 'blue-2' data visualization palette at a contrast ratio of 11:1 |
| `color-charts-blue-2-1200` | `#1b2b88` | `#ecf0ff` | Color from the 'blue-2' data visualization palette at a contrast ratio of 12:1 |
| `color-charts-blue-2-300` | `#688ae8` | `#486de8` | Color from the 'blue-2' data visualization palette at a contrast ratio of 3:1 |
| `color-charts-blue-2-400` | `#5978e3` | `#6384f5` | Color from the 'blue-2' data visualization palette at a contrast ratio of 4:1 |
| `color-charts-blue-2-500` | `#4066df` | `#7698fe` | Color from the 'blue-2' data visualization palette at a contrast ratio of 5:1 |
| `color-charts-blue-2-600` | `#3759ce` | `#8ea9ff` | Color from the 'blue-2' data visualization palette at a contrast ratio of 6:1 |
| `color-charts-blue-2-700` | `#314fbf` | `#a2b8ff` | Color from the 'blue-2' data visualization palette at a contrast ratio of 7:1 |
| `color-charts-blue-2-800` | `#2c46b1` | `#b1c5ff` | Color from the 'blue-2' data visualization palette at a contrast ratio of 8:1 |
| `color-charts-blue-2-900` | `#273ea5` | `#c3d1ff` | Color from the 'blue-2' data visualization palette at a contrast ratio of 9:1 |
| `color-charts-error-bar-marker` | `#131920` | `#ffffff` | Color for the error bar marker in charts. |
| `color-charts-green-1000` | `#104d01` | `#c5e7a8` | Color from the 'green' data visualization palette at a contrast ratio of 10:1 |
| `color-charts-green-1100` | `#0f4601` | `#d5efbe` | Color from the 'green' data visualization palette at a contrast ratio of 11:1 |
| `color-charts-green-1200` | `#0d4000` | `#e4f7d5` | Color from the 'green' data visualization palette at a contrast ratio of 12:1 |
| `color-charts-green-300` | `#67a353` | `#48851a` | Color from the 'green' data visualization palette at a contrast ratio of 3:1 |
| `color-charts-green-400` | `#41902c` | `#5a9b29` | Color from the 'green' data visualization palette at a contrast ratio of 4:1 |
| `color-charts-green-500` | `#1f8104` | `#69ae34` | Color from the 'green' data visualization palette at a contrast ratio of 5:1 |
| `color-charts-green-600` | `#1a7302` | `#7dbd4c` | Color from the 'green' data visualization palette at a contrast ratio of 6:1 |
| `color-charts-green-700` | `#176702` | `#8fca61` | Color from the 'green' data visualization palette at a contrast ratio of 7:1 |
| `color-charts-green-800` | `#145d02` | `#9fd673` | Color from the 'green' data visualization palette at a contrast ratio of 8:1 |
| `color-charts-green-900` | `#125502` | `#b2df8d` | Color from the 'green' data visualization palette at a contrast ratio of 9:1 |
| `color-charts-line-axis` | `#dedee3` | `#424650` | Color of the axis lines in a chart. |
| `color-charts-line-grid` | `#dedee3` | `#424650` | Color of the grid lines in a chart. |
| `color-charts-line-tick` | `#dedee3` | `#424650` | Color of the tick marks in a chart. |
| `color-charts-orange-1000` | `#732c02` | `#ffd4bb` | Color from the 'orange' data visualization palette at a contrast ratio of 10:1 |
| `color-charts-orange-1100` | `#692801` | `#ffe1cf` | Color from the 'orange' data visualization palette at a contrast ratio of 11:1 |
| `color-charts-orange-1200` | `#602400` | `#ffede2` | Color from the 'orange' data visualization palette at a contrast ratio of 12:1 |
| `color-charts-orange-300` | `#e07941` | `#c55305` | Color from the 'orange' data visualization palette at a contrast ratio of 3:1 |
| `color-charts-orange-400` | `#cc5f21` | `#de6923` | Color from the 'orange' data visualization palette at a contrast ratio of 4:1 |
| `color-charts-orange-500` | `#bc4d01` | `#f27c36` | Color from the 'orange' data visualization palette at a contrast ratio of 5:1 |
| `color-charts-orange-600` | `#a84401` | `#f89256` | Color from the 'orange' data visualization palette at a contrast ratio of 6:1 |
| `color-charts-orange-700` | `#983c02` | `#fca572` | Color from the 'orange' data visualization palette at a contrast ratio of 7:1 |
| `color-charts-orange-800` | `#8a3603` | `#ffb68b` | Color from the 'orange' data visualization palette at a contrast ratio of 8:1 |
| `color-charts-orange-900` | `#7e3103` | `#ffc6a4` | Color from the 'orange' data visualization palette at a contrast ratio of 9:1 |
| `color-charts-palette-categorical-1` | `#688ae8` | `#486de8` | Color #1 on the categorical data visualization palette. |
| `color-charts-palette-categorical-10` | `#a84401` | `#f89256` | Color #10 on the categorical data visualization palette. |
| `color-charts-palette-categorical-11` | `#273ea5` | `#c3d1ff` | Color #11 on the categorical data visualization palette. |
| `color-charts-palette-categorical-12` | `#780d35` | `#ffdfe8` | Color #12 on the categorical data visualization palette. |
| `color-charts-palette-categorical-13` | `#03524a` | `#94e0d0` | Color #13 on the categorical data visualization palette. |
| `color-charts-palette-categorical-14` | `#4a238b` | `#efe2ff` | Color #14 on the categorical data visualization palette. |
| `color-charts-palette-categorical-15` | `#7e3103` | `#ffc6a4` | Color #15 on the categorical data visualization palette. |
| `color-charts-palette-categorical-16` | `#1b2b88` | `#ecf0ff` | Color #16 on the categorical data visualization palette. |
| `color-charts-palette-categorical-17` | `#ce567c` | `#d56889` | Color #17 on the categorical data visualization palette. |
| `color-charts-palette-categorical-18` | `#003e38` | `#d7f7f0` | Color #18 on the categorical data visualization palette. |
| `color-charts-palette-categorical-19` | `#9469d6` | `#a173ea` | Color #19 on the categorical data visualization palette. |
| `color-charts-palette-categorical-2` | `#c33d69` | `#e07f9d` | Color #2 on the categorical data visualization palette. |
| `color-charts-palette-categorical-20` | `#602400` | `#ffede2` | Color #20 on the categorical data visualization palette. |
| `color-charts-palette-categorical-21` | `#4066df` | `#7698fe` | Color #21 on the categorical data visualization palette. |
| `color-charts-palette-categorical-22` | `#a32952` | `#f5a2bb` | Color #22 on the categorical data visualization palette. |
| `color-charts-palette-categorical-23` | `#0d7d70` | `#00b09b` | Color #23 on the categorical data visualization palette. |
| `color-charts-palette-categorical-24` | `#6b40b2` | `#cbabfc` | Color #24 on the categorical data visualization palette. |
| `color-charts-palette-categorical-25` | `#bc4d01` | `#f27c36` | Color #25 on the categorical data visualization palette. |
| `color-charts-palette-categorical-26` | `#2c46b1` | `#b1c5ff` | Color #26 on the categorical data visualization palette. |
| `color-charts-palette-categorical-27` | `#81143b` | `#ffd1de` | Color #27 on the categorical data visualization palette. |
| `color-charts-palette-categorical-28` | `#045b52` | `#77d7c3` | Color #28 on the categorical data visualization palette. |
| `color-charts-palette-categorical-29` | `#512994` | `#e8d5ff` | Color #29 on the categorical data visualization palette. |
| `color-charts-palette-categorical-3` | `#2ea597` | `#018977` | Color #3 on the categorical data visualization palette. |
| `color-charts-palette-categorical-30` | `#8a3603` | `#ffb68b` | Color #30 on the categorical data visualization palette. |
| `color-charts-palette-categorical-31` | `#1f3191` | `#dfe6ff` | Color #31 on the categorical data visualization palette. |
| `color-charts-palette-categorical-32` | `#da7596` | `#c64a70` | Color #32 on the categorical data visualization palette. |
| `color-charts-palette-categorical-33` | `#01443e` | `#c2f0e6` | Color #33 on the categorical data visualization palette. |
| `color-charts-palette-categorical-34` | `#a783e1` | `#8d59de` | Color #34 on the categorical data visualization palette. |
| `color-charts-palette-categorical-35` | `#692801` | `#ffe1cf` | Color #35 on the categorical data visualization palette. |
| `color-charts-palette-categorical-36` | `#5978e3` | `#6384f5` | Color #36 on the categorical data visualization palette. |
| `color-charts-palette-categorical-37` | `#b1325c` | `#eb92ad` | Color #37 on the categorical data visualization palette. |
| `color-charts-palette-categorical-38` | `#1c8e81` | `#009d89` | Color #38 on the categorical data visualization palette. |
| `color-charts-palette-categorical-39` | `#7749bf` | `#bf9bf9` | Color #39 on the categorical data visualization palette. |
| `color-charts-palette-categorical-4` | `#8456ce` | `#b088f5` | Color #4 on the categorical data visualization palette. |
| `color-charts-palette-categorical-40` | `#cc5f21` | `#de6923` | Color #40 on the categorical data visualization palette. |
| `color-charts-palette-categorical-41` | `#314fbf` | `#a2b8ff` | Color #41 on the categorical data visualization palette. |
| `color-charts-palette-categorical-42` | `#8b1b42` | `#ffc1d4` | Color #42 on the categorical data visualization palette. |
| `color-charts-palette-categorical-43` | `#06645a` | `#5fccb7` | Color #43 on the categorical data visualization palette. |
| `color-charts-palette-categorical-44` | `#59309d` | `#dfc8ff` | Color #44 on the categorical data visualization palette. |
| `color-charts-palette-categorical-45` | `#983c02` | `#fca572` | Color #45 on the categorical data visualization palette. |
| `color-charts-palette-categorical-46` | `#23379b` | `#d2dcff` | Color #46 on the categorical data visualization palette. |
| `color-charts-palette-categorical-47` | `#6f062f` | `#ffecf1` | Color #47 on the categorical data visualization palette. |
| `color-charts-palette-categorical-48` | `#014b44` | `#ace9db` | Color #48 on the categorical data visualization palette. |
| `color-charts-palette-categorical-49` | `#431d84` | `#f5edff` | Color #49 on the categorical data visualization palette. |
| `color-charts-palette-categorical-5` | `#e07941` | `#c55305` | Color #5 on the categorical data visualization palette. |
| `color-charts-palette-categorical-50` | `#732c02` | `#ffd4bb` | Color #50 on the categorical data visualization palette. |
| `color-charts-palette-categorical-6` | `#3759ce` | `#8ea9ff` | Color #6 on the categorical data visualization palette. |
| `color-charts-palette-categorical-7` | `#962249` | `#ffb0c8` | Color #7 on the categorical data visualization palette. |
| `color-charts-palette-categorical-8` | `#096f64` | `#40bfa9` | Color #8 on the categorical data visualization palette. |
| `color-charts-palette-categorical-9` | `#6237a7` | `#d6baff` | Color #9 on the categorical data visualization palette. |
| `color-charts-pink-1000` | `#81143b` | `#ffd1de` | Color from the 'pink' data visualization palette at a contrast ratio of 10:1 |
| `color-charts-pink-1100` | `#780d35` | `#ffdfe8` | Color from the 'pink' data visualization palette at a contrast ratio of 11:1 |
| `color-charts-pink-1200` | `#6f062f` | `#ffecf1` | Color from the 'pink' data visualization palette at a contrast ratio of 12:1 |
| `color-charts-pink-300` | `#da7596` | `#c64a70` | Color from the 'pink' data visualization palette at a contrast ratio of 3:1 |
| `color-charts-pink-400` | `#ce567c` | `#d56889` | Color from the 'pink' data visualization palette at a contrast ratio of 4:1 |
| `color-charts-pink-500` | `#c33d69` | `#e07f9d` | Color from the 'pink' data visualization palette at a contrast ratio of 5:1 |
| `color-charts-pink-600` | `#b1325c` | `#eb92ad` | Color from the 'pink' data visualization palette at a contrast ratio of 6:1 |
| `color-charts-pink-700` | `#a32952` | `#f5a2bb` | Color from the 'pink' data visualization palette at a contrast ratio of 7:1 |
| `color-charts-pink-800` | `#962249` | `#ffb0c8` | Color from the 'pink' data visualization palette at a contrast ratio of 8:1 |
| `color-charts-pink-900` | `#8b1b42` | `#ffc1d4` | Color from the 'pink' data visualization palette at a contrast ratio of 9:1 |
| `color-charts-purple-1000` | `#512994` | `#e8d5ff` | Color from the 'purple' data visualization palette at a contrast ratio of 10:1 |
| `color-charts-purple-1100` | `#4a238b` | `#efe2ff` | Color from the 'purple' data visualization palette at a contrast ratio of 11:1 |
| `color-charts-purple-1200` | `#431d84` | `#f5edff` | Color from the 'purple' data visualization palette at a contrast ratio of 12:1 |
| `color-charts-purple-300` | `#a783e1` | `#8d59de` | Color from the 'purple' data visualization palette at a contrast ratio of 3:1 |
| `color-charts-purple-400` | `#9469d6` | `#a173ea` | Color from the 'purple' data visualization palette at a contrast ratio of 4:1 |
| `color-charts-purple-500` | `#8456ce` | `#b088f5` | Color from the 'purple' data visualization palette at a contrast ratio of 5:1 |
| `color-charts-purple-600` | `#7749bf` | `#bf9bf9` | Color from the 'purple' data visualization palette at a contrast ratio of 6:1 |
| `color-charts-purple-700` | `#6b40b2` | `#cbabfc` | Color from the 'purple' data visualization palette at a contrast ratio of 7:1 |
| `color-charts-purple-800` | `#6237a7` | `#d6baff` | Color from the 'purple' data visualization palette at a contrast ratio of 8:1 |
| `color-charts-purple-900` | `#59309d` | `#dfc8ff` | Color from the 'purple' data visualization palette at a contrast ratio of 9:1 |
| `color-charts-red-1000` | `#7d2105` | `#ffd2cf` | Color from the 'red' data visualization palette at a contrast ratio of 10:1 |
| `color-charts-red-1100` | `#721e03` | `#ffe0dd` | Color from the 'red' data visualization palette at a contrast ratio of 11:1 |
| `color-charts-red-1200` | `#671c00` | `#ffecea` | Color from the 'red' data visualization palette at a contrast ratio of 12:1 |
| `color-charts-red-300` | `#ea7158` | `#d63f38` | Color from the 'red' data visualization palette at a contrast ratio of 3:1 |
| `color-charts-red-400` | `#dc5032` | `#ed5958` | Color from the 'red' data visualization palette at a contrast ratio of 4:1 |
| `color-charts-red-500` | `#d13313` | `#fe6e73` | Color from the 'red' data visualization palette at a contrast ratio of 5:1 |
| `color-charts-red-600` | `#ba2e0f` | `#ff8a8a` | Color from the 'red' data visualization palette at a contrast ratio of 6:1 |
| `color-charts-red-700` | `#a82a0c` | `#ffa09e` | Color from the 'red' data visualization palette at a contrast ratio of 7:1 |
| `color-charts-red-800` | `#972709` | `#ffb3b0` | Color from the 'red' data visualization palette at a contrast ratio of 8:1 |
| `color-charts-red-900` | `#892407` | `#ffc4c0` | Color from the 'red' data visualization palette at a contrast ratio of 9:1 |
| `color-charts-status-critical` | `#7d2105` | `#d63f38` | Color to represent a critical error or a critically high-level of severity. For example: "Sev-1" |
| `color-charts-status-high` | `#ba2e0f` | `#fe6e73` | Color to represent an error status or a high-level of severity. Use this color to represent a default error status when there is only one applicable to a chart. For example: "Failed" or "Sev-2" |
| `color-charts-status-info` | `#3184c2` | `#08aad2` | Color to represent an informational status. For example: "In-progress" or "Updating" |
| `color-charts-status-low` | `#b2911c` | `#dfb52c` | Color to represent a warning or a low-level of severity. For example: "Warning" or "Sev-4" |
| `color-charts-status-medium` | `#cc5f21` | `#f89256` | Color to represent a medium-level of severity. For example: "Sev-3" |
| `color-charts-status-neutral` | `#8c8c94` | `#8c8c94` | Color to represent a neutral status, a severity level of no impact, or the lowest-level of severity. For example: "Pending" or "Sev-5" |
| `color-charts-status-positive` | `#67a353` | `#69ae34` | Color to represent a positive status. *For example: "Success" or "Running" |
| `color-charts-teal-1000` | `#014b44` | `#ace9db` | Color from the 'teal' data visualization palette at a contrast ratio of 10:1 |
| `color-charts-teal-1100` | `#01443e` | `#c2f0e6` | Color from the 'teal' data visualization palette at a contrast ratio of 11:1 |
| `color-charts-teal-1200` | `#003e38` | `#d7f7f0` | Color from the 'teal' data visualization palette at a contrast ratio of 12:1 |
| `color-charts-teal-300` | `#2ea597` | `#018977` | Color from the 'teal' data visualization palette at a contrast ratio of 3:1 |
| `color-charts-teal-400` | `#1c8e81` | `#009d89` | Color from the 'teal' data visualization palette at a contrast ratio of 4:1 |
| `color-charts-teal-500` | `#0d7d70` | `#00b09b` | Color from the 'teal' data visualization palette at a contrast ratio of 5:1 |
| `color-charts-teal-600` | `#096f64` | `#40bfa9` | Color from the 'teal' data visualization palette at a contrast ratio of 6:1 |
| `color-charts-teal-700` | `#06645a` | `#5fccb7` | Color from the 'teal' data visualization palette at a contrast ratio of 7:1 |
| `color-charts-teal-800` | `#045b52` | `#77d7c3` | Color from the 'teal' data visualization palette at a contrast ratio of 8:1 |
| `color-charts-teal-900` | `#03524a` | `#94e0d0` | Color from the 'teal' data visualization palette at a contrast ratio of 9:1 |
| `color-charts-threshold-info` | `#006ce0` | `#75cfff` | The color to represent an informational threshold to highlight special circumstances that may have or will occur. For example: A forecasted estimate |
| `color-charts-threshold-negative` | `#db0000` | `#ff7a7a` | The color to represent a threshold with a negative outcome. For example: A maximum limit |
| `color-charts-threshold-neutral` | `#656871` | `#a4a4ad` | The color to represent a threshold with a neutral outcome. For example: An average or baseline |
| `color-charts-threshold-positive` | `#00802f` | `#2bb534` | The color to represent a threshold with a positive outcome. For example: A designated pass rate |
| `color-charts-yellow-1000` | `#553f03` | `#f7db8a` | Color from the 'yellow' data visualization palette at a contrast ratio of 10:1 |
| `color-charts-yellow-1100` | `#4d3901` | `#fce5a8` | Color from the 'yellow' data visualization palette at a contrast ratio of 11:1 |
| `color-charts-yellow-1200` | `#483300` | `#ffefc9` | Color from the 'yellow' data visualization palette at a contrast ratio of 12:1 |
| `color-charts-yellow-300` | `#b2911c` | `#977001` | Color from the 'yellow' data visualization palette at a contrast ratio of 3:1 |
| `color-charts-yellow-400` | `#9c7b0b` | `#b08400` | Color from the 'yellow' data visualization palette at a contrast ratio of 4:1 |
| `color-charts-yellow-500` | `#8a6b05` | `#c59600` | Color from the 'yellow' data visualization palette at a contrast ratio of 5:1 |
| `color-charts-yellow-600` | `#7b5f04` | `#d3a61c` | Color from the 'yellow' data visualization palette at a contrast ratio of 6:1 |
| `color-charts-yellow-700` | `#6f5504` | `#dfb52c` | Color from the 'yellow' data visualization palette at a contrast ratio of 7:1 |
| `color-charts-yellow-800` | `#654d03` | `#eac33a` | Color from the 'yellow' data visualization palette at a contrast ratio of 8:1 |
| `color-charts-yellow-900` | `#5d4503` | `#f1cf65` | Color from the 'yellow' data visualization palette at a contrast ratio of 9:1 |

### `dropzone`

Usage: Upload/dropzone background and text interaction states.

| Token | Light | Dark | Description |
|---|---|---|---|
| `color-dropzone-background-default` | `#ffffff` | `#161d26` | The default color of file upload dropzone background. |
| `color-dropzone-background-hover` | `#f0fbff` | `#001129` | The color of file upload dropzone background in hovered state. |
| `color-dropzone-border-default` | `#8c8c94` | `#656871` | The default color of file upload dropzone border. |
| `color-dropzone-border-hover` | `#002b66` | `#75cfff` | The color of file upload dropzone border in hovered state. |
| `color-dropzone-text-default` | `#424650` | `#c6c6cd` | The default color of file upload dropzone text. |
| `color-dropzone-text-hover` | `#424650` | `#c6c6cd` | The color of file upload dropzone text in hovered state. |

### `board`

Usage: Board-specific surfaces and dividers.

| Token | Light | Dark | Description |
|---|---|---|---|
| `color-board-placeholder-active` | `#ebebf0` | `#656871` | The color of board placeholder in active state. |
| `color-board-placeholder-hover` | `#d1f1ff` | `#006ce0` | The color of board placeholder in hovered state. |

### `drag`

Usage: Drag-and-drop visual feedback colors.

| Token | Light | Dark | Description |
|---|---|---|---|
| `color-drag-placeholder-active` | `#ebebf0` | `#656871` | The color of drag placeholder in active state. |
| `color-drag-placeholder-hover` | `#d1f1ff` | `#006ce0` | The color of drag placeholder in hovered state. |

### `item`

Usage: Item-level status/background color.

| Token | Light | Dark | Description |
|---|---|---|---|
| `color-item-selected` | `#006ce0` | `#42b4ff` | The highlight color for selected items. For example: borders of tokens and selected table rows, and check icons in selected dropdown items. |

### `tree`

Usage: Tree-view interaction color.

| Token | Light | Dark | Description |
|---|---|---|---|
| `color-tree-view-connector-line` | `#8c8c94` | `#dedee3` | The color of the tree view connector lines. |

## Frontend Implementation Guidance
- Prefer token usage over hardcoded hex values to preserve visual-mode compliance.
- Use `background`, `text`, and `border` categories for core UI primitives first.
- Use `charts` tokens only for data visualization contexts.
- Ensure contrast checks in context (text on background, icon on fill, border on surface).
- Pair status colors with iconography/text; avoid color-only meaning.
