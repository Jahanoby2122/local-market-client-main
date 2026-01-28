# UserInfoPanel - Visual Component Examples

## Component Usage Examples

### Example 1: Basic Import and Usage

```jsx
import React from 'react';
import UserInfoPanel from './DashBord/UserInfoPanel';

function DashboardPage() {
  return (
    <div>
      <UserInfoPanel />
    </div>
  );
}

export default DashboardPage;
```

---

## Role-Based Rendering Flow

### Admin User Rendering Path

```jsx
// User: admin@example.com
// User Role: admin

<UserInfoPanel />
  ↓ (role check)
  ↓ 'admin' === 'admin' ✓
  ↓
<AdminUserInfoPanel
  user={{
    email: 'admin@example.com',
    displayName: 'Admin User',
    photoURL: '...',
    ...
  }}
  contactInfo={{
    phone: '01712345678',
    address: 'Dhaka, Bangladesh',
    joinDate: 'January 2024'
  }}
  error={null}
/>

// Renders:
┌────────────────────────────────────┐
│ 🛡️ Admin Dashboard                │
│ Administrative oversight           │
├────────────────────────────────────┤
│ [Dark Red Profile Section]         │
│ ├─ Admin User                      │
│ ├─ admin@example.com               │
│ └─ SYSTEM ADMINISTRATOR            │
├────────────────────────────────────┤
│ Statistics: 4 Cards (dark theme)   │
├────────────────────────────────────┤
│ Admin Tools & Quick Actions        │
└────────────────────────────────────┘
```

### Vendor User Rendering Path

```jsx
// User: vendor@example.com
// User Role: vendor

<UserInfoPanel />
  ↓ (role check)
  ↓ 'vendor' === 'vendor' ✓
  ↓
<VendorUserInfoPanel
  user={{
    email: 'vendor@example.com',
    displayName: 'John Store',
    photoURL: '...',
    ...
  }}
  contactInfo={{
    phone: '01787654321',
    address: 'Mirpur, Dhaka',
    joinDate: 'March 2023'
  }}
  error={null}
/>

// Renders:
┌────────────────────────────────────┐
│ 📦 Vendor Dashboard                │
│ Manage your store & products       │
├────────────────────────────────────┤
│ [Light Blue Profile Section]       │
│ ├─ John Store                      │
│ ├─ vendor@example.com              │
│ └─ VERIFIED VENDOR                 │
├────────────────────────────────────┤
│ Statistics: 4 Cards (light theme)  │
├────────────────────────────────────┤
│ Business Tools & Quick Actions     │
└────────────────────────────────────┘
```

### Customer User Rendering Path

```jsx
// User: customer@example.com
// User Role: customer (default)

<UserInfoPanel />
  ↓ (role check)
  ↓ (role !== 'admin' && role !== 'vendor')
  ↓
<CustomerUserInfoPanel
  user={{
    email: 'customer@example.com',
    displayName: 'Customer User',
    photoURL: '...',
    ...
  }}
  contactInfo={{
    phone: '01798765432',
    address: 'Gulshan, Dhaka',
    joinDate: 'June 2024'
  }}
  error={null}
  watchlistCount={2}
  loading={{ watchlist: false, stats: true }}
/>

// Renders:
┌────────────────────────────────────┐
│ Welcome back, Customer User!       │
│ Personalized dashboard overview    │
├────────────────────────────────────┤
│ [Green Profile Section]            │
│ ├─ Customer User                   │
│ ├─ customer@example.com            │
│ └─ Member                          │
├────────────────────────────────────┤
│ Statistics: 4 Cards (green theme)  │
├────────────────────────────────────┤
│ Quick Actions & Coming Soon        │
└────────────────────────────────────┘
```

---

## Detailed Component Structure

### AdminUserInfoPanel Full Structure

```jsx
<AdminUserInfoPanel>
  │
  ├─ Header
  │  ├─ Shield Icon
  │  ├─ "Admin Dashboard" Title
  │  └─ Subtitle
  │
  ├─ Error Alert (conditional)
  │  └─ Error message
  │
  ├─ Profile Card
  │  ├─ Left Section (1/3 width)
  │  │  ├─ Avatar Image
  │  │  ├─ Shield Badge Overlay
  │  │  ├─ Display Name
  │  │  ├─ Email
  │  │  └─ "SYSTEM ADMINISTRATOR" Badge
  │  │
  │  └─ Right Section (2/3 width)
  │     ├─ Section Title
  │     ├─ Edit Profile Button
  │     └─ Info Rows (4 items)
  │        ├─ Email Address (with verified badge)
  │        ├─ Phone Number
  │        ├─ Location
  │        └─ Member Since
  │
  ├─ Statistics Grid (4 columns)
  │  ├─ AdminStatCard: Total Users
  │  ├─ AdminStatCard: Platform Orders
  │  ├─ AdminStatCard: Platform Revenue
  │  └─ AdminStatCard: System Health
  │
  ├─ Admin Tools Section (2 columns)
  │  ├─ User Management Tool
  │  │  ├─ Icon + Title
  │  │  ├─ Description
  │  │  └─ Action Button
  │  └─ Content Moderation Tool
  │     ├─ Icon + Title
  │     ├─ Description
  │     └─ Action Button
  │
  └─ Quick Actions (3 columns)
     ├─ ActionButton: Security Settings
     ├─ ActionButton: System Alerts
     └─ ActionButton: Analytics
```

### VendorUserInfoPanel Full Structure

```jsx
<VendorUserInfoPanel>
  │
  ├─ Header
  │  ├─ Package Icon
  │  ├─ "Vendor Dashboard" Title
  │  └─ Subtitle
  │
  ├─ Error Alert (conditional)
  │  └─ Error message
  │
  ├─ Profile Card
  │  ├─ Left Section (1/3 width)
  │  │  ├─ Avatar Image
  │  │  ├─ Check Circle Badge Overlay
  │  │  ├─ Display Name
  │  │  ├─ Email
  │  │  └─ "VERIFIED VENDOR" Badge
  │  │
  │  └─ Right Section (2/3 width)
  │     ├─ Section Title
  │     ├─ Edit Profile Button
  │     └─ Info Rows (4 items)
  │        ├─ Business Email (with verified badge)
  │        ├─ Business Phone
  │        ├─ Business Location
  │        └─ Vendor Since
  │
  ├─ Vendor Statistics (4 columns)
  │  ├─ StatCard: My Products (28)
  │  ├─ StatCard: Total Sales (156)
  │  ├─ StatCard: Revenue (৳15,840)
  │  └─ StatCard: Rating (4.8★)
  │
  ├─ Vendor Tools Section (2 columns)
  │  ├─ Product Management Tool
  │  │  ├─ Icon + Title
  │  │  ├─ Description
  │  │  └─ Action Button
  │  └─ Sales Analytics Tool
  │     ├─ Icon + Title
  │     ├─ Description
  │     └─ Action Button
  │
  └─ Quick Actions (3 columns, light bg)
     ├─ ActionButton: Add New Product
     ├─ ActionButton: Sales Reports
     └─ ActionButton: Store Settings
```

### CustomerUserInfoPanel Full Structure

```jsx
<CustomerUserInfoPanel>
  │
  ├─ Header
  │  ├─ Personalized Greeting
  │  └─ Subtitle
  │
  ├─ Error Alert (conditional)
  │  └─ Error message
  │
  ├─ Profile Card
  │  ├─ Left Section (1/3 width)
  │  │  ├─ Avatar Image
  │  │  ├─ Edit Icon Button
  │  │  ├─ Display Name
  │  │  ├─ Email
  │  │  └─ "Member" Badge
  │  │
  │  └─ Right Section (2/3 width)
  │     ├─ Section Title
  │     ├─ Edit Profile Button
  │     └─ Info Rows (4 items)
  │        ├─ Email Address (with verified badge)
  │        ├─ Phone Number
  │        ├─ Location
  │        └─ Member Since
  │
  ├─ Customer Statistics (4 columns)
  │  ├─ StatCard: Watchlist (2)
  │  │  └─ Link: View Watchlist
  │  ├─ StatCard: My Orders (1)
  │  │  └─ Link: Track Orders
  │  ├─ StatCard: My Reviews (0)
  │  └─ StatCard: Monthly Spend (৳38.00)
  │
  ├─ Coming Soon Section
  │  ├─ Chart Icon
  │  ├─ "Purchase Insights" Title
  │  ├─ Description
  │  └─ "In Development" Badge
  │
  └─ Quick Actions (3 columns)
     ├─ ActionButton: Security Settings
     ├─ ActionButton: Notification Preferences
     └─ ActionButton: Payment Methods
```

---

## SubComponent Examples

### InfoRow Component Usage

```jsx
// Light theme (customers, vendors)
<InfoRow
  icon={<Mail className="w-5 h-5" />}
  label="Email Address"
  value="customer@example.com"
  verified={true}
  dark={false}
/>

// Renders as:
┌─────────────────────────────────┐
│ [MAIL ICON]                     │
│ ├─ EMAIL ADDRESS (label)        │
│ └─ customer@example.com ✓       │
│    (with verified badge)        │
└─────────────────────────────────┘

// Dark theme (admin)
<InfoRow
  icon={<Mail className="w-5 h-5" />}
  label="Email Address"
  value="admin@example.com"
  verified={true}
  dark={true}
/>

// Renders as (dark version):
┌─────────────────────────────────┐
│ [RED MAIL ICON]                 │
│ ├─ EMAIL ADDRESS (gray label)   │
│ └─ admin@example.com ✓          │
│    (with green verified badge)  │
└─────────────────────────────────┘
```

### StatCard Component Usage

```jsx
// With loading spinner
<StatCard
  icon={<Heart className="w-6 h-6" />}
  title="Watchlist"
  value={<Loader2 className="w-5 h-5 animate-spin mx-auto" />}
  subtitle="Items saved"
  color="pink"
  loading={true}
/>

// Renders as:
┌──────────────────────────┐
│ [PINK HEART ICON]        │
│ Watchlist                │
│ [SPINNING LOADER]        │
│ Items saved              │
└──────────────────────────┘

// With actual value
<StatCard
  icon={<Heart className="w-6 h-6" />}
  title="Watchlist"
  value={2}
  subtitle="Items saved"
  linkText="View Watchlist"
  linkIcon={<ExternalLink className="w-4 h-4" />}
  color="pink"
  loading={false}
/>

// Renders as:
┌──────────────────────────┐
│ [PINK HEART ICON]        │
│ Watchlist                │
│ 2                        │
│ Items saved              │
│ View Watchlist →         │
└──────────────────────────┘
```

### AdminStatCard Component Usage

```jsx
<AdminStatCard
  icon={<Users className="w-6 h-6" />}
  title="Total Users"
  value="1,234"
  subtitle="Active members"
  color="blue"
/>

// Renders as (dark theme):
┌──────────────────────────┐
│ [BLUE USERS ICON]        │
│ Total Users              │
│ 1,234 (large, bold)      │
│ Active members (gray)    │
└──────────────────────────┘
```

### ActionButton Component Usage

```jsx
// Light theme (vendors)
<ActionButton
  icon={<Package className="w-5 h-5" />}
  title="Add New Product"
  subtitle="Create a new listing"
  light={true}
/>

// Renders as:
┌──────────────────────────┐
│ 📦 Add New Product       │
│ Create a new listing     │
└──────────────────────────┘

// Dark theme (admin)
<ActionButton
  icon={<Lock className="w-5 h-5" />}
  title="Security Settings"
  subtitle="Manage security policies"
  light={false}
/>

// Renders as (dark):
┌──────────────────────────┐
│ 🔒 Security Settings     │
│ Manage security policies │
└──────────────────────────┘
```

---

## State Management Examples

### Managing Edit Modal State

```jsx
const [isEditModalOpen, setIsEditModalOpen] = useState(false);

return (
  <>
    <button onClick={() => setIsEditModalOpen(true)}>
      Edit Profile
    </button>
    
    {isEditModalOpen && (
      <ProfileModal 
        onClose={() => setIsEditModalOpen(false)} 
      />
    )}
  </>
);
```

### Managing Loading States

```jsx
const [loading, setLoading] = useState({
  watchlist: true,
  stats: true,
  adminData: true
});

// Update specific loader
setLoading(prev => ({ 
  ...prev, 
  watchlist: false 
}));

// Use in rendering
{loading.watchlist ? <Spinner /> : <DataDisplay />}
```

### Managing Error States

```jsx
const [error, setError] = useState(null);

useEffect(() => {
  fetchData()
    .catch(err => setError(err.message));
}, []);

return (
  <>
    {error && <ErrorAlert message={error} />}
    {!error && <Content />}
  </>
);
```

---

## Animation Examples

### Spinner Animation

```jsx
{loading.watchlist && (
  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
)}

// CSS animation (Tailwind built-in)
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Hover Effects

```css
/* Card hover */
.transition-shadow:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Border transition */
.hover\:border-red-500:hover {
  border-color: #ef4444;
}

/* Color transition */
.transition-all:hover {
  background-color: #1f2937;
}
```

---

## Responsive Examples

### Mobile View (< 768px)

```
┌──────────┐
│ Header   │
├──────────┤
│ Profile  │
│ (single  │
│  column) │
├──────────┤
│ Stat 1   │
├──────────┤
│ Stat 2   │
├──────────┤
│ Stat 3   │
├──────────┤
│ Stat 4   │
└──────────┘
```

### Tablet View (768px - 1024px)

```
┌─────────────────────────┐
│ Header                  │
├──────────┬──────────────┤
│ Profile  │ Contact Info │
│(1/3 w)   │ (2/3 w)      │
├─────────────────────────┤
│ Stat 1 │ Stat 2 │ Stat 3 │ 4
└─────────────────────────┘
```

### Desktop View (> 1024px)

```
┌──────────────────────────────────┐
│ Header                           │
├──────────────┬───────────────────┤
│ Profile(1/3) │ Contact Info(2/3) │
├──────────────────────────────────┤
│ Stat 1 │ Stat 2 │ Stat 3 │ Stat 4
└──────────────────────────────────┘
```

---

## Color System Examples

### Tailwind Color Mapping

```jsx
// Admin (Red)
bg-red-600      // Primary button
text-red-500    // Icons & accents
border-red-700  // Borders

// Vendor (Blue)
bg-blue-600     // Primary button
text-blue-500   // Icons & accents
border-blue-700 // Borders

// Customer (Green)
bg-green-600    // Primary button
text-green-500  // Icons & accents
border-green-700// Borders

// Neutral elements
bg-gray-50      // Light backgrounds
bg-gray-900     // Dark backgrounds
text-gray-600   // Secondary text
border-gray-200 // Light borders
```

