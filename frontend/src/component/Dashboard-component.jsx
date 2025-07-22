import React, { useContext } from 'react';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, User, Settings } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';


const DashboardOveriew = () => {
  const {items ,employeeCount ,projectCount} = useContext(AppContext);
  const data = [
    { name: 'Mon', attendance: 80 },
    { name: 'Tue', attendance: 95 },
    { name: 'Wed', attendance: 70 },
    { name: 'Thu', attendance: 85 },
    { name: 'Fri', attendance: 90 },
  ]
  return (
    <div className="flex h-screen">
  
     
      {/* Main Content */}
      <div className="flex-1 p-5">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-5">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-lg w-1/3"
          />
          <div className="flex items-center gap-4">
            <Bell className="cursor-pointer" />
            <User className="cursor-pointer" />
            <Settings className="cursor-pointer" />
       
       <Link to={'/admin-dashboard?tab=invoice'} className='px-2 py-2 text-lg font-medium border rounded text-blue-500'>Generate Salary Invoice</Link>
    
       <Link to={'/admin-dashboard?tab=proforma-invoice'} className='px-2 py-2 text-lg font-medium border rounded text-blue-500'> Invoice</Link>
       <Link to={'/admin-dashboard?tab=gst-invoice'} className='px-2 py-2 text-lg font-medium border rounded text-blue-500'> GST Invoice</Link>


       
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <Link to={'/admin-dashboard?tab=employees'}>
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold">Total Employees</h2>
            <p className="text-2xl">{employeeCount}</p>
          </div>
          </Link>

          <Link to={'/admin-dashboard?tab=projects'}>
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold">Active Projects</h2>
            <p className="text-2xl">{projectCount}</p>
          </div>
          </Link>

          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold">Pending Leaves</h2>
            <p className="text-2xl">4</p>
          </div>
        </div>

        {/* Attendance Overview Chart */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold mb-4">Attendance Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default DashboardOveriew