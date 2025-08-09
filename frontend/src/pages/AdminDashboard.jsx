import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

import Header from '../component/Header';
import AdminSidebar from '../component/Dashboard/AdminSidebar';
import DashboardOverview from '../component/Dashboard-component';

import RegisterEmployee from './RegisterEmployee';
import EmployeesList from './EmployeesList';
import EditEmployee from './EditEmployee';
import Projects from './Projects';
import ProjectList from './ProjectList';
import InvoiceGenerator from './InvoiceGenerator';
import Department from './Department';
import DepartmentList from './DepartmentList';
import EditDepartment from './EditDepartment';
import InvoiceGenerateEmp from './InvoiceGenerateEmp';
import GstInvoiceGenerator from './GstInvoiceGenerator';
import Transactions from './TransactionPage/Transactions';

const AdminDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [tab, setTab] = useState('');
  const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const tabParam = urlParam.get('tab') || 'admin-dashboard';
    const idParam = urlParam.get('id');
    
    setTab(tabParam);
    setEmployeeId(idParam);
  }, [location.search]);

  const renderTab = () => {
    switch (tab) {
      case 'admin-dashboard':
        return <DashboardOverview />;
      case 'register':
        return <RegisterEmployee />;
      case 'employees':
        return <EmployeesList />;
      case 'edit-employee':
        return employeeId ? <EditEmployee id={employeeId} /> : <div className="p-4 text-red-600">Employee ID is required for editing</div>;
      case 'add-department':
        return <Department />;
      case 'department-list':
        return <DepartmentList />;
      case 'edit-department':
        return <EditDepartment />;
      case 'addProject':
        return <Projects />;
      case 'projects':
        return <ProjectList />;
      case 'invoice':
        return <InvoiceGenerator />;
      case 'proforma-invoice':
        return <InvoiceGenerateEmp />;
      case 'gst-invoice':
        return <GstInvoiceGenerator />;
      case 'transactions':
        return <Transactions />;
      default:
        return <div className="p-4 text-red-600">Invalid Section</div>;
    }
  };

  if (!user) {
    return <div className="p-4">Please log in to access the dashboard.</div>;
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Content */}
      <div className={`flex flex-col flex-1 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
