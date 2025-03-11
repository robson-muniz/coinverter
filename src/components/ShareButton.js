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

export function ShareButton({ conversionText }) {
  const shareUrl = window.location.href;
  const title = "Check out this currency converter!";

  return (
    <div className="flex gap-2">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <FacebookShareButton url={shareUrl} quote={conversionText || title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <TwitterShareButton url={shareUrl} title={conversionText || title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <WhatsappShareButton url={shareUrl} title={conversionText || title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </motion.div>
    </div>
  );
}