import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { motion } from "framer-motion";

export function ShareButton({ conversionText, isDarkMode }) {
  const shareUrl = window.location.href;
  const title = "Check out this currency converter!";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white/95 dark:bg-gray-800/95 rounded-full p-2 shadow-sm backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
    >
      <div className="flex gap-1">
        <FacebookShareButton
          url={shareUrl}
          quote={conversionText || title}
          className="focus:outline-none"
        >
          <FacebookIcon
            size={32}
            round
            bgStyle={{ fill: isDarkMode ? '#1f2937' : '#f3f4f6' }}
          />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={conversionText || title}
          className="focus:outline-none"
        >
          <TwitterIcon
            size={32}
            round
            bgStyle={{ fill: isDarkMode ? '#1f2937' : '#f3f4f6' }}
          />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={conversionText || title}
          className="focus:outline-none"
        >
          <WhatsappIcon
            size={32}
            round
            bgStyle={{ fill: isDarkMode ? '#1f2937' : '#f3f4f6' }}
          />
        </WhatsappShareButton>
      </div>
    </motion.div>
  );
}