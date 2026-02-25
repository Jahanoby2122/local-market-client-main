import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
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

const AllProduct = () => {
  useScrollToTop();
  const axiosSecure = UseAxiosSecure();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [currentPage, setCurrentPage] = useState(1);

  const [startDate, endDate] = dateRange;
  const itemsPerPage = 8;

  const { data = [], isLoading } = useQuery({
    queryKey: ['all-products'],
    queryFn: async () => {
      const res = await axiosSecure.get('/products');
      return res.data;
    },
  });

  /* ---------------- RESET PAGE ALWAYS WHEN FILTER CHANGES ---------------- */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption, startDate, endDate]);

  /* ---------------- FILTERING ---------------- */

  let filteredProducts = [...data];

  // Only approved
  filteredProducts = filteredProducts.filter(
    (p) => p.status === 'approved'
  );

  // Search
  if (searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.itemName?.toLowerCase().includes(term) ||
        p.vendor?.toLowerCase().includes(term)
    );
  }

  // Date filter
  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    filteredProducts = filteredProducts.filter((p) => {
      if (!p.date) return false;
      const productDate = new Date(p.date);
      return productDate >= start && productDate <= end;
    });
  }

  // Sorting
  if (sortOption === 'lowToHigh') {
    filteredProducts = filteredProducts.sort(
      (a, b) => a.pricePerUnit - b.pricePerUnit
    );
  }

  if (sortOption === 'highToLow') {
    filteredProducts = filteredProducts.sort(
      (a, b) => b.pricePerUnit - a.pricePerUnit
    );
  }

  /* ---------------- SAFE PAGINATION ---------------- */

  const totalPages =
    Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  const safePage =
    currentPage > totalPages ? 1 : currentPage;

  const indexOfLast = safePage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentItems = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  );

  if (isLoading) return <LoadingPages />;

  return (
    <div className="min-h-screen bg-[#faf9f5] px-4 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">

          {/* Search */}
          <div className="relative w-full md:flex-1">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products or markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              onChange={(update) => setDateRange(update)}
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
              onChange={(e) => setSortOption(e.target.value)}
              className="outline-none bg-transparent"
            >
              <option value="">Sort by price</option>
              <option value="lowToHigh">Low → High</option>
              <option value="highToLow">High → Low</option>
            </select>
          </div>

        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentItems.map((product) => (
            <div
              key={product._id}
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
                </div>

                <Link
                  to={`/viewdetails/${product._id}`}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-[#fdfdfb] border border-[#e0ddd1] rounded-lg text-sm font-medium text-gray-800 transition-all duration-200 hover:bg-[#008236] hover:text-white"
                >
                  <FiEye />
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {[...Array(totalPages).keys()].map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n + 1)}
                className={`px-4 py-2 rounded-lg border ${
                  safePage === n + 1
                    ? 'bg-[#008236] text-white border-[#008236]'
                    : 'bg-[#fdfdfb] border-[#e0ddd1] hover:bg-[#008236] hover:text-white'
                }`}
              >
                {n + 1}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AllProduct;