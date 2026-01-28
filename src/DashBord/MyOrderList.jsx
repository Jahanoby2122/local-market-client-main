import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FiPackage, FiDollarSign, FiCalendar, FiShoppingBag, FiTrendingUp, FiEye, FiCheckCircle, FiClock, FiMapPin } from 'react-icons/fi';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import UseAuth from '../Hooks/UseAuth';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MyOrderList = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retrying, setRetrying] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (!user?.email) {
        console.warn('User email not found');
        setOrders([]);
        setLoading(false);
        return;
      }
      
      console.log('Fetching orders for:', user.email);
      const res = await axiosSecure.get('/orders', {
        params: { email: user?.email },
      });
      
      if (res.data && Array.isArray(res.data)) {
        setOrders(res.data);
        setError('');
      } else if (res.data) {
        setOrders([res.data]);
        setError('');
      } else {
        setOrders([]);
        setError('');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      console.error('Error details:', {
        status: err.response?.status,
        message: err.response?.data?.message,
        headers: err.response?.headers,
      });

      if (err.response?.status === 401) {
        setError('🔐 Session expired. Please logout and login again to continue.');
      } else if (err.response?.status === 403) {
        setError('⛔ Permission denied. Your account does not have access to view orders.');
      } else if (err.response?.status === 404) {
        setOrders([]);
        setError('');
      } else if (err.message === 'Network Error') {
        setError('🌐 Network error. Please check your internet connection and try again.');
      } else {
        setError(`❌ Failed to load orders: ${err.message}. Please try again.`);
      }
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  // Format date for better readability
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Skeleton height={40} width={200} className="mb-10 mx-auto" />
        <Skeleton height={300} className="mb-8" />
        <Skeleton height={40} width={200} className="mb-6 mx-auto" />
        <Skeleton height={300} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-96">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Error Card */}
          <div className="w-full max-w-md">
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-lg shadow-lg p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="text-5xl">⚠️</div>
                <h3 className="text-xl font-bold text-red-800">Unable to Load Orders</h3>
                <p className="text-red-700 text-sm leading-relaxed">{error}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setRetrying(true);
                fetchOrders();
              }}
              disabled={retrying || loading}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {retrying ? (
                <>
                  <span className="animate-spin">⟳</span> Retrying...
                </>
              ) : (
                <>🔄 Retry Now</>
              )}
            </button>
            
            <button
              onClick={() => window.location.href = '/dashbord'}
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              🏠 Back to Dashboard
            </button>
          </div>

          {/* Helpful Tips */}
          <div className="w-full max-w-md bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Troubleshooting Tips:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Make sure you are logged in</li>
              <li>✓ Check your internet connection</li>
              <li>✓ Try refreshing the page</li>
              <li>✓ Clear your browser cache if issues persist</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <FiShoppingBag className="text-blue-600" />
          My Order History
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          View and analyze all your past purchases and price trends
        </p>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden mb-16">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                {['#', 'Product', 'Market', 'Price', 'Status', 'Order Date', 'Transaction ID', 'Actions'].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <FiPackage className="text-gray-400 text-4xl mb-4" />
                      <p className="text-lg font-medium">No orders found</p>
                      <p className="mt-1">You haven't placed any orders yet</p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order, idx) => (
                  <tr key={order._id || idx} className="hover:bg-blue-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 bg-gray-50">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                          <FiPackage className="text-white text-lg" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{order.itemName || 'N/A'}</div>
                          <div className="text-xs text-gray-500 mt-1">ID: {order.productId?.substring(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <FiMapPin className="text-red-500 flex-shrink-0" />
                        <span className="font-medium">{order.marketName || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <FiDollarSign className="text-green-600" />
                        <span className="text-green-600">৳{parseFloat(order.price).toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {order.status === 'paid' ? (
                          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                            <FiCheckCircle className="text-sm" /> Paid
                          </span>
                        ) : order.status === 'pending' ? (
                          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">
                            <FiClock className="text-sm" /> Pending
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold">
                            {order.status || 'Unknown'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-blue-500 flex-shrink-0" />
                          <span className="font-medium">{formatDate(order.orderTime)}</span>
                        </div>
                        <div className="text-xs text-gray-500 ml-6">{new Date(order.orderTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {order.transactionId?.substring(0, 15)}...
                      </div>
                      <div className="text-xs text-gray-500 mt-1 max-w-xs truncate" title={order.transactionId}>
                        Full ID: {order.transactionId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link
                        to={`/viewdetails/${order.productId}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                      >
                        <FiEye size={14} /> View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Trends Chart */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <FiTrendingUp className="text-blue-600" />
          Price Trends Analysis
        </h2>
        
        {orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No order data available to display price trends
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={orders.map((order) => ({
                  name: formatDate(order.orderTime),
                  price: parseFloat(order.price),
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#6B7280' }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fill: '#6B7280' }}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: 'none',
                  }}
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                  labelFormatter={(value) => `Date: ${value}`}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2, fill: '#3B82F6' }}
                  activeDot={{ r: 6, stroke: '#1D4ED8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrderList;