import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-700"
    >
      Made with <span className="text-red-500">♥</span> by Robson Muniz from{" "}
      <span className="text-blue-600 font-semibold">Portugal</span>.
    </motion.footer>
  );
}