import { motion } from "framer-motion";
import { Skeleton } from "./Skeleton";

export function CurrencyInput({ value, onChange, isLoading }) {
  return (
    <motion.div className="mb-6">
      <motion.label
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      >
        Amount
      </motion.label>

      {isLoading ? (
        <Skeleton className="h-12" />
      ) : (
        <motion.input
          whileFocus={{
            scale: 1.01,
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)"
          }}
          whileTap={{
            scale: 0.99
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 15
          }}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 text-lg border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white placeholder-gray-400"
          placeholder="0.00"
          min="0"
          step="any"
        />
      )}
    </motion.div>
  );
}