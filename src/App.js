import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import useSound from "use-sound";
import { useDebounce } from './hooks/useDebounce';
import { CurrencyInput } from './components/CurrencyInput';
import { CustomDropdown } from './components/CustomDropdown';
import { SwapButton } from './components/SwapButton';
import { ConvertedAmount } from './components/ConvertedAmount';
import { Footer } from './components/Footer';
import { DonationButton } from './components/DonationButton';
import { ShareButton } from './components/ShareButton';

// Import sound files
import swapSound from './sounds/swap.wav';
import successSound from './sounds/success.wav';

function App() {
  const [amount, setAmount] = useState("");
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("BRL");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Currency flags mapping
  const currencyFlags = {
    USD: "US", // United States
    EUR: "EU", // European Union
    BRL: "BR", // Brazil
    CAD: "CA", // Canada
    INR: "IN", // India
  };

  // Initialize useSound for swap and success sounds
  const [playSwap] = useSound(swapSound);
  const [playSuccess] = useSound(successSound);

  // Dark mode effect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const { debouncedValue: debouncedAmount, isTyping } = useDebounce(amount, 1000);

  const swapCurrencies = () => {
    playSwap(); // Play swap sound
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
        playSuccess(); // Play success sound
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
  }, [debouncedAmount, fromCur, toCur, playSuccess]);

  const currencyBackgroundImages = {
    USD: "url('/images/us-flag.jpg')",
    EUR: "url('/images/europe-flag.jpg')",
    BRL: "url('/images/brazil-flag.jpg')",
    CAD: "url('/images/canada-flag.png')",
    INR: "url('/images/india-flag.jpg')",
    DEFAULT: "url('/images/default-flag.jpg')"
  };

  // Generate the conversion text for sharing
  const conversionText = `I just converted ${amount} ${fromCur} to ${converted} ${toCur} using this awesome currency converter!`;

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
      {/* Share Button */}
      <ShareButton conversionText={conversionText} />

      {/* Donation Button */}
      <DonationButton />

      {/* Dark mode toggle button with animation */}
      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full z-50"
      >
        {isDarkMode ? "🌙" : "☀️"}
      </motion.button>

      {/* Loading spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

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
          <CustomDropdown
            value={fromCur}
            onChange={setFromCur}
            options={currencyFlags}
            isLoading={isLoading}
            label="From"
          />
          <SwapButton onClick={swapCurrencies} isLoading={isLoading} />
          <CustomDropdown
            value={toCur}
            onChange={setToCur}
            options={currencyFlags}
            isLoading={isLoading}
            label="To"
          />
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