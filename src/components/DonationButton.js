import React from "react";
import { motion } from "framer-motion";
import { FaPaypal } from "react-icons/fa";

export function DonationButton({ isDarkMode }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{
        scale: 0.98,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className="bg-white/95 dark:bg-gray-800/95 rounded-full shadow-sm backdrop-blur-sm overflow-hidden border border-white/20 dark:border-gray-700/50"
    >
      <a
        href="https://www.paypal.com/donate/?hosted_button_id=UA43BU97NCT7A"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-150"
      >
        <motion.span
          animate={{
            color: isDarkMode ? "#009cde" : "#003087",
            transition: { duration: 0.3 }
          }}
          whileHover={{ scale: 1.1 }}
        >
          <FaPaypal className="text-xl" />
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="font-medium tracking-wide"
        >
          Donate
        </motion.span>
      </a>
    </motion.div>
  );
}