import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { toast } from "react-toastify";
import UseAuth from "../Hooks/UseAuth";
import { 
  FiLink, 
  FiCalendar, 
  FiDollarSign, 
  FiUser, 
  FiShoppingBag, 
  FiInfo, 
  FiPlus, 
  FiTrash2 
} from "react-icons/fi";

export default function AddProductForm() {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  // Form configuration with react-hook-form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      date: new Date(),
      status: "pending",
      prices: [{ date: new Date().toISOString().split("T")[0], price: "" }],
      image: "", // Initialize image as empty string for URL
    },
  });

  // Dynamic price fields management
  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  // State variables
  const [selectedDate, setSelectedDate] = useState(new Date());
  const imageUrl = watch("image"); // Watch image URL changes

  // Set vendor info when user loads
  useEffect(() => {
    if (user) {
      setValue("vendor", user.email);
      setValue("vendorName", user.displayName);
    }
  }, [user, setValue]);

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      const response = await axiosSecure.post("/products", data);
      if (response.data.insertedId) {
        toast.success("Product added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to add product. Please try again.", {
        position: "top-center",
      });
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <FiShoppingBag className="text-blue-600" />
          Add New Product
        </h1>
        <p className="text-gray-600 text-lg">
          Fill out the form below to add a new product to the marketplace
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          {/* Vendor Information Section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2 pb-2 border-b border-gray-200">
              <FiUser className="text-blue-500" />
              Vendor Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Vendor Email
                </label>
                <input
                  type="email"
                  {...register("vendor")}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Vendor Name
                </label>
                <input
                  type="text"
                  {...register("vendorName")}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Market Information Section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2 pb-2 border-b border-gray-200">
              <FiShoppingBag className="text-blue-500" />
              Market Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Market Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("marketName", { required: true })}
                  placeholder="e.g., Kawran Bazar"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.marketName && (
                  <p className="text-sm text-red-600">Market name is required</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setValue("date", date);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <FiCalendar className="absolute right-3 top-3.5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Market Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("marketDescription", { required: true })}
                rows={4}
                placeholder="Describe the market location, special features, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.marketDescription && (
                <p className="text-sm text-red-600">Market description is required</p>
              )}
            </div>
          </div>

          {/* Product Information Section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2 pb-2 border-b border-gray-200">
              <FiInfo className="text-blue-500" />
              Product Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("itemName", { required: true })}
                  placeholder="e.g., Tomato, Onion, Rice"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.itemName && (
                  <p className="text-sm text-red-600">Item name is required</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price per Unit <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("pricePerUnit", { required: true })}
                    type="number"
                    placeholder="50"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <FiDollarSign className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                {errors.pricePerUnit && (
                  <p className="text-sm text-red-600">Price per unit is required</p>
                )}
              </div>
            </div>

            {/* Image URL Input */}
            <div className="mb-8 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Image URL
              </label>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      {...register("image")}
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <FiLink className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Enter a valid image URL (e.g., from ImgBB, Cloudinary)
                  </p>
                </div>
                {imageUrl && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/100?text=Invalid+URL";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Price History */}
            <div className="mb-8 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price History
              </label>
              <div className="space-y-4">
                {fields.map((item, index) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="flex-1">
                      <input
                        type="date"
                        {...register(`prices.${index}.date`, { required: true })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <input
                        type="number"
                        placeholder="Price"
                        {...register(`prices.${index}.price`, { required: true })}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg"
                      />
                      <FiDollarSign className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-3 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    append({
                      date: new Date().toISOString().split("T")[0],
                      price: "",
                    })
                  }
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                >
                  <FiPlus className="text-lg" /> Add Price Entry
                </button>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Description
              </label>
              <textarea
                {...register("itemDescription")}
                rows={5}
                placeholder="Describe the product quality, features, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-12">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 text-lg ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg 
                    className="animate-spin h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Submit Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}