import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  IoIosAddCircleOutline,
  IoIosDisc,
  IoIosList,
  IoIosMan,
  IoMdArrowDropdown,
  IoMdDocument,
  IoMdMenu,
  IoIosCash,
  IoMdClose
} from "react-icons/io";

const AdminSidebar = ({isOpen , setIsOpen}) => {
  
  const [isEmployeeSubmenu, setIsEmployeeSubmenu] = useState(false);
  const [isProjectSubmenu, setIsProjectSubmenu] = useState(false);
  const [isTransactionSubmenu, setIsTransactionSubmenu] = useState(false);
  const [isInvoiceSubmenu, setIsInvoiceSubmenu] = useState(false);
  const [isInvoiceSamnic, setIsInvoiceSamnic] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const tabParam = urlParam.get('tab');

    if (tabParam === 'register' || tabParam === 'employees') setIsEmployeeSubmenu(true);
    if (tabParam === 'addProject' || tabParam === 'projects') setIsProjectSubmenu(true);
    if (tabParam === 'add-transaction' || tabParam === 'transactions') setIsTransactionSubmenu(true);
  }, [location.search]);

  return (
    <aside
      className={`h-screen fixed top-0 left-0 bg-gray-900 text-white border-r border-gray-700 transition-all duration-300 
      ${isOpen ? 'w-64 p-4' : 'w-16 p-2'}
      overflow-y-auto z-40`}
    >
      {/* Toggle */}
      <button
        className="mb-4  p-2 border border-gray-600 rounded-md bg-gray-800 text-white w-full flex justify-center "
        onClick={() => setIsOpen(!isOpen)}
      >
        {
          isOpen && (
            <IoMdMenu className="text-2xl text-blue-400" />)
        }
         {
          !isOpen && (
            <IoMdClose className="text-2xl text-blue-400"/>
          )

         }
    
      </button>

      <nav className="flex flex-col gap-2">
        {/* Dashboard */}
        <NavLink
          to={'/admin-dashboard'}
          className={({ isActive }) =>
            `${isActive ? "bg-gray-700" : ""} flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md`
          }
        >
          <IoIosDisc className="text-2xl text-blue-400" />
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        {/* Employees */}
        <div>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
            onClick={() => setIsEmployeeSubmenu(!isEmployeeSubmenu)}
          >
            <IoMdArrowDropdown className="text-xl text-purple-400" />
            {isOpen && <span>Employees</span>}
          </button>
          {isEmployeeSubmenu && (
            <div className="ml-6 flex flex-col border-l border-gray-600">
              <NavLink
                to={'/admin-dashboard?tab=register'}
                className="flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
              >
                <IoIosMan className="text-xl text-blue-400" />
                {isOpen && <span>Add Employee</span>}
              </NavLink>
              <NavLink
                to={'/admin-dashboard?tab=employees'}
                className="flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
              >
                <IoIosList className="text-xl text-green-400" />
                {isOpen && <span>All Employees</span>}
              </NavLink>
            </div>
          )}
        </div>

        {/* Departments */}
        <NavLink
          to={'/admin-dashboard?tab=add-department'}
          className="flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
        >
          <IoIosAddCircleOutline className="text-2xl text-yellow-400" />
          {isOpen && <span>Add Department</span>}
        </NavLink>

        <NavLink
          to={'/admin-dashboard?tab=department-list'}
          className="flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
        >
          <IoIosList className="text-2xl text-red-400" />
          {isOpen && <span>All Departments</span>}
        </NavLink>

        {/* Projects */}
        <div>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
            onClick={() => setIsProjectSubmenu(!isProjectSubmenu)}
          >
            <IoMdArrowDropdown className="text-xl text-purple-400" />
            {isOpen && <span>Projects</span>}
          </button>
          {isProjectSubmenu && (
            <div className="ml-6 flex flex-col border-l border-gray-600">
              <NavLink
                to={'/admin-dashboard?tab=addProject'}
                className="flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
              >
                <IoIosAddCircleOutline className="text-xl text-yellow-400" />
                {isOpen && <span>Add Project</span>}
              </NavLink>
              <NavLink
                to={'/admin-dashboard?tab=projects'}
                className="flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
              >
                <IoIosList className="text-xl text-green-400" />
                {isOpen && <span>List Projects</span>}
              </NavLink>
            </div>
          )}
        </div>

        {/* Transactions */}
        <div>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
            onClick={() => setIsTransactionSubmenu(!isTransactionSubmenu)}
          >
            <IoMdArrowDropdown className="text-xl text-purple-400" />
            {isOpen && <span>Transactions</span>}
          </button>
          {isTransactionSubmenu && (
            <div className="ml-6 flex flex-col border-l border-gray-600">
              <NavLink
                to={'/admin-dashboard?tab=transactions'}
                className="flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
              >
                <IoIosCash className="text-xl text-green-400" />
                {isOpen && <span>Transactions</span>}
              </NavLink>
            </div>
          )}
        </div>

        {/* Wiktrip Invoice */}
        <div>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
            onClick={() => setIsInvoiceSubmenu(!isInvoiceSubmenu)}
          >
            <IoMdArrowDropdown className="text-xl text-purple-400" />
            {isOpen && <span>Wiktrip Invoice</span>}
          </button>
          {isInvoiceSubmenu && (
            <div className="ml-6 flex flex-col border-l border-gray-600">
              <NavLink
                to={'/admin-dashboard?tab=proforma-invoice'}
                className="flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
              >
                <IoMdDocument className="text-xl text-yellow-400" />
                {isOpen && <span>Quotation Invoice</span>}
              </NavLink>
              <NavLink
                to={'/admin-dashboard?tab=invoice'}
                className="flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
              >
                <IoMdDocument className="text-xl text-green-400" />
                {isOpen && <span>Employee Salary Slip</span>}
              </NavLink>
            </div>
          )}
        </div>

        {/* Samnic Invoice */}
        <div>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
            onClick={() => setIsInvoiceSamnic(!isInvoiceSamnic)}
          >
            <IoMdArrowDropdown className="text-xl text-purple-400" />
            {isOpen && <span>Samnic Invoice</span>}
          </button>
          {isInvoiceSamnic && (
            <div className="ml-6 flex flex-col border-l border-gray-600">
              <NavLink
                to={'/admin-dashboard?tab=proforma-invoice'}
                className="flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
              >
                <IoMdDocument className="text-xl text-yellow-400" />
                {isOpen && <span>Quotation Invoice</span>}
              </NavLink>
              <NavLink
                to={'/admin-dashboard?tab=invoice'}
                className="flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md"
              >
                <IoMdDocument className="text-xl text-green-400" />
                {isOpen && <span>Employee Salary Slip</span>}
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
