import React from "react";
import { motion } from "framer-motion"

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export function ShareButton({ conversionText }) {
  const shareUrl = window.location.href; // URL of the app
  const title = "Check out this currency converter!"; // Default share title

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 left-4 flex flex-col gap-2 z-50"
    >
      <FacebookShareButton url={shareUrl} quote={conversionText || title}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <FacebookIcon size={32} round />
        </motion.div>
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={conversionText || title}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <TwitterIcon size={32} round />
        </motion.div>
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} title={conversionText || title}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <WhatsappIcon size={32} round />
        </motion.div>
      </WhatsappShareButton>
    </motion.div>
  );
}