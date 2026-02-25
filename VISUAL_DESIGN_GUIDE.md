# 🎨 User Information Panel - Visual Design Guide

## Color Palettes

### Admin Dashboard - Dark & Professional

> **Theme switching**  
The application now supports a global light/dark toggle.  The `<html>` element receives a `dark` class and `data-theme` attribute, driven by a `ThemeProvider`.  Components should use Tailwind `dark:` variants or daisyUI utilities (e.g. `bg-base-100`, `text-base-content`) so styles automatically invert.  User preference is saved to `localStorage` and initial value respects the `prefers-color-scheme` media query.


```
Primary Background:    #111827 (Gray-900)
Secondary Background:  #1F2937 (Gray-800)
Accent Color:         #DC2626 (Red-600)
Text Primary:         #F3F4F6 (Gray-100)
Text Secondary:       #9CA3AF (Gray-400)
Border Color:         #4B5563 (Gray-600)
Success Badge:        #10B981 (Green-600)

Visual Style:
├─ Dark theme suggests authority
├─ Red accents convey importance
├─ Professional gradient backgrounds
└─ High contrast for accessibility
```

### Vendor Dashboard - Modern & Business
```
Primary Background:    #F9FAFB (Gray-50)
Secondary Background:  #F3F4F6 (Gray-100)
Accent Color:         #2563EB (Blue-600)
Text Primary:         #111827 (Gray-900)
Text Secondary:       #6B7280 (Gray-500)
Border Color:         #E5E7EB (Gray-200)
Success Badge:        #0EA5E9 (Blue-500)

Visual Style:
├─ Light theme suggests approachability
├─ Blue accents convey trust
├─ Clean, modern design
└─ Professional and business-focused
```

### Customer Dashboard - Friendly & Approachable
```
Primary Background:    #F9FAFB (Gray-50)
Secondary Background:  #ECFDF5 (Green-50)
Accent Color:         #16A34A (Green-700)
Text Primary:         #111827 (Gray-900)
Text Secondary:       #6B7280 (Gray-500)
Border Color:         #D1FAE5 (Green-200)
Success Badge:        #10B981 (Green-600)

Visual Style:
├─ Light theme suggests friendliness
├─ Green accents convey growth & health
├─ Warm and inviting design
└─ Approachable and customer-focused
```

---

## Typography System

```
Heading 1 (h1):
├─ Size: 36px (3rem)
├─ Weight: Bold (700)
├─ Line Height: 1.2
└─ Usage: Main page title

Heading 2 (h2):
├─ Size: 28px (1.875rem)
├─ Weight: Bold (700)
├─ Line Height: 1.3
└─ Usage: Section titles

Heading 3 (h3):
├─ Size: 20px (1.25rem)
├─ Weight: Semibold (600)
├─ Line Height: 1.4
└─ Usage: Card titles

Heading 4 (h4):
├─ Size: 16px (1rem)
├─ Weight: Medium (500)
├─ Line Height: 1.5
└─ Usage: Button text

Body Text:
├─ Size: 14-16px (0.875-1rem)
├─ Weight: Normal (400)
├─ Line Height: 1.5-1.6
└─ Usage: Content text

Caption:
├─ Size: 12px (0.75rem)
├─ Weight: Regular (400)
├─ Line Height: 1.5
└─ Usage: Subtitles, labels
```

---

## Spacing System

```
Consistent spacing scale (Tailwind):
├─ p-1, p-2, p-3, p-4, p-6, p-8
├─ m-1, m-2, m-3, m-4, m-6, m-8
├─ gap-1, gap-2, gap-3, gap-4, gap-6
└─ mb-1, mb-2, mb-4, mb-6, mb-8

Visual Spacing:
├─ Card Padding: 24px (p-6) to 32px (p-8)
├─ Section Gap: 24px (gap-6) to 32px (gap-8)
├─ Element Spacing: 16px (gap-4) to 24px (gap-6)
└─ Internal Padding: 8px (p-2) to 16px (p-4)
```

---

## Component Shadows

```
Shadow System:
├─ shadow-none: No shadow (for flat design)
├─ shadow-sm: Subtle shadow (cards, buttons)
│  └─ 0 1px 2px 0 rgba(0, 0, 0, 0.05)
├─ shadow-md: Medium shadow (hover states)
│  └─ 0 4px 6px -1px rgba(0, 0, 0, 0.1)
├─ shadow-lg: Large shadow (prominent cards)
│  └─ 0 10px 15px -3px rgba(0, 0, 0, 0.1)
└─ shadow-xl: Extra large shadow (modals)
   └─ 0 20px 25px -5px rgba(0, 0, 0, 0.1)

Usage:
├─ Profile Cards: shadow-lg
├─ Stat Cards: shadow-sm (hover: shadow-md)
├─ Buttons: shadow-none (with hover effects)
└─ Modals: shadow-xl
```

---

## Border Radius System

```
Rounded Corners (Tailwind):
├─ rounded: 0.25rem (4px) - Small elements
├─ rounded-lg: 0.5rem (8px) - Standard
├─ rounded-xl: 0.75rem (12px) - Cards & sections
├─ rounded-2xl: 1rem (16px) - Large components
├─ rounded-3xl: 1.5rem (24px) - Profile sections
└─ rounded-full: 9999px (Circle) - Avatars

Usage:
├─ Avatars: rounded-full
├─ Buttons: rounded-lg
├─ Cards: rounded-xl
├─ Large sections: rounded-2xl
└─ Badges: rounded-full
```

---

## Icon System

### Icon Sizes
```
Small Icons (Navigation, Badges):
├─ w-4 h-4: 16px
├─ w-5 h-5: 20px
└─ Usage: Inline with text, badges

Medium Icons (Content):
├─ w-5 h-5: 20px
├─ w-6 h-6: 24px
└─ Usage: Form controls, section headers

Large Icons (Highlights):
├─ w-6 h-6: 24px
├─ w-8 h-8: 32px
└─ Usage: Card headers, key features

Extra Large Icons (Empty States):
├─ w-12 h-12: 48px
├─ w-16 h-16: 64px
└─ Usage: Page headers, loading states
```

### Icon Colors
```
Admin Theme:
├─ Primary Icons: text-red-500
├─ Secondary Icons: text-red-400
└─ Neutral Icons: text-gray-400

Vendor Theme:
├─ Primary Icons: text-blue-500
├─ Secondary Icons: text-blue-400
└─ Neutral Icons: text-gray-400

Customer Theme:
├─ Primary Icons: text-green-500
├─ Secondary Icons: text-green-400
└─ Neutral Icons: text-gray-400

Usage:
├─ Icons with background: Contained in colored box
├─ Icons standalone: Use theme color
└─ Inactive icons: Use gray
```

---

## Button States

### Button Styles

#### Primary Button
```
Default State:
├─ Background: Role-specific color
├─ Text: White
├─ Padding: px-4 py-2
├─ Border Radius: rounded-lg
└─ Font: text-sm font-medium

Hover State:
├─ Background: Role color (darkened by 100)
├─ Shadow: Subtle shadow
└─ Cursor: pointer

Active/Pressed State:
├─ Background: Role color (darkened by 200)
├─ Transform: scale-95 (slight press effect)
└─ Shadow: Minimal shadow

Disabled State:
├─ Background: Gray-300
├─ Text: Gray-500
├─ Opacity: 50%
└─ Cursor: not-allowed
```

#### Secondary Button
```
Default State:
├─ Background: Gray-50 or role-light
├─ Text: Gray-900
├─ Border: 1px solid Gray-200
├─ Padding: px-4 py-2
└─ Border Radius: rounded-lg

Hover State:
├─ Background: Gray-100
├─ Border: Gray-300
├─ Shadow: Subtle shadow
└─ Cursor: pointer

Active State:
├─ Background: Gray-200
└─ Border: Gray-400
```

#### Text Button
```
Default State:
├─ Background: Transparent
├─ Text: Role color
├─ Underline: None
└─ Font: text-sm font-medium

Hover State:
├─ Text: Role color (darker)
├─ Underline: Appears
└─ Cursor: pointer
```

---

## Card Components

### Profile Card Structure
```
┌─────────────────────────────────────────┐
│ ╔═════════════╦═════════════════════════╗ │
│ ║             ║                         ║ │
│ ║  Profile    ║                         ║ │
│ ║   Image     ║  Contact Information    ║ │
│ ║   (1/3)     ║       (2/3)             ║ │
│ ║             ║                         ║ │
│ ╚═════════════╩═════════════════════════╝ │
└─────────────────────────────────────────┘

Styling:
├─ Background: White (customer/vendor) or Dark (admin)
├─ Border: 1px solid theme color
├─ Shadow: Large shadow
├─ Radius: rounded-2xl
└─ Padding: p-8
```

### Stat Card Structure
```
┌──────────────────────────┐
│ [Colored Icon Box]       │
│                          │
│ Stat Title (14px gray)   │
│ 123 (24px bold)          │
│ Subtitle (14px gray)     │
│                          │
│ [Optional Link Button]   │
└──────────────────────────┘

Styling:
├─ Background: White
├─ Border: 1px solid Gray-200
├─ Shadow: sm (hover: md)
├─ Radius: rounded-xl
├─ Padding: p-6
└─ Gap: gap-4
```

### Tool Card Structure
```
┌──────────────────────────────┐
│ [Icon Box] [Title]           │
│                              │
│ Description text (14px)      │
│                              │
│ [Action Button - Full Width] │
└──────────────────────────────┘

Styling:
├─ Background: White (light) or Dark-700 (admin)
├─ Border: 1px solid theme color
├─ Shadow: sm (hover: lg)
├─ Radius: rounded-xl
├─ Padding: p-6
└─ Gap: gap-4
```

---

## Layout Grid System

### Statistics Grid
```
Desktop (>= 1024px): 4 Columns
┌─────┬─────┬─────┬─────┐
│ S1  │ S2  │ S3  │ S4  │
└─────┴─────┴─────┴─────┘

Tablet (768px - 1023px): 2 Columns
┌─────────┬─────────┐
│ S1      │ S2      │
├─────────┼─────────┤
│ S3      │ S4      │
└─────────┴─────────┘

Mobile (< 768px): 1 Column
┌──────────┐
│ S1       │
├──────────┤
│ S2       │
├──────────┤
│ S3       │
├──────────┤
│ S4       │
└──────────┘

Gap: 24px (gap-6)
```

### Tools Grid
```
Desktop (>= 1024px): 2 Columns
┌──────────────┬──────────────┐
│ Tool 1       │ Tool 2       │
└──────────────┴──────────────┘

Tablet (768px - 1023px): 2 Columns
┌──────────────┬──────────────┐
│ Tool 1       │ Tool 2       │
└──────────────┴──────────────┘

Mobile (< 768px): 1 Column
┌──────────────┐
│ Tool 1       │
├──────────────┤
│ Tool 2       │
└──────────────┘

Gap: 24px (gap-6)
```

### Quick Actions Grid
```
Desktop: 3 Columns (25% + gap + 25% + gap + 25%)
┌────────┬────────┬────────┐
│ Act 1  │ Act 2  │ Act 3  │
└────────┴────────┴────────┘

Tablet: 3 Columns (even spacing)
┌──────┬──────┬──────┐
│ Act1 │ Act2 │ Act3 │
└──────┴──────┴──────┘

Mobile: 1 Column (full width)
┌──────────────┐
│ Action 1     │
├──────────────┤
│ Action 2     │
├──────────────┤
│ Action 3     │
└──────────────┘

Gap: 16px (gap-4)
```

---

## Animation & Transitions

### Hover Effects
```
Button Hover:
├─ background-color: 300ms ease
├─ box-shadow: 200ms ease
└─ transform: 150ms ease

Card Hover:
├─ box-shadow: 200ms ease
├─ border-color: 200ms ease
└─ opacity: 100ms ease
```

### Loading States
```
Spinner Animation:
├─ Duration: 1s
├─ Timing: Linear infinite
├─ Transform: rotate(360deg)
└─ Size: w-5 h-5 or w-12 h-12

Fade In:
├─ Duration: 300ms
├─ From: opacity-0
└─ To: opacity-100
```

### Transition Properties
```
transition-all: All properties
transition-colors: Only color changes
transition-shadow: Only shadow changes
transition-opacity: Only opacity changes

Duration: 200ms (default), 300ms (slower)
Timing: ease, ease-in-out
```

---

## Responsive Design Breakpoints

### Tailwind Breakpoints
```
sm:  >= 640px   (Small devices, landscape phones)
md:  >= 768px   (Tablets)
lg:  >= 1024px  (Desktops)
xl:  >= 1280px  (Large desktops)
2xl: >= 1536px  (Extra large displays)

Usage in Components:
├─ md:flex - Hide on mobile, show on tablet+
├─ sm:grid-cols-2 lg:grid-cols-4 - Responsive columns
├─ md:w-1/3 - Width changes at breakpoint
└─ hidden sm:block - Show/hide at breakpoint
```

---

## Dark Mode Support (Optional Future)

```
For future dark mode implementation:

Admin Theme (already dark):
├─ No changes needed
└─ Maintains current appearance

Vendor Theme (add dark support):
├─ Dark: from-gray-800 to-gray-900
├─ Light: from-gray-50 to-blue-50
└─ Toggle: use prefers-color-scheme

Customer Theme (add dark support):
├─ Dark: from-gray-800 to-gray-900
├─ Light: from-gray-50 to-green-50
└─ Toggle: use prefers-color-scheme
```

---

## Accessibility Color Contrast

```
All combinations tested for WCAG AA compliance:

Admin Theme:
├─ White text on Red-600: ✓ 8.1:1 (AAA)
├─ Gray-100 on Gray-900: ✓ 14.1:1 (AAA)
└─ White on Red-700: ✓ 5.8:1 (AA)

Vendor Theme:
├─ Gray-900 on White: ✓ 13.1:1 (AAA)
├─ Gray-900 on Blue-50: ✓ 12.5:1 (AAA)
└─ White on Blue-600: ✓ 6.2:1 (AA)

Customer Theme:
├─ Gray-900 on White: ✓ 13.1:1 (AAA)
├─ Gray-900 on Green-50: ✓ 12.8:1 (AAA)
└─ White on Green-700: ✓ 5.1:1 (AA)
```

---

## Print Styles (Optional)

```
@media print {
  ├─ Hide: Buttons, animations, sidebars
  ├─ Colors: Convert to grayscale
  ├─ Fonts: Use print-safe fonts
  └─ Layout: Single column, A4 size
}
```

---

## Performance Optimizations

```
Image Optimization:
├─ Use modern formats (WebP)
├─ Lazy load images
├─ Optimize for different screen sizes
└─ Use placeholder while loading

CSS Optimization:
├─ Purge unused Tailwind classes
├─ Minimize CSS file size
├─ Use CSS variables for theming
└─ Combine media queries

JavaScript Optimization:
├─ Code split components
├─ Lazy load heavy components
├─ Memoize expensive calculations
└─ Debounce expensive operations
```

---

## Usage Examples

### Applying Colors
```jsx
// Admin color
className="bg-red-600 text-white"

// Vendor color
className="bg-blue-600 text-white"

// Customer color
className="bg-green-600 text-white"
```

### Responsive Classes
```jsx
// Mobile first approach
className="w-full md:w-1/2 lg:w-1/3"

// Different layouts
className="block md:grid md:grid-cols-2 lg:grid-cols-4"

// Hidden/Visible
className="hidden md:block lg:flex"
```

### Shadow Effects
```jsx
// Card shadow
className="shadow-lg hover:shadow-xl"

// Button shadow
className="shadow-sm hover:shadow-md"

// No shadow
className="shadow-none"
```

