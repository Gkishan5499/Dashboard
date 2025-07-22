import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { AppContext, useAuth } from '../context/AppContext';
import axios from 'axios';
import { DeleteIcon, Edit2Icon } from 'lucide-react';
import {  NavLink} from 'react-router-dom';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const {backendUrl} = useContext(AppContext);
  const {user} = useAuth();
  
  const fetchDepartments = async () => {
    try {
        const res = await axios.get(backendUrl+'/api/department/all-departments');
        if (res.data.success) {
            setDepartments(res.data.data);
        } else {
            toast.error("Failed to fetch departments.");
        }
    } catch (error) {
      console.log(error);
        toast.error("Error fetching departments. Try again later.");
    }
};

const deleteHandle = async(id) => {
  try {
    const res = await axios.post(`${backendUrl}/api/department/delete`,{ id });
    if (res.data.success) {
      toast.success(res.data.message);
      await fetchDepartments();
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.data.message);
  }
};




useEffect(()=>{
  fetchDepartments();
},[])


  return (
    <div className='flex flex-col justify-center items-center'>
    
      <div className='flex justify-between items-start max-w-[800px] gap-4'>
         <div>
          <input type='search' placeholder='Search' className='text-gray-400 px-3 py-2 outline-none rounded shadow'/>
         </div>
         <div>
          {
            user && user.role ==="admin" && (
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 shadow-sm rounded'><NavLink to={'/admin-dashboard?tab=add-department'}>Add Departement</NavLink></button>
            )
          }
         </div>
      </div>
     
    
      <div className='mt-4'>
        <div className='flex gap-2 '>
          <div className=' w-[300px] shadow-md p-4 mb-4 bg-white '>
            <h3 className=' text-lg font-medium '>Sr. No.</h3>
          </div>
          <div className=' w-[300px] shadow-md p-4 mb-4 bg-white'>
            <h3 className=' text-lg font-medium '>Name</h3>
          </div>
          <div className=' w-[200px] shadow-md p-4 mb-4 bg-white'>
            <h3 className=' text-lg font-medium '>Edit</h3>
          </div>
          <div className=' w-[200px] shadow-md p-4 mb-4 bg-white'>
            <h3 className=' text-lg font-medium '>Delete</h3>
          </div>
        </div>
        {
          departments.length > 0 ? (
            departments.map((dept, index) =>(
              <div key={dept._id}  className='flex gap-2'>
                   <div className='w-[300px] shadow-md p-4'>
                    <p>{index+1}</p>
                   </div>
                   <div className='w-[300px] shadow-md p-4'>
                    <p>{dept.name}</p>
                   </div>
                   <div className='w-[200px] shadow-md p-4'>
                    <NavLink to={'/admin-dashboard?tab=edit-department'}><Edit2Icon className='hover:text-red-500 cursor-pointer'/></NavLink>
                   </div>
                   <div className='w-[200px] shadow-md p-4'>
                    <p><DeleteIcon onClick={()=> deleteHandle(dept._id)}  className='hover:text-red-500 cursor-pointer'/></p>
                   </div>
              </div>
           ))):(<div>
             <p className='text-lg text-red-400 text-center'>No Department Found</p>
          </div>)
         }
      </div>
        
  
    </div>
  )
}

export default DepartmentList