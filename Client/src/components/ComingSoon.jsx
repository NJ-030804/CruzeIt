import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const ComingSoon = () => {
  const { navigate } = useAppContext();
  
  // Get page title from current URL
  const getPageTitle = () => {
    const path = window.location.pathname.substring(1);
    const titles = {
      'help': 'Help Center',
      'terms': 'Terms of Service',
      'privacy': 'Privacy Policy',
      'insurance': 'Insurance Information',
      'cookies': 'Cookie Policy'
    };
    return titles[path] || 'This Page';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full"
      >
        {/* Animated Icon */}
        <motion.div
          variants={iconVariants}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            {/* Outer ring */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 rounded-full border-4 border-green-200 border-t-primary"
              style={{ width: '120px', height: '120px' }}
            />
            
            {/* Inner circle */}
            <div className="relative bg-gradient-to-br from-primary to-green-800 rounded-full p-8 shadow-2xl"
                 style={{ width: '120px', height: '120px' }}>
              <motion.svg
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                />
              </motion.svg>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants} className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block"
          >
            <span className="bg-green-100 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              Coming Soon
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            {getPageTitle()}
            <br />
            <span className="bg-gradient-to-r from-primary to-green-800 bg-clip-text text-transparent">
              Under Construction
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            We're working hard to bring you this page. It will be available soon with all the information you need.
          </p>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 mb-8"
          >
            {[
              { icon: '🚀', text: 'Coming Soon', color: 'from-primary/10 to-green-100' },
              { icon: '⚡', text: 'Fast & Reliable', color: 'from-green-50 to-emerald-100' },
              { icon: '✨', text: 'Better Experience', color: 'from-emerald-50 to-green-100' }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 shadow-lg border border-green-200/50 hover:shadow-xl transition-all`}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="text-gray-700 font-medium">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-green-800 hover:from-green-800 hover:to-primary text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Back to Home
            </motion.button>

            <motion.button
              onClick={() => navigate('/cars')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-700 hover:text-primary px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-primary/30 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              Browse Cars
            </motion.button>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-green-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">Development Progress</span>
              <span className="text-sm font-bold text-primary">65%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                className="bg-gradient-to-r from-primary to-green-800 h-full rounded-full shadow-inner"
              />
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200/50 text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Stay Tuned</h3>
              </div>
              <p className="text-sm text-gray-600">We'll notify you when this page is ready</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-5 border border-green-200/50 text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Quality First</h3>
              </div>
              <p className="text-sm text-gray-600">We're ensuring the best experience for you</p>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-500 mt-8"
          >
            Have questions? Contact us at{' '}
            <a
              href="mailto:support@cruzeit.com"
              className="text-primary hover:text-green-800 font-semibold hover:underline transition-colors"
            >
              support@cruzeit.com
            </a>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
