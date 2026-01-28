import { motion } from 'framer-motion';
import { FaHeadset, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Support = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Customer Support
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            We're here to help you with any questions about market prices or our platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Contact Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <FaHeadset className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">24/7 Support</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Our team is always ready to assist you.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="tel:+8801234567890"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>

          {/* Email Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <FaEnvelope className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get a response within 24 hours.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="mailto:support@kacha-bazar.com"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Send Email
                </a>
              </div>
            </div>
          </motion.div>

          {/* FAQ Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">FAQs</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Find answers to common questions.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="/faq"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  View FAQs
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Information Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 bg-indigo-700 rounded-lg shadow-xl overflow-hidden"
        >
          <div className="px-6 py-12 sm:px-12 lg:py-16 lg:px-16">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Need more help?</span>
                  <span className="block text-indigo-200">Contact our team directly.</span>
                </h2>
                <div className="mt-4 space-y-4 text-indigo-200">
                  <div className="flex items-start">
                    <FaPhone className="flex-shrink-0 h-5 w-5 mt-1" />
                    <span className="ml-3 text-lg">+880 1234 567890</span>
                  </div>
                  <div className="flex items-start">
                    <FaEnvelope className="flex-shrink-0 h-5 w-5 mt-1" />
                    <span className="ml-3 text-lg">support@kacha-bazar.com</span>
                  </div>
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="flex-shrink-0 h-5 w-5 mt-1" />
                    <span className="ml-3 text-lg">123 Market Street, Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex items-start">
                    <FaClock className="flex-shrink-0 h-5 w-5 mt-1" />
                    <span className="ml-3 text-lg">Sunday - Thursday: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 lg:mt-0">
                <div className="inline-flex rounded-md shadow">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                  >
                    Contact Form
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feedback Form */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="px-6 py-12 sm:px-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Send us your feedback</h2>
            <p className="mt-2 text-lg text-gray-600">
              We value your opinion to improve our service.
            </p>
            <form className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue={''}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Feedback
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Support;