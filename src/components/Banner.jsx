import React from "react";
import bannerImage from "../assets/hero-banner.jpg";

const Banner = () => {
  return (
    <section
      className="relative h-[80vh] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl text-white">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-1 rounded-full text-sm mb-6">
            ● Live Market Prices
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Track Fresh Market <br />
            Prices <span className="text-yellow-400">Daily</span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-gray-200 text-lg">
            Get real-time updates on local market prices. Compare across
            markets, track trends, and save money on your daily groceries.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition">
              Explore Prices →
            </button>

            <button className="border border-white/40 hover:border-white text-white px-6 py-3 rounded-lg transition">
              Join as Vendor
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-8">
            <div>
              <h3 className="text-xl font-bold text-yellow-400">100+</h3>
              <p className="text-sm text-gray-300">Daily Updates</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-yellow-400">50+</h3>
              <p className="text-sm text-gray-300">Markets</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-yellow-400">24/7</h3>
              <p className="text-sm text-gray-300">Real-time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
