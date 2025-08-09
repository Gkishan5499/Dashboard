import React, { useContext, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Bell, User, Settings, TrendingUp, TrendingDown, Users, Briefcase, DollarSign, Calendar, Clock, Plus, FileText, CreditCard, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const DashboardOverview = () => {
  const { items, employeeCount, projectCount, transactions, totalIncome, totalExpense, netBalance } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced attendance data
  const attendanceData = [
    { name: 'Mon', attendance: 80, target: 85 },
    { name: 'Tue', attendance: 95, target: 85 },
    { name: 'Wed', attendance: 70, target: 85 },
    { name: 'Thu', attendance: 85, target: 85 },
    { name: 'Fri', attendance: 90, target: 85 },
    { name: 'Sat', attendance: 75, target: 85 },
    { name: 'Sun', attendance: 60, target: 85 },
  ];

  // Financial data for pie chart
  const financialData = [
    { name: 'Income', value: totalIncome, color: '#10B981' },
    { name: 'Expenses', value: totalExpense, color: '#EF4444' },
  ];

  // Recent activities
  const recentActivities = [
    { id: 1, type: 'employee', action: 'New employee added', name: 'John Doe', time: '2 hours ago', icon: Users },
    { id: 2, type: 'project', action: 'Project completed', name: 'E-commerce Website', time: '4 hours ago', icon: Briefcase },
    { id: 3, type: 'transaction', action: 'Payment received', name: '₹25,000', time: '6 hours ago', icon: DollarSign },
    { id: 4, type: 'invoice', action: 'Invoice generated', name: 'INV-2024-001', time: '1 day ago', icon: FileText },
  ];

  // Quick actions
  const quickActions = [
    { name: 'Add Employee', icon: Plus, link: '/admin-dashboard?tab=employees', color: 'bg-blue-500' },
    { name: 'Create Project', icon: Briefcase, link: '/admin-dashboard?tab=projects', color: 'bg-green-500' },
    { name: 'Generate Invoice', icon: FileText, link: '/admin-dashboard?tab=invoice', color: 'bg-purple-500' },
    { name: 'Record Transaction', icon: CreditCard, link: '/admin-dashboard?tab=transactions', color: 'bg-orange-500' },
  ];

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
              {trendValue}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ActivityCard = ({ activity }) => (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="p-2 bg-blue-100 rounded-lg">
        <activity.icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
        <p className="text-xs text-gray-500">{activity.name} • {activity.time}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm border">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
              <Settings className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <div className={`${action.color} rounded-xl p-4 text-white hover:scale-105 transition-transform cursor-pointer`}>
                  <div className="flex items-center space-x-3">
                    <action.icon className="w-6 h-6" />
                    <span className="font-medium">{action.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={employeeCount}
            icon={Users}
            trend="up"
            trendValue="+12% this month"
            color="bg-blue-500"
          />
          <StatCard
            title="Active Projects"
            value={projectCount}
            icon={Briefcase}
            trend="up"
            trendValue="+5% this week"
            color="bg-green-500"
          />
          <StatCard
            title="Total Income"
            value={`₹${totalIncome?.toLocaleString() || '0'}`}
            icon={TrendingUp}
            trend="up"
            trendValue="+8% this month"
            color="bg-emerald-500"
          />
          <StatCard
            title="Total Expenses"
            value={`₹${totalExpense?.toLocaleString() || '0'}`}
            icon={TrendingDown}
            trend="down"
            trendValue="-3% this month"
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Attendance Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Attendance Overview</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Actual</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Target</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Financial Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Net Balance</p>
                  <p className="text-xl font-bold text-green-600">₹{netBalance?.toLocaleString() || '0'}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Income</span>
                  <span className="text-sm font-medium text-green-600">₹{totalIncome?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Expenses</span>
                  <span className="text-sm font-medium text-red-600">₹{totalExpense?.toLocaleString() || '0'}</span>
                </div>
              </div>

              <div className="mt-6">
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={financialData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {financialData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <Link to="/admin-dashboard?tab=activities" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {recentActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        {transactions && transactions.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <Link to="/admin-dashboard?tab=transactions" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map((transaction, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">
                        ₹{transaction.amount?.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;