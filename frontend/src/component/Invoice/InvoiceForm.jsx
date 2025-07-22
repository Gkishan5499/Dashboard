import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalarySlipPDF from "./InvoicePDF"

const SalarySlipForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    title: "",
    directorate: "",
    department: "",
    bankName: "",
    bankAccount: "",
    paymentDate: "",
    earnings: [],
    deductions: [],
    tax: "0",
    logo: null,
  });

  const [earning, setEarning] = useState({ label: "", amount: "" });
  const [deduction, setDeduction] = useState({ label: "", amount: "" });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addEarning = () => {
    if (earning.label && earning.amount) {
      setFormData((prev) => ({
        ...prev,
        earnings: [...prev.earnings, earning],
      }));
      setEarning({ label: "", amount: "" });
    }
  };

  const addDeduction = () => {
    if (deduction.label && deduction.amount) {
      setFormData((prev) => ({
        ...prev,
        deductions: [...prev.deductions, deduction],
      }));
      setDeduction({ label: "", amount: "" });
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto shadow-md bg-white rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Salary Slip Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Name", name: "name" },
          { label: "Employee ID", name: "employeeId" },
          { label: "Title", name: "title" },
          { label: "Directorate", name: "directorate" },
          { label: "Department", name: "department" },
          { label: "Bank Name", name: "bankName" },
          { label: "Bank Account", name: "bankAccount" },
          { label: "Payment Date", name: "paymentDate", type: "date" },
          { label: "Tax (%)", name: "tax" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-medium">{field.label}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}
      </div>

      <div className="my-4">
        <label className="block font-medium">Upload Company Logo</label>
        <input type="file" name="logo" accept="image/*" onChange={handleChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <h2 className="font-semibold mb-2">Add Earnings</h2>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Label"
              value={earning.label}
              onChange={(e) => setEarning({ ...earning, label: e.target.value })}
              className="border p-2 w-full"
            />
            <input
              type="number"
              placeholder="Amount"
              value={earning.amount}
              onChange={(e) => setEarning({ ...earning, amount: e.target.value })}
              className="border p-2 w-full"
            />
            <button onClick={addEarning} className="bg-green-600 text-white px-3 rounded">+</button>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Add Deductions</h2>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Label"
              value={deduction.label}
              onChange={(e) => setDeduction({ ...deduction, label: e.target.value })}
              className="border p-2 w-full"
            />
            <input
              type="number"
              placeholder="Amount"
              value={deduction.amount}
              onChange={(e) => setDeduction({ ...deduction, amount: e.target.value })}
              className="border p-2 w-full"
            />
            <button onClick={addDeduction} className="bg-red-600 text-white px-3 rounded">+</button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <PDFDownloadLink
          document={<SalarySlipPDF data={formData} />}
          fileName="salary_slip.pdf"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded shadow"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download Salary Slip")}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default SalarySlipForm;
