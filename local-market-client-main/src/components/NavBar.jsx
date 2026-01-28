import { Link, NavLink, useNavigate } from 'react-router';
import UseAuth from '../Hooks/UseAuth';
import { toast } from 'react-toastify';
import logo from '../assets/LocalMarket.png';
import { useState, useEffect, useRef } from 'react';
import { FiLogOut, FiBarChart2, FiUser, FiChevronDown, FiMenu, FiX, FiSettings, FiHelpCircle, FiShoppingBag, FiPackage } from 'react-icons/fi';

const NavBar = () => {
  const { user, logoutUser } = UseAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);
  const lastScrollY = useRef(0);

  // Mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Advanced scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 10);
      setIsScrollingDown(currentScrollY > lastScrollY.current && currentScrollY > 80);
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const linkStyle = ({ isActive }) =>
    `relative text-sm font-medium transition-all duration-300 pb-1 group ${
      isActive
        ? 'text-emerald-600'
        : 'text-slate-700 hover:text-emerald-600'
    }`;

  const mobileLinkStyle = ({ isActive }) =>
    `block px-6 py-3.5 text-[15px] font-medium transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-l-4 border-emerald-600'
        : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-600 border-l-4 border-transparent hover:border-slate-200'
    }`;

  const NavItem = ({ to, children, className }) => (
    <NavLink to={to} className={className}>
      {({ isActive }) => (
        <>
          <span className="relative z-10">{children}</span>
          {isActive && (
            <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-slideIn" />
          )}
          <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </>
      )}
    </NavLink>
  );

  const links = (
    <>
      <li className="animate-fadeInDown" style={{ animationDelay: '0ms' }}><NavItem to="/" className={linkStyle}>Home</NavItem></li>
      <li className="animate-fadeInDown" style={{ animationDelay: '50ms' }}><NavItem to="/allproduct" className={linkStyle}>All Products</NavItem></li>
      <li className="animate-fadeInDown" style={{ animationDelay: '100ms' }}><NavItem to="/about" className={linkStyle}>About Us</NavItem></li>
      <li className="animate-fadeInDown" style={{ animationDelay: '150ms' }}><NavItem to="/support" className={linkStyle}>Support</NavItem></li>
      {user && <li className="animate-fadeInDown" style={{ animationDelay: '200ms' }}><NavItem to="/dashbord" className={linkStyle}>Dashboard</NavItem></li>}
    </>
  );

  const mobileLinks = (
    <>
      <li className="animate-slideInLeft" style={{ animationDelay: '0ms' }}><NavLink to="/" className={mobileLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink></li>
      <li className="animate-slideInLeft" style={{ animationDelay: '50ms' }}><NavLink to="/allproduct" className={mobileLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>All Products</NavLink></li>
      <li className="animate-slideInLeft" style={{ animationDelay: '100ms' }}><NavLink to="/about" className={mobileLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink></li>
      <li className="animate-slideInLeft" style={{ animationDelay: '150ms' }}><NavLink to="/support" className={mobileLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Support</NavLink></li>
      {user && <li className="animate-slideInLeft" style={{ animationDelay: '200ms' }}><NavLink to="/dashbord" className={mobileLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavLink></li>}
    </>
  );

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        navigate('/');
        toast.success('Logged out successfully', {
          position: 'top-right',
          autoClose: 3000,
        });
        setIsDropdownOpen(false);
      })
      .catch(console.error);
  };

  const handleNavigateToDashboard = () => {
    navigate('/dashbord');
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out ${
          mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${
          isScrollingDown ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)] border-b border-slate-200/60' 
            : 'bg-white border-b border-slate-200/40'
        }`}
        style={{
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        }}
      >
        <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            
            {/* Logo Section */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 -ml-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-all duration-200 group relative overflow-hidden"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative w-5 h-5">
                  <span className={`absolute top-1 left-0 w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-2 bg-emerald-600' : ''}`} />
                  <span className={`absolute top-2 left-0 w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-0' : ''}`} />
                  <span className={`absolute top-3 left-0 w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-2 bg-emerald-600' : ''}`} />
                </div>
              </button>

              {/* Logo */}
              <Link 
                to="/" 
                className="flex items-center gap-3 group relative"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="relative w-11 h-11 md:w-12 md:h-12 flex-shrink-0">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-20 transition-all duration-500 animate-gradient-shift blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 scale-110 group-hover:scale-100" />
                  <img 
                    src={logo} 
                    alt="কাঁচাবাজার" 
                    className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3" 
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-[19px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 leading-tight tracking-tight animate-gradient-shift bg-[length:200%_auto]">
                    কাঁচাবাজার
                  </h1>
                  <p className="text-[11px] text-slate-500 font-medium tracking-wide uppercase transition-colors duration-300 group-hover:text-emerald-600">Fresh Market Prices</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <ul className="flex items-center gap-10">
                {links}
              </ul>
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  {/* Profile Button */}
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full hover:bg-slate-50 transition-all duration-300 group relative overflow-hidden"
                    aria-label="User menu"
                    aria-expanded={isDropdownOpen}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex-shrink-0">
                      {/* Animated ring */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md animate-pulse-slow" />
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <img
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=10b981&color=fff&bold=true`}
                        alt={user.displayName || 'User'}
                        className="relative w-10 h-10 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-slate-200 group-hover:ring-emerald-500 transition-all duration-300 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm animate-pulse-soft" />
                    </div>
                    <FiChevronDown 
                      className={`hidden md:block text-slate-500 transition-all duration-300 ${isDropdownOpen ? 'rotate-180 text-emerald-600' : 'group-hover:text-slate-700'}`}
                      size={16}
                      strokeWidth={2.5}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40 animate-fadeIn" onClick={() => setIsDropdownOpen(false)} />
                      <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden z-50 animate-dropdown">
                        {/* Animated background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-float" />
                        
                        {/* User Info Header */}
                        <div className="relative px-6 py-5 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 border-b border-slate-200/60 animate-slideInDown">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow" />
                          <div className="flex items-center gap-4 relative">
                            <div className="relative flex-shrink-0 animate-scaleIn">
                              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-50 blur-md animate-pulse-slow" />
                              <img
                                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=10b981&color=fff&bold=true`}
                                alt={user.displayName || 'User'}
                                className="relative w-14 h-14 rounded-xl object-cover border-2 border-white shadow-lg ring-2 ring-emerald-500/20"
                              />
                            </div>
                            <div className="flex-1 min-w-0 animate-slideInRight">
                              <p className="font-semibold text-slate-900 text-base truncate">
                                {user.displayName || 'User'}
                              </p>
                              <p className="text-[13px] text-slate-600 truncate mt-0.5">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2 px-2">
                          <button
                            onClick={handleNavigateToDashboard}
                            className="w-full px-4 py-3.5 flex items-center gap-4 hover:bg-emerald-50/70 rounded-xl transition-all duration-300 text-sm text-slate-700 group animate-slideInRight relative overflow-hidden"
                            style={{ animationDelay: '50ms' }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                              <FiBarChart2 className="text-white" size={18} strokeWidth={2.5} />
                            </div>
                            <div className="flex-1 text-left relative">
                              <span className="font-semibold text-slate-900">Dashboard</span>
                              <p className="text-xs text-slate-500 mt-0.5">View analytics & insights</p>
                            </div>
                          </button>

                          <button
                            onClick={() => {
                              navigate('/dashbord');
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3.5 flex items-center gap-4 hover:bg-blue-50/70 rounded-xl transition-all duration-300 text-sm text-slate-700 group animate-slideInRight relative overflow-hidden"
                            style={{ animationDelay: '100ms' }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                              <FiUser className="text-white" size={18} strokeWidth={2.5} />
                            </div>
                            <div className="flex-1 text-left relative">
                              <span className="font-semibold text-slate-900">Profile</span>
                              <p className="text-xs text-slate-500 mt-0.5">Manage your account</p>
                            </div>
                          </button>

                          <button
                            onClick={() => {
                              navigate('/allproduct');
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3.5 flex items-center gap-4 hover:bg-violet-50/70 rounded-xl transition-all duration-300 text-sm text-slate-700 group animate-slideInRight relative overflow-hidden"
                            style={{ animationDelay: '150ms' }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-violet-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                              <FiShoppingBag className="text-white" size={18} strokeWidth={2.5} />
                            </div>
                            <div className="flex-1 text-left relative">
                              <span className="font-semibold text-slate-900">My Orders</span>
                              <p className="text-xs text-slate-500 mt-0.5">Track your purchases</p>
                            </div>
                          </button>

                          <div className="my-2 border-t border-slate-200/60 animate-fadeIn" style={{ animationDelay: '200ms' }}></div>

                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3.5 flex items-center gap-4 hover:bg-red-50/70 rounded-xl transition-all duration-300 text-sm text-red-600 group animate-slideInRight relative overflow-hidden"
                            style={{ animationDelay: '250ms' }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                              <FiLogOut className="text-white" size={18} strokeWidth={2.5} />
                            </div>
                            <div className="flex-1 text-left relative">
                              <span className="font-semibold text-red-600">Logout</span>
                              <p className="text-xs text-red-500/70 mt-0.5">Sign out of your account</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="relative text-[14px] font-semibold text-slate-700 hover:text-emerald-600 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all duration-300 group overflow-hidden"
                  >
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                  <Link
                    to="/signup"
                    className="relative group overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-[length:200%_auto] text-white text-[14px] font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/40 transition-all duration-300 animate-gradient-shift"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[90] lg:hidden animate-fadeIn"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-80 bg-white z-[95] transform transition-all duration-500 ease-out lg:hidden shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/60 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 animate-gradient-shift" />
            <div className="flex items-center gap-3 relative z-10 animate-slideInLeft">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 p-0.5 animate-pulse-soft">
                <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                  <img src={logo} alt="Logo" className="w-8 h-8" />
                </div>
              </div>
              <div>
                <h2 className="text-[17px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">কাঁচাবাজার</h2>
                <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Fresh Market Prices</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative z-10 p-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-all duration-200 animate-slideInRight"
              aria-label="Close menu"
            >
              <FiX className="h-5 w-5 text-slate-700" strokeWidth={2.5} />
            </button>
          </div>

          {/* User Info in Mobile (if logged in) */}
          {user && (
            <div className="px-6 py-4 border-b border-slate-200/60 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 relative overflow-hidden animate-slideInLeft" style={{ animationDelay: '100ms' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 animate-pulse-slow" />
              <div className="flex items-center gap-3 relative">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-50 blur-md animate-pulse-slow" />
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=10b981&color=fff&bold=true`}
                    alt={user.displayName || 'User'}
                    className="relative w-12 h-12 rounded-xl object-cover border-2 border-white shadow-lg ring-2 ring-emerald-500/20"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">
                    {user.displayName || 'User'}
                  </p>
                  <p className="text-xs text-slate-600 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Menu Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              {mobileLinks}
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          {!user && (
            <div className="p-4 border-t border-slate-200/60 bg-slate-50/50 space-y-2.5">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center text-sm font-semibold text-slate-700 px-5 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md animate-slideInUp relative overflow-hidden group"
                style={{ animationDelay: '250ms' }}
              >
                <span className="relative z-10">Login to Your Account</span>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-[length:200%_auto] text-white text-sm font-semibold px-5 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:shadow-xl animate-slideInUp animate-gradient-shift relative overflow-hidden group"
                style={{ animationDelay: '300ms' }}
              >
                <span className="relative z-10">Create New Account</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Spacer */}
      <div className="h-[72px]" />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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

        .animate-dropdown {
          animation: dropdown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-slideInDown {
          animation: slideInDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-slideInUp {
          animation: slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-slideIn {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 3s ease infinite;
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        @supports (backdrop-filter: blur(20px)) {
          .backdrop-blur-xl {
            backdrop-filter: blur(20px) saturate(180%);
          }
        }
      `}</style>
    </>
  );
};

export default NavBar;