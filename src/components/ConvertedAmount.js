import { motion } from "framer-motion";
import Flag from "react-flagkit";
import { Skeleton } from './Skeleton';

export function ConvertedAmount({ converted, isTyping, isLoading, fromCur, toCur, isDarkMode }) {
  const currencyFlags = {
    USD: "US", EUR: "EU", GBP: "GB", JPY: "JP",
    AUD: "AU", CAD: "CA", CHF: "CH", CNY: "CN",
    INR: "IN", BRL: "BR", MXN: "MX", RUB: "RU",
    ZAR: "ZA", KRW: "KR", SGD: "SG", NZD: "NZ"
  };

  return (
    <motion.div
      className="p-5 bg-gradient-to-br from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-800/90 backdrop-blur-sm rounded-xl mb-6 border border-white/40 dark:border-gray-700/40 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: isLoading ? 0.7 : 1,
        y: 0
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      <motion.p
        className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 tracking-wider uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Converted Amount
      </motion.p>

      {isLoading || isTyping ? (
        <Skeleton className="h-12 rounded-lg" />
      ) : (
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {toCur === "EUR" ? (
                <motion.img
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  src="eu-flag.png"
                  alt="EU Flag"
                  className="w-9 h-9 rounded-full border-2 border-white/50 dark:border-gray-600/50 object-cover shadow-sm"
                />
              ) : (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Flag
                    country={currencyFlags[toCur]}
                    size={36}
                    className="rounded-full border-2 border-white/50 dark:border-gray-600/50 shadow-sm"
                  />
                </motion.div>
              )}
            </div>
            <motion.span
              className="ml-3 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
              initial={{ x: -5 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {converted ? `${converted} ${toCur}` : "0.00"}
            </motion.span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}