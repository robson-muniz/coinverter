import { motion } from "framer-motion";

export function SwapButton({ onClick, isLoading }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      whileHover={{ scale: 1.1 }} // Scale up on hover
      whileTap={{ scale: 0.9 }} // Scale down on tap
      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
      title="Swap currencies"
    >
      <motion.span
        animate={{ rotate: isLoading ? 360 : 0 }} // Rotate while loading
        transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }} // Infinite rotation
      >
        🔄
      </motion.span>
      {" Swap"}
    </motion.button>
  );
}