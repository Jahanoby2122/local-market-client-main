import React, { useEffect, useState } from 'react';
import UseAuth from '../Hooks/UseAuth';
import UseUserRole from '../Hooks/UseUserRole';
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  ShoppingCart,
  Star,
  CreditCard,
  Pencil,
  ExternalLink,
  User,
  BarChart3,
  Loader2,
  Package,
  TrendingUp,
  Users,
  Settings,
  Lock,
  Bell,
  Shield,
  Activity,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Constants
const API_BASE_URL = 'https://local-market-server.vercel.app';
const DEFAULT_AVATAR = 'https://i.ibb.co/2kRZcHn/avatar.png';

const UserInfoPanel = () => {
  const { user } = UseAuth();
  const { role, roleLoading } = UseUserRole();
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [loading, setLoading] = useState({
    watchlist: true,
    stats: true
  });
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    if (!user?.email) return;

    const fetchUserData = async () => {
      try {
        setLoading(prev => ({ ...prev, watchlist: true }));
        setError(null);

        const [watchlistResponse] = await Promise.allSettled([
          fetch(`${API_BASE_URL}/watchlist?email=${encodeURIComponent(user.email)}`)
        ]);

        // Handle watchlist response
        if (watchlistResponse.status === 'fulfilled') {
          const data = await watchlistResponse.value.json();
          setWatchlistCount(Array.isArray(data) ? data.length : 0);
        } else {
          console.warn('Watchlist fetch failed:', watchlistResponse.reason);
        }

      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Unable to load dashboard data. Please try again.');
      } finally {
        setLoading(prev => ({ ...prev, watchlist: false }));
      }
    };

    fetchUserData();
  }, [user?.email]);

  // Fetch user data
  useEffect(() => {
    if (!user?.email) return;

    const fetchUserData = async () => {
      try {
        setLoading(prev => ({ ...prev, watchlist: true }));
        setError(null);

        const [watchlistResponse] = await Promise.allSettled([
          fetch(`${API_BASE_URL}/orders?email=${encodeURIComponent(user.email)}`)
        ]);

        // Handle orders response
        if (watchlistResponse.status === 'fulfilled') {
          const data = await watchlistResponse.value.json();
          setWatchlistCount(Array.isArray(data) ? data.length : 0);
        } else {
          console.warn('Orders fetch failed:', watchlistResponse.reason);
        }

      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Unable to load dashboard data. Please try again.');
      } finally {
        setLoading(prev => ({ ...prev, watchlist: false }));
      }
    };

    fetchUserData();
  }, [user?.email]);

  // Mock user contact info (replace with actual user data)
  const contactInfo = {
    phone: user?.phoneNumber || '017xxxxxxxx',
    address: user?.address || 'Dhaka, Bangladesh',
    joinDate: 'January 2024'
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700">Please sign in to view your dashboard</h3>
        </div>
      </div>
    );
  }

  // Render role-specific panel
  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    );
  }

  if (role === 'admin') {
    return <AdminUserInfoPanel user={user} contactInfo={contactInfo} error={error} />;
  } else if (role === 'vendor') {
    return <VendorUserInfoPanel user={user} contactInfo={contactInfo} error={error} />;
  } else {
    return <CustomerUserInfoPanel 
      user={user} 
      contactInfo={contactInfo} 
      error={error} 
      watchlistCount={watchlistCount}
      loading={loading}
    />;
  }

};

// ========================
// ADMIN USER INFO PANEL
// ========================
const AdminUserInfoPanel = ({ user, contactInfo, error }) => {
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    platformRevenue: 0,
    systemHealth: 99.8
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);

  // Fetch admin statistics
  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setStatsLoading(true);
        setStatsError(null);

        // Fetch total users
        const usersRes = await fetch(`${API_BASE_URL}/users`);
        const usersData = usersRes.ok ? await usersRes.json() : [];
        const userCount = Array.isArray(usersData) ? usersData.length : 0;

        // Fetch total orders
        const ordersRes = await fetch(`${API_BASE_URL}/orders`);
        const ordersData = ordersRes.ok ? await ordersRes.json() : [];
        const orderCount = Array.isArray(ordersData) ? ordersData.length : 0;

        // Calculate platform revenue from all orders
        let totalRevenue = 0;
        if (Array.isArray(ordersData)) {
          totalRevenue = ordersData.reduce((sum, order) => {
            const amount = parseFloat(order.amount) || 0;
            return sum + amount;
          }, 0);
        }

        setAdminStats({
          totalUsers: userCount,
          totalOrders: orderCount,
          platformRevenue: totalRevenue,
          systemHealth: 99.8 // This could be calculated from actual system metrics
        });
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
        setStatsError('Unable to load admin statistics.');
      } finally {
        setStatsLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-8 h-8 text-[#008236]" />
            <h1 className="text-4xl font-bold text-[#008236]">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-[#008236] mt-2">
            Administrative oversight and platform management
          </p>
        </header>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Stats Error Alert */}
        {statsError && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <p className="text-yellow-400 text-sm">{statsError}</p>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-[#008236] rounded-2xl shadow-2xl overflow-hidden mb-8 border border-gray-600">
          <div className="md:flex">
            {/* Left Profile Section */}
            <div className="md:w-1/3 bg-[#008236] p-8 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              </div>
              <div className="relative mb-6 z-10">
                <img
                  src={user.photoURL || DEFAULT_AVATAR}
                  alt={`${user.displayName}'s profile`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                  onError={(e) => {
                    e.target.src = DEFAULT_AVATAR;
                  }}
                />
                <div className="absolute bottom-2 right-2 bg-white text-[#008236] p-2 rounded-full shadow-lg">
                  <Shield className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1 relative z-10">
                {user.displayName || 'Admin'}
              </h2>
              <p className="text-red-100 text-sm mb-4 relative z-10">{user.email}</p>
              <span className="px-4 py-1.5 bg-white text-[#008236] text-xs font-bold rounded-full relative z-10">
                SYSTEM ADMINISTRATOR
              </span>
            </div>

            {/* Contact Info Section */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white">Administrator Information</h3>
                <button className="flex items-center gap-2 bg-white text-[#008236] px-4 py-2 rounded-lg text-sm font-medium transition-all">
                  <Pencil className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InfoRow
                  icon={<Mail className="w-5 h-5" />}
                  label="Email Address"
                  value={user.email}
                  verified
                  dark
                />
                <InfoRow
                  icon={<Phone className="w-5 h-5" />}
                  label="Phone Number"
                  value={contactInfo.phone}
                  dark
                />
                <InfoRow
                  icon={<MapPin className="w-5 h-5" />}
                  label="Location"
                  value={contactInfo.address}
                  dark
                />
                <InfoRow
                  icon={<User className="w-5 h-5" />}
                  label="Member Since"
                  value={contactInfo.joinDate}
                  dark
                />
              </div>
            </div>
          </div>
        </div>

        {/* Admin Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
          <AdminStatCard
            icon={<Users className="w-6 h-6" />}
            title="Total Users"
            value={statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : adminStats.totalUsers}
            subtitle="Active members"
            color="blue"
            loading={statsLoading}
          />
          <AdminStatCard
            icon={<ShoppingCart className="w-6 h-6" />}
            title="Platform Orders"
            value={statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : adminStats.totalOrders}
            subtitle="All time"
            color="purple"
            loading={statsLoading}
          />
          <AdminStatCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Platform Revenue"
            value={statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : `৳${adminStats.platformRevenue.toFixed(2)}`}
            subtitle="Total"
            color="green"
            loading={statsLoading}
          />
         
        </div>

        {/* Admin Tools Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#008236] rounded-xl p-6 border border-green-600 hover:border-red-500 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-600/20 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">User Management</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Manage user accounts, roles, and permissions</p>
            <button className="w-full bg-white hover:bg-green-700 text-[#008236] py-2 rounded-lg font-medium transition-all">
              Manage Users
            </button>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-blue-500 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-white">Content Moderation</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Review and manage platform content and listings</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all">
              Review Content
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
          <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionButton
              icon={<Lock className="w-5 h-5" />}
              title="Security Settings"
              subtitle="Manage security policies"
            />
            <ActionButton
              icon={<Bell className="w-5 h-5" />}
              title="System Alerts"
              subtitle="Configure notifications"
            />
            <ActionButton
              icon={<BarChart3 className="w-5 h-5" />}
              title="Analytics"
              subtitle="View detailed reports"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================
// VENDOR USER INFO PANEL
// ========================
const VendorUserInfoPanel = ({ user, contactInfo, error }) => {
  const [vendorStats, setVendorStats] = useState({
    products: 0,
    totalSales: 0,
    revenue: 0,
    rating: 4.8
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);

  // Fetch vendor statistics
  useEffect(() => {
    if (!user?.email) return;

    const fetchVendorStats = async () => {
      try {
        setStatsLoading(true);
        setStatsError(null);

        // Fetch vendor products
        const productsRes = await fetch(`${API_BASE_URL}/products?vendor=${encodeURIComponent(user.email)}`);
        const productsData = productsRes.ok ? await productsRes.json() : [];
        const productCount = Array.isArray(productsData) ? productsData.length : 0;

        // Fetch vendor orders (total sales and revenue)
        const ordersRes = await fetch(`${API_BASE_URL}/orders?vendor=${encodeURIComponent(user.email)}`);
        const ordersData = ordersRes.ok ? await ordersRes.json() : [];
        
        let totalSales = 0;
        let totalRevenue = 0;

        if (Array.isArray(ordersData)) {
          totalSales = ordersData.length;
          totalRevenue = ordersData.reduce((sum, order) => {
            const amount = parseFloat(order.amount) || 0;
            return sum + amount;
          }, 0);
        }

        setVendorStats({
          products: productCount,
          totalSales: totalSales,
          revenue: totalRevenue,
          rating: 4.8 // This could be fetched from a reviews endpoint
        });
      } catch (err) {
        console.error('Failed to fetch vendor stats:', err);
        setStatsError('Unable to load vendor statistics.');
      } finally {
        setStatsLoading(false);
      }
    };

    fetchVendorStats();
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-[#fafaf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Package className="w-8 h-8 text-[#008236]" />
            <h1 className="text-4xl font-bold text-gray-900">
              Vendor Dashboard
            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            Manage your products and store performance
          </p>
        </header>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-200">
          <div className="md:flex">
            {/* Left Profile Section */}
            <div className="md:w-1/3 bg-[#008236] p-8 flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 opacity-5">
                <Package className="w-64 h-64 text-white absolute -right-20 -top-20" />
              </div>
              <div className="relative mb-6 z-10">
                <img
                  src={user.photoURL || DEFAULT_AVATAR}
                  alt={`${user.displayName}'s profile`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                  onError={(e) => {
                    e.target.src = DEFAULT_AVATAR;
                  }}
                />
                <div className="absolute bottom-2 right-2 bg-white text-[#008236] p-2 rounded-full shadow-lg border-2 border-blue-100">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1 relative z-10">
                {user.displayName || 'Vendor'}
              </h2>
              <p className="text-white text-sm mb-4 font-medium relative z-10">{user.email}</p>
              <span className="px-4 py-1.5 bg-[#008236] text-white text-xs font-bold rounded-full relative z-10">
                VERIFIED VENDOR
              </span>
            </div>

            {/* Contact Info Section */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-gray-900">Business Information</h3>
                <button className="flex items-center gap-2 bg-[#008236] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                  <Pencil className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InfoRow
                  icon={<Mail className="w-5 h-5" />}
                  label="Business Email"
                  value={user.email}
                  verified
                />
                <InfoRow
                  icon={<Phone className="w-5 h-5" />}
                  label="Business Phone"
                  value={contactInfo.phone}
                />
                <InfoRow
                  icon={<MapPin className="w-5 h-5" />}
                  label="Business Location"
                  value={contactInfo.address}
                />
                <InfoRow
                  icon={<User className="w-5 h-5" />}
                  label="Vendor Since"
                  value={contactInfo.joinDate}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert for Stats */}
        {statsError && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <p className="text-yellow-700 text-sm">{statsError}</p>
          </div>
        )}

        {/* Vendor Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Package className="w-6 h-6" />}
            title="My Products"
            value={statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : vendorStats.products}
            subtitle="Active listings"
            color="blue"
            loading={statsLoading}
          />
          <StatCard
            icon={<ShoppingCart className="w-6 h-6" />}
            title="Total Sales"
            value={statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : vendorStats.totalSales}
            subtitle="All time"
            color="green"
            loading={statsLoading}
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Revenue"
            value={statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : `৳${vendorStats.revenue.toFixed(2)}`}
            subtitle="Total"
            color="purple"
            loading={statsLoading}
          />
          
        </div>

        {/* Vendor Tools Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Product Management</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Add, edit, and manage your product listings</p>
            <button className="w-full bg-[#008236] text-white py-2 rounded-lg font-medium transition-all">
              Manage Products
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Sales Analytics</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Track sales, revenue, and customer insights</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-all">
              View Analytics
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionButton
              icon={<Package className="w-5 h-5" />}
              title="Add New Product"
              subtitle="Create a new listing"
              light
            />
            <ActionButton
              icon={<BarChart3 className="w-5 h-5" />}
              title="Sales Reports"
              subtitle="View performance metrics"
              light
            />
            <ActionButton
              icon={<Settings className="w-5 h-5" />}
              title="Store Settings"
              subtitle="Manage store preferences"
              light
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================
// CUSTOMER USER INFO PANEL
// ========================
const CustomerUserInfoPanel = ({ user, contactInfo, error, watchlistCount, loading }) => {
  const userStats = {
    orders: 1,
    reviews: 0,
    monthlySpend: '৳38.00'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-green-700">{user.displayName || 'User'}</span>!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your personalized dashboard overview
          </p>
        </header>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            {/* Left Profile Section */}
            <div className="md:w-1/3 bg-gradient-to-br from-green-50 to-emerald-100 p-8 flex flex-col items-center justify-center">
              <div className="relative mb-6">
                <img
                  src={user.photoURL || DEFAULT_AVATAR}
                  alt={`${user.displayName}'s profile`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.src = DEFAULT_AVATAR;
                  }}
                />
                <button className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {user.displayName || 'Unknown User'}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{user.email}</p>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Member
              </span>
            </div>

            {/* Contact Info Section */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <button className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium transition-colors">
                  <Pencil className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InfoRow
                  icon={<Mail className="w-5 h-5" />}
                  label="Email Address"
                  value={user.email}
                  verified
                />
                <InfoRow
                  icon={<Phone className="w-5 h-5" />}
                  label="Phone Number"
                  value={contactInfo.phone}
                />
                <InfoRow
                  icon={<MapPin className="w-5 h-5" />}
                  label="Location"
                  value={contactInfo.address}
                />
                <InfoRow
                  icon={<User className="w-5 h-5" />}
                  label="Member Since"
                  value={contactInfo.joinDate}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Heart className="w-6 h-6" />}
            title="Watchlist"
            value={loading.watchlist ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : watchlistCount}
            subtitle="Items saved"
            linkText="View Watchlist"
            linkIcon={<ExternalLink className="w-4 h-4" />}
            color="pink"
            loading={loading.watchlist}
          />
          <StatCard
            icon={<ShoppingCart className="w-6 h-6" />}
            title="My Orders"
            value={userStats.orders}
            subtitle="Active orders"
            linkText="Track Orders"
            linkIcon={<ExternalLink className="w-4 h-4" />}
            color="blue"
          />
          <StatCard
            icon={<Star className="w-6 h-6" />}
            title="My Reviews"
            value={userStats.reviews}
            subtitle="Reviews written"
            color="yellow"
          />
          
        </div>

        {/* Coming Soon Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-gray-900">Purchase Insights (Coming Soon)</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Visual analytics of your shopping patterns, spending trends, and personalized recommendations.
              </p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              In Development
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <h4 className="font-medium text-gray-900 mb-1">Security Settings</h4>
            <p className="text-sm text-gray-500">Update password and privacy preferences</p>
          </button>
          <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <h4 className="font-medium text-gray-900 mb-1">Notification Preferences</h4>
            <p className="text-sm text-gray-500">Manage your email and SMS alerts</p>
          </button>
          <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <h4 className="font-medium text-gray-900 mb-1">Payment Methods</h4>
            <p className="text-sm text-gray-500">Add or update payment options</p>
          </button>
        </div>
      </div>
    </div>
  );
};

// ========================
// SUBCOMPONENTS
// ========================

// Info Row Component
const InfoRow = ({ icon, label, value, verified = false, dark = false }) => (
  <div className="flex items-start gap-4">
    <div className={`p-2 rounded-lg ${dark ? 'bg-red-600/20 text-red-400' : 'bg-green-100 text-green-600'}`}>
      {icon}
    </div>
    <div className="flex-1">
      <p className={`text-xs uppercase tracking-wider mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
      <div className="flex items-center gap-2">
        <p className={`text-sm font-medium ${dark ? 'text-gray-200' : 'text-gray-900'}`}>{value}</p>
        {verified && (
          <span className={`px-2 py-0.5 text-xs rounded-full ${dark ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-800'}`}>
            Verified
          </span>
        )}
      </div>
    </div>
  </div>
);

// Stat Card Component (for customers)
const StatCard = ({ 
  icon, 
  title, 
  value, 
  subtitle, 
  linkText, 
  linkIcon, 
  color = 'gray',
  loading = false 
}) => {
  const colorClasses = {
    pink: 'bg-pink-50 text-pink-600',
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    gray: 'bg-gray-50 text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className={`inline-flex p-3 rounded-lg ${colorClasses[color]} mb-4`}>
        {icon}
      </div>
      <h4 className="text-sm font-medium text-gray-500 mb-1">{title}</h4>
      <div className="mb-1">
        {typeof value === 'number' || typeof value === 'string' ? (
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        ) : (
          value
        )}
      </div>
      {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
      {linkText && !loading && (
        <button className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
          {linkText}
          {linkIcon}
        </button>
      )}
    </div>
  );
};

// Admin Stat Card Component
const AdminStatCard = ({ 
  icon, 
  title, 
  value, 
  subtitle, 
  color = 'blue',
  loading = false
}) => {
  const colorClasses = {
    blue: 'bg-blue-600/20 text-blue-400',
    purple: 'bg-purple-600/20 text-purple-400',
    green: 'bg-green-600/20 text-green-400',
    cyan: 'bg-cyan-600/20 text-cyan-400',
    red: 'bg-red-600/20 text-red-400'
  };

  return (
    <div className="bg-[#008236] rounded-xl shadow-lg border border-green-600 p-6 hover:border-green-500 transition-all">
      <div className={`inline-flex p-3 rounded-lg ${colorClasses[color]} mb-4`}>
        {icon}
      </div>
      <h4 className="text-sm font-medium text-white mb-1">{title}</h4>
      <div className="mb-1">
        {typeof value === 'number' || typeof value === 'string' ? (
          <p className="text-2xl font-bold text-white">{value}</p>
        ) : (
          value
        )}
      </div>
      {subtitle && <p className="text-sm text-white">{subtitle}</p>}
    </div>
  );
};

// Action Button Component
const ActionButton = ({ icon, title, subtitle, light = false }) => (
  <button className={`p-4 rounded-lg text-left transition-all ${
    light 
      ? 'bg-white border border-blue-200 hover:shadow-md' 
      : 'bg-gray-700/50 border border-gray-600 hover:border-gray-500'
  }`}>
    <div className={`flex items-center gap-3 mb-2 ${light ? 'text-blue-600' : 'text-gray-200'}`}>
      {icon}
      <h4 className={`font-semibold ${light ? 'text-gray-900' : 'text-white'}`}>{title}</h4>
    </div>
    <p className={`text-sm ${light ? 'text-gray-600' : 'text-gray-400'}`}>{subtitle}</p>
  </button>
);

export default UserInfoPanel;