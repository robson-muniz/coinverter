import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Flag from "react-flagkit";
import { Skeleton } from './Skeleton';

export function CustomDropdown({ value, onChange, options, isLoading, label, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (code) => {
    onChange(code);
    setIsOpen(false);
    setSearchTerm("");
  };

  // Filter currencies based on search input
  const filteredCurrencies = Object.entries(options)
    .filter(([code]) => code.toLowerCase().includes(searchTerm.toLowerCase()));

  // Render flag with proper animation
  const renderFlag = (code) => {
    if (code === "EUR") {
      return (
        <motion.img
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
          src="eu-flag.png"
          alt="EU Flag"
          className="w-6 h-6 rounded-full object-cover"
        />
      );
    }
    return (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <Flag country={options[code]} size={24} className="rounded-full" />
      </motion.div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="relative flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">
          {label}
        </label>
        <Skeleton className="h-12 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="relative flex-1">
      {/* Dropdown label with animation */}
      <motion.label
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide"
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {label}
      </motion.label>

      {/* Main dropdown button */}
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border border-gray-200/70 dark:border-gray-700/50 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-transparent dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 flex items-center justify-between cursor-pointer backdrop-blur-sm`}
        whileHover={{
          scale: 1.01,
          backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.7)' : 'rgba(255, 255, 255, 0.9)'
        }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-3">
          {renderFlag(value)}
          <span className="font-medium">{value}</span> {/* Explicit dark mode text color */}
        </div>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 dark:text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </motion.svg>
      </motion.div>

      {/* Dropdown menu with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            className="absolute z-20 mt-1 w-full bg-white/95 dark:bg-gray-800/95 border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-xl overflow-hidden max-h-96 overflow-y-auto backdrop-blur-lg"
          >
            {/* Search input */}
            <div className="sticky top-0 p-2 bg-white/95 dark:bg-gray-800/95 border-b border-gray-200/50 dark:border-gray-700/50">
              <motion.input
                type="text"
                placeholder="Search currency..."
                className="w-full px-3 py-2 border border-gray-200/50 dark:border-gray-700/50 rounded-lg dark:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              />
            </div>

            {/* Currency list */}
            <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
              {filteredCurrencies.map(([code, countryCode]) => (
                <motion.div
                  key={code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0)' : 'rgba(243, 244, 246, 0)'
                  }}
                  whileHover={{
                    backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.9)'
                  }}
                  onClick={() => handleSelect(code)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 text-gray-900 dark:text-gray-100" // Fixed text color
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {renderFlag(code)}
                  <span className="font-medium">{code}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}