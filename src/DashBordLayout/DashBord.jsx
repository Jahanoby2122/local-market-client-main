import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useUserRole from "../Hooks/UseUserRole";
import {
  FiTrendingUp,
  FiList,
  FiShoppingCart,
  FiPlusSquare,
  FiFileText,
  FiBarChart2,
  FiUsers,
  FiPackage,
  FiShoppingBag,
  FiVolume2,
  FiHome,
  FiMenu,
  FiX,
  FiChevronRight,
  FiActivity,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import LoadingPages from "../Pages/LoadingPages";

const Dashboard = () => {
  const { role, roleLoading, error } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* mount animation */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* default redirect */
  useEffect(() => {
    if (!roleLoading && role && location.pathname === "/dashbord") {
      if (role === "user") navigate("/dashbord/profile", { replace: true });
      if (role === "vendor") navigate("/dashbord/myproduct", { replace: true });
      if (role === "admin") navigate("/dashbord/allusers", { replace: true });
    }
  }, [role, roleLoading, location.pathname, navigate]);

  /* close sidebar on route change */
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  /* body scroll control */
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [sidebarOpen]);

  if (roleLoading) return <LoadingPages />;

  if (error) {
    navigate("/");
    return null;
  }

  /* role badge */
  const getRoleBadge = () => {
    const badges = {
      admin: {
        icon: FiActivity,
        label: "Administrator",
        gradient: "from-[#008236] to-[#006b2d]",
      },
      vendor: {
        icon: FiPackage,
        label: "Vendor",
        gradient: "from-[#008236] to-[#00a043]",
      },
      user: {
        icon: FiShoppingCart,
        label: "Customer",
        gradient: "from-[#008236] to-[#009940]",
      },
    };
    return badges[role] || badges.user;
  };

  const badge = getRoleBadge();
  const BadgeIcon = badge.icon;

  /* active check helper */
  const isActiveCheck = (item) => {
    if (item.end) return location.pathname === item.to;
    return (
      location.pathname === `/dashbord/${item.to}` ||
      location.pathname.startsWith(`/dashbord/${item.to}/`)
    );
  };

  /* navigation items */
  const navigationItems = [
    { to: "/", icon: FiHome, label: "Home", end: true, divider: true },

    ...(role === "user"
      ? [
          { to: "profile", icon: FiUser, label: "My Profile" },
          { to: "price-trend", icon: FiTrendingUp, label: "Price Trends" },
          { to: "watchlist", icon: FiList, label: "Watchlist" },
          { to: "myorders", icon: FiShoppingCart, label: "My Orders" },
        ]
      : []),

    ...(role === "vendor"
      ? [
          { to: "addproduct", icon: FiPlusSquare, label: "Add Product" },
          { to: "myproduct", icon: FiFileText, label: "My Products" },
          { to: "advertisement", icon: FiVolume2, label: "Create Ad" },
          { to: "myadvertisements", icon: FiBarChart2, label: "My Advertisements" },
        ]
      : []),

    ...(role === "admin"
      ? [
          { to: "allusers", icon: FiUsers, label: "User Management" },
          { to: "allproduct", icon: FiPackage, label: "Product Catalog" },
          { to: "alladvertisements", icon: FiVolume2, label: "Advertisements" },
          { to: "all-orders", icon: FiShoppingBag, label: "Order Management" },
        ]
      : []),
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 transition-opacity duration-700 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex h-screen overflow-hidden">
        {/* overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl lg:shadow-none border-r border-slate-200 transition-transform duration-300 ease-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Header */}
            <div className="relative px-6 py-7 border-b border-slate-200 bg-gradient-to-r from-[#008236] to-[#00a043]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  কাঁচাবাজার
                </h2>
                <p className="text-xs text-white/80 mt-0.5">Fresh Market Platform</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg transition"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Role Badge */}
            <div className="mt-5">
              <div
                className={`inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-lg`}
              >
                <div className="p-1.5 bg-gradient-to-br from-[#008236] to-[#00a043] rounded-lg">
                  <BadgeIcon className="text-white" size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Role</p>
                  <p className="text-sm font-bold text-[#008236]">{badge.label}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-5 space-y-1.5 overflow-y-auto h-[calc(100vh-180px)]">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveCheck(item);

              return (
                <div key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-[#008236] to-[#00a043] text-white shadow-lg shadow-[#008236]/20"
                        : "text-slate-700 hover:bg-slate-100 hover:shadow-sm"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-white/20"
                          : "bg-slate-100 group-hover:bg-slate-200"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span className="flex-1 text-[15px]">{item.label}</span>
                    {isActive && (
                      <FiChevronRight className="opacity-70" size={18} />
                    )}
                  </NavLink>
                  {item.divider && (
                    <div className="my-3 border-t border-slate-200" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer - Logout */}
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-slate-200 bg-slate-50">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium">
              <FiLogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* main */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-20 flex items-center px-6 lg:px-8 border-b border-slate-200 bg-white shadow-sm">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mr-4 p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <FiMenu size={22} className="text-slate-700" />
            </button>

            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-800">
                {navigationItems.find((item) => isActiveCheck(item))?.label ||
                  "Dashboard"}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Welcome back! Here's what's happening today.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center gap-3">
              <div className="px-4 py-2 bg-slate-100 rounded-lg">
                <p className="text-xs text-slate-500">Active Role</p>
                <p className="text-sm font-bold text-[#008236] capitalize">{role}</p>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-slate-50">
            <div className="p-6 lg:p-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;