import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import {
  FolderPlus,
  Calendar,
  Users,
  DollarSign,
  Globe,
  Target,
  Clock,
  Save,
  ArrowLeft,
  TrendingUp
} from 'lucide-react';

const Projects = () => {
  const { token, backendUrl } = useContext(AppContext);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);
  const [numberOfEmp, setNumberOfEmp] = useState(0);
  const [weblink, setWeblink] = useState('');
  const [projectCompletion, setProjectCompletion] = useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
   
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await axios.post(
        `${backendUrl}/api/project/add`,
        { name, description, budget, weblink, numberOfEmp, projectCompletion, startDate, endDate },
        { 
          headers: {
            'Content-Type': 'application/json',
            token,
          },
        }
      );

      if (res.data.success) {
        console.log(res.data.project);
        toast.success('Project added successfully!');
        setName('');
        setDescription('');
        setBudget(0);
        setNumberOfEmp(0);
        setProjectCompletion("");
        setWeblink('');
        setStartDate('');
        setEndDate('');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Project</h1>
            <p className="text-gray-600">Create and manage your project details</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FolderPlus className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Project Information</h2>
                <p className="text-blue-100">Fill in the details below to create your project</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Project Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <FolderPlus className="w-4 h-4 text-blue-500" />
                      Project Name
                    </div>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter project name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-green-500" />
                      Description
                    </div>
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    placeholder="Describe your project..."
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      Budget (₹)
                    </div>
                  </label>
                  <input
                    type="number"
                    id="budget"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter project budget"
                    required
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="numberOfEmp" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      Number of Employees
                    </div>
                  </label>
                  <input
                    type="number"
                    id="numberOfEmp"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter number of employees"
                    required
                    value={numberOfEmp}
                    onChange={(e) => setNumberOfEmp(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label htmlFor="weblink" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      Website Link
                    </div>
                  </label>
                  <input
                    type="url"
                    id="weblink"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    placeholder="https://example.com"
                    required
                    value={weblink}
                    onChange={(e) => setWeblink(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="projectCompletion" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                      Project Status
                    </div>
                  </label>
                  <select
                    id="projectCompletion"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    required
                    value={projectCompletion}
                    onChange={(e) => setProjectCompletion(e.target.value)}
                  >
                    <option value="">Select Project Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Running">Running</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-500" />
                    Start Date
                  </div>
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    End Date
                  </div>
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Project...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Create Project
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Projects;
