import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
  FiActivity
} from "react-icons/fi";
import LoadingPages from "../Pages/LoadingPages";

const Dashboard = () => {
  const { role, roleLoading, error } = useUserRole();
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = React.useState("userinfopannel");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Mount animation
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to safe page if error occurs
  React.useEffect(() => {
    if (error) {
      navigate("/myorders");
    }
  }, [error, navigate]);

  // Set default active panel to userinfopannel when dashboard loads
  React.useEffect(() => {
    if (!roleLoading && role) {
      setActivePanel("userinfopannel");
    }
  }, [roleLoading, role]);

  // Close sidebar on route change (mobile)
  React.useEffect(() => {
    setSidebarOpen(false);
  }, [navigate]);

  // Prevent body scroll when mobile sidebar is open
  React.useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  // Show loading spinner while role is being fetched
  if (roleLoading) {
    return <LoadingPages />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4 gap-4 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-red-200 p-8 animate-slideInUp">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 stroke-white"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Error Loading Dashboard</h3>
              <p className="text-sm text-slate-600">Failed to load user role. Redirecting...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Role badge styling - Using brand color #008236
  const getRoleBadge = () => {
    const badges = {
      admin: { color: 'from-[#008236] to-[#006d2e]', icon: FiActivity, label: 'Admin' },
      vendor: { color: 'from-[#008236] to-[#006d2e]', icon: FiPackage, label: 'Vendor' },
      user: { color: 'from-[#008236] to-[#006d2e]', icon: FiShoppingCart, label: 'User' }
    };
    return badges[role] || badges.user;
  };

  const badge = getRoleBadge();
  const BadgeIcon = badge.icon;

  // Navigation items configuration
  const getNavigationItems = () => {
    const commonItems = [
      { to: "/", icon: FiHome, label: "Home", end: true }
    ];

    const roleItems = {
      user: [
        { to: "/dashbord", icon: FiHome, label: "User Home", exact: true },
        { to: "price-trend", icon: FiTrendingUp, label: "Price Trends" },
        { to: "watchlist", icon: FiList, label: "Manage Watchlist" },
        { to: "myorders", icon: FiShoppingCart, label: "My Orders" }
      ],
      vendor: [
        { to: "/dashbord", icon: FiHome, label: "Vendor Home", exact: true },
        { to: "addproduct", icon: FiPlusSquare, label: "Add Product" },
        { to: "myproduct", icon: FiFileText, label: "My Products" },
        { to: "advertisement", icon: FiVolume2, label: "Create Advertisement" },
        { to: "myadvertisements", icon: FiBarChart2, label: "My Advertisements" }
      ],
      admin: [
        { to: "/dashbord", icon: FiHome, label: "Admin Home", exact: true },
        { to: "allusers", icon: FiUsers, label: "All Users" },
        { to: "allproduct", icon: FiPackage, label: "All Products" },
        { to: "alladvertisements", icon: FiVolume2, label: "All Advertisements" },
        { to: "all-orders", icon: FiShoppingBag, label: "All Orders" }
      ]
    };

    return [...commonItems, ...(roleItems[role] || [])];
  };

  const navigationItems = getNavigationItems();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Overlay (Mobile) */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200/60 flex flex-col transition-all duration-500 ease-out shadow-xl lg:shadow-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Sidebar Header */}
          <div className="relative px-6 py-6 border-b border-slate-200/60 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
            {/* Background decoration - Brand green */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#008236]/5 via-[#008236]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow" />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 animate-slideInLeft">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#008236] to-[#006d2e] flex items-center justify-center shadow-lg animate-pulse-soft">
                  <FiActivity className="text-white" size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#008236] to-[#006d2e]">
                    কাঁচাবাজার
                  </h2>
                  <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Dashboard Panel</p>
                </div>
              </div>
              
              {/* Close button (Mobile) */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-all duration-200"
                aria-label="Close sidebar"
              >
                <FiX className="h-5 w-5 text-slate-700" strokeWidth={2.5} />
              </button>
            </div>

            {/* Role Badge */}
            <div className="relative mt-4 animate-slideInLeft" style={{ animationDelay: '100ms' }}>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${badge.color} shadow-lg`}>
                <BadgeIcon className="text-white" size={14} strokeWidth={2.5} />
                <span className="text-white text-xs font-semibold uppercase tracking-wider">{badge.label} Panel</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-1.5">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li 
                    key={item.to}
                    className="animate-slideInLeft"
                    style={{ animationDelay: `${(index + 2) * 50}ms` }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden ${
                          isActive || (item.exact && activePanel === "userinfopannel")
                            ? 'bg-gradient-to-r from-[#008236] to-[#006d2e] text-white shadow-lg shadow-[#008236]/30'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-[#008236]'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Hover background effect - Brand green */}
                          {!isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-[#008236]/0 via-[#008236]/10 to-[#008236]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                          )}
                          
                          {/* Icon */}
                          <div className={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 ${
                            isActive 
                              ? 'bg-white/20 shadow-inner' 
                              : 'bg-slate-100 group-hover:bg-[#008236]/10 group-hover:scale-110'
                          }`}>
                            <Icon 
                              size={18} 
                              strokeWidth={2.5}
                              className={isActive ? 'text-white' : 'text-slate-600 group-hover:text-[#008236]'}
                            />
                          </div>

                          {/* Label */}
                          <span className="relative flex-1 font-medium text-sm">
                            {item.label}
                          </span>

                          {/* Active indicator */}
                          {isActive && (
                            <FiChevronRight 
                              size={16} 
                              strokeWidth={3}
                              className="text-white animate-slideInRight"
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="px-6 py-4 border-t border-slate-200/60 bg-slate-50/50 animate-slideInUp">
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                © {new Date().getFullYear()} কাঁচাবাজার
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#008236] animate-pulse-soft"></div>
                <span className="text-xs text-slate-500 font-medium">Active</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 -ml-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-all duration-200 group relative overflow-hidden"
                aria-label="Open sidebar"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#008236] to-[#006d2e] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative">
                  <FiMenu className="h-6 w-6 text-slate-700" strokeWidth={2.5} />
                </div>
              </button>

              {/* Dashboard Title */}
              <div className="flex items-center gap-3 flex-1 lg:flex-none animate-slideInDown">
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
                  <p className="text-xs text-slate-500 font-medium">Welcome back to your control center</p>
                </div>
              </div>

              {/* Role Badge (Desktop) */}
              <div className="hidden lg:flex items-center gap-3 animate-slideInDown" style={{ animationDelay: '100ms' }}>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${badge.color} shadow-lg`}>
                  <BadgeIcon className="text-white" size={16} strokeWidth={2.5} />
                  <span className="text-white text-sm font-semibold uppercase tracking-wide">{badge.label}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-[1600px] mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-slideInDown {
          animation: slideInDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-slideInUp {
          animation: slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        /* Custom scrollbar */
        nav::-webkit-scrollbar {
          width: 6px;
        }

        nav::-webkit-scrollbar-track {
          background: transparent;
        }

        nav::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 3px;
        }

        nav::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }

        /* Content area scrollbar */
        main > div:last-child::-webkit-scrollbar {
          width: 8px;
        }

        main > div:last-child::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.5);
        }

        main > div:last-child::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.4);
          border-radius: 4px;
        }

        main > div:last-child::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.6);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;