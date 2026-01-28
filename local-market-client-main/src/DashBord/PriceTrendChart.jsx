import React, { useEffect, useState } from "react";
import { FiActivity, FiList, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import TrackedList from "./TrackedList";
import PriceGraph from "./PriceGraph";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PriceTrendChart = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://local-market-server.vercel.app/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      const approvedProducts = data.filter(product => product.status === "approved");
      setProducts(approvedProducts);
      setSelected(approvedProducts[0] || null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FiActivity className="text-green-600" />
              Price Trend Analysis
            </h1>
            <p className="text-gray-600 mt-1">
              Track and analyze product price fluctuations
            </p>
          </div>
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <FiRefreshCw className={`${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-center gap-2 text-red-700">
              <FiAlertCircle className="flex-shrink-0" />
              <div>
                <p className="font-medium">Error loading data</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <Skeleton height={40} count={5} className="mb-2" />
                </div>
                <div className="w-full md:w-2/3">
                  <Skeleton height={400} />
                </div>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center">
              <FiList className="mx-auto text-gray-400 text-4xl mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No approved products</h3>
              <p className="text-gray-500 mt-1">
                There are currently no approved products to display.
              </p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              {/* Product List */}
              <div className="w-full md:w-1/3 border-r border-gray-200">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="font-medium text-gray-700 flex items-center gap-2">
                    <FiList />
                    Tracked Products
                  </h2>
                </div>
                <TrackedList 
                  products={products} 
                  setSelected={setSelected} 
                  selected={selected} 
                />
              </div>

              {/* Price Graph */}
              <div className="w-full md:w-2/3">
                {selected ? (
                  <>
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h2 className="font-medium text-gray-700">
                        Price Trend: {selected.name}
                      </h2>
                    </div>
                    <div className="p-4 md:p-6">
                      <PriceGraph product={selected} />
                    </div>
                  </>
                ) : (
                  <div className="p-12 text-center">
                    <FiActivity className="mx-auto text-gray-400 text-4xl mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">Select a product</h3>
                    <p className="text-gray-500 mt-1">
                      Choose a product from the list to view price trends
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceTrendChart;