import { motion } from "framer-motion";
import { FaExchangeAlt, FaSpinner } from "react-icons/fa";
import { trackEvent } from '../utils/analytics';

export function SwapButton({ onClick, isLoading }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800 text-lg flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaSpinner className="text-xl" />
        </motion.span>
      ) : (
        <>
          <FaExchangeAlt className="text-xl" />
          <span>Swap</span>
        </>
      )}
    </motion.button>
  );
}