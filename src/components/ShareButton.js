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
      className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-sm"
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
            bgStyle={{ fill: isDarkMode ? '#374151' : '#f3f4f6' }}
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
            bgStyle={{ fill: isDarkMode ? '#374151' : '#f3f4f6' }}
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
            bgStyle={{ fill: isDarkMode ? '#374151' : '#f3f4f6' }}
          />
        </WhatsappShareButton>
      </div>
    </motion.div>
  );
}