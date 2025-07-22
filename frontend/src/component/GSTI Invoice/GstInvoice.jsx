import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePdf";

export default function GstInvoice() {
  const [invoiceData, setInvoiceData] = useState({
    companyName: "",
    companyAddress: "",
    companyGSTIN: "",
    clientName: "",
    clientAddress: "",
    clientGSTIN: "",
    invoiceNumber: "",
    invoiceDate: "",
    description: "",
    hsnSac: "9983",
    taxableValue: "",
    cgst: "",
    sgst: "",
    igst: "",
    placeOfSupply: "",
    authorizedSignatory: "",
  });

  const handleChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const fields = [
    { label: "Company Name", name: "companyName" },
    { label: "Company Address", name: "companyAddress" },
    { label: "Company GSTIN", name: "companyGSTIN" },
    { label: "Client Name", name: "clientName" },
    { label: "Client Address", name: "clientAddress" },
    { label: "Client GSTIN", name: "clientGSTIN" },
    { label: "Invoice Number", name: "invoiceNumber" },
    { label: "Invoice Date", name: "invoiceDate", type: "date" },
    { label: "Description", name: "description" },
    { label: "HSN/SAC Code", name: "hsnSac" },
    { label: "Taxable Value (₹)", name: "taxableValue" },
    { label: "CGST (₹)", name: "cgst" },
    { label: "SGST (₹)", name: "sgst" },
    { label: "IGST (₹)", name: "igst" },
    { label: "Place of Supply", name: "placeOfSupply" },
    { label: "Authorized Signatory", name: "authorizedSignatory" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">GST Tax Invoice Generator</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">{label}</label>
              <input
                type={type || "text"}
                name={name}
                value={invoiceData[name]}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Enter ${label}`}
              />
            </div>
          ))}
        </form>

        <div className="mt-8 flex justify-center">
          <PDFDownloadLink
            document={<InvoicePDF data={invoiceData} />}
            fileName={`${invoiceData.invoiceNumber || "invoice"}.pdf`}
          >
            {({ loading }) => (
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow-md transition duration-300">
                {loading ? "Generating PDF..." : "Download PDF Invoice"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}
