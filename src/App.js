import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';

// Custom hook for debouncing values
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true); // User started typing
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsTyping(false); // User stopped typing
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, isTyping };
}

function App() {
  // State management
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Now we get both the debounced value and typing status
  const { debouncedValue: debouncedAmount, isTyping } = useDebounce(amount, 1000);

  // Currency swap function with animation
  const swapCurrencies = () => {
    const temp = fromCur;
    setFromCur(toCur);
    setToCur(temp);
    toast.success('Currencies swapped!');
  };

  // Conversion effect
  useEffect(() => {
    const convert = async () => {
      if (fromCur === toCur) return;

      setIsLoading(true);
      try {
        const resp = await fetch(
          `https://api.frankfurter.app/latest?amount=${debouncedAmount}&from=${fromCur}&to=${toCur}`
        );
        const data = await resp.json();
        setConverted(data.rates[toCur]);
        toast.success('Conversion updated!');
      } catch (error) {
        console.error("Error fetching conversion data:", error);
        toast.error('Failed to convert. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedAmount) {
      convert();
    }
  }, [debouncedAmount, fromCur, toCur]);

  // Background images configuration
  const currencyBackgroundImages = {
    USD: "url('/images/us-flag.jpg')",
    EUR: "url('/images/europe-flag.jpg')",
    BRL: "url('/images/brazil-flag.jpg')",
    CAD: "url('/images/canada-flag.jpg')",
    INR: "url('/images/india-flag.jpg')",
    DEFAULT: "url('/images/default-flag.jpg')"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative"
      style={{
        backgroundImage:
          currencyBackgroundImages[fromCur] || currencyBackgroundImages.DEFAULT,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <Toaster position="top-right" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-lg mx-auto backdrop-blur-sm bg-opacity-95"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6"
        >
          Currency Converter
        </motion.h1>

        <motion.div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Amount
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 disabled:bg-gray-100"
            placeholder="Enter amount..."
            min="0"
            step="any"
          />
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <motion.div className="w-full sm:flex-1">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              From
            </label>
            <motion.select
              whileFocus={{ scale: 1.02 }}
              value={fromCur}
              onChange={(e) => setFromCur(e.target.value)}
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

          <motion.button
            onClick={swapCurrencies}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed"
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

          <motion.div className="w-full sm:flex-1">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              To
            </label>
            <motion.select
              whileFocus={{ scale: 1.02 }}
              value={toCur}
              onChange={(e) => setToCur(e.target.value)}
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
        </div>

        <motion.div
          className="p-3 sm:p-4 bg-gray-100 rounded-lg shadow-inner text-center"
          animate={{ opacity: isLoading ? 0.7 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-600 text-sm">Converted Amount</p>
          <motion.p
            className="text-lg sm:text-xl font-semibold text-gray-800"
            key={converted}
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
              <span>{`${converted || 0} ${toCur}`}</span>
            )}
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4"
        >
          Exchange rates may vary and are provided by external services.
        </motion.p>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-700"
        >
          Made with <span className="text-red-500">♥</span> by Robson Muniz from{" "}
          <span className="text-blue-600 font-semibold">Portugal</span>.
        </motion.footer>
      </motion.div>
    </motion.div>
  );
}

export default App;