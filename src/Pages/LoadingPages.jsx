import React from 'react';
import { useLocation } from 'react-router';
import logo from '../assets/LocalMarket.png';

const LoadingPages = () => {
  const location = useLocation();

  // Get loading content based on current route
  const getLoadingContent = () => {
    const path = location.pathname;

    if (path === '/' || path === '/banner') {
      return {
        useImage: true,
        image: logo,
        title: 'Loading Fresh Markets',
        subtitle: 'Discovering the best local produce prices near you...',
      };
    }

    if (path === '/allproduct') {
      return {
        useImage: false,
        icon: '🛒',
        title: 'Loading Products',
        subtitle: 'Fetching fresh products from all markets...',
      };
    }

    if (path === '/about') {
      return {
        useImage: false,
        icon: '📖',
        title: 'Loading About Us',
        subtitle: 'Learning about our mission and values...',
      };
    }

    if (path === '/support') {
      return {
        useImage: false,
        icon: '💬',
        title: 'Loading Support',
        subtitle: 'Getting help and support resources...',
      };
    }

    if (path.includes('/viewdetails/')) {
      return {
        icon: '📦',
        title: 'Loading Product Details',
        subtitle: 'Getting detailed information about this product...',
      };
    }

    if (path.includes('/dashbord')) {
      return {
        icon: '📊',
        title: 'Loading Dashboard',
        subtitle: 'Preparing your personalized dashboard...',
      };
    }

    return {
      useImage: false,
      icon: '⏳',
      title: 'Loading',
      subtitle: 'Please wait while we prepare your content...',
    };
  };

  const content = getLoadingContent();
  const { icon, image, useImage, title, subtitle } = content;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-green-50 to-emerald-50 flex flex-col items-center justify-center z-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Animated Loading Icon Container */}
        <div className="relative w-40 h-40 mb-12">
          {/* Outer rotating ring 1 */}
          <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-green-500 rounded-full animate-spin"></div>

          {/* Outer rotating ring 2 (slower, counter-clockwise) */}
          <div
            className="absolute inset-3 border-4 border-transparent border-b-blue-500 border-l-emerald-400 rounded-full"
            style={{
              animation: 'spin 3s linear infinite reverse',
            }}
          ></div>

          {/* Inner ring (fastest) */}
          <div
            className="absolute inset-6 border-3 border-transparent border-t-green-400 border-r-blue-400 rounded-full animate-spin"
            style={{
              animationDuration: '1s',
            }}
          ></div>

          {/* Center pulsing circle with icon */}
          <div className="absolute inset-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            {useImage ? (
              <img 
                src={image} 
                alt="Logo" 
                className="w-16 h-16 object-contain drop-shadow-lg"
              />
            ) : (
              <span className="text-5xl">{icon}</span>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-3">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 text-center max-w-md mb-12">
          {subtitle}
        </p>

        {/* Loading Dots Animation */}
        <div className="flex gap-3 mb-12">
          <div
            className="w-4 h-4 bg-emerald-600 rounded-full animate-bounce"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>

        {/* Progress Bar */}
        <div className="w-72 h-2 bg-gray-300 rounded-full overflow-hidden shadow-md">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-blue-500 rounded-full animate-pulse"
            style={{ width: '70%' }}
          ></div>
        </div>

        {/* Loading Text */}
        <p className="mt-6 text-sm text-gray-500 font-medium">
          Loading content...
        </p>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LoadingPages;
