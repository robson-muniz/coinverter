import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import { useDebounce } from './hooks/useDebounce';
import { CurrencyInput } from './components/CurrencyInput';
import { CurrencySelect } from './components/CurrencySelect';
import { SwapButton } from './components/SwapButton';
import { ConvertedAmount } from './components/ConvertedAmount';
import { Footer } from './components/Footer';

function App() {
  const [amount, setAmount] = useState("");
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("BRL");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const { debouncedValue: debouncedAmount, isTyping } = useDebounce(amount, 1000);

  const swapCurrencies = () => {
    const temp = fromCur;
    setFromCur(toCur);
    setToCur(temp);
    toast.success('Currencies swapped!');
  };

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

  const currencyBackgroundImages = {
    USD: "url('/images/us-flag.jpg')",
    EUR: "url('/images/europe-flag.jpg')",
    BRL: "url('/images/brazil-flag.jpg')",
    CAD: "url('/images/canada-flag.png')",
    INR: "url('/images/india-flag.jpg')",
    DEFAULT: "url('/images/default-flag.jpg')"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative dark:bg-gray-900"
      style={{
        backgroundImage:
          currencyBackgroundImages[fromCur] || currencyBackgroundImages.DEFAULT,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      {/* Dark mode toggle button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full z-50"
      >
        {isDarkMode ? "🌙" : "☀️"}
      </button>

      <Toaster position="top-right" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-lg mx-auto backdrop-blur-sm bg-opacity-95 dark:bg-gray-800 dark:text-white"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 dark:text-white"
        >
          Currency Converter
        </motion.h1>

        <CurrencyInput value={amount} onChange={setAmount} isLoading={isLoading} />

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <CurrencySelect value={fromCur} onChange={setFromCur} isLoading={isLoading} label="From" />
          <SwapButton onClick={swapCurrencies} isLoading={isLoading} />
          <CurrencySelect value={toCur} onChange={setToCur} isLoading={isLoading} label="To" />
        </div>

        <ConvertedAmount converted={converted} isTyping={isTyping} isLoading={isLoading} fromCur={fromCur} toCur={toCur} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 dark:text-gray-400"
        >
          Exchange rates may vary and are provided by external services.
        </motion.p>

        <Footer />
      </motion.div>
    </motion.div>
  );
}

export default App;