import axios from 'axios';
import React, { useEffect, useState ,useContext  } from 'react'

import { IoMdRemoveCircleOutline } from "react-icons/io";
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';
import { AppContext } from '../context/AppContext';


const ProjectList = () => {
  const {token, backendUrl , projectItems, rupee} = useContext(AppContext);
  
   

  const deleteHandle=async(id)=>{
    try {
      const res = await axios.post(backendUrl+'/api/project/delete', {id}, {headers:{token}});
      if(res.data.success){
        toast.success(res.data.message);
        
      }
      else{
        toast.error(res.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  }



  return (
    <div className=''>
      <h1 className='text-2xl font-medium mb-3'>Project List</h1>

      <div className='grid gap-2 grid-cols-[3fr_2fr_2fr_2fr_2fr_2fr_2fr_1fr] px-2 py-2 items-center border font-semibold bg-gray-100'>
        <p>Project Name</p>
         <p>Budget</p>
         <p>WebLink</p>
         <p>StartDate</p>
         <p>EndDate</p>
         <p>No Employee</p>
         <p>Status</p>
         <p>Action</p>


      </div>
      
        {
          projectItems.map((item, index)=>(
            <div key={index} className='grid grid-cols-[3fr_2fr_2fr_2fr_2fr_2fr_2fr_1fr] px-2 py-2 items-center border text-sm bg-gray-50'>
              {/* <Link to={`profile/${item._id}`} className='cursor-pointer'> <p className=' hover:text-red-400'>{item.name}</p></Link>  */}
             <p>{item.name}</p> 
              <p>{rupee}{" "}{item.budget.toLocaleString('en-IN')}</p>
              <p>{item.weblink}</p>
              <p>{item.startDate}</p>
              <p>{item.endDate}</p>

              <p>{item.numberOfEmp}</p>
              <p className={`${item.projectCompletion === "Pending" ?'text-red-500':'text-green-500'} font-semibold`} >{item.projectCompletion}</p>


              <IoMdRemoveCircleOutline onClick={()=>deleteHandle(item._id)} className='text-xl text-center cursor-pointer hover:text-red-500'/>
              
            </div>
          ))
        }
    
    </div>
  )
}

export default ProjectList