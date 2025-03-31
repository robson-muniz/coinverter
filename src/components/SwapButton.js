import { motion } from "framer-motion";
import { FiRefreshCw } from "react-icons/fi";

export function SwapButton({ onClick, isLoading }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      className="p-3 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400/50 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
      whileHover={{
        scale: 1.1,
        rotate: 10,
        background: "linear-gradient(135deg, rgba(236, 239, 241, 0.9) 0%, rgba(207, 216, 220, 0.9) 100%)",
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
      <FiRefreshCw className="text-xl text-indigo-600 dark:text-indigo-300" />
    </motion.button>
  );
}