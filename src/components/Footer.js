import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="mt-8 text-center text-sm sm:text-base text-gray-700 dark:text-gray-300"
    >
      Made with <span className="text-red-500">♥</span> by Robson Muniz from{" "}
      <span className="text-blue-600 font-semibold dark:text-blue-400">Portugal</span>.
    </motion.footer>
  );
}