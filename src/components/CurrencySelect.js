import { motion } from "framer-motion";
import Flag from "react-flagkit";

export function CurrencySelect({ value, onChange, isLoading, label }) {
  const currencyFlags = {
    USD: "US",
    EUR: "EU",
    BRL: "BR",
    CAD: "CA",
    INR: "IN",
  };

  return (
    <motion.div className="w-full sm:flex-1">
      <label className="block text-gray-700 text-sm font-medium mb-2 dark:text-gray-300">
        {label}
      </label>
      <motion.select
        whileFocus={{ scale: 1.02 }}
        whileHover={{ scale: 1.02 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        className="w-full px-3 py-2 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 disabled:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        {Object.entries(currencyFlags).map(([code, countryCode]) => (
          <option key={code} value={code}>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Flag country={countryCode} size={16} /> {code}
            </motion.span>
          </option>
        ))}
      </motion.select>
    </motion.div>
  );
}