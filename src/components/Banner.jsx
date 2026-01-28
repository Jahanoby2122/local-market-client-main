import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import bannerImage from "../assets/hero-banner.jpg";

const Banner = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Stagger animation for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8
      }
    }
  };

  const statItemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150
      }
    }
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <section ref={containerRef} className="relative h-[80vh] w-full overflow-hidden">
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerImage})`,
          y,
          scale
        }}
      />
      
      {/* Dark overlay with fade on scroll */}
      <motion.div 
        className="absolute inset-0 bg-black/60"
        style={{ opacity }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <motion.div
          className="max-w-2xl text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Badge with bounce animation */}
          <motion.span
            className="inline-flex items-center gap-2 bg-[#008236] text-white px-4 py-1 rounded-full text-sm mb-6"
            variants={badgeVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block w-2 h-2 bg-[#008236] rounded-full"
            />
            Live Market Prices
          </motion.span>

          {/* Heading with staggered animation */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight"
            variants={containerVariants}
          >
            <motion.span variants={itemVariants} className="block">
              Track Fresh Market
            </motion.span>
            <motion.span variants={itemVariants} className="block">
              Prices{" "}
              <motion.span
                className="text-[#008236] inline-block"
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                Daily
              </motion.span>
            </motion.span>
          </motion.h1>

          {/* Description with fade-in-up */}
          <motion.p
            className="mt-6 text-gray-200 text-lg"
            variants={itemVariants}
          >
            Get real-time updates on local market prices. Compare across
            markets, track trends, and save money on your daily groceries.
          </motion.p>

          {/* Buttons with hover animations */}
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            variants={containerVariants}
          >
            <motion.button
              className="bg-[#008236] hover:bg-[#008236] text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition"
              variants={itemVariants}
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
              Explore Prices
            </motion.button>

            <motion.button
              className="border border-white/40 hover:border-white text-white px-6 py-3 rounded-lg transition"
              variants={itemVariants}
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Join as Vendor
            </motion.button>
          </motion.div>

          {/* Stats with staggered count-up animation */}
          <motion.div
            className="mt-10 flex flex-wrap gap-8"
            variants={statsVariants}
          >
            <motion.div variants={statItemVariants}>
              <motion.h3
                className="text-xl font-bold text-[#008236]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 0.9
                }}
              >
                100+
              </motion.h3>
              <p className="text-sm text-gray-300">Daily Updates</p>
            </motion.div>

            <motion.div variants={statItemVariants}>
              <motion.h3
                className="text-xl font-bold text-[#008236]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 1
                }}
              >
                50+
              </motion.h3>
              <p className="text-sm text-gray-300">Markets</p>
            </motion.div>

            <motion.div variants={statItemVariants}>
              <motion.h3
                className="text-xl font-bold text-[#008236]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 1.1
                }}
              >
                24/7
              </motion.h3>
              <p className="text-sm text-gray-300">Real-time</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;