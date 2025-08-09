import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserCheck,
  Edit3,
  Building2,
  PlusCircle,
  List,
  FolderOpen,
  FileText,
  DollarSign,
  Receipt,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Home,
  Briefcase,
  CreditCard,
  Sparkles
} from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const [isEmployeeSubmenu, setIsEmployeeSubmenu] = useState(false);
  const [isProjectSubmenu, setIsProjectSubmenu] = useState(false);
  const [isTransactionSubmenu, setIsTransactionSubmenu] = useState(false);
  const [isInvoiceSubmenu, setIsInvoiceSubmenu] = useState(false);
  const [isInvoiceSamnic, setIsInvoiceSamnic] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const tabParam = urlParam.get('tab');

    if (tabParam === 'register' || tabParam === 'employees' || tabParam === 'edit-employee') setIsEmployeeSubmenu(true);
    if (tabParam === 'addProject' || tabParam === 'projects') setIsProjectSubmenu(true);
    if (tabParam === 'add-transaction' || tabParam === 'transactions') setIsTransactionSubmenu(true);
  }, [location.search]);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin-dashboard',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'employees',
      label: 'Employees',
      icon: Users,
      submenu: [
        { label: 'Add Employee', path: '/admin-dashboard?tab=register', icon: UserPlus, color: 'from-green-500 to-emerald-500' },
        { label: 'All Employees', path: '/admin-dashboard?tab=employees', icon: UserCheck, color: 'from-blue-500 to-indigo-500' },
        { label: 'Edit Employee', path: '/admin-dashboard?tab=edit-employee', icon: Edit3, color: 'from-yellow-500 to-orange-500' }
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'departments',
      label: 'Departments',
      icon: Building2,
      submenu: [
        { label: 'Add Department', path: '/admin-dashboard?tab=add-department', icon: PlusCircle, color: 'from-yellow-500 to-orange-500' },
        { label: 'All Departments', path: '/admin-dashboard?tab=department-list', icon: List, color: 'from-red-500 to-pink-500' }
      ],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderOpen,
      submenu: [
        { label: 'Add Project', path: '/admin-dashboard?tab=addProject', icon: PlusCircle, color: 'from-yellow-500 to-orange-500' },
        { label: 'List Projects', path: '/admin-dashboard?tab=projects', icon: List, color: 'from-green-500 to-emerald-500' }
      ],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: CreditCard,
      submenu: [
        { label: 'All Transactions', path: '/admin-dashboard?tab=transactions', icon: DollarSign, color: 'from-green-500 to-emerald-500' }
      ],
      color: 'from-amber-500 to-yellow-500'
    },
    {
      id: 'invoices',
      label: 'Invoices',
      icon: Receipt,
      submenu: [
        { label: 'Wiktrip Invoice', path: '/admin-dashboard?tab=proforma-invoice', icon: FileText, color: 'from-blue-500 to-indigo-500' },
        { label: 'Samnic Invoice', path: '/admin-dashboard?tab=invoice', icon: FileText, color: 'from-purple-500 to-pink-500' }
      ],
      color: 'from-rose-500 to-pink-500'
    }
  ];

  const renderMenuItem = (item) => {
    const IconComponent = item.icon;
    
    if (item.submenu) {
      const isSubmenuOpen = 
        (item.id === 'employees' && isEmployeeSubmenu) ||
        (item.id === 'projects' && isProjectSubmenu) ||
        (item.id === 'transactions' && isTransactionSubmenu) ||
        (item.id === 'invoices' && (isInvoiceSubmenu || isInvoiceSamnic));

      return (
        <div key={item.id} className="space-y-1">
          <button
            onClick={() => {
              if (item.id === 'employees') setIsEmployeeSubmenu(!isEmployeeSubmenu);
              if (item.id === 'projects') setIsProjectSubmenu(!isProjectSubmenu);
              if (item.id === 'transactions') setIsTransactionSubmenu(!isTransactionSubmenu);
              if (item.id === 'invoices') {
                setIsInvoiceSubmenu(!isInvoiceSubmenu);
                setIsInvoiceSamnic(!isInvoiceSamnic);
              }
            }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group hover:shadow-lg hover:scale-105 ${
              isSubmenuOpen 
                ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg' 
                : 'bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-all duration-300 ${isSubmenuOpen ? 'bg-white/20 shadow-lg' : 'bg-gradient-to-r ' + item.color}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              {isOpen && <span className="font-medium">{item.label}</span>}
            </div>
            {isOpen && (
              <div className={`transition-transform duration-300 ${isSubmenuOpen ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            )}
          </button>
          
          {isSubmenuOpen && (
            <div className="ml-4 space-y-1 border-l-2 border-white/20 pl-4 animate-in slide-in-from-left-2 duration-300">
              {item.submenu.map((subItem, index) => {
                const SubIconComponent = subItem.icon;
                const isActive = location.pathname + location.search === subItem.path;
                return (
                  <NavLink
                    key={index}
                    to={subItem.path}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 group hover:shadow-md hover:scale-105 ${
                      isActive 
                        ? 'bg-gradient-to-r ' + subItem.color + ' text-white shadow-lg' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className={`p-1.5 rounded-md transition-all duration-300 ${isActive ? 'bg-white/20 shadow-lg' : 'bg-gradient-to-r ' + subItem.color}`}>
                      <SubIconComponent className="w-4 h-4" />
                    </div>
                    {isOpen && <span className="text-sm font-medium">{subItem.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    const isActive = location.pathname === item.path;
    return (
      <NavLink
        key={item.id}
        to={item.path}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group hover:shadow-lg hover:scale-105 ${
          isActive 
            ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg' 
            : 'bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white'
        }`}
      >
        <div className={`p-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-white/20 shadow-lg' : 'bg-gradient-to-r ' + item.color}`}>
          <IconComponent className="w-5 h-5" />
        </div>
        {isOpen && <span className="font-medium">{item.label}</span>}
      </NavLink>
    );
  };

  return (
    <aside
      className={`h-screen fixed top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white border-r border-white/10 transition-all duration-500 ease-in-out shadow-2xl
      ${isOpen ? 'w-72' : 'w-20'} overflow-y-auto z-40 backdrop-blur-xl`}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Samnic Admin
                </h2>
                <p className="text-xs text-gray-400">Dashboard</p>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
            ) : (
              <Menu className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map(renderMenuItem)}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
            <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200">Settings</p>
              <p className="text-xs text-gray-400">Manage system</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default AdminSidebar;
