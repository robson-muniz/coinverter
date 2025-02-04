import { motion } from "framer-motion";

export function SwapButton({ onClick, isLoading }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          document.querySelector(".custom-cursor").textContent = "💱";
        }
      }}
      onMouseLeave={() => {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          document.querySelector(".custom-cursor").textContent = "👆";
        }
      }}
      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
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