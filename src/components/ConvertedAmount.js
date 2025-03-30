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
      className="p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl mb-6 border border-white/20"
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
        className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Converted Amount
      </motion.p>

      {isLoading || isTyping ? (
        <Skeleton className="h-12" />
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
                  className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 object-cover"
                />
              ) : (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Flag
                    country={currencyFlags[toCur]}
                    size={32}
                    className="rounded-full border border-gray-200 dark:border-gray-700"
                  />
                </motion.div>
              )}
            </div>
            <motion.span
              className="ml-3 text-2xl font-semibold text-gray-900 dark:text-white"
              initial={{ x: -5 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {`${converted || 0} ${toCur}`}
            </motion.span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}