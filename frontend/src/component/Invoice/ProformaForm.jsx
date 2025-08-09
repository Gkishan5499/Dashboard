import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import StyledQuotationPDF from "./ProformaInvoicePDF";
import {
  FileText,
  Building,
  User,
  Calendar,
  Globe,
  Calculator,
  Plus,
  Trash2,
  Download,
  DollarSign,
  CreditCard,
  MapPin,
  Mail,
  Hash
} from 'lucide-react';

export default function PerformaForm() {
  const [formData, setFormData] = useState({
    // Company Info
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    companyGSTIN: "",
    companyPAN: "",

    // Client Info
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    clientGSTIN: "",
    clientPAN: "",

    // Quotation Info
    quotationNumber: "",
    quotationDate: "",
    placeOfSupply: "",
    country: "India",

    // Items - starts with one item row
    items: [{ description: "", qty: 1, rate: "" }],

    discountPercent: 0,
    paymentTerms: "15 days",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (idx, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[idx][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", qty: 1, rate: "" }],
    });
  };

  const handleRemoveItem = (idx) => {
    if (formData.items.length > 1) {
      const updatedItems = formData.items.filter((_, i) => i !== idx);
      setFormData({ ...formData, items: updatedItems });
    }
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => {
      return sum + (item.qty * (item.rate || 0));
    }, 0);
    
    const discount = subtotal * (formData.discountPercent / 100);
    const total = subtotal - discount;
    
    return { subtotal, discount, total };
  };

  const { subtotal, discount, total } = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quotation Generator</h1>
            <p className="text-gray-600">Create professional quotations for your clients</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Quotation Information</h2>
                <p className="text-orange-100">Fill in the details below to create your quotation</p>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-blue-500" />
                        Company Name
                      </div>
                    </label>
                    <input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-500" />
                        Company Address
                      </div>
                    </label>
                    <input
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      placeholder="Enter company address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-500" />
                        Company Email
                      </div>
                    </label>
                    <input
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      placeholder="Enter company email"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-orange-500" />
                          GSTIN
                        </div>
                      </label>
                      <input
                        name="companyGSTIN"
                        value={formData.companyGSTIN}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        placeholder="Enter GSTIN"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-red-500" />
                          PAN
                        </div>
                      </label>
                      <input
                        name="companyPAN"
                        value={formData.companyPAN}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        placeholder="Enter PAN"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Info */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Client Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-green-500" />
                        Client Name
                      </div>
                    </label>
                    <input
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                      placeholder="Enter client name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Client Address
                      </div>
                    </label>
                    <input
                      name="clientAddress"
                      value={formData.clientAddress}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                      placeholder="Enter client address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-500" />
                        Client Email
                      </div>
                    </label>
                    <input
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                      placeholder="Enter client email"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-orange-500" />
                          GSTIN
                        </div>
                      </label>
                      <input
                        name="clientGSTIN"
                        value={formData.clientGSTIN}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                        placeholder="Enter GSTIN"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-red-500" />
                          PAN
                        </div>
                      </label>
                      <input
                        name="clientPAN"
                        value={formData.clientPAN}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                        placeholder="Enter PAN"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quotation Details */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 mb-8">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Quotation Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-purple-500" />
                      Quotation Number
                    </div>
                  </label>
                  <input
                    name="quotationNumber"
                    value={formData.quotationNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    placeholder="Enter quotation number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      Quotation Date
                    </div>
                  </label>
                  <input
                    name="quotationDate"
                    type="date"
                    value={formData.quotationDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      Place of Supply
                    </div>
                  </label>
                  <input
                    name="placeOfSupply"
                    value={formData.placeOfSupply}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    placeholder="Enter place of supply"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-orange-500" />
                      Country
                    </div>
                  </label>
                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Items
                </h3>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="space-y-4">
                {formData.items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-xl border border-gray-200">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <input
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.qty}
                        onChange={(e) => handleItemChange(idx, "qty", Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rate (₹)</label>
                        <input
                          type="number"
                          placeholder="Rate"
                          value={item.rate}
                          onChange={(e) => handleItemChange(idx, "rate", Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        />
                      </div>
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="mt-6 p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary and Other Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Other Details */}
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Other Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-orange-500" />
                        Discount (%)
                      </div>
                    </label>
                    <input
                      type="number"
                      name="discountPercent"
                      value={formData.discountPercent}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300"
                      placeholder="Enter discount percentage"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-purple-500" />
                        Payment Terms
                      </div>
                    </label>
                    <input
                      name="paymentTerms"
                      value={formData.paymentTerms}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300"
                      placeholder="Enter payment terms"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        Additional Notes
                      </div>
                    </label>
                    <textarea
                      name="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300"
                      placeholder="Enter additional notes"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Quotation Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-blue-200">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-blue-200">
                    <span className="text-gray-600">Discount ({formData.discountPercent}%):</span>
                    <span className="font-semibold text-red-600">-₹{discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="font-bold text-xl">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate PDF Button */}
            <div className="flex justify-center">
              <PDFDownloadLink
                document={<StyledQuotationPDF data={formData} />}
                fileName={`Quotation_${formData.quotationNumber || "001"}.pdf`}
              >
                {({ loading }) => (
                  <button
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download Quotation PDF
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
