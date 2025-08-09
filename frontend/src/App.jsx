// import React, { useContext, useEffect, useState } from 'react'
// import Header from './component/Header'
// import Sidebar from './component/Sidebar'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import RegisterEmployee from './pages/RegisterEmployee'
import EmployeesList from './pages/EmployeesList'
import EditEmployee from './pages/EditEmployee'
import Profile from './pages/Profile'

import Projects from './pages/Projects'
import ProjectList from './pages/ProjectList'
import InvoiceGenerator from './pages/InvoiceGenerator'
import EmployeeDashboard from './pages/EmployeeDashboard'
import AdminDashboard from './pages/AdminDashboard'
import PrivateRoutes from '../Utils/PrivateRoutes'
import RoleBasedRoutes from '../Utils/RoleBasedRoutes'
import Department from './pages/Department'
import DepartmentList from './pages/DepartmentList'
import EditDepartment from './pages/EditDepartment'
import PublicRoutes from '../Utils/PublicRoutes'
import Transactions from './pages/TransactionPage/Transactions'


const App = () => {
  
 
  return (
    <BrowserRouter>
    <ToastContainer/>
        <Routes>
                   <Route path='/' element={<Navigate to={'/admin-dashboard'}/>}></Route>
                    <Route path="/login" element={
                      <PublicRoutes>
                        <Login />
                      </PublicRoutes>
                      
                      } />
                    <Route path="/admin-dashboard" element={
                     <PrivateRoutes>
                      <RoleBasedRoutes roleRequired={["admin"]}>
                      <AdminDashboard/>
                      </RoleBasedRoutes>
                     </PrivateRoutes>
                    
                    }/>
                    <Route path="/employee-dashboard" element={<EmployeeDashboard />}/>

                    <Route path="/add-department" element={<Department/>}/>
                    <Route path="/department-list" element={<DepartmentList/>}/>
                    <Route path="/edit-department" element={<EditDepartment/>}/>

                    <Route path="/register" element={<RegisterEmployee/>}/>
                    <Route path="/addProject" element={<Projects/>}/>
                    <Route path="/projects" element={<ProjectList/>}/>
                    <Route path="/invoice" element={<InvoiceGenerator/>}/>

                    <Route path= "/transactions" element={<Transactions/>}/>
                    
                    <Route path="/employees" element={<EmployeesList />}/>
                    <Route path="/employees/profile/:id" element={<Profile/>}/>
                    <Route path="/employees/edit/:id" element={<EditEmployee/>}/>

                  </Routes>
            

    </BrowserRouter>


  )
}
export default App
