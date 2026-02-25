import React, { useEffect, useState } from "react";
import UseAuth from "../Hooks/UseAuth";
import UseAxios from "../Hooks/UseAxios";
import { FaStar } from "react-icons/fa";

const ReviewSection = ({ productId }) => {
  const { user } = UseAuth();
  const axios = UseAxios();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/reviews/${productId}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      alert("Please login first");
      return;
    }

    if (rating === 0) {
      alert("Please select rating");
      return;
    }

    const reviewData = {
      userEmail: user.email,
      userName: user.name || user.email,
      productId,
      rating,
      comment,
      date: new Date(),
    };

    try {
      const res = await axios.post("/reviews", reviewData);
      if (res.status === 201) {
        setRating(0);
        setComment("");
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Reviews & Comments
      </h2>

      {/* Review List */}
      <div className="space-y-6 mb-12">
        {reviews.map((rev, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                  {(rev.userName || "U")[0]}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">
                    {rev.userName || rev.userEmail}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {rev.userEmail}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < rev.rating
                        ? "text-orange-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>

            {/* Comment */}
            <p className="mt-4 text-gray-700">
              {rev.comment}
            </p>

            {/* Date */}
            <p className="text-sm text-gray-400 mt-3">
              {new Date(rev.createdAt || rev.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Add Review Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6 text-gray-800">
          Add Your Review
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <p className="text-gray-700 mb-2">Your Rating</p>
            <div className="flex gap-2">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    size={24}
                    className={`cursor-pointer ${
                      starValue <= (hover || rating)
                        ? "text-orange-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </div>
          </div>

          {/* Comment */}
          <div>
            <p className="text-gray-700 mb-2">Your Comment</p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={5}
              placeholder="Share your experience about these prices..."
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;