import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="text-center text-xs text-gray-500 dark:text-gray-400"
    >
      Made with <span className="text-red-500">♥</span> by Robson Muniz
    </motion.footer>
  );
}