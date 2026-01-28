import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaShieldAlt, FaLeaf, FaHandHoldingUsd } from 'react-icons/fa';
import teamImg from '../assets/teamImg.avif'; // Replace with your actual image path

const AboutUs = () => {
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

  const stats = [
    { id: 1, name: 'Daily Price Updates', value: '10,000+', icon: FaChartLine },
    { id: 2, name: 'Happy Users', value: '50,000+', icon: FaUsers },
    { id: 3, name: 'Verified Markets', value: '500+', icon: FaShieldAlt },
    { id: 4, name: 'Fresh Products', value: '100+', icon: FaLeaf },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-indigo-800 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-indigo-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <motion.h1 
                  initial={{ x: -50 }}
                  animate={{ x: 0 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
                >
                  <span className="block">Transparent Pricing</span>
                  <span className="block text-indigo-200">for Local Markets</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 text-base text-indigo-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                >
                  We're revolutionizing how consumers access daily market prices, bringing transparency and fairness to local markets across Bangladesh.
                </motion.p>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={teamImg}
            alt="Our team working"
          />
        </div>
      </motion.div>

      {/* Our Story */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8"
      >
        <motion.div variants={itemVariants} className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Story
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Founded in 2023, কাঁচাবাজার was born out of a simple observation: consumers were often unaware of daily price fluctuations in local markets, leading to unfair pricing.
            </p>
            <p className="mt-3 text-lg text-gray-500">
              Our team of market analysts, technologists, and consumer advocates came together to create a platform that empowers both buyers and sellers with real-time price information.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="relative rounded-lg overflow-hidden bg-indigo-100 px-6 py-8">
              <div className="relative">
                <blockquote className="mt-6">
                  <p className="text-lg text-gray-700">
                    "Our mission is to bring transparency to local markets, ensuring fair prices for consumers while helping vendors reach more customers."
                  </p>
                  <footer className="mt-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="Founder"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Fatima Akter</p>
                        <p className="text-sm text-gray-500">Founder & CEO</p>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        variants={containerVariants}
        className="bg-indigo-700"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 variants={itemVariants} className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by consumers and vendors nationwide
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-3 text-xl text-indigo-200">
              We're proud to be making a difference in local markets across Bangladesh
            </motion.p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <motion.div 
                key={stat.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-indigo-600 rounded-lg p-6 text-center"
              >
                <stat.icon className="mx-auto h-12 w-12 text-white" />
                <h3 className="mt-2 text-3xl font-extrabold text-white">{stat.value}</h3>
                <p className="mt-1 text-indigo-100">{stat.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Our Values */}
      <motion.div 
        variants={containerVariants}
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Values
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            These principles guide everything we do at কাঁচাবাজার
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="pt-6"
          >
            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                    <FaShieldAlt className="h-6 w-6 text-white" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Transparency</h3>
                <p className="mt-5 text-base text-gray-500">
                  We believe in open access to market data. No hidden fees, no manipulated prices - just honest information you can trust.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="pt-6"
          >
            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                    <FaLeaf className="h-6 w-6 text-white" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Fairness</h3>
                <p className="mt-5 text-base text-gray-500">
                  We're committed to creating a balanced marketplace where both consumers and vendors get fair value for their money and products.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="pt-6"
          >
            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                    <FaHandHoldingUsd className="h-6 w-6 text-white" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Community</h3>
                <p className="mt-5 text-base text-gray-500">
                  We're building more than an app - we're creating a community that supports local economies and helps families save money.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        variants={containerVariants}
        className="bg-gray-50"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              The passionate people behind কাঁচাবাজার
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Fatima Akter',
                role: 'Founder & CEO',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                bio: 'Market analyst with 10+ years experience in consumer advocacy.'
              },
              {
                name: 'Rahim Khan',
                role: 'CTO',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                bio: 'Tech entrepreneur focused on solutions for emerging markets.'
              },
              {
                name: 'Ayesha Begum',
                role: 'Head of Vendor Relations',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                bio: 'Former market vendor with deep understanding of supply chains.'
              },
            ].map((person, index) => (
              <motion.div
                key={person.name}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <img className="w-full h-48 object-cover" src={person.image} alt={person.name} />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{person.name}</h3>
                  <p className="text-indigo-600">{person.role}</p>
                  <p className="mt-2 text-gray-500">{person.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;