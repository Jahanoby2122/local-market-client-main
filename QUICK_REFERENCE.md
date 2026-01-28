# UserInfoPanel - Quick Reference Guide

## File Location
```
src/DashBord/UserInfoPanel.jsx
```

## Quick Import
```jsx
import UserInfoPanel from './DashBord/UserInfoPanel';
```

## Component Props (Main Component)
None - component is self-contained and uses hooks

## Dependencies
- `react` - Core React library
- `lucide-react` - Icons library
- `UseAuth` hook - Authentication context
- `useUserRole` hook - Role detection
- `tailwindcss` - Styling framework

## Auto-Routing Logic

| User Role | Rendered Component | Theme | Color |
|-----------|------------------|-------|-------|
| `admin` | `AdminUserInfoPanel` | Dark | Red/White |
| `vendor` | `VendorUserInfoPanel` | Light | Blue |
| `customer` | `CustomerUserInfoPanel` | Light | Green |
| (loading) | Spinner | - | - |
| (not logged in) | Not signed in message | - | - |

---

## Component Sections Reference

### Admin Dashboard Sections
1. **Header** - Shield icon + Title
2. **Profile Card** - User info + Contact details
3. **Statistics** - 4 stat cards (Users, Orders, Revenue, Health)
4. **Admin Tools** - User Mgmt, Content Moderation
5. **Quick Actions** - Security, Alerts, Analytics

### Vendor Dashboard Sections
1. **Header** - Package icon + Title
2. **Profile Card** - Business info + Contact details
3. **Business Statistics** - 4 stat cards (Products, Sales, Revenue, Rating)
4. **Business Tools** - Product Mgmt, Sales Analytics
5. **Quick Actions** - Add Product, Reports, Settings

### Customer Dashboard Sections
1. **Header** - Personalized greeting
2. **Profile Card** - User info + Contact details
3. **Shopping Statistics** - 4 stat cards (Watchlist, Orders, Reviews, Spend)
4. **Coming Soon** - Purchase Insights feature teaser
5. **Quick Actions** - Security, Notifications, Payment

---

## Subcomponent Cheat Sheet

### InfoRow
```jsx
<InfoRow
  icon={<Icon className="w-5 h-5" />}
  label="Label Text"
  value="Display Value"
  verified={true/false}
  dark={true/false}
/>
```

### StatCard
```jsx
<StatCard
  icon={<Icon className="w-6 h-6" />}
  title="Title"
  value={number|string|component}
  subtitle="Subtitle"
  linkText="Link text" (optional)
  linkIcon={<Icon />} (optional)
  color="pink|blue|yellow|green|purple|gray"
  loading={true/false}
/>
```

### AdminStatCard
```jsx
<AdminStatCard
  icon={<Icon className="w-6 h-6" />}
  title="Title"
  value="1,234"
  subtitle="Subtitle"
  color="blue|purple|green|cyan|red"
/>
```

### ActionButton
```jsx
<ActionButton
  icon={<Icon className="w-5 h-5" />}
  title="Button Title"
  subtitle="Brief Description"
  light={true/false}
/>
```

---

## Icons Used

### Admin Icons
- `Shield` - Admin badge
- `Users` - User management
- `Package` - Content
- `TrendingUp` - Revenue
- `Activity` - System health
- `Lock` - Security
- `Bell` - Alerts
- `BarChart3` - Analytics
- `AlertCircle` - Errors

### Vendor Icons
- `Package` - Products
- `CheckCircle` - Verification
- `ShoppingCart` - Sales
- `TrendingUp` - Revenue/Analytics
- `Star` - Ratings
- `Settings` - Store settings
- `BarChart3` - Reports

### Customer Icons
- `Heart` - Watchlist
- `ShoppingCart` - Orders
- `Star` - Reviews
- `CreditCard` - Spending
- `BarChart3` - Insights
- `Pencil` - Edit
- `ExternalLink` - Links

### Generic Icons
- `Mail` - Email
- `Phone` - Phone number
- `MapPin` - Location
- `User` - User info
- `Loader2` - Loading
- `AlertCircle` - Errors
- `Pencil` - Edit button

---

## Tailwind CSS Classes Used

### Spacing
```
p-4, p-6, p-8     - Padding
mb-2, mb-4, mb-6  - Margin bottom
gap-3, gap-4, gap-6 - Grid/flex gaps
```

### Colors
```
bg-red-600        - Admin primary
bg-blue-600       - Vendor primary
bg-green-600      - Customer primary
text-gray-900     - Primary text
text-gray-600     - Secondary text
```

### Layout
```
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 - Responsive grid
md:flex - Medium and up flexbox
md:w-1/3 md:w-2/3 - Width columns
```

### Effects
```
shadow-lg        - Large shadow
hover:shadow-md  - Hover shadow
rounded-xl       - Border radius
transition-all   - Smooth transitions
```

---

## API Endpoints Required

### User Role Detection
```
GET /users/{email}/role

Response:
{
  "role": "admin" | "vendor" | "customer"
}
```

### Watchlist (Customer Only)
```
GET /watchlist?email={email}

Response:
[
  { id: 1, productId: 123, ... },
  { id: 2, productId: 456, ... }
]
```

---

## Customization Quick Fixes

### Change Admin Color Theme
```jsx
// Find: from-red-600 to-red-700
// Replace with: from-blue-600 to-blue-700
```

### Change Vendor Color Theme
```jsx
// Find: from-blue-50 to-blue-100
// Replace with: from-purple-50 to-purple-100
```

### Change Customer Color Theme
```jsx
// Find: from-green-50 to-emerald-100
// Replace with: from-teal-50 to-teal-100
```

### Add New Stat Card
```jsx
<AdminStatCard
  icon={<Icon className="w-6 h-6" />}
  title="New Stat"
  value="Value"
  subtitle="Description"
  color="color-name"
/>
```

### Modify Contact Fields
```jsx
const contactInfo = {
  phone: user?.phoneNumber || 'Placeholder',
  address: user?.address || 'Placeholder',
  joinDate: user?.createdAt || 'Placeholder'
  // Add more fields here
};
```

---

## Loading States

### Watchlist Loading (Customer)
```jsx
{loading.watchlist ? (
  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
) : (
  watchlistCount
)}
```

### Role Loading (All)
```jsx
{roleLoading ? (
  <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
) : (
  <YourContent />
)}
```

---

## Error Handling

### Display Error Message
```jsx
{error && (
  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
    <p className="text-red-700 text-sm">{error}</p>
  </div>
)}
```

---

## Common CSS Classes by Section

### Header
```
text-3xl font-bold
text-4xl font-bold
text-gray-600 (subtitle)
```

### Profile Card
```
bg-white rounded-2xl shadow-lg overflow-hidden mb-8
bg-gradient-to-br from-green-50 to-emerald-100
w-32 h-32 rounded-full object-cover border-4 border-white
```

### Stat Cards
```
bg-white rounded-xl shadow-sm border border-gray-200
inline-flex p-3 rounded-lg bg-pink-50 text-pink-600
text-2xl font-bold text-gray-900
```

### Buttons
```
bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg
flex items-center gap-2 text-green-600 hover:text-green-700
w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg
```

---

## Responsive Breakpoints

```
Mobile First:
- Default: < 640px (single column)
- sm: >= 640px (2 columns)
- md: >= 768px (flexbox)
- lg: >= 1024px (3-4 columns)
```

---

## Browser Support

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile browsers

---

## Performance Tips

1. **Use React.memo** for subcomponents
2. **Lazy load images** with `loading="lazy"`
3. **Debounce API calls** if adding search
4. **Cache with React Query** `staleTime`
5. **Memoize callbacks** with `useCallback`

---

## Accessibility Checklist

✅ All images have alt text
✅ All buttons have text labels
✅ High contrast colors
✅ Proper heading hierarchy (h1-h4)
✅ Visible focus states
✅ Keyboard navigation support

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Component doesn't render | Check if user is logged in |
| Wrong dashboard shows | Verify role value in API |
| Icons missing | Install lucide-react |
| Styling broken | Check Tailwind config |
| No watchlist data | Verify API endpoint |
| Role loading forever | Check useUserRole hook |

---

## Quick Links

- [Full Documentation](./USER_INFO_PANEL_DOCUMENTATION.md)
- [Integration Guide](./INTEGRATION_GUIDE.md)
- [Feature Summary](./PANEL_FEATURES_SUMMARY.md)
- [Component Examples](./COMPONENT_EXAMPLES.md)

---

## File Statistics

- **Total Lines**: 769
- **Components**: 1 main + 6 subcomponents
- **Icons**: 25+
- **Color Themes**: 3 (Admin, Vendor, Customer)
- **Responsive Breakpoints**: 3 (sm, md, lg)

---

## Last Updated
January 27, 2026

