import { motion } from "framer-motion";

export function CurrencyInput({ value, onChange, isLoading }) {
  return (
    <motion.div className="mb-4 relative">
      <motion.label
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: value ? -20 : 0, opacity: value ? 0.8 : 1 }}
        transition={{ duration: 0.2 }}
        className="block text-gray-700 text-sm font-medium mb-2 dark:text-gray-300"
      >
        Amount
      </motion.label>
      <motion.input
        whileFocus={{ scale: 1.02 }}
        whileHover={{ scale: 1.02 }}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        className="w-full px-3 py-2 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 disabled:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        placeholder="Enter amount..."
        min="0"
        step="any"
      />
    </motion.div>
  );
}