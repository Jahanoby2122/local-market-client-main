import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import UseAuth from "../Hooks/UseAuth";

const Advertisement = () => {
  const { user } = UseAuth();

  const [adInfo, setAdInfo] = useState({
    title: "",
    description: "",
    image: "",
    status: "pending",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdInfo((prev) => ({ ...prev, [name]: value }));
    if (name === "image") setImageError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    if (!adInfo.title || !adInfo.description || !adInfo.image) {
      toast.error("Please fill out all required fields!");
      setIsSubmitting(false);
      return;
    }

    // Validate image URL
    try {
      new URL(adInfo.image);
    } catch (err) {
      toast.error("Please enter a valid image URL");
      setImageError(true);
      setIsSubmitting(false);
      return;
    }

    const advertisement = {
      ...adInfo,
      vendorEmail: user?.email,
      vendorName: user?.displayName || "Unknown Vendor",
      date: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        `https://local-market-server.vercel.app/advertisements`,
        advertisement
      );
      if (res.data.insertedId) {
        toast.success("Advertisement submitted successfully!");
        setAdInfo({
          title: "",
          description: "",
          image: "",
          status: "pending",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to submit advertisement."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              📢 Create New Advertisement
            </h2>
            <p className="mt-2 text-gray-600">
              Promote your products to thousands of customers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Advertisement Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={adInfo.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  !adInfo.title && isSubmitting
                    ? "border-red-300"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="e.g., Summer Sale - 50% Off!"
                maxLength={100}
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">
                  Max 100 characters ({adInfo.title.length}/100)
                </p>
                {!adInfo.title && isSubmitting && (
                  <p className="text-xs text-red-500">Title is required</p>
                )}
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={adInfo.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 border ${
                  !adInfo.description && isSubmitting
                    ? "border-red-300"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="Describe your offer in details..."
                maxLength={500}
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">
                  Max 500 characters ({adInfo.description.length}/500)
                </p>
                {!adInfo.description && isSubmitting && (
                  <p className="text-xs text-red-500">Description is required</p>
                )}
              </div>
            </div>

            {/* Image URL Field */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL <span className="text-red-500">*</span>
              </label>
              <input
                id="image"
                type="url"
                name="image"
                value={adInfo.image}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  (!adInfo.image || imageError) && isSubmitting
                    ? "border-red-300"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="https://example.com/your-image.jpg"
              />
              {(!adInfo.image && isSubmitting) && (
                <p className="text-xs text-red-500 mt-1">Image URL is required</p>
              )}
              {imageError && (
                <p className="text-xs text-red-500 mt-1">Please enter a valid URL</p>
              )}

              {/* Image Preview */}
              {adInfo.image && !imageError && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={adInfo.image}
                      alt="Advertisement preview"
                      className="w-full h-48 object-contain bg-gray-100"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e5e7eb'%3E%3Cpath d='M4 5h16v14H4z'/%3E%3Cpath fill='%239ca3af' d='M8 9a1 1 0 11-2 0 1 1 0 012 0zm7 7H9v-2h6v2zm-1-4H9v-2h5v2z'/%3E%3C/svg%3E";
                        setImageError(true);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Status Field (Readonly) */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <input
                id="status"
                type="text"
                name="status"
                value={adInfo.status}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your advertisement will be reviewed by our team
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white ${
                  isSubmitting
                    ? "bg-blue-400"
                    : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Submit Advertisement"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;