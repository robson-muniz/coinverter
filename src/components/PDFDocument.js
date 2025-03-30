import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#111827"
  },
  section: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottom: "1px solid #e5e7eb"
  },
  label: {
    fontSize: 14,
    fontWeight: "semibold",
    marginBottom: 5,
    color: "#4b5563"
  },
  value: {
    fontSize: 16,
    fontWeight: "medium",
    color: "#111827"
  },
});

export const PDFDocument = ({ amount, fromCur, toCur, converted }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Currency Conversion Result</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>{amount} {fromCur}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Converted Amount:</Text>
        <Text style={styles.value}>{converted} {toCur}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>From Currency:</Text>
        <Text style={styles.value}>{fromCur}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>To Currency:</Text>
        <Text style={styles.value}>{toCur}</Text>
      </View>
    </Page>
  </Document>
);