import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFDocument } from './PDFDocument';
import { motion } from 'framer-motion';

export function SavePDFButton({ amount, fromCur, toCur, converted }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <PDFDownloadLink
        document={<PDFDocument amount={amount} fromCur={fromCur} toCur={toCur} converted={converted} />}
        fileName="conversion_result.pdf"
      >
        {({ loading }) => (
          <button
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-green-300 disabled:cursor-not-allowed dark:bg-green-700 dark:hover:bg-green-800 text-lg flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? 'Generating PDF...' : 'Save as PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </motion.div>
  );
}