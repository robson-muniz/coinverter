import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

export function CurrencyChart({ fromCur, toCur }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch historical data
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
        const pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split("T")[0]; // Get date 1 year ago
        const response = await fetch(
          `https://api.frankfurter.app/${pastDate}..${currentDate}?from=${fromCur}&to=${toCur}`
        );
        const result = await response.json();

        // Format data for Recharts
        const formattedData = Object.entries(result.rates).map(([date, rates]) => ({
          date,
          rate: rates[toCur],
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching historical data:", error);
        toast.error("Failed to load historical data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }, [fromCur, toCur]);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading chart...</div>;
  }

  return (
    <div className="mt-8 w-full h-64 sm:h-96">
      <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">
        Historical Exchange Rates ({fromCur} to {toCur})
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}