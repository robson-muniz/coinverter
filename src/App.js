import { useEffect, useState } from "react";

// Custom hook for debouncing values (reduces API calls while typing)
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function App() {
  // State management for the converter
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the amount to prevent excessive API calls
  const debouncedAmount = useDebounce(amount, 500);

  // Function to swap the selected currencies
  const swapCurrencies = () => {
    const temp = fromCur;
    setFromCur(toCur);
    setToCur(temp);
  };

  // Effect hook for currency conversion
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
      } catch (error) {
        console.error("Error fetching conversion data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedAmount) {
      convert();
    }
  }, [debouncedAmount, fromCur, toCur]);

  // Background images for different currencies
  const currencyBackgroundImages = {
    USD: "url('/images/us-flag.jpg')",
    EUR: "url('/images/europe-flag.jpg')",
    BRL: "url('/images/brazil-flag.jpg')",
    CAD: "url('/images/canada-flag.jpg')",
    INR: "url('/images/india-flag.jpg')",
    DEFAULT: "url('/images/default-flag.jpg')"
  };

  return (
    // Main container with background
    // Responsive: Full height screen with centered content and padding
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative"
      style={{
        backgroundImage:
          currencyBackgroundImages[fromCur] || currencyBackgroundImages.DEFAULT,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Card container */}
      {/* Responsive: Padding increases with screen size, full width on mobile with max-width */}
      <div className="relative bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-lg mx-auto">
        {/* Title */}
        {/* Responsive: Font size and margin increase on larger screens */}
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
          Currency Converter
        </h1>

        {/* Amount input section */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        {/* Currency selection and swap section */}
        {/* Responsive: Vertical on mobile, horizontal on larger screens */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          {/* From currency select */}
          {/* Responsive: Full width on mobile, flex on larger screens */}
          <div className="w-full sm:flex-1">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              From
            </label>
            <select
              value={fromCur}
              onChange={(e) => setFromCur(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="USD">🇺🇸 USD</option>
              <option value="EUR">🇪🇺 EUR</option>
              <option value="BRL">🇧🇷 BRL</option>
              <option value="CAD">🇨🇦 CAD</option>
              <option value="INR">🇮🇳 INR</option>
            </select>
          </div>

          {/* Swap button */}
          {/* Responsive: Full width on mobile, auto width on larger screens */}
          <button
            onClick={swapCurrencies}
            disabled={isLoading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed"
            title="Swap currencies"
          >
            🔄 Swap
          </button>

          {/* To currency select */}
          {/* Responsive: Full width on mobile, flex on larger screens */}
          <div className="w-full sm:flex-1">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              To
            </label>
            <select
              value={toCur}
              onChange={(e) => setToCur(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="USD">🇺🇸 USD</option>
              <option value="EUR">🇪🇺 EUR</option>
              <option value="BRL">🇧🇷 BRL</option>
              <option value="CAD">🇨🇦 CAD</option>
              <option value="INR">🇮🇳 INR</option>
            </select>
          </div>
        </div>

        {/* Converted amount display */}
        {/* Responsive: Smaller padding on mobile, larger on desktop */}
        <div className="p-3 sm:p-4 bg-gray-100 rounded-lg shadow-inner text-center">
          <p className="text-gray-600 text-sm">Converted Amount</p>
          {/* Responsive: Font size increases on larger screens */}
          <p className="text-lg sm:text-xl font-semibold text-gray-800">
            {isLoading
              ? "Converting..."
              : fromCur === toCur
                ? "Please select different currencies"
                : `${converted || 0} ${toCur}`}
          </p>
        </div>

        {/* Disclaimer */}
        {/* Responsive: Smaller text and margins on mobile */}
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
          Exchange rates may vary and are provided by external services.
        </p>

        {/* Footer */}
        {/* Responsive: Smaller text and margins on mobile */}
        <footer className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-700">
          Made with <span className="text-red-500">♥</span> by Robson Muniz from{" "}
          <span className="text-blue-600 font-semibold">Portugal</span>.
        </footer>
      </div>
    </div>
  );
}

export default App;