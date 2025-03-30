import { motion } from "framer-motion";

export function Skeleton({ className = "", count = 1 }) {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {items.map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className={`bg-gray-200 dark:bg-gray-700 rounded-xl ${className}`}
        />
      ))}
    </>
  );
}