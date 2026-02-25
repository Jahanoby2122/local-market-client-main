import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseAxios from "../Hooks/UseAxios";
import ReviewSection from "../components/ReviewSection";
import UseAuth from "../Hooks/UseAuth";
import PriceComparisonChart from "../DashBord/PriceComparisonChart";
import useUserRole from "../Hooks/UseUserRole";
import useScrollToTop from "../Hooks/useScrollToTop";
import LoadingPages from "./LoadingPages";
import {
  StarIcon,
  BookmarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const ViewDetails = () => {
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = UseAxios();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = UseAuth();
  const { role } = useUserRole();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
        setMainImage(res.data.image);
      } catch (error) {
        console.error("Failed to load product details:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, axios]);

  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const res = await axios.get(`/watchlist?email=${user?.email}`);
        const exists = res.data?.some((item) => item.productId === id);
        setIsInWatchlist(exists);
      } catch (error) {
        console.error("Error checking watchlist", error);
      }
    };

    if (user?.email) {
      checkWatchlist();
    }
  }, [user?.email, id, axios]);

  if (loading)
    return <LoadingPages />;

  if (!product)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    );

  const {
    itemName,
    itemDescription,
    marketName,
    image,
    date,
    prices,
    vendor,
    _id,
    rating,
  } = product;

  const handleAddToWatchlist = async () => {
    try {
      const watchlistItem = {
        userEmail: user?.email,
        productId: _id,
        itemName,
        marketName,
        date,
        vendor,
        image,
        itemDescription,
        prices,
      };
      await axios.post("/watchlist", watchlistItem);
      toast.success("Added to Watchlist!");
      setIsInWatchlist(true);
    } catch (err) {
      console.error(err);
      toast.warn("Already in watchlist or error occurred.");
      setIsInWatchlist(true);
    }
  };

  const handleBuyProduct = () => {
    navigate(`/payment/${_id}`);
  };

  // Simulated image gallery
  const productImages = [image, image, image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-600"
            >
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <a
                href="#"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-green-600 md:ml-2"
              >
                Products
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                {itemName}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <img
              src={mainImage}
              alt={itemName}
              className="w-full h-96 object-contain rounded-lg"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {productImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  mainImage === img ? "border-green-500" : "border-gray-200"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {itemName}
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(rating || 4)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-sm ml-2">
                ({rating || 4}.0) • 42 reviews
              </span>
            </div>

            {/* Vendor Info */}
            <div className="flex items-center mb-6">
              <span className="text-gray-600 mr-2">Sold by:</span>
              <span className="font-medium text-gray-900">{vendor}</span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-gray-600 mr-2">Market:</span>
              <span className="font-medium text-gray-900">{marketName}</span>
            </div>

            {/* Price Section */}
            <div className="mb-6">
              {prices.length > 0 && (
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-gray-900 mr-2">
                    ${prices[prices.length - 1].price}
                  </span>
                  {prices.length > 1 && (
                    <span
                      className={`text-sm ${
                        prices[prices.length - 1].price <
                        prices[prices.length - 2].price
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {prices[prices.length - 1].price <
                      prices[prices.length - 2].price
                        ? "↓"
                        : "↑"}
                      {Math.abs(
                        ((prices[prices.length - 1].price -
                          prices[prices.length - 2].price) /
                          prices[prices.length - 2].price) *
                          100
                      ).toFixed(2)}
                      %
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600">{itemDescription}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToWatchlist}
                disabled={
                  role === "admin" || role === "vendor" || isInWatchlist
                }
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium ${
                  role === "admin" || role === "vendor" || isInWatchlist
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                <BookmarkIcon className="w-5 h-5" />
                {isInWatchlist ? "Saved" : "Add to Watchlist"}
              </button>

              <button
                onClick={handleBuyProduct}
                disabled={role === "admin" || role === "vendor"}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium text-gray-100 ${
                  role === "admin" || role === "vendor"
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                <ShoppingCartIcon className="w-5 h-5" />
                Buy Product
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Product Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Vendor</p>
                <p className="text-gray-900">{vendor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Market</p>
                <p className="text-gray-900">{marketName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Posted Date</p>
                <p className="text-gray-900">
                  {new Date(date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Product ID</p>
                <p className="text-gray-900">{_id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price History Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Price History
        </h3>
        <div className="h-80">
          <PriceComparisonChart prices={prices} />
        </div>

        {prices.length > 0 && (
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Price History Table
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {prices.map((p, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {p.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${p.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {idx > 0 && (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              p.price < prices[idx - 1].price
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {p.price < prices[idx - 1].price ? "↓" : "↑"}
                            {idx > 0 &&
                              Math.abs(
                                ((p.price - prices[idx - 1].price) /
                                  prices[idx - 1].price) *
                                  100
                              ).toFixed(2)}
                            %
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <br />
      <br />

      {/* Reviews Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-8">
        <ReviewSection productId={_id} />
      </div>
    </div>
  );
};

export default ViewDetails;
