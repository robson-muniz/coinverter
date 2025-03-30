import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <motion.div
      className="flex justify-center items-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
      />
    </motion.div>
  );
}