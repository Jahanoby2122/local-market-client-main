import React from "react";
import {
  ArrowTrendingUpIcon,
  BellIcon,
  ShoppingCartIcon,
  UsersIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Price Trends",
    desc: "Track price changes over days and weeks with interactive charts",
    icon: ArrowTrendingUpIcon,
    bg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Watchlist Alerts",
    desc: "Add items to your watchlist and never miss a price drop",
    icon: BellIcon,
    bg: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    title: "Easy Shopping",
    desc: "Buy products directly from verified vendors with secure payments",
    icon: ShoppingCartIcon,
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    title: "Vendor Network",
    desc: "Connected with 50+ verified vendors across local markets",
    icon: UsersIcon,
    bg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Trusted Prices",
    desc: "All prices are verified and approved by our admin team",
    icon: ShieldCheckIcon,
    bg: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    title: "Real-time Updates",
    desc: "Get daily price updates from markets near you",
    icon: ClockIcon,
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-[#fafaf7] py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-semibold text-gray-900">
            Why Choose <span className="text-green-700">কাঁচাবাজার</span>?
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Your complete solution for tracking and comparing local market prices
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.bg}`}
              >
                <item.icon className={`w-7 h-7 ${item.iconColor}`} />
              </div>

              <h3 className="mt-6 text-xl font-serif font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
