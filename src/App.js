import { useEffect, useState } from "react";

// Debounce helper function
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
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debouncedAmount = useDebounce(amount, 500);

  const swapCurrencies = () => {
    const temp = fromCur;
    setFromCur(toCur);
    setToCur(temp);
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

  // Background images for each currency
  const currencyBackgroundImages = {
    USD: "url('/images/us-flag.jpg')", // US Flag
    EUR: "url('/images/europe-flag.jpg')", // Europe Flag
    BRL: "url('/images/brazil-flag.jpg')", // Brazil Flag
    CAD: "url('/images/canada-flag.jpg')", // Canada Flag
    INR: "url('/images/india-flag.jpg')", // India Flag
    DEFAULT: "url('/images/default-flag.jpg')" // Default flag image
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative"
      style={{
        backgroundImage:
          currencyBackgroundImages[fromCur] || currencyBackgroundImages.DEFAULT,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Card Container */}
      <div className="relative bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Currency Converter
        </h1>

        {/* Input Section */}
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

        {/* Currency Selection and Swap */}
        <div className="flex gap-4 items-center mb-6">
          <div className="flex-1">
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

          {/* Redesigned Swap Button */}
          <button
            onClick={swapCurrencies}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed"
            title="Swap currencies"
          >
            🔄 Swap
          </button>

          <div className="flex-1">
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

        {/* Converted Amount */}
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-center">
          <p className="text-gray-600 text-sm">Converted Amount</p>
          <p className="text-xl font-semibold text-gray-800">
            {isLoading
              ? "Converting..."
              : fromCur === toCur
                ? "Please select different currencies"
                : `${converted || 0} ${toCur}`}
          </p>
        </div>

        {/* Disclaimer and Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Exchange rates may vary and are provided by external services.
        </p>
        <footer className="mt-6 text-center text-sm text-gray-700">
          Made with <span className="text-red-500">♥</span> by Robson Muniz from{" "}
          <span className="text-blue-600 font-semibold">Portugal</span>.
        </footer>
      </div>
    </div>
  );
}

export default App;