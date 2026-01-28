# Professional User Information Panel Documentation

## Overview

The **UserInfoPanel** component has been completely redesigned to provide role-based, professional user dashboards for three different user types:
- **Admin Users** - System administrators with platform oversight
- **Vendor Users** - Business sellers managing their products
- **Customer Users** - Regular customers shopping on the platform

## Architecture

### Main Component: `UserInfoPanel`

The root component automatically detects the user's role and renders the appropriate dashboard:

```jsx
import UserInfoPanel from '../DashBord/UserInfoPanel';

// The component automatically renders based on user role
<UserInfoPanel />
```

### Dependencies

- **UseAuth**: Provides current user authentication data
- **useUserRole**: Determines the user's role (admin, vendor, or customer)
- **lucide-react**: Icons for visual enhancements

## Role-Based Dashboards

### 1. Admin Dashboard (`AdminUserInfoPanel`)

#### Visual Design
- **Color Scheme**: Dark theme (dark gray with red accents)
- **Background**: Gradient from gray-900 to gray-800
- **Profile Section**: Red gradient background with shield icon

#### Key Features

**Profile Card**
- Admin user profile with verification badge
- Verified email address display
- Phone and location information
- Member since date

**Statistics Cards** (4-column grid)
- Total Users (1,234)
- Platform Orders (5,678)
- Platform Revenue (৳45,320)
- System Health (99.8%)

**Admin Tools Section**
- User Management: Manage accounts, roles, and permissions
- Content Moderation: Review platform content and listings

**Quick Actions**
- Security Settings: Manage security policies
- System Alerts: Configure notifications
- Analytics: View detailed reports

#### Styling Highlights
```jsx
// Admin dashboard uses dark theme
className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"

// Red accent for admin role
className="bg-gradient-to-br from-red-600 to-red-700"
```

---

### 2. Vendor Dashboard (`VendorUserInfoPanel`)

#### Visual Design
- **Color Scheme**: Light blue theme with professional white accents
- **Background**: Light gradient (gray-50 to blue-50)
- **Profile Section**: Blue gradient with check circle icon

#### Key Features

**Profile Card**
- Vendor profile with verification badge (VERIFIED VENDOR)
- Business email address
- Business phone and location
- Vendor since date

**Business Statistics** (4-column grid)
- My Products (28 active listings)
- Total Sales (156)
- Revenue (৳15,840)
- Rating (4.8/5 from reviews)

**Business Tools Section**
- Product Management: Add, edit, and manage listings
- Sales Analytics: Track sales, revenue, and customer insights

**Quick Actions**
- Add New Product: Create new listings
- Sales Reports: View performance metrics
- Store Settings: Manage store preferences

#### Styling Highlights
```jsx
// Vendor dashboard uses light blue theme
className="bg-gradient-to-br from-gray-50 to-blue-50"

// Blue accent for vendor role
className="bg-gradient-to-br from-blue-50 to-blue-100"
```

---

### 3. Customer Dashboard (`CustomerUserInfoPanel`)

#### Visual Design
- **Color Scheme**: Green and emerald theme
- **Background**: Light gray (gray-50)
- **Profile Section**: Green gradient background

#### Key Features

**Profile Card**
- Customer profile with member status
- Email address (verified)
- Phone and location information
- Member since date

**Shopping Statistics** (4-column grid)
- Watchlist (items saved)
- My Orders (active orders)
- My Reviews (reviews written)
- Monthly Spend (৳38.00)

**Upcoming Features**
- Purchase Insights: Analytics of shopping patterns (coming soon)

**Quick Actions**
- Security Settings: Update password and privacy
- Notification Preferences: Manage email/SMS alerts
- Payment Methods: Add/update payment options

#### Styling Highlights
```jsx
// Customer dashboard uses green theme
className="bg-gradient-to-br from-green-50 to-emerald-100"

// Green accent for customer role
className="bg-green-700"
```

---

## Reusable Subcomponents

### InfoRow Component

Displays contact or business information with icons:

```jsx
<InfoRow
  icon={<Mail className="w-5 h-5" />}
  label="Email Address"
  value={user.email}
  verified
  dark={false}
/>
```

**Props:**
- `icon`: React component (Lucide icon)
- `label`: Field label (uppercase)
- `value`: Information to display
- `verified`: Boolean for verification badge
- `dark`: Boolean for dark theme styling

---

### StatCard Component

Displays statistics in card format (primarily for customers):

```jsx
<StatCard
  icon={<Heart className="w-6 h-6" />}
  title="Watchlist"
  value={watchlistCount}
  subtitle="Items saved"
  linkText="View Watchlist"
  linkIcon={<ExternalLink className="w-4 h-4" />}
  color="pink"
  loading={false}
/>
```

**Props:**
- `icon`: React component (Lucide icon)
- `title`: Card title
- `value`: Main statistic value (number, string, or component)
- `subtitle`: Secondary text
- `linkText`: Action button text
- `linkIcon`: Icon for action button
- `color`: `pink` | `blue` | `yellow` | `green` | `purple` | `gray`
- `loading`: Boolean for loading state

---

### AdminStatCard Component

Specialized stat card for admin dashboard with dark theme:

```jsx
<AdminStatCard
  icon={<Users className="w-6 h-6" />}
  title="Total Users"
  value="1,234"
  subtitle="Active members"
  color="blue"
/>
```

**Props:**
- `icon`: React component (Lucide icon)
- `title`: Card title
- `value`: Main statistic value
- `subtitle`: Secondary text
- `color`: `blue` | `purple` | `green` | `cyan` | `red`

---

### ActionButton Component

Reusable button for quick actions:

```jsx
<ActionButton
  icon={<Package className="w-5 h-5" />}
  title="Add New Product"
  subtitle="Create a new listing"
  light={false}
/>
```

**Props:**
- `icon`: React component (Lucide icon)
- `title`: Button title
- `subtitle`: Brief description
- `light`: Boolean (light theme for vendors, dark theme for admins)

---

## Styling System

### Tailwind CSS Classes Used

#### Theme Colors
- **Admin**: Dark grays with red accents
- **Vendor**: Light blues with professional white
- **Customer**: Green and emerald tones

#### Responsive Design
- **Mobile**: Single column layout
- **Tablet**: 2-column grids
- **Desktop**: Full-width with 3-4 column grids

#### Hover Effects
- Cards: `hover:shadow-md` transition
- Buttons: Color transitions with `transition-all`
- Borders: Subtle border color changes on hover

---

## Integration Steps

### 1. Install Dependencies

Ensure `lucide-react` is installed:

```bash
npm install lucide-react
```

### 2. Verify Hook Setup

Ensure `useUserRole` hook is properly configured:

```jsx
// src/Hooks/useUserRole.jsx
const useUserRole = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const {
    data: role = 'user',
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ['userRole', user?.email?.toLowerCase()],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email.toLowerCase()}/role`);
      return res.data.role;
    },
  });

  return { role, roleLoading, refetch };
};
```

### 3. Update Routes

Add the component to your routing:

```jsx
import UserInfoPanel from './DashBord/UserInfoPanel';

// In your router
<Route path="/dashboard" element={<UserInfoPanel />} />
```

---

## Data Flow

### User Role Detection

```
1. User logs in (UseAuth)
   ↓
2. Component mounts
   ↓
3. useUserRole hook fetches role from API
   ↓
4. Role is determined (admin, vendor, customer)
   ↓
5. Appropriate dashboard component renders
```

### Watchlist Data (Customer Only)

```
1. Component mounts
   ↓
2. useEffect triggers if user?.email exists
   ↓
3. Fetch from: `/watchlist?email=${user.email}`
   ↓
4. Update watchlistCount state
   ↓
5. Display in StatCard
```

---

## Customization Guide

### Changing Colors

To customize colors for a specific role:

```jsx
// Admin - Change red to blue
className="bg-gradient-to-br from-blue-600 to-blue-700"

// Vendor - Change blue to purple
className="bg-gradient-to-br from-purple-50 to-purple-100"

// Customer - Change green to teal
className="bg-gradient-to-br from-teal-50 to-teal-100"
```

### Adding New Statistics

For admin dashboard:

```jsx
<AdminStatCard
  icon={<YourIcon className="w-6 h-6" />}
  title="New Stat"
  value="12,345"
  subtitle="Description"
  color="blue"
/>
```

### Modifying Contact Fields

Update the `contactInfo` object:

```jsx
const contactInfo = {
  phone: user?.phoneNumber || '017xxxxxxxx',
  address: user?.address || 'Dhaka, Bangladesh',
  joinDate: user?.createdAt || 'January 2024'
};
```

---

## Error Handling

The component includes error boundary handling:

```jsx
{error && (
  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
    <p className="text-red-700 text-sm">{error}</p>
  </div>
)}
```

---

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy
- **Icon + Text**: All icons accompanied by text labels
- **Color Contrast**: WCAG compliant color combinations
- **Keyboard Navigation**: Buttons are fully accessible

---

## Performance Considerations

- **Lazy Loading**: Watchlist loads only when needed
- **Conditional Rendering**: Only loads relevant dashboard for user role
- **Error Boundaries**: Graceful error handling with user feedback
- **Loading States**: Spinners for async operations

---

## Future Enhancements

- [ ] Add edit profile modal functionality
- [ ] Implement real API calls for statistics
- [ ] Add user preference persistence
- [ ] Create role-based analytics dashboard
- [ ] Add export/download functionality
- [ ] Implement activity timeline
- [ ] Add notification center

---

## File Location

```
src/DashBord/UserInfoPanel.jsx
```

## Related Files

- `src/Hooks/UseAuth.jsx` - Authentication hook
- `src/Hooks/useUserRole.jsx` - Role detection hook
- `src/Hooks/UseAxiosSecure.jsx` - Secure API calls

---

## Support & Troubleshooting

**Issue**: Dashboard not rendering role-based content
- **Solution**: Check if `useUserRole` hook is returning correct role from API

**Issue**: Watchlist count not updating
- **Solution**: Verify API endpoint `/watchlist` is accessible and returns array

**Issue**: Styling looks broken
- **Solution**: Ensure Tailwind CSS is properly configured in your project

---

## Version History

- **v1.0.0** (Current)
  - Initial release with three role-based dashboards
  - Admin, Vendor, and Customer panels
  - Reusable subcomponents
  - Dark theme for admin, light for vendor, green for customer

