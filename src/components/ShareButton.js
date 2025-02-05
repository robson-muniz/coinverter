import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import { trackEvent } from '../utils/analytics'; // Import analytics function


export function ShareButton({ conversionText }) {
  const shareUrl = window.location.href;
  const title = "Check out this currency converter!";

  const handleShare = (platform) => {
    trackEvent('Share', 'Click', platform);
  };

  return (
    <div className="fixed bottom-4 left-4 flex flex-col gap-2 z-50">
      <FacebookShareButton
        url={shareUrl}
        quote={conversionText || title}
        onClick={() => handleShare('Facebook')}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={shareUrl}
        title={conversionText || title}
        onClick={() => handleShare('Twitter')}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton
        url={shareUrl}
        title={conversionText || title}
        onClick={() => handleShare('WhatsApp')}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
}