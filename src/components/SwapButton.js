import { motion } from "framer-motion";
import { FiRefreshCw } from "react-icons/fi";

export function SwapButton({ onClick, isLoading }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{
        scale: 1.05,
        rotate: 5,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }}
      whileTap={{
        scale: 0.98,
        rotate: -2
      }}
      animate={{
        rotate: isLoading ? 360 : 0
      }}
      transition={{
        rotate: {
          duration: 1,
          repeat: isLoading ? Infinity : 0,
          ease: "linear"
        },
        scale: {
          type: "spring",
          damping: 10
        }
      }}
    >
      <FiRefreshCw className="text-xl text-gray-600 dark:text-gray-300" />
    </motion.button>
  );
}