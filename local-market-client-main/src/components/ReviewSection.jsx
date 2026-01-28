import React, { useEffect, useState } from 'react';
import UseAuth from '../Hooks/UseAuth';
import UseAxios from '../Hooks/UseAxios';
import { FaStar, FaUserCircle, FaCalendarAlt, FaEdit, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewSection = ({ productId }) => {
  const { user } = UseAuth();
  const axios = UseAxios();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState('latest');
  const [expandedReview, setExpandedReview] = useState(null);

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/reviews/${productId}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Fetch review error:', err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      // Show toast notification instead of alert
      alert('Please login to submit a review');
      return;
    }

    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    const reviewData = {
      userEmail: user.email,
      userName: user.name || user.email,
      userAvatar: user.photoURL || null,
      productId,
      rating,
      comment,
    };

    try {
      const res = await axios.post('/reviews', reviewData);
      if (res.status === 201) {
        // Success animation
        alert('Review submitted successfully!');
        setRating(0);
        setComment('');
        fetchReviews();
      }
    } catch (err) {
      console.error('Review error:', err);
      alert('Error submitting review');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // Sort reviews based on selected option
  const sortedReviews = [...reviews].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.date);
    const dateB = new Date(b.createdAt || b.date);
    
    switch (sortBy) {
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'latest':
        return dateB - dateA;
      case 'oldest':
        return dateA - dateB;
      default:
        return dateB - dateA;
    }
  });

  const StarRating = ({ ratingValue, interactive = false, size = 20 }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= ratingValue;
          const isHalf = starNumber - 0.5 === ratingValue;

          return (
            <div key={index} className="relative">
              <FaStar
                className={`${
                  interactive
                    ? 'cursor-pointer transition-transform hover:scale-110'
                    : ''
                } ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}
                size={size}
                style={{
                  fill: isFilled ? 'currentColor' : 'none',
                  stroke: isFilled ? 'currentColor' : '#d1d5db',
                  strokeWidth: 1,
                }}
              />
              {isHalf && (
                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <FaStar
                    className="text-yellow-400"
                    size={size}
                    style={{ position: 'absolute', left: 0 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="mt-16 max-w-6xl mx-auto px-4">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-10 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
            <p className="text-gray-600">Share your experience with this product</p>
          </div>
          <div className="flex items-center gap-8 mt-6 md:mt-0">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">{averageRating}</div>
              <StarRating ratingValue={averageRating} size={20} />
              <p className="text-sm text-gray-500 mt-2">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">{reviews.length}</div>
              <p className="text-sm text-gray-500 mt-2">Total Reviews</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Review Form - Left Column */}
        <div className="lg:col-span-1">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="bg-white rounded-2xl shadow-xl p-6 sticky top-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b">
              Share Your Thoughts
            </h3>
            
            {!user ? (
              <div className="text-center py-8">
                <FaUserCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Please login to submit a review</p>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
                  Login to Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                {/* Rating Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How would you rate this product?
                  </label>
                  <div className="flex justify-center gap-2 mb-2">
                    {[...Array(5)].map((star, index) => {
                      const starNumber = index + 1;
                      return (
                        <motion.button
                          key={index}
                          type="button"
                          className={`transition-all duration-300 ${
                            starNumber <= (hover || rating) 
                              ? 'text-yellow-400 scale-110' 
                              : 'text-gray-300'
                          }`}
                          onClick={() => setRating(starNumber)}
                          onMouseEnter={() => setHover(starNumber)}
                          onMouseLeave={() => setHover(null)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaStar size={40} />
                        </motion.button>
                      );
                    })}
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-500">
                      {rating === 0 ? 'Select a rating' : `${rating} out of 5 stars`}
                    </span>
                  </div>
                </div>

                {/* Comment Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Your Review
                  </label>
                  <div className="relative">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                      rows={6}
                      placeholder="What did you like or dislike? How was your experience?"
                      required
                    />
                    <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                      {comment.length}/500
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-xl font-medium transition ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FaCheck /> Submit Review
                    </span>
                  )}
                </motion.button>
              </form>
            )}

            {/* Review Guidelines */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Review Guidelines</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                  Be honest and specific about your experience
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                  Focus on the product features and quality
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                  Avoid personal information and inappropriate content
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Reviews List - Right Column */}
        <div className="lg:col-span-2">
          {/* Reviews Header with Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Customer Reviews ({reviews.length})
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Read what other customers are saying
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <AnimatePresence>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-6"
            >
              {sortedReviews.length === 0 ? (
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-lg p-12 text-center"
                >
                  <FaEdit className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-xl font-medium text-gray-700 mb-2">No Reviews Yet</h4>
                  <p className="text-gray-500">
                    Be the first to share your thoughts about this product!
                  </p>
                </motion.div>
              ) : (
                sortedReviews.map((rev, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    layout
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      {/* Review Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                            {rev.userAvatar ? (
                              <img
                                src={rev.userAvatar}
                                alt={rev.userName}
                                className="w-12 h-12 rounded-full"
                              />
                            ) : (
                              <FaUserCircle className="w-8 h-8 text-indigo-400" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {rev.userName || rev.userEmail}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                              <StarRating ratingValue={rev.rating} size={16} />
                              <span className="text-sm text-gray-500">{rev.rating}.0</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FaCalendarAlt />
                          <span>
                            {new Date(rev.createdAt || rev.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="mt-4">
                        <p className={`text-gray-700 ${expandedReview === idx ? '' : 'line-clamp-3'}`}>
                          {rev.comment}
                        </p>
                        {rev.comment.length > 200 && (
                          <button
                            onClick={() => setExpandedReview(expandedReview === idx ? null : idx)}
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium mt-2"
                          >
                            {expandedReview === idx ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>

                      {/* Helpful Votes (Optional) */}
                      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
                        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          Helpful
                        </button>
                        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m-7 10h2" />
                          </svg>
                          Not Helpful
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;