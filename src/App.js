import React, { useState, useEffect, lazy, Suspense } from "react";
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
import { initGA, trackPageView, trackEvent } from './utils/analytics';
import { PDFDownloadLink } from "@react-pdf/renderer";
import swapSound from './sounds/swap.wav';
import successSound from './sounds/success.wav';

const PDFDocument = lazy(() => import('./components/PDFDocument'));

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
    GBP: "GB", // United Kingdom
    JPY: "JP", // Japan
    CNY: "CN", // China
    AUD: "AU", // Australia
    CAD: "CA", // Canada
    CHF: "CH", // Switzerland
    INR: "IN", // India
    BRL: "BR", // Brazil
  };

  // Background images for each currency
  const currencyBackgroundImages = {
    USD: "url('/images/us-flag.jpg')",
    EUR: "url('/images/europe-flag.jpg')",
    GBP: "url('/images/uk-flag.jpg')",
    JPY: "url('/images/japan-flag.jpg')",
    CNY: "url('/images/china-flag.jpg')",
    AUD: "url('/images/australia-flag.jpg')",
    CAD: "url('/images/canada-flag.png')",
    CHF: "url('/images/switzerland-flag.jpg')",
    INR: "url('/images/india-flag.jpg')",
    BRL: "url('/images/brazil-flag.jpg')",
    DEFAULT: "url('/images/default-flag.jpg')",
  };

  // Initialize Google Analytics on component mount
  useEffect(() => {
    initGA();
    trackPageView(window.location.pathname + window.location.search);
  }, []);

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

    // Track swap event
    trackEvent('Currency', 'Swap', `From ${temp} to ${toCur}`);
  };

  useEffect(() => {
    const convert = async () => {
      if (fromCur === toCur) return;

      setIsLoading(true);
      try {
        const resp = await fetch(
          `https://api.frankfurter.app/latest?amount=${debouncedAmount}&from=${fromCur}&to=${toCur}`
        );
        if (!resp.ok) throw new Error("Failed to fetch conversion data");
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

  // Generate the conversion text for sharing
  const conversionText = `I just converted ${amount} ${fromCur} to ${converted} ${toCur} using this awesome currency converter!`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: currencyBackgroundImages[fromCur] || currencyBackgroundImages.DEFAULT,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Share and Donation Buttons (positioned at the bottom center) */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
        <ShareButton conversionText={conversionText} />
        <DonationButton />
      </div>

      {/* Dark mode toggle button with animation */}
      <motion.button
        aria-label="Toggle dark mode"
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

      {/* Sleek Card Design */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-lg mx-auto backdrop-blur-sm bg-opacity-95 dark:from-gray-800 dark:to-gray-900 dark:text-white"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-2xl sm:text-4xl font-bold text-center mb-4 sm:mb-6 dark:text-white"
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

        {/* Save as PDF Button */}
        {converted && (
          <Suspense fallback={<div>Loading PDF...</div>}>
            <PDFDownloadLink
              document={<PDFDocument amount={amount} fromCur={fromCur} toCur={toCur} converted={converted} />}
              fileName="conversion_result.pdf"
            >
              {({ loading }) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 mt-6"
                >
                  {loading ? "Generating PDF..." : "Save as PDF"}
                </motion.button>
              )}
            </PDFDownloadLink>
          </Suspense>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          className="text-center text-sm sm:text-base text-gray-500 mt-4 sm:mt-6 dark:text-gray-400"
        >
          Exchange rates may vary and are provided by external services.
        </motion.p>

        <Footer />
      </motion.div>
    </motion.div>
  );
}

export default App;