import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
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