import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import useScrollToTop from '../Hooks/useScrollToTop';
import LoadingPages from '../Pages/LoadingPages';

import {
  FiSearch,
  FiCalendar,
  FiFilter,
  FiEye,
  FiUser,
} from 'react-icons/fi';

import { motion, AnimatePresence } from 'framer-motion';

/* ---------------- Animations ---------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const AllProduct = () => {
  useScrollToTop();
  const axiosSecure = UseAxiosSecure();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const { data = [], isLoading } = useQuery({
    queryKey: ['all-products'],
    queryFn: async () => {
      const res = await axiosSecure.get('/products');
      return res.data;
    },
  });

  let filteredProducts = data.filter(
    (p) =>
      p.status === 'approved' &&
      p.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (startDate && endDate) {
    filteredProducts = filteredProducts.filter((p) => {
      const d = new Date(p.date);
      return d >= startDate && d <= endDate;
    });
  }

  if (sortOption === 'lowToHigh') {
    filteredProducts.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
  }
  if (sortOption === 'highToLow') {
    filteredProducts.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
  }

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (isLoading) return <LoadingPages />;

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-[#faf9f5] px-4 py-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block mb-4 px-4 py-1 text-sm border border-green-700 text-green-700 rounded-full">
            All Products
          </span>
          <h1 className="text-4xl font-serif font-semibold text-gray-900 mb-2">
            Explore Market Prices
          </h1>
          <p className="text-gray-600">
            Browse all products from local markets. Filter by date and sort by price.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:flex-1">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products or markets..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-700 outline-none"
            />
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
            <FiCalendar />
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
                setCurrentPage(1);
              }}
              isClearable
              placeholderText="Filter by date"
              className="outline-none"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
            <FiFilter />
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
              className="outline-none bg-transparent"
            >
              <option value="">Sort by price</option>
              <option value="lowToHigh">Low → High</option>
              <option value="highToLow">High → Low</option>
            </select>
          </div>
        </div>

        {/* Products */}
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {currentItems.map((product) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition"
              >
                <div className="h-44 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.itemName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.itemName}
                    </h3>
                    <span className="text-green-700 font-semibold">
                      ৳{product.pricePerUnit}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <p className="flex items-center gap-1">
                      <FiUser /> {product.vendor}
                    </p>
                    {product.date && (
                      <p className="flex items-center gap-1">
                        <FiCalendar />
                        {new Date(product.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* BUTTON */}
                  <Link
                    to={`/viewdetails/${product._id}`}
                    className="
                      flex items-center justify-center gap-2 w-full py-2
                      bg-[#fdfdfb]
                      border border-[#e0ddd1]
                      rounded-lg
                      text-sm font-medium text-gray-800
                      transition-all duration-200
                      hover:bg-[#008236]
                      hover:text-white
                    "
                  >
                    <FiEye />
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {[...Array(totalPages).keys()].map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n + 1)}
                className={`
                  px-4 py-2 rounded-lg border
                  bg-[#fdfdfb] border-[#e0ddd1]
                  transition-all
                  ${
                    currentPage === n + 1
                      ? 'bg-[#008236] text-white border-[#008236]'
                      : 'hover:bg-[#008236] hover:text-white'
                  }
                `}
              >
                {n + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AllProduct;
