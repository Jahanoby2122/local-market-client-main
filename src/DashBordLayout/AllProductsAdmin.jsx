import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiTrash2,
  FiAlertCircle,
  FiClock,
  FiDollarSign,
  FiUser,
  FiPackage
} from 'react-icons/fi';
import { ImSpinner8 } from 'react-icons/im';
import { FaBoxOpen } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AllProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const itemsPerPage = 10;

  // 🔄 Load all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://local-market-server.vercel.app/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Approve product
  const handleApprove = async (id) => {
    try {
      await axios.patch(`https://local-market-server.vercel.app/products/${id}/status`, {
        status: 'approved',
      });

      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status: 'approved' } : p
        )
      );
    } catch (err) {
      setError('Approve failed. Please try again.');
    }
  };

  // ❌ Reject modal open
  const openRejectModal = (id) => {
    setRejectingId(id);
    setShowRejectModal(true);
  };

  // ❌ Reject product
  const handleReject = async () => {
    try {
      await axios.patch(`https://local-market-server.vercel.app/products/${rejectingId}/status`, {
        status: 'rejected',
        rejectReason,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p._id === rejectingId
            ? { ...p, status: 'rejected', rejectReason }
            : p
        )
      );

      setShowRejectModal(false);
      setRejectingId(null);
      setRejectReason('');
    } catch (err) {
      setError('Reject failed. Please try again.');
    }
  };

  // 🗑️ Open delete confirmation modal
  const openDeleteModal = (id) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  // 🗑️ Delete product
  const handleDelete = async () => {
    try {
      await axios.delete(`https://local-market-server.vercel.app/products/${deletingId}`);
      setProducts((prev) => prev.filter((p) => p._id !== deletingId));
      setShowDeleteModal(false);
      setDeletingId(null);
    } catch (err) {
      setError('Delete failed. Please try again.');
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Skeleton height={40} width={300} className="mb-6" />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['#', 'Name', 'Vendor', 'Price', 'Status', 'Actions'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left">
                    <Skeleton width={80} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  {[...Array(6)].map((_, i) => (
                    <td key={i} className="px-6 py-4">
                      <Skeleton width={60} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2">
            <FiAlertCircle className="text-red-500 text-xl" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiPackage className="text-green-600" />
            Product Management
          </h1>
          <p className="text-gray-600 mt-1">
            {products.length} products found
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FaBoxOpen className="text-gray-400 text-4xl mb-4" />
                      <p className="text-lg font-medium text-gray-900">No products found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((product, index) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.itemName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiUser className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">{product.vendor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiDollarSign className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-700">{product.pricePerUnit}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'approved' 
                          ? 'bg-green-100 text-green-800'
                          : product.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {product.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(product._id)}
                              className="inline-flex items-center gap-1 px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                            >
                              <FiCheckCircle size={14} /> Approve
                            </button>
                            <button
                              onClick={() => openRejectModal(product._id)}
                              className="inline-flex items-center gap-1 px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                            >
                              <FiXCircle size={14} /> Reject
                            </button>
                          </>
                        )}
                        <a
                          href={`/dashbord/update/${product._id}`}
                          className="inline-flex items-center gap-1 px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <FiEdit2 size={14} /> Edit
                        </a>
                        <button
                          onClick={() => openDeleteModal(product._id)}
                          className="inline-flex items-center gap-1 px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
                        >
                          <FiTrash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(indexOfLastItem, products.length)}
            </span>{' '}
            of <span className="font-medium">{products.length}</span> products
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Reject Product
              </h3>
            </div>
            <div className="mb-4">
              <label htmlFor="rejectReason" className="block text-sm font-medium text-gray-700 mb-1">
                Reason for rejection
              </label>
              <textarea
                id="rejectReason"
                rows={3}
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Please specify the reason for rejection..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                onClick={handleReject}
                disabled={!rejectReason.trim()}
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Confirm Deletion
              </h3>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletingId(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                onClick={handleDelete}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductsAdmin;