import React, { useState, useEffect } from "react";
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
import { PDFDocument } from './components/PDFDocument';
import { ErrorBoundary } from './components/ErrorBoundary';
import swapSound from './sounds/swap.wav';
import successSound from './sounds/success.wav';

function App() {
  const [amount, setAmount] = useState("");
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("BRL");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const currencyFlags = {
    USD: "US", EUR: "EU", GBP: "GB", JPY: "JP",
    AUD: "AU", CAD: "CA", CHF: "CH", CNY: "CN",
    INR: "IN", BRL: "BR", MXN: "MX", RUB: "RU",
    ZAR: "ZA", KRW: "KR", SGD: "SG", NZD: "NZ"
  };

  const currencyBackgroundImages = {
    USD: "url('/images/us-flag.jpg')",
    EUR: "url('/images/europe-flag.jpg')",
    GBP: "url('/images/uk-flag.png')",
    JPY: "url('/images/japan-flag.png')",
    AUD: "url('/images/australia-flag.png')",
    CAD: "url('/images/canada-flag.png')",
    CHF: "url('/images/switzerland-flag.png')",
    CNY: "url('/images/china-flag.png')",
    INR: "url('/images/india-flag.jpg')",
    BRL: "url('/images/brazil-flag.jpg')",
    MXN: "url('/images/mexico-flag.png')",
    RUB: "url('/images/russia-flag.png')",
    ZAR: "url('/images/south-africa.png')",
    KRW: "url('/images/south-korea.png')",
    SGD: "url('/images/singapore-flag.png')",
    NZD: "url('/images/new-zealand-flag.png')",
    DEFAULT: "url('/images/default-flag.jpg')"
  };

  useEffect(() => {
    initGA();
    trackPageView(window.location.pathname + window.location.search);

    // Preload sounds
    const swapAudio = new Audio(swapSound);
    const successAudio = new Audio(successSound);
    swapAudio.load();
    successAudio.load();
  }, []);

  const [playSwap] = useSound(swapSound, { volume: 0.5 });
  const [playSuccess] = useSound(successSound, { volume: 0.3 });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const { debouncedValue: debouncedAmount, isTyping } = useDebounce(amount, 1000);

  const swapCurrencies = () => {
    playSwap();
    const temp = fromCur;
    setFromCur(toCur);
    setToCur(temp);
    trackEvent('Currency', 'Swap', `From ${temp} to ${toCur}`);
  };

  useEffect(() => {
    const convert = async () => {
      if (fromCur === toCur) return setConverted(amount);

      setIsLoading(true);
      try {
        const resp = await fetch(
          `https://api.frankfurter.app/latest?amount=${debouncedAmount}&from=${fromCur}&to=${toCur}`
        );
        if (!resp.ok) throw new Error("Failed to fetch conversion data");
        const data = await resp.json();
        setConverted(data.rates[toCur]);
        playSuccess();
      } catch (error) {
        console.error("Error fetching conversion data:", error);
        toast.error('Failed to convert. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedAmount && !isNaN(debouncedAmount)) {
      convert();
    } else {
      setConverted("");
    }
  }, [debouncedAmount, fromCur, toCur, playSuccess]);

  useEffect(() => {
    Object.values(currencyBackgroundImages).forEach(img => {
      const image = new Image();
      image.src = img.replace("url('", "").replace("')", "");
    });
  }, []);

  const conversionText = `I just converted ${amount} ${fromCur} to ${converted} ${toCur} using this awesome currency converter!`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300 font-sans"
         style={{
           backgroundImage: currencyBackgroundImages[fromCur] || currencyBackgroundImages.DEFAULT,
           backgroundSize: "cover",
           backgroundPosition: "center",
           backgroundAttachment: "fixed",
           transition: "background-image 0.5s ease-in-out"
         }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 dark:bg-opacity-50"></div>

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-6 right-6 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-sm z-50 hover:shadow-md transition-all duration-300"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      <ErrorBoundary>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-full max-w-md mx-auto z-10"
        >
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
            <div className="p-6 pb-0">
              <motion.h1
                className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center tracking-tight"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Currency Converter
              </motion.h1>
              <motion.p
                className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1 font-medium tracking-wide"
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Real-time exchange rates
              </motion.p>
            </div>

            <div className="p-6 pt-4">
              <CurrencyInput value={amount} onChange={setAmount} isLoading={isLoading} />

              <div className="flex items-center justify-between my-4">
                <CustomDropdown
                  value={fromCur}
                  onChange={setFromCur}
                  options={currencyFlags}
                  isLoading={isLoading}
                  label="From"
                  isDarkMode={isDarkMode}
                />

                <div className="mx-2">
                  <SwapButton onClick={swapCurrencies} isLoading={isLoading} />
                </div>

                <CustomDropdown
                  value={toCur}
                  onChange={setToCur}
                  options={currencyFlags}
                  isLoading={isLoading}
                  label="To"
                  isDarkMode={isDarkMode}
                />
              </div>

              <ConvertedAmount
                converted={converted}
                isTyping={isTyping}
                isLoading={isLoading}
                fromCur={fromCur}
                toCur={toCur}
                isDarkMode={isDarkMode}
              />

              {converted && (
                <PDFDownloadLink
                  document={<PDFDocument amount={amount} fromCur={fromCur} toCur={toCur} converted={converted} />}
                  fileName="conversion_result.pdf"
                >
                  {({ loading }) => (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-6 flex items-center justify-center gap-2 font-medium tracking-wide"
                      disabled={loading}
                    >
                      {loading ? "Generating PDF..." : "Save as PDF"}
                    </motion.button>
                  )}
                </PDFDownloadLink>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/70 border-t border-gray-100 dark:border-gray-800 rounded-b-2xl">
              <Footer />
            </div>
          </div>
        </motion.div>
      </ErrorBoundary>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-50">
        <ShareButton conversionText={conversionText} isDarkMode={isDarkMode} />
        <DonationButton isDarkMode={isDarkMode} />
      </div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-40"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
                type: "spring",
                damping: 10
              }}
              className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;