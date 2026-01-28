import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiTrash2,
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
  FiMail,
  FiFileText,
  FiTrendingUp
} from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import { FaAd } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllAdvertisements = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adToDelete, setAdToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("https://local-market-server.vercel.app/advertisements");
      setAds(res.data);
    } catch (err) {
      console.error("Failed to fetch ads:", err);
      setError("Failed to load advertisements. Please try again.");
      toast.error("Failed to fetch advertisements.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `https://local-market-server.vercel.app/advertisements/${id}`,
        { status: newStatus }
      );
      if (res.status === 200) {
        toast.success(`Advertisement ${newStatus} successfully!`);
        setAds((prev) =>
          prev.map((ad) =>
            ad._id === id ? { ...ad, status: newStatus } : ad
          )
        );
      }
    } catch (err) {
      toast.error("Failed to update status.");
      console.error("Status update error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `https://local-market-server.vercel.app/advertisements/${adToDelete._id}`
      );
      if (res.status === 200) {
        toast.success("Advertisement deleted successfully!");
        setAds((prev) => prev.filter((ad) => ad._id !== adToDelete._id));
        setShowDeleteModal(false);
      }
    } catch (err) {
      toast.error("Failed to delete advertisement.");
      console.error("Delete error:", err);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ads.length / itemsPerPage);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Skeleton height={40} width={300} className="mb-6 mx-auto" />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Title', 'Description', 'Vendor', 'Status', 'Actions'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left">
                    <Skeleton width={100} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  {[...Array(5)].map((_, i) => (
                    <td key={i} className="px-6 py-4">
                      <Skeleton width={80} />
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
      <div className="max-w-6xl mx-auto p-6 text-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2">
            <FiAlertTriangle className="text-red-500 text-xl" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
        <button
          onClick={fetchAds}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaAd className="text-blue-600" />
            Advertisement Management
          </h1>
          <p className="text-gray-600 mt-1">
            {ads.length} advertisements found
          </p>
        </div>
      </div>

      {/* Ads Table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <FiFileText /> Title
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <FiMail /> Vendor
                  </div>
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
              {ads.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FiTrendingUp className="text-gray-400 text-4xl mb-4" />
                      <p className="text-lg font-medium text-gray-900">No advertisements found</p>
                      <p className="text-gray-500 mt-1">Create your first advertisement to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((ad) => (
                  <tr key={ad._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ad.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 line-clamp-2">{ad.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{ad.vendorEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {/* Show Approve button only if status is not already approved */}
                        {ad.status !== 'approved' && (
                          <button
                            onClick={() => handleStatusChange(ad._id, 'approved')}
                            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium ${
                              ad.status === 'approved'
                                ? 'bg-green-100 text-green-800 border border-green-300'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <FiCheckCircle size={14} /> Approve
                          </button>
                        )}
                        
                        {/* Show Reject button only if status is not already rejected */}
                        {ad.status !== 'rejected' && (
                          <button
                            onClick={() => handleStatusChange(ad._id, 'rejected')}
                            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium ${
                              ad.status === 'rejected'
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <FiXCircle size={14} /> Reject
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setAdToDelete(ad);
                          setShowDeleteModal(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                      >
                        <FiTrash2 size={14} /> Delete
                      </button>
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
              {Math.min(indexOfLastItem, ads.length)}
            </span>{' '}
            of <span className="font-medium">{ads.length}</span> ads
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && adToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Confirm Delete
              </h3>
            </div>
            <div className="mb-6">
              <p className="text-gray-700 mb-2">Are you sure you want to delete this advertisement?</p>
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="font-medium text-gray-900">{adToDelete.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{adToDelete.vendorEmail}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                onClick={handleDelete}
              >
                Delete Advertisement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAdvertisements;