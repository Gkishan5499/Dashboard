// import React, { useEffect, useState } from 'react'
// import DashboardOveriew from '../component/Dashboard-component'
// import { useAuth } from '../context/AppContext'
// import AdminSidebar from '../component/Dashboard/AdminSidebar'
// import Header from '../component/Header';
// import { useLocation } from 'react-router-dom';
// import RegisterEmployee from './RegisterEmployee';
// import EmployeesList from './EmployeesList';
// import Projects from './Projects';
// import ProjectList from './ProjectList';
// import InvoiceGenerator from './InvoiceGenerator';
// import Department from './Department';
// import DepartmentList from './DepartmentList';
// import EditDepartment from './EditDepartment';
// import InvoiceGenerateEmp from './InvoiceGenerateEmp';
// import GstInvoiceGenerator from './GstInvoiceGenerator';
// import Transactions from './TransactionPage/Transactions';


// const AdminDashboard = () => {
//   const{user}  = useAuth();
//   const location= useLocation();
//   const [tab, setTab]=useState('');

//   useEffect(()=>{
//     const urlParam = new URLSearchParams(location.search);
//     const tabParam = urlParam.get('tab') || "admin-dashboard";

//      if(tabParam){
//         setTab(tabParam);
//      }

//   },[location.search]);
  
//   return (
   
//     <div className="bg-gray-50 min-h-screen ">
//      <Header/>
//      <hr />
//      <div className='flex w-full '>
//       <AdminSidebar/>

//       <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
//        {/* Admin Dashboard */}
//        {tab ==="admin-dashboard" && <DashboardOveriew/>}
//        {/* Employee */}
//        {tab === "register" && <RegisterEmployee/>}
//        {tab === "employees" && <EmployeesList/>}
//        {tab === "add-department" && <Department/>}
//        {tab === "department-list" && <DepartmentList/>}
//        {tab === "edit-department" && <EditDepartment/>}

       


//        {/* Project */}
//        {tab === "addProject" && <Projects/>}
//        {tab === "projects" && <ProjectList/>}

//        {tab=== "invoice"  && <InvoiceGenerator/>}
//        {tab=== "proforma-invoice"  && <InvoiceGenerateEmp/>}
//        {tab=== "gst-invoice" && <GstInvoiceGenerator/>}

//         {/* Transaction */}

//         {tab === "transactions" && <Transactions/>}




//      </div>
//      </div>
    

//     </div>


   

//   )
// }

// export default AdminDashboard



import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

import Header from '../component/Header';
import AdminSidebar from '../component/Dashboard/AdminSidebar';
import DashboardOverview from '../component/Dashboard-component';

import RegisterEmployee from './RegisterEmployee';
import EmployeesList from './EmployeesList';
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

  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const tabParam = urlParam.get('tab') || 'admin-dashboard';
    setTab(tabParam);
  }, [location.search]);

  const renderTab = () => {
    switch (tab) {
      case 'admin-dashboard':
        return <DashboardOverview />;
      case 'register':
        return <RegisterEmployee />;
      case 'employees':
        return <EmployeesList />;
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
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      
        
    <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
       
      

      {/* Content */}
     <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <hr />
        <main className="flex-1 overflow-auto p-6 text-gray-700">
          {renderTab()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
