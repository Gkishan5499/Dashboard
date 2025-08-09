import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalarySlipPDF from "./InvoicePDF";
import {
  FileText,
  User,
  Building,
  CreditCard,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  Download,
  Building2,
  Banknote,
  Calculator,
  Save
} from 'lucide-react';

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
  const [isGenerating, setIsGenerating] = useState(false);

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

  const removeEarning = (index) => {
    setFormData((prev) => ({
      ...prev,
      earnings: prev.earnings.filter((_, i) => i !== index),
    }));
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

  const removeDeduction = (index) => {
    setFormData((prev) => ({
      ...prev,
      deductions: prev.deductions.filter((_, i) => i !== index),
    }));
  };

  const calculateTotals = () => {
    const totalEarnings = formData.earnings.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalDeductions = formData.deductions.reduce((sum, item) => sum + Number(item.amount), 0);
    const taxAmount = (totalEarnings * (Number(formData.tax) || 0)) / 100;
    const netSalary = totalEarnings - totalDeductions - taxAmount;
    
    return { totalEarnings, totalDeductions, taxAmount, netSalary };
  };

  const { totalEarnings, totalDeductions, taxAmount, netSalary } = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Salary Slip Generator</h1>
            <p className="text-gray-600">Generate professional salary slips for your employees</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Employee Information</h2>
                <p className="text-blue-100">Fill in the employee details below</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Employee Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-500" />
                      Employee Name
                    </div>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter employee name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-green-500" />
                      Employee ID
                    </div>
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter employee ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-purple-500" />
                      Department
                    </div>
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter department"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-orange-500" />
                      Directorate
                    </div>
                  </label>
                  <input
                    type="text"
                    name="directorate"
                    value={formData.directorate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter directorate"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-500" />
                      Bank Name
                    </div>
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter bank name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-green-500" />
                      Bank Account
                    </div>
                  </label>
                  <input
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter bank account number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      Payment Date
                    </div>
                  </label>
                  <input
                    type="date"
                    name="paymentDate"
                    value={formData.paymentDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-red-500" />
                      Tax Rate (%)
                    </div>
                  </label>
                  <input
                    type="number"
                    name="tax"
                    value={formData.tax}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter tax rate"
                  />
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Upload Company Logo
                </div>
              </label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            {/* Earnings and Deductions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Earnings */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Earnings
                </h3>
                
                <div className="space-y-3 mb-4">
                  {formData.earnings.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-green-200">
                      <div className="flex-1">
                        <div className="font-medium text-green-800">{item.label}</div>
                        <div className="text-sm text-green-600">₹{item.amount}</div>
                      </div>
                      <button
                        onClick={() => removeEarning(index)}
                        className="p-1 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Earning label"
                    value={earning.label}
                    onChange={(e) => setEarning({ ...earning, label: e.target.value })}
                    className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={earning.amount}
                    onChange={(e) => setEarning({ ...earning, amount: e.target.value })}
                    className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                  />
                  <button
                    onClick={addEarning}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Deductions */}
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Deductions
                </h3>
                
                <div className="space-y-3 mb-4">
                  {formData.deductions.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-red-200">
                      <div className="flex-1">
                        <div className="font-medium text-red-800">{item.label}</div>
                        <div className="text-sm text-red-600">₹{item.amount}</div>
                      </div>
                      <button
                        onClick={() => removeDeduction(index)}
                        className="p-1 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Deduction label"
                    value={deduction.label}
                    onChange={(e) => setDeduction({ ...deduction, label: e.target.value })}
                    className="flex-1 px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={deduction.amount}
                    onChange={(e) => setDeduction({ ...deduction, amount: e.target.value })}
                    className="flex-1 px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  />
                  <button
                    onClick={addDeduction}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Salary Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-green-600">₹{totalEarnings.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Total Earnings</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-red-600">₹{totalDeductions.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Total Deductions</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-orange-600">₹{taxAmount.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Tax Amount</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">₹{netSalary.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Net Salary</div>
                </div>
              </div>
            </div>

            {/* Generate PDF Button */}
            <div className="flex justify-center">
              <PDFDownloadLink
                document={<SalarySlipPDF data={formData} />}
                fileName={`salary_slip_${formData.name || 'employee'}.pdf`}
              >
                {({ loading }) => (
                  <button
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download Salary Slip
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
};

export default SalarySlipForm;
