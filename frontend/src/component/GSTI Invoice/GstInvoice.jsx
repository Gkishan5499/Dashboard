import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePdf";
import {
  FileText,
  Building,
  User,
  Calendar,
  Calculator,
  Download,
  DollarSign,
  CreditCard,
  MapPin,
  Hash,
  Receipt,
  Percent
} from 'lucide-react';

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

  const calculateTotals = () => {
    const taxableValue = Number(invoiceData.taxableValue) || 0;
    const cgst = Number(invoiceData.cgst) || 0;
    const sgst = Number(invoiceData.sgst) || 0;
    const igst = Number(invoiceData.igst) || 0;
    const total = taxableValue + cgst + sgst + igst;
    
    return { taxableValue, cgst, sgst, igst, total };
  };

  const { taxableValue, cgst, sgst, igst, total } = calculateTotals();

  const fields = [
    { label: "Company Name", name: "companyName", icon: Building, color: "blue" },
    { label: "Company Address", name: "companyAddress", icon: MapPin, color: "green" },
    { label: "Company GSTIN", name: "companyGSTIN", icon: Hash, color: "orange" },
    { label: "Client Name", name: "clientName", icon: User, color: "purple" },
    { label: "Client Address", name: "clientAddress", icon: MapPin, color: "blue" },
    { label: "Client GSTIN", name: "clientGSTIN", icon: Hash, color: "orange" },
    { label: "Invoice Number", name: "invoiceNumber", icon: FileText, color: "purple" },
    { label: "Invoice Date", name: "invoiceDate", type: "date", icon: Calendar, color: "green" },
    { label: "Description", name: "description", icon: Receipt, color: "blue" },
    { label: "HSN/SAC Code", name: "hsnSac", icon: Hash, color: "orange" },
    { label: "Taxable Value (₹)", name: "taxableValue", icon: DollarSign, color: "green" },
    { label: "CGST (₹)", name: "cgst", icon: Percent, color: "blue" },
    { label: "SGST (₹)", name: "sgst", icon: Percent, color: "purple" },
    { label: "IGST (₹)", name: "igst", icon: Percent, color: "orange" },
    { label: "Place of Supply", name: "placeOfSupply", icon: MapPin, color: "green" },
    { label: "Authorized Signatory", name: "authorizedSignatory", icon: User, color: "blue" },
  ];

  const getIconColor = (color) => {
    const colors = {
      blue: "text-blue-500",
      green: "text-green-500",
      orange: "text-orange-500",
      purple: "text-purple-500",
      red: "text-red-500"
    };
    return colors[color] || "text-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">GST Tax Invoice Generator</h1>
            <p className="text-gray-600">Create professional GST-compliant invoices for your business</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Invoice Information</h2>
                <p className="text-green-100">Fill in the details below to create your GST invoice</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Company and Client Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Company Info */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Company Information
                </h3>
                <div className="space-y-4">
                  {fields.slice(0, 3).map((field) => {
                    const IconComponent = field.icon;
                    return (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <IconComponent className={`w-4 h-4 ${getIconColor(field.color)}`} />
                            {field.label}
                          </div>
                        </label>
                        <input
                          type={field.type || "text"}
                          name={field.name}
                          value={invoiceData[field.name]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Client Info */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Client Information
                </h3>
                <div className="space-y-4">
                  {fields.slice(3, 6).map((field) => {
                    const IconComponent = field.icon;
                    return (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <IconComponent className={`w-4 h-4 ${getIconColor(field.color)}`} />
                            {field.label}
                          </div>
                        </label>
                        <input
                          type={field.type || "text"}
                          name={field.name}
                          value={invoiceData[field.name]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 mb-8">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Invoice Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fields.slice(6, 9).map((field) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <IconComponent className={`w-4 h-4 ${getIconColor(field.color)}`} />
                          {field.label}
                        </div>
                      </label>
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={invoiceData[field.name]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tax Information */}
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200 mb-8">
              <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Tax Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {fields.slice(9, 13).map((field) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <IconComponent className={`w-4 h-4 ${getIconColor(field.color)}`} />
                          {field.label}
                        </div>
                      </label>
                      <input
                        type={field.type || "number"}
                        name={field.name}
                        value={invoiceData[field.name]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.slice(13).map((field) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <IconComponent className={`w-4 h-4 ${getIconColor(field.color)}`} />
                          {field.label}
                        </div>
                      </label>
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={invoiceData[field.name]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Invoice Summary */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Invoice Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-blue-600">₹{taxableValue.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Taxable Value</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-green-600">₹{cgst.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">CGST</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-purple-600">₹{sgst.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">SGST</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-orange-600">₹{igst.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">IGST</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white">
                  <div className="text-2xl font-bold">₹{total.toFixed(2)}</div>
                  <div className="text-sm opacity-90">Total Amount</div>
                </div>
              </div>
            </div>

            {/* Generate PDF Button */}
            <div className="flex justify-center">
              <PDFDownloadLink
                document={<InvoicePDF data={invoiceData} />}
                fileName={`${invoiceData.invoiceNumber || "invoice"}.pdf`}
              >
                {({ loading }) => (
                  <button
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download PDF Invoice
                      </>
                    )}
                  </button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
