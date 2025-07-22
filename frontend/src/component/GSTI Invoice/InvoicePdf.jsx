// components/InvoicePDF.jsx
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// PDF Styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  heading: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
  section: { marginBottom: 10 },
});

export default function InvoicePDF({ data }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.heading}>TAX INVOICE</Text>

        <View style={styles.section}>
          <Text>Company Name: {data.companyName}</Text>
          <Text>Address: {data.companyAddress}</Text>
          <Text>GSTIN: {data.companyGSTIN}</Text>
        </View>

        <View style={styles.section}>
          <Text>Client Name: {data.clientName}</Text>
          <Text>Address: {data.clientAddress}</Text>
          <Text>Client GSTIN: {data.clientGSTIN}</Text>
        </View>

        <View style={styles.section}>
          <Text>Invoice No: {data.invoiceNumber}</Text>
          <Text>Invoice Date: {data.invoiceDate}</Text>
          <Text>Place of Supply: {data.placeOfSupply}</Text>
        </View>

        <View style={styles.section}>
          <Text>Description: {data.description}</Text>
          <Text>HSN/SAC: {data.hsnSac}</Text>
          <Text>Taxable Value: ₹ {data.taxableValue}</Text>
          <Text>CGST: ₹ {data.cgst}</Text>
          <Text>SGST: ₹ {data.sgst}</Text>
          <Text>IGST: ₹ {data.igst}</Text>
        </View>

        <View style={styles.section}>
          <Text>Authorized Signatory: {data.authorizedSignatory}</Text>
        </View>
      </Page>
    </Document>
  );
}
