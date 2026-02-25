import React, { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import UseAuth from '../Hooks/UseAuth';
import LoadingPages from '../Pages/LoadingPages';
import {
  FiEdit2, FiCalendar, FiDollarSign,
  FiUser, FiShoppingBag, FiInfo, FiClock
} from 'react-icons/fi';

const Update = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = UseAuth();

  // Keep track of the original pricePerUnit loaded from DB
  const originalPriceRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      prices: []
    }
  });

  const { fields, append } = useFieldArray({
    control,
    name: "prices"
  });

  // Load product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosSecure.get(`/products/${id}`);
        const product = response.data;

        // Format dates
        if (product.date) {
          product.date = new Date(product.date);
        }

        if (product.prices && Array.isArray(product.prices)) {
          product.prices = product.prices.map(price => ({
            ...price,
            date: price.date ? new Date(price.date) : new Date()
          }));
        } else {
          product.prices = [];
        }

        // Save original price for comparison later
        originalPriceRef.current = product.pricePerUnit;

        reset(product);
      } catch (error) {
        console.error("Failed to load product:", error);
        toast.error("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, reset, axiosSecure]);

  // Handle form submission
  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const currentPrices = data.prices || [];

      // Get last price in history
      const lastHistoryPrice =
        currentPrices.length > 0
          ? String(currentPrices[currentPrices.length - 1].price)
          : null;

      // Only add new history entry if pricePerUnit changed from what's already last in history
      let updatedPrices = [...currentPrices];
      if (String(data.pricePerUnit) !== lastHistoryPrice) {
        updatedPrices = [
          ...currentPrices,
          { date: new Date(), price: data.pricePerUnit }
        ];
      }

      // Keep only the last 7 entries — remove oldest if exceeded
      if (updatedPrices.length > 7) {
        updatedPrices = updatedPrices.slice(updatedPrices.length - 7);
      }

      const updatedData = {
        ...data,
        date: data.date instanceof Date ? data.date.toISOString() : data.date,
        prices: updatedPrices.map(price => ({
          ...price,
          date:
            price.date instanceof Date
              ? price.date.toISOString().split("T")[0]
              : price.date
        }))
      };

      await axiosSecure.put(`/products/${id}`, updatedData);

      // Update the original price ref so subsequent saves work correctly
      originalPriceRef.current = data.pricePerUnit;

      // Re-sync form with updated prices
      reset({
        ...data,
        prices: updatedPrices
      });

      toast.success("Product updated successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update product. Please try again.", {
        position: "top-center",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingPages />;
  }

  const dateValue = watch("date") || new Date();

  // Helper to format date nicely
  const formatDate = (date) => {
    if (!date) return "—";
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiEdit2 className="text-white" />
            Update Product
          </h2>
          <p className="text-blue-100 mt-1">
            Update the details of your product listing
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">

          {/* ── Vendor Information ─────────────────────────────────── */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
              <FiUser className="text-blue-500" />
              Vendor Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vendor Email
                </label>
                <input
                  {...register("vendor")}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vendor Name
                </label>
                <input
                  {...register("vendorName")}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* ── Market Information ─────────────────────────────────── */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
              <FiShoppingBag className="text-blue-500" />
              Market Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Market Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("marketName", { required: true })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.marketName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.marketName && (
                  <p className="mt-1 text-sm text-red-600">Market name is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DatePicker
                    selected={dateValue}
                    onChange={(date) => setValue("date", date)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    dateFormat="MMMM d, yyyy"
                  />
                  <FiCalendar className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Market Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("marketDescription", { required: true })}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.marketDescription ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.marketDescription && (
                <p className="mt-1 text-sm text-red-600">Market description is required</p>
              )}
            </div>
          </div>

          {/* ── Product Information ────────────────────────────────── */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
              <FiInfo className="text-green-500" />
              Product Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("itemName", { required: true })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.itemName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.itemName && (
                  <p className="mt-1 text-sm text-red-600">Item name is required</p>
                )}
              </div>

              {/* Price Per Unit — changing this adds a new history entry on save */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Unit <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    {...register("pricePerUnit", { required: true })}
                    className={`w-full px-4 py-2 pl-8 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.pricePerUnit ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  <FiDollarSign className="absolute left-3 top-2.5 text-gray-400" />
                </div>
                {errors.pricePerUnit && (
                  <p className="mt-1 text-sm text-red-600">Price per unit is required</p>
                )}
                <p className="mt-1 text-xs text-gray-400 italic">
                  Changing this value will add a new entry to Price History on save.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image URL
              </label>
              <input
                {...register("image")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <input
                {...register("status")}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>

          {/* ── Price History (Read-Only Timeline) ────────────────── */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FiClock className="text-green-500" />
                Price History
              </span>
              <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                {fields.length}/7 entries
              </span>
            </h3>

            {fields.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                No price history yet. Save with a price to start tracking. (Max 7 entries kept)
              </p>
            ) : (
              <div className="relative">
                {/* vertical timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

                <ul className="space-y-3 pl-12">
                  {fields.map((item, index) => {
                    const isLast = index === fields.length - 1;
                    const priceVal = watch(`prices.${index}.price`);
                    const dateVal = watch(`prices.${index}.date`);

                    return (
                      <li key={item.id} className="relative">
                        {/* dot */}
                        <span
                          className={`absolute -left-8 top-2 w-3 h-3 rounded-full border-2 ${
                            isLast
                              ? "bg-green-500 border-green-500"
                              : "bg-white border-gray-300"
                          }`}
                        />

                        <div
                          className={`flex items-center justify-between px-4 py-3 rounded-lg ${
                            isLast
                              ? "bg-green-50 border border-green-200"
                              : "bg-gray-50 border border-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FiCalendar className="text-gray-400" />
                            <span>{formatDate(dateVal)}</span>
                          </div>
                          <div
                            className={`flex items-center gap-1 font-semibold text-sm ${
                              isLast ? "text-green-700" : "text-gray-600"
                            }`}
                          >
                            <FiDollarSign />
                            <span>{priceVal}</span>
                            {isLast && (
                              <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">
                                Current
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Hidden inputs so react-hook-form keeps values */}
                        <input type="hidden" {...register(`prices.${index}.price`)} />
                        <input type="hidden" {...register(`prices.${index}.date`)} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* ── Product Description ────────────────────────────────── */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Description
            </label>
            <textarea
              {...register("itemDescription")}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* ── Submit ─────────────────────────────────────────────── */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition duration-200 ${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Product"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Update;