import { motion } from "framer-motion";
import { trackEvent } from '../utils/analytics'; // Import analytics function

export function SwapButton({ onClick, isLoading }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ rotate: isLoading ? 360 : 0 }}
      transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800 text-lg"
      title="Swap currencies"
    >
      <motion.span
        animate={{ rotate: isLoading ? 360 : 0 }}
        transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
      >
        🔄
      </motion.span>
      {" Swap"}
    </motion.button>
  );
}