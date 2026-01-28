import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/countdown_bg.jpg';

const DealBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 364,
    hours: 17,
    minutes: 40,
    seconds: 43,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        } else if (days > 0) {
          seconds = 59;
          minutes = 59;
          hours = 23;
          days--;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const countdownItem = {
    hidden: { scale: 0.8, opacity: 0 },
    show: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const buttonHover = {
    scale: 1.03,
    transition: { duration: 0.2, ease: "easeOut" }
  };

  const buttonTap = {
    scale: 0.98
  };

  return (
    <motion.div
      className="bg-base-100 py-16 bg-no-repeat bg-right bg-cover"
      style={{
        backgroundImage: `url(${img1})`,
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4">
        {/* Left Side Content */}
        <motion.div className="lg:w-1/2 space-y-5" variants={container}>
          <motion.p className="text-red-600 font-semibold" variants={item}>
            Sales on Weekly Offers
          </motion.p>
          
          <motion.h2 
            className="text-4xl font-bold text-black"
            variants={item}
          >
            Our special products deal of <br /> the day
          </motion.h2>
          
          <motion.p className="text-gray-500" variants={item}>
            There are many variations of passages of Lorem Ipsum available but majority have suffered alteration in some form.
          </motion.p>

          {/* Countdown */}
          <motion.div className="flex gap-4 mt-5" variants={container}>
            {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (
              <motion.div
                key={index}
                className="bg-white shadow p-4 text-center rounded-lg"
                variants={countdownItem}
                custom={index}
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
              >
                <motion.p 
                  className="text-green-600 text-2xl font-bold italic"
                  key={timeLeft[unit]} // This triggers animation when value changes
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {timeLeft[unit]}
                </motion.p>
                <p className="text-gray-600 capitalize">{unit}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button 
            className="btn bg-green-600 hover:bg-green-700 text-white mt-6"
            variants={item}
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            Shop Now →
          </motion.button>
        </motion.div>
        
        {/* Right side empty to maintain spacing */}
        <div className="lg:w-1/2" />
      </div>
    </motion.div>
  );
};

export default DealBanner;