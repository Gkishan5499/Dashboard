// components/StyledQuotationPDF.jsx
import React from "react";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "NotoSans",
  src: "/fonts/NotoSans-Regular.ttf",
});

// PDF styles for modern layout
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11, fontFamily: "NotoSans" },

  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },

  logo: { fontSize: 20, fontWeight: "bold" },

  section: { marginBottom: 10 },

  block: { padding: 10, backgroundColor: "#f9f9f9", marginBottom: 10 },

  title: { fontSize: 14, fontWeight: "bold", color: "#f97316" }, // orange

  table: { display: "table", width: "auto", marginTop: 10, borderWidth: 1, borderColor: "#ddd" },

  tableRow: { flexDirection: "row" },

  tableHeader: {
    backgroundColor: "#f97316",
    color: "#fff",
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#fff",
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },

  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    flex: 1,
    textAlign: "center",
  },

  footer: {
    position: "absolute",
    bottom: 20, // distance from bottom
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 10,
    color: "#333",
  },
  footerTitle: {
    fontSize:20,
    fontWeight: "bold",
    color: "#00539B", // same blue as your image
    marginBottom: 4,
  },
  footerText: {
    fontSize: 9,
    color: "#000",
  },


  summaryRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10 },

  summaryCol: { width: "40%", textAlign: "right", marginBottom: 2 },
  summaryCell: { padding: 5, borderBottomWidth: 1, borderBottomColor: "#ddd" },

  terms: { marginTop: 20 },

  signature: { marginTop: 40, textAlign: "right" },

  bold: { fontWeight: "bold" },
});

export default function StyledQuotationPDF({ data }) {
  // Example calculation:
  const items = data.items || [
    { description: "Basic Web Development", qty: 1, rate: 10000 },
    { description: "Logo Design", qty: 1, rate: 1000 },
    { description: "Web Design", qty: 1, rate: 50000 },
    { description: "Full Stack Web Development", qty: 1, rate: 40000 },
  ];

  const subTotal = items.reduce((sum, i) => sum + i.qty * i.rate, 0);
  const discount = (subTotal * (data.discountPercent || 0)) / 100;
  const grandTotal = subTotal - discount;

  const rupees = "₹";

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>{data.companyName || "Your Company"}</Text>
          <View>
            <Text>Quotation# {data.quotationNumber || "001"}</Text>
            <Text>Date: {data.quotationDate || "2025-06-30"}</Text>
          </View>
        </View>

        {/* Blocks */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={[styles.block, { width: "48%" }]}>
            <Text style={styles.title}>Quotation By</Text>
            <Text>{data.companyName}</Text>
            <Text>{data.companyAddress}</Text>
            <Text>Email: {data.companyEmail}</Text>
            <Text>GSTIN: {data.companyGSTIN}</Text>
            <Text>PAN: {data.companyPAN}</Text>
          </View>
          <View style={[styles.block, { width: "48%" }]}>
            <Text style={styles.title}>Quotation To</Text>
            <Text>{data.clientName}</Text>
            <Text>{data.clientAddress}</Text>
            <Text>Email: {data.clientEmail}</Text>

            <Text>GSTIN: {data.clientGSTIN}</Text>
            <Text>PAN: {data.clientPAN}</Text>
          </View>
        </View>

        <Text style={{ marginTop: 5 }}>
          Place of Supply: {data.placeOfSupply || "Your State"} | Country: {data.country || "India"}
        </Text>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Item Description</Text>
            <Text style={styles.tableHeader}>Qty</Text>
            <Text style={styles.tableHeader}>Rate ({rupees })</Text>
            <Text style={styles.tableHeader}>Amount ({rupees })</Text>
          </View>

          {items.map((item, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={styles.tableCell}>{item.qty}</Text>
              <Text style={styles.tableCell}>{rupees}{item.rate.toLocaleString()}</Text>
              <Text style={styles.tableCell}>
                ₹ {(item.qty * item.rate).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCol}>
         <Text style={styles.summaryCell}>Sub Total: {rupees} {subTotal.toLocaleString()}</Text>
         <Text style={styles.summaryCell}>Discount ({data.discountPercent || 0}%): -{rupees} {discount.toLocaleString()}</Text>
         <Text style={[styles.summaryCell, styles.bold]}>Total: {rupees} {grandTotal.toLocaleString()}</Text>
         </View>
        </View>

        {/* Terms */}
        <View style={styles.terms}>
          <Text style={styles.title}>Terms and Conditions</Text>
          <Text>1. Please pay within {data.paymentTerms || "15 days"} from invoice date.</Text>
          <Text>2. Overdue interest will be charged as per policy.</Text>
          <Text>3. Please quote invoice number when paying.</Text>
        </View>

        {/* Additional Notes */}
        <View style={styles.terms}>
          <Text style={styles.title}>Additional Notes</Text>
          <Text>{data.notes || "Thank you for your business."}</Text>
        </View>

        {/* Signature */}
        <View style={styles.signature}>
          <Text>Authorized Signature</Text>
        </View>

        {/* Footer */}
         <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            Wiktrip - Unit of Tern Tourism (OPC) Private Limited
          </Text>
          <Text style={styles.footerText}>
            CIN: U63030UP2121OBC1570391
          </Text>
          <Text style={styles.footerText}>
            Email: contact@wiktrip.in | Contact: +91 9711720218 | Website: www.wiktrip.in
          </Text>
        </View>
      </Page>
    </Document>
  );
}
