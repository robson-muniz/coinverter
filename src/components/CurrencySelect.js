import { motion } from "framer-motion";

export function CurrencySelect({ value, onChange, isLoading, label }) {
  return (
    <motion.div className="w-full sm:flex-1">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <motion.select
        whileFocus={{ scale: 1.02 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        className="w-full px-3 py-2 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 disabled:bg-gray-100"
      >
        <option value="USD">🇺🇸 USD</option>
        <option value="EUR">🇪🇺 EUR</option>
        <option value="BRL">🇧🇷 BRL</option>
        <option value="CAD">🇨🇦 CAD</option>
        <option value="INR">🇮🇳 INR</option>
      </motion.select>
    </motion.div>
  );
}