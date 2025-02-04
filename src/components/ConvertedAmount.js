import { motion } from "framer-motion";

export function ConvertedAmount({ converted, isTyping, isLoading, fromCur, toCur }) {
  return (
    <motion.div
      className="p-3 sm:p-4 bg-gray-100 rounded-lg shadow-inner text-center dark:bg-gray-700"
      animate={{ opacity: isLoading ? 0.7 : 1 }} // Fade when loading
      transition={{ duration: 0.3 }}
    >
      <p className="text-gray-600 text-sm dark:text-gray-300">Converted Amount</p>
      <motion.p
        className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white"
        key={converted}
        initial={{ opacity: 0, y: -20 }} // Animate on mount
        animate={{ opacity: 1, y: 0 }} // Fade in and slide down
        transition={{ duration: 0.3 }}
      >
        {isTyping ? (
          <span className="text-blue-500">Will convert in a moment...</span>
        ) : isLoading ? (
          <span className="inline-block animate-pulse">Converting...</span>
        ) : fromCur === toCur ? (
          <span>Please select different currencies</span>
        ) : (
          <span>{`${converted || 0} ${toCur}`}</span>
        )}
      </motion.p>
    </motion.div>
  );
}