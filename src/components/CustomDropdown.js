import { useState } from "react";
import { motion } from "framer-motion";
import Flag from "react-flagkit";

export function CustomDropdown({ value, onChange, options, isLoading, label }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (code) => {
    onChange(code);
    setIsOpen(false);
  };

  return (
    <div className="w-full sm:flex-1 relative">
      <label className="block text-gray-700 text-sm font-medium mb-2 dark:text-gray-300">
        {label}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 disabled:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {value === "EUR" ? (
            <img
              src="/images/eu-flag.png"
              alt="EU Flag"
              className="w-6 h-6"
            />
          ) : (
            <Flag country={options[value]} size={16} />
          )}
          <span>{value}</span>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
        >
          {Object.entries(options).map(([code, countryCode]) => (
            <motion.div
              key={code}
              whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(code)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {code === "EUR" ? (
                <img
                  src="/images/eu-flag.png"
                  alt="EU Flag"
                  className="w-6 h-6"
                />
              ) : (
                <Flag country={countryCode} size={16} />
              )}
              <span>{code}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}