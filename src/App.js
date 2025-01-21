import { useEffect, useState } from "react";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputAmount, setInputAmount] = useState(1); // Separate state for user input

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isNaN(inputAmount)) setAmount(inputAmount);
    }, 500); // Wait 500ms before updating the amount

    return () => clearTimeout(timeout); // Cleanup the timeout on each render
  }, [inputAmount]);

  useEffect(() => {
    async function convert() {
      setIsLoading(true);

      const resp = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
      );
      const data = await resp.json();
      setConverted(data.rates[toCur]);
      setIsLoading(false);
    }

    if (fromCur === toCur) return setConverted(amount);
    convert();
  }, [amount, fromCur, toCur]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Currency Converter
        </h1>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => setInputAmount(Number(e.target.value))}
            disabled={isLoading}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            placeholder="Enter amount"
          />
          <div className="flex gap-4">
            <select
              value={fromCur}
              onChange={(e) => setFromCur(e.target.value)}
              disabled={isLoading}
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
            <select
              value={toCur}
              onChange={(e) => setToCur(e.target.value)}
              disabled={isLoading}
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
          </div>
          <p className="text-center text-xl font-semibold text-gray-700 mt-4">
            {isLoading ? "Converting..." : `${converted} ${toCur}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;