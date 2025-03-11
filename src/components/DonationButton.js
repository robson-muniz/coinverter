import React from "react";
import { motion } from "framer-motion";

export function DonationButton() {
  return (
    <div className="flex flex-col gap-2">
      {/* Donate via Wise */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <a
          href="https://wise.com/pay/me/joaorobsonm" // Replace with your Wise donation link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <img
            src="/images/wise-logo.png" // Local Wise logo
            alt="Wise"
            className="w-6 h-6"
          />
          <span className="hidden sm:inline">Donate via Wise</span>
          <span className="sm:hidden">Wise</span>
        </a>
      </motion.div>

      {/* Donate via PayPal */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <a
          href="https://www.paypal.com/paypalme/robsonmuniz" // Replace with your PayPal donation link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <img
            src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" // PayPal logo
            alt="PayPal"
            className="w-6 h-6"
          />
          <span className="hidden sm:inline">Donate via PayPal</span>
          <span className="sm:hidden">PayPal</span>
        </a>
      </motion.div>
    </div>
  );
}