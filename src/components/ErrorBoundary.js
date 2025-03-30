import React from "react";
import { motion } from "framer-motion";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl border border-red-200 dark:border-red-800">
            <motion.div
              animate={{
                x: [-5, 5, -5],
                transition: { repeat: Infinity, duration: 1 }
              }}
              className="text-red-500 text-4xl mb-4 text-center"
            >
              ⚠️
            </motion.div>
            <h3 className="font-bold text-lg text-center mb-2 text-gray-900 dark:text-white">
              Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              We've encountered an error. Please refresh the page.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.reload()}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Refresh Page
            </motion.button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}