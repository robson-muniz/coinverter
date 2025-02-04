import React from "react";

export function DonationButton() {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      <a
        href="https://www.paypal.com/paypalme/robsonmuniz" // Replace with your PayPal link
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <img
          src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
          alt="PayPal"
          className="w-6 h-6"
        />
        Donate via PayPal
      </a>
      <a
        href="https://www.buymeacoffee.com/robsonmuniz" // Replace with your Buy Me a Coffee link
        target="_blank"
        rel="noopener noreferrer"
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
          alt="Buy Me a Coffee"
          className="w-6 h-6"
        />
        Buy Me a Coffee
      </a>
    </div>
  );
}