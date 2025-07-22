import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import StyledQuotationPDF from "./ProformaInvoicePDF";

export default function PerformaForm() {
  const [formData, setFormData] = useState({
    // Company Info
    companyName: "",
    companyAddress: "",
    companyEmail:"",
    companyGSTIN: "",
    companyPAN: "",
    

    // Client Info
    clientName: "",
    clientAddress: "",
    clientEmail:"",
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
    const updatedItems = formData.items.filter((_, i) => i !== idx);
    setFormData({ ...formData, items: updatedItems });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white  shadow rounded">
      <h1 className="text-3xl font-bold mb-6 text-center">Quotation Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Company Info */}
        <div>
          <h2 className="font-semibold mb-2">Company Info</h2>
          <label>Company Name</label>
          <input name="companyName" value={formData.companyName} onChange={handleChange} className="border p-2 w-full mb-2" />

          <label>Company Address</label>
          <input name="companyAddress" value={formData.companyAddress} onChange={handleChange} className="border p-2 w-full mb-2" />

          <label>Company Email</label>
          <input name="companyEmail" value={formData.companyEmail} onChange={handleChange} className="border p-2 w-full mb-2" />


          <label>GSTIN</label>
          <input name="companyGSTIN" value={formData.companyGSTIN} onChange={handleChange} className="border p-2 w-full mb-2" />

          <label>PAN</label>
          <input name="companyPAN" value={formData.companyPAN} onChange={handleChange} className="border p-2 w-full mb-2" />
        </div>

        {/* Client Info */}
        <div>
          <h2 className="font-semibold mb-2">Client Info</h2>
          <label>Client Name</label>
          <input name="clientName" value={formData.clientName} onChange={handleChange} className="border p-2 w-full mb-2" />

          <label>Client Address</label>
          <input name="clientAddress" value={formData.clientAddress} onChange={handleChange} className="border p-2 w-full mb-2" />

          <label>Client Email</label>
          <input name="clientEmail" value={formData.clientEmail} onChange={handleChange} className="border p-2 w-full mb-2" />


          <label>GSTIN</label>
          <input name="clientGSTIN" value={formData.clientGSTIN} onChange={handleChange} className="border p-2 w-full mb-2" />

          <label>PAN</label>
          <input name="clientPAN" value={formData.clientPAN} onChange={handleChange} className="border p-2 w-full mb-2" />
        </div>
      </div>
        {/* Quotation Info */}
         
        <h2 className="font-semibold mb-2 border-b-2 border-black w-[200px]  text-2xl">Quotation Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
          
          <div>
          <label>Quotation Number</label>
          <input name="quotationNumber" value={formData.quotationNumber} onChange={handleChange} className="border p-2 w-full mb-2" />

          <label>Quotation Date</label>
          <input name="quotationDate" type="date" value={formData.quotationDate} onChange={handleChange} className="border p-2 w-full mb-2" />
           </div>

           <div>
          <label>Place of Supply</label>
          <input name="placeOfSupply" value={formData.placeOfSupply} onChange={handleChange} className="border p-2 w-full mb-2" />

          <label>Country</label>
          <input name="country" value={formData.country} onChange={handleChange} className="border p-2 w-full mb-2" />
         </div>
        </div>

        {/* Items */}
        <div className="md:col-span-2">
          <h2 className="font-semibold mb-2">Items</h2>

          {formData.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <input
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                className="border p-2 w-full"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.qty}
                onChange={(e) => handleItemChange(idx, "qty", Number(e.target.value))}
                className="border p-2 w-full"
              />
              <input
                type="number"
                placeholder="Rate (₹)"
                value={item.rate}
                onChange={(e) => handleItemChange(idx, "rate", Number(e.target.value))}
                className="border p-2 w-full"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(idx)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddItem}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Add Item
          </button>
        </div>

        {/* Summary */}
        <div>
           <h2 className="font-semibold mb-2 mt-2  border-b-2 border-black w-[160px]  text-2xl">Other Details</h2>
          <label>Discount (%)</label>
          <input
            type="number"
            name="discountPercent"
            value={formData.discountPercent}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />

          <label>Payment Terms</label>
          <input
            name="paymentTerms"
            value={formData.paymentTerms}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />

          <label>Additional Notes</label>
          <textarea
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
        </div>
      

      <div className="mt-6 text-center">
        <PDFDownloadLink
          document={<StyledQuotationPDF data={formData} />}
          fileName={`Quotation_${formData.quotationNumber || "001"}.pdf`}
        >
          {({ loading }) => (
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded shadow">
              {loading ? "Generating PDF..." : "Download Quotation PDF"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
