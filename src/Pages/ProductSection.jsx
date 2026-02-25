import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiEye, FiMapPin, FiTag } from 'react-icons/fi';

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://local-market-server.vercel.app/products?status=approved&limit=6')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const headingVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const shimmerLoading = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className=" rounded-xl border border-gray-200 overflow-hidden animate-pulse">
          <div className="h-44 " />
          <div className="p-4 space-y-3">
            <div className="h-4  rounded w-3/4" />
            <div className="h-4 rounded w-1/4" />
            <div className="h-8 rounded" />
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) return (
    <div className="bg-[#faf9f5] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block mb-3 px-4 py-1 bg-gray-200 rounded-full w-32 h-6 mx-auto" />
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2" />
          <div className="h-4 bg-gray-200 rounded w-96 max-w-full mx-auto" />
        </div>
        {shimmerLoading()}
      </div>
    </div>
  );

  return (
    <div className="bg-[#faf9f5] py-12">
      <motion.section
        className="max-w-7xl mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="text-center mb-12">
          <span className="inline-block mb-3 px-4 py-1.5 text-sm border border-green-600 text-green-700 rounded-full font-medium bg-green-50">
            Latest Market Prices
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Today's Market Prices
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base md:text-lg">
            Stay updated with the latest prices from local markets. Compare and find the best deals for your daily groceries.
          </p>
        </motion.div>

        {/* Product Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
        >
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <div className="
                bg-white 
                rounded-2xl 
                border border-gray-200 
                overflow-hidden 
                shadow-sm 
                hover:shadow-xl 
                hover: text-white
                transition-all 
                duration-300
                h-full
                flex flex-col
              ">
                {/* Image Container */}
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.itemName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      Today
                    </span>
                    {product.category && (
                      <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                        <FiTag className="text-xs" />
                        {product.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Price and Title */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                        {product.itemName}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FiUser className="text-gray-400" />
                        <span className="line-clamp-1">{product.vendor || 'Local Vendor'}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-emerald-700">
                        ৳{product.pricePerUnit}
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">per {product.unit || 'unit'}</p>
                    </div>
                  </div>

                  {/* Market Info */}
                  <div className="space-y-2.5 mb-4 flex-1">
                    <div className="flex items-start gap-2">
                      <FiMapPin className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.marketName || 'Local Market'}</p>
                        {product.location && (
                          <p className="text-xs text-gray-500">{product.location}</p>
                        )}
                      </div>
                    </div>
                    
                    {product.date && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiCalendar className="text-gray-400" />
                        <span>{new Date(product.date).toLocaleDateString('en-GB', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {new Date(product.date).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          }).toLowerCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quality Indicator if available */}
                  {product.quality && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Quality</span>
                        <span className="font-medium text-gray-900 capitalize">{product.quality}</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            product.quality === 'premium' ? 'bg-emerald-500 w-4/5' :
                            product.quality === 'good' ? 'bg-blue-500 w-3/5' :
                            product.quality === 'average' ? 'bg-yellow-500 w-2/5' :
                            'bg-gray-400 w-1/5'
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Button */}
                  <Link
                    to={`/viewdetails/${product._id}`}
                    className="
                      group/btn
                      flex items-center justify-center gap-2 
                      w-full py-3
                      bg-gradient-to-r from-emerald-50 to-white
                      border border-emerald-200
                      rounded-xl
                      text-sm font-semibold text-emerald-700
                      transition-all duration-300
                      hover:from-emerald-600
                      hover:to-emerald-700
                      hover:text-whit
                      hover:border-emerald-600
                      hover:shadow-lg
                      mt-auto
                      hover:text-white
                    "
                  >
                    <span>View Full Details</span>
                    <FiEye className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-12"
        >
          <Link
            to="/allproduct"
            className="
              bg-[#288a4c]
              text-white
              px-6 py-3
              rounded-full
              font-medium
              inline-flex items-center gap-2
              transition-all duration-300
              hover:bg-[#1f6b37]
              hover:shadow-lg
             
            "
          >
            View All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default ProductSection;