import { motion } from "framer-motion";
import Flag from "react-flagkit";
import toast from "react-hot-toast";
import { useState } from "react";

export function ConvertedAmount({ converted, isTyping, isLoading, fromCur, toCur }) {
  const currencyFlags = {
    USD: "US", // United States
    EUR: "EU", // European Union (updated)
    BRL: "BR", // Brazil
    CAD: "CA", // Canada
    INR: "IN", // India
  };

  const [isCopied, setIsCopied] = useState(false); // State to track if copied

  // Copy to Clipboard function
  const handleCopyToClipboard = async () => {
    if (converted) {
      try {
        await navigator.clipboard.writeText(`${converted} ${toCur}`);
        setIsCopied(true); // Set copied state to true
        toast.success("Copied to clipboard!");
        setTimeout(() => setIsCopied(false), 1500); // Reset after 1.5 seconds
      } catch (err) {
        toast.error("Failed to copy text");
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <motion.div
      className="p-4 sm:p-6 bg-white rounded-lg shadow-md text-center dark:bg-gray-800"
      animate={{ opacity: isLoading ? 0.7 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-gray-600 text-sm font-medium mb-2 dark:text-gray-300">Converted Amount</p>

      <motion.div
        className="flex items-center justify-center gap-3"
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
          <>
            {/* Flag */}
            <div className="flex-shrink-0">
              {toCur === "EUR" ? (
                <img
                  src="/images/eu-flag.png" // Use the EU flag image
                  alt="EU Flag"
                  className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600"
                />
              ) : (
                <Flag
                  country={currencyFlags[toCur]}
                  size={32}
                  className="rounded-full border-2 border-gray-200 dark:border-gray-600"
                />
              )}
            </div>

            {/* Converted Amount */}
            <span className="text-2xl font-semibold text-gray-800 dark:text-white">
              {`${converted || 0} ${toCur}`}
            </span>

            {/* Copy to Clipboard Icon */}
            {converted && !isTyping && !isLoading && fromCur !== toCur && (
              <motion.div
                onClick={handleCopyToClipboard}
                whileHover={{ scale: 1.1 }} // Slight scale on hover
                whileTap={{ scale: 0.9 }} // Slight scale on tap
                className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Copy to Clipboard"
              >
                {isCopied ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-green-500"
                  >
                    ✔️
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    📄
                  </motion.span>
                )}
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}