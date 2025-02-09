import React from "react";
import { motion } from "framer-motion";

export function DonationButton() {
  return (
    <div className="flex flex-col gap-2">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <a
          href="https://www.buymeacoffee.com/robsonmuniz"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <img
            src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
            alt="PayPal"
            className="w-6 h-6"
          />
          <span className="hidden sm:inline">Donate via PayPal</span>
          <span className="sm:hidden">PayPal</span>
        </a>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <a
          href="https://www.paypal.com/paypalme/robsonmuniz"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            alt="Buy Me a Coffee"
            className="w-6 h-6"
          />
          <span className="hidden sm:inline">Buy Me a Coffee</span>
          <span className="sm:hidden">Coffee</span>
        </a>
      </motion.div>
    </div>
  );
}