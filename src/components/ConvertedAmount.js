import { motion } from "framer-motion";
import Flag from "react-flagkit"; // Correct import statement

export function ConvertedAmount({ converted, isTyping, isLoading, fromCur, toCur }) {
  // Map currency codes to their respective country codes
  const currencyFlags = {
    USD: "US", // United States
    EUR: "EU", // European Union
    BRL: "BR", // Brazil
    CAD: "CA", // Canada
    INR: "IN", // India
  };

  return (
    <motion.div
      className="p-3 sm:p-4 bg-gray-100 rounded-lg shadow-inner text-center dark:bg-gray-700"
      animate={{ opacity: isLoading ? 0.7 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-gray-600 text-sm dark:text-gray-300">Converted Amount</p>
      <motion.p
        className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white"
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
          <span>
            <Flag country={currencyFlags[toCur]} size={24} /> {`${converted || 0} ${toCur}`}
          </span>
        )}
      </motion.p>
    </motion.div>
  );
}