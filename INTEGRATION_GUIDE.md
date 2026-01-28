# UserInfoPanel Integration Guide

## Quick Start

### 1. Import the Component

```jsx
import UserInfoPanel from './DashBord/UserInfoPanel';
```

### 2. Add to Your Routes

```jsx
// In your router configuration
import { createBrowserRouter } from 'react-router-dom';
import UserInfoPanel from './DashBord/UserInfoPanel';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <UserInfoPanel />,
    loader: protectedRoute // Optional: add route protection
  }
]);
```

### 3. Add Navigation Link

```jsx
// In your navigation component
<NavLink to="/dashboard">
  <User className="w-5 h-5" />
  Dashboard
</NavLink>
```

---

## API Integration Examples

### Fetching User Role

The component automatically uses the `useUserRole` hook. Ensure your API endpoint returns:

```javascript
// API Response Format
GET /users/{email}/role

Response:
{
  "role": "admin" | "vendor" | "customer"
}
```

### Fetching Watchlist (Customer Only)

```javascript
// API Response Format
GET /watchlist?email=user@example.com

Response:
[
  { id: 1, productId: 123, ... },
  { id: 2, productId: 456, ... }
]
```

### Custom User Data

To display custom user information, update the `contactInfo` object:

```jsx
const contactInfo = {
  phone: user?.phoneNumber || '017xxxxxxxx',
  address: user?.address || 'Dhaka, Bangladesh',
  joinDate: user?.createdAt?.toLocaleDateString() || 'January 2024',
  // Add more fields as needed
  businessName: user?.businessName,
  taxId: user?.taxId,
  website: user?.website
};
```

---

## Customization Examples

### Example 1: Add New Admin Statistic

```jsx
// In AdminUserInfoPanel component, add:
<AdminStatCard
  icon={<TrendingUp className="w-6 h-6" />}
  title="Avg. Order Value"
  value="৳2,450"
  subtitle="This month"
  color="purple"
/>
```

### Example 2: Add New Vendor Tool

```jsx
// Add to Vendor Tools Section:
<div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
  <div className="flex items-center gap-4 mb-4">
    <div className="p-3 bg-orange-100 rounded-lg">
      <AlertCircle className="w-6 h-6 text-orange-600" />
    </div>
    <h3 className="text-lg font-bold text-gray-900">Order Alerts</h3>
  </div>
  <p className="text-gray-600 text-sm mb-4">Track and manage new orders</p>
  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium transition-all">
    View Orders
  </button>
</div>
```

### Example 3: Add Real Data Fetching

```jsx
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/UseAxiosSecure';

// In AdminUserInfoPanel component:
const axiosSecure = useAxiosSecure();

const { data: adminStats } = useQuery({
  queryKey: ['adminStats'],
  queryFn: async () => {
    const response = await axiosSecure.get('/admin/statistics');
    return response.data;
  }
});

// Then use the data:
<AdminStatCard
  icon={<Users className="w-6 h-6" />}
  title="Total Users"
  value={adminStats?.totalUsers || 'Loading...'}
  subtitle="Active members"
  color="blue"
/>
```

### Example 4: Add Modal for Profile Editing

```jsx
import { useState } from 'react';
import ProfileEditModal from './ProfileEditModal';

// In any panel component:
const [isEditModalOpen, setIsEditModalOpen] = useState(false);

// In the header section:
<button 
  onClick={() => setIsEditModalOpen(true)}
  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
>
  <Pencil className="w-4 h-4" />
  Edit Profile
</button>

// Add the modal:
{isEditModalOpen && (
  <ProfileEditModal 
    user={user} 
    onClose={() => setIsEditModalOpen(false)} 
  />
)}
```

---

## Styling Customization

### Change Admin Theme Color

```jsx
// From red to blue
// In AdminUserInfoPanel:

// Change accent color
className="bg-gradient-to-br from-blue-600 to-blue-700"

// Change text color
className="text-blue-100"

// Update buttons
className="bg-blue-600 hover:bg-blue-700"
```

### Change Vendor Theme Color

```jsx
// From blue to purple
// In VendorUserInfoPanel:

// Change background
className="bg-gradient-to-br from-purple-50 to-purple-100"

// Change accent
className="text-purple-600"

// Update buttons
className="bg-purple-600 hover:bg-purple-700"
```

### Change Customer Theme Color

```jsx
// From green to teal
// In CustomerUserInfoPanel:

// Change gradient
className="bg-gradient-to-br from-teal-50 to-teal-100"

// Change accent
className="text-teal-700"

// Update buttons
className="bg-teal-600 hover:bg-teal-700"
```

---

## Advanced Features

### Feature 1: Real-time Statistics Updates

```jsx
import { useEffect } from 'react';

useEffect(() => {
  // Fetch statistics every 30 seconds
  const interval = setInterval(() => {
    refetch(); // Refetch admin stats
  }, 30000);

  return () => clearInterval(interval);
}, []);
```

### Feature 2: Role-based Permissions

```jsx
// In your component:
const { role } = useUserRole();

const canManageUsers = role === 'admin';
const canManageProducts = role === 'vendor';
const canMakeOrders = role === 'customer';

// Conditionally render actions
{canManageUsers && <button>Manage Users</button>}
{canManageProducts && <button>Add Product</button>}
{canMakeOrders && <button>View Orders</button>}
```

### Feature 3: Export Dashboard Data

```jsx
const exportDashboardData = () => {
  const data = {
    user: user,
    role: role,
    statistics: {
      // Add stats based on role
    },
    exportedAt: new Date().toISOString()
  };
  
  const jsonString = JSON.stringify(data, null, 2);
  const element = document.createElement('a');
  element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonString);
  element.download = `dashboard-${user.email}-${Date.now()}.json`;
  element.click();
};

// Add button:
<button onClick={exportDashboardData}>
  Export Dashboard
</button>
```

---

## Error Handling Examples

### Example 1: Handling Missing User Role

```jsx
if (roleLoading) {
  return <LoadingSpinner />;
}

if (!role) {
  return (
    <div className="text-center py-12">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <p className="text-red-600">Unable to determine user role</p>
    </div>
  );
}
```

### Example 2: Handling API Errors

```jsx
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      if (!response.ok) throw new Error('Failed to load');
      const data = await response.json();
      // Process data
    } catch (err) {
      setError(err.message);
    }
  };
  
  fetchData();
}, []);

// Display error:
{error && <ErrorAlert message={error} />}
```

---

## Testing Examples

### Unit Test for Role Detection

```javascript
import { render } from '@testing-library/react';
import UserInfoPanel from './UserInfoPanel';
import * as hooks from '../Hooks/UseAuth';
import * as roleHooks from '../Hooks/useUserRole';

jest.mock('../Hooks/UseAuth');
jest.mock('../Hooks/useUserRole');

test('renders admin panel for admin users', () => {
  hooks.default.mockReturnValue({
    user: { email: 'admin@test.com', displayName: 'Admin User' }
  });
  
  roleHooks.default.mockReturnValue({
    role: 'admin',
    roleLoading: false
  });
  
  const { getByText } = render(<UserInfoPanel />);
  expect(getByText('Admin Dashboard')).toBeInTheDocument();
});
```

### Integration Test

```javascript
test('displays watchlist count for customers', async () => {
  const mockWatchlist = [
    { id: 1, productId: 123 },
    { id: 2, productId: 456 }
  ];
  
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockWatchlist)
    })
  );
  
  const { getByText } = render(<UserInfoPanel />);
  
  await waitFor(() => {
    expect(getByText('2')).toBeInTheDocument();
  });
});
```

---

## Common Issues & Solutions

### Issue 1: Component doesn't render anything
```
❌ Problem: useUserRole hook returns undefined
✅ Solution: Check API endpoint /users/{email}/role exists and returns data
```

### Issue 2: Wrong dashboard displays
```
❌ Problem: Role detection returning wrong value
✅ Solution: Verify database has correct role values (admin, vendor, customer)
```

### Issue 3: Icons not displaying
```
❌ Problem: lucide-react not installed
✅ Solution: npm install lucide-react
```

### Issue 4: Styling looks broken
```
❌ Problem: Tailwind CSS not configured
✅ Solution: Ensure tailwind.config.js includes src folder
```

### Issue 5: Watchlist not loading
```
❌ Problem: API endpoint not responding
✅ Solution: Check /watchlist?email=... endpoint returns array
```

---

## Performance Optimization Tips

### 1. Lazy Load Images
```jsx
<img
  src={user.photoURL}
  alt="Profile"
  loading="lazy"
  onError={(e) => e.target.src = DEFAULT_AVATAR}
/>
```

### 2. Memoize Components
```jsx
const AdminStatCard = React.memo(({ icon, title, value }) => (
  // Component JSX
));
```

### 3. Use React Query for Caching
```jsx
const { data, isLoading } = useQuery({
  queryKey: ['adminStats'],
  queryFn: fetchStats,
  staleTime: 5 * 60 * 1000 // 5 minutes
});
```

### 4. Debounce Search/Filter
```jsx
import { debounce } from 'lodash';

const handleSearch = debounce((query) => {
  // Search logic
}, 300);
```

---

## Accessibility Checklist

- [ ] All images have alt text
- [ ] All buttons have clear labels
- [ ] Color is not the only way to convey information
- [ ] Heading hierarchy is proper (h1 → h4)
- [ ] Focus states are visible
- [ ] Form inputs have labels
- [ ] Error messages are clear and actionable
- [ ] Component works with keyboard navigation

---

## Deployment Checklist

- [ ] All API endpoints are correct for production
- [ ] Environment variables are set
- [ ] Error handling is in place
- [ ] Loading states are implemented
- [ ] Performance has been tested
- [ ] Accessibility has been verified
- [ ] Browser compatibility checked
- [ ] Mobile responsiveness confirmed

---

## Support Resources

- **Lucide React**: https://lucide.dev
- **Tailwind CSS**: https://tailwindcss.com
- **React Documentation**: https://react.dev
- **React Query**: https://tanstack.com/query

