import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { 
  Trash2, 
  Mail, 
  Eye, 
  Edit, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Users,
  Building,
  Calendar,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  User,
  MoreHorizontal
} from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import EmailSend from '../component/Employee/Emailsend';

const EmployeesList = () => {
  const [isEmailModal, setIsEmailModal] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const { backendUrl } = useContext(AppContext);

  // Fetch employees with pagination and filters
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedDepartment && { department: selectedDepartment }),
        ...(selectedStatus && { status: selectedStatus })
      });

      const res = await axios.get(`${backendUrl}/api/employee/employee-list?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setEmployees(res.data.data);
        setTotalPages(res.data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  // Fetch departments for filter
  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${backendUrl}/api/department/all-departments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setDepartments(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, [currentPage, searchTerm, selectedDepartment, selectedStatus]);

  const deleteHandle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${backendUrl}/api/employee/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        toast.success('Employee deleted successfully');
        fetchEmployees();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error?.response?.data?.message || 'Failed to delete employee');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'terminated': return 'bg-red-100 text-red-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Employees</h1>
            <p className="text-gray-600">Manage your organization's employees</p>
          </div>
          <Link
            to="/admin-dashboard?tab=add-employee"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Employee
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on_leave">On Leave</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Employees Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : employees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div key={employee._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Employee Header */}
              <div className="relative p-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {employee.profileImage ? (
                      <img
                        src={employee.profileImage}
                        alt={employee.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      employee.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.employeeId}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Employee Details */}
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{employee.email}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{employee.phone}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{employee.designation}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{employee.department?.name || 'N/A'}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">₹{employee.salary?.toLocaleString()}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Joined {formatDate(employee.dateOfJoining)}
                  </span>
                </div>

                {employee.dateOfBirth && (
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Age: {calculateAge(employee.dateOfBirth)} years
                    </span>
                  </div>
                )}

                {employee.skills && employee.skills.length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs font-medium text-gray-500 mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                      {employee.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{employee.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin-dashboard?tab=employee-profile&id=${employee._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="View Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    
                    <Link
                      to={`/admin-dashboard?tab=edit-employee&id=${employee._id}`}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title="Edit Employee"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => {
                        setIsEmailModal(true);
                        setEmployeeDetails(employee);
                      }}
                      className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => deleteHandle(employee._id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete Employee"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedDepartment || selectedStatus 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first employee'
            }
          </p>
          {!searchTerm && !selectedDepartment && !selectedStatus && (
            <Link
              to="/admin-dashboard?tab=add-employee"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Employee
            </Link>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {isEmailModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <EmailSend 
              employee={employeeDetails} 
              setIsEmailModal={setIsEmailModal} 
              isEmailModal={isEmailModal} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesList;
