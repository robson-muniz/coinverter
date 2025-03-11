import { motion } from "framer-motion";
import Flag from "react-flagkit";
import toast from "react-hot-toast";
import { useState } from "react";
import { trackEvent } from '../utils/analytics';

export function ConvertedAmount({ converted, isTyping, isLoading, fromCur, toCur }) {
  // Mapping of currency codes to country codes for flag display
  const currencyFlags = {
    USD: "US", // United States
    EUR: "EU", // European Union (custom flag)
    GBP: "GB", // United Kingdom
    JPY: "JP", // Japan
    CNY: "CN", // China
    AUD: "AU", // Australia
    CAD: "CA", // Canada
    CHF: "CH", // Switzerland
    INR: "IN", // India
    BRL: "BR", // Brazil
    // New currencies
    NZD: "NZ", // New Zealand
    SEK: "SE", // Sweden
    KRW: "KR", // South Korea
    SGD: "SG", // Singapore
    HKD: "HK", // Hong Kong
    NOK: "NO", // Norway
    MXN: "MX", // Mexico
    ZAR: "ZA", // South Africa
    TRY: "TR", // Turkey
    RUB: "RU", // Russia
  };

  // State to track if the converted amount has been copied to the clipboard
  const [isCopied, setIsCopied] = useState(false);

  // Function to copy the converted amount to the clipboard
  const handleCopyToClipboard = async () => {
    if (converted) {
      try {
        await navigator.clipboard.writeText(`${converted} ${toCur}`);
        setIsCopied(true);
        toast.success("Copied to clipboard!");
        trackEvent('Conversion', 'Copy', `${converted} ${toCur}`);
      } catch (err) {
        toast.error("Failed to copy text");
        console.error("Failed to copy text: ", err);
      } finally {
        // Reset the "Copied" state after 1.5 seconds
        setTimeout(() => setIsCopied(false), 1500);
      }
    }
  };

  return (
    <motion.div
      className="p-4 sm:p-6 bg-white rounded-lg shadow-md text-center dark:bg-gray-800"
      animate={{ opacity: isLoading ? 0.7 : 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Section title */}
      <p className="text-gray-600 text-lg font-medium mb-4 dark:text-gray-300">Converted Amount</p>

      <motion.div
        className="flex items-center justify-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Display a message if the user is typing */}
        {isTyping ? (
          <span className="text-blue-500 text-lg">Will convert in a moment...</span>
        ) : isLoading ? (
          // Display a loading message if the conversion is in progress
          <span className="inline-block animate-pulse text-lg">Converting...</span>
        ) : fromCur === toCur ? (
          // Display a message if the "from" and "to" currencies are the same
          <span className="text-lg">Please select different currencies</span>
        ) : (
          // Display the converted amount and flag
          <>
            <div className="flex-shrink-0">
              {/* Display the EU flag image for EUR, otherwise use react-flagkit */}
              {toCur === "EUR" ? (
                <img
                  src="/images/eu-flag.png" // Ensure this path is correct
                  alt="EU Flag"
                  className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600"
                />
              ) : (
                <Flag
                  country={currencyFlags[toCur]} // Get the country code from the mapping
                  size={32}
                  className="rounded-full border-2 border-gray-200 dark:border-gray-600"
                />
              )}
            </div>

            {/* Display the converted amount */}
            <span className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
              {`${converted || 0} ${toCur}`}
            </span>

            {/* Display the copy-to-clipboard button */}
            {converted && !isTyping && !isLoading && fromCur !== toCur && (
              <motion.div
                onClick={handleCopyToClipboard}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Copy to Clipboard"
              >
                {isCopied ? (
                  // Display a checkmark if the text was copied
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-green-500"
                  >
                    ✔️
                  </motion.span>
                ) : (
                  // Display a clipboard icon if the text is not copied
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