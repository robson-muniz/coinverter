import React from "react";
import { motion } from "framer-motion";

export function DonationButton({ isDarkMode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-sm"
    >
      <a
        href="https://www.paypal.com/donate/?hosted_button_id=UA43BU97NCT7A" // Replace with your actual PayPal button ID
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
          <path d="M7.5 11.5v-7h1v7h-1zm3.5-4v-3h1v3h-1zm3.5 2v-5h1v5h-1zm3.5 4v-9h1v9h-1z"/>
        </svg>
        <span>Donate</span>
      </a>
    </motion.div>
  );
}