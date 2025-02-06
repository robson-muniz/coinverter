import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export function ShareButton({ conversionText }) {
  const shareUrl = window.location.href;
  const title = "Check out this currency converter!";

  return (
    <div className="flex gap-2">
      <FacebookShareButton url={shareUrl} quote={conversionText || title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={conversionText || title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} title={conversionText || title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
}