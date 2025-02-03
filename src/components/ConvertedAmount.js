import { motion } from "framer-motion";

export function ConvertedAmount({ converted, isTyping, isLoading, fromCur, toCur }) {
  return (
    <motion.div
      className="p-3 sm:p-4 bg-gray-100 rounded-lg shadow-inner text-center"
      animate={{ opacity: isLoading ? 0.7 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-gray-600 text-sm">Converted Amount</p>
      <motion.p
        className="text-lg sm:text-xl font-semibold text-gray-800"
        key={converted}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
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