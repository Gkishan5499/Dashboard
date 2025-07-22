import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Profile = () => {
const {token, backendUrl} = useContext(AppContext);
const[formdata, setFormData]= useState({})
const { id } = useParams();

const  getProfile= async()=>{
       try {
         const res = await axios.get(backendUrl+`/api/employee/getProfile/${id}`, {headers:{token}});
         console.log(res.data.employee);
         setFormData(res.data.employee);
        
       } catch (error) {
        console.log(error);
       }
}

useEffect(()=>{
   getProfile();
},
  [id])



  return (
    <div className='lg:flex sm:flex-col justify-center items-center'>
        <div>
            <h1 className='text-3xl font-semibold'>Employee Profile</h1> 
              <div className='flex flex-col items-center mt-5'>
                <img src="https://pluspng.com/img-png/user-png-icon-big-image-png-2240.png" alt="img" className=' w-20 h-20' />
              </div>
              <div className='mt-4 lg:flex sm:flex-col gap-3'>
                <div className='flex flex-col gap-2'>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" className=' w-80 outline-none border px-1 py-1' value={formdata.name||""} />
                </div>
                <div className='flex flex-col gap-2'>
                <label htmlFor="name">Email</label>
                <input type="email" id="email" name="email" className=' w-80 outline-none border px-1 py-1' value={formdata.email||""}/>
                </div>
              </div>

              <div className='mt-4 lg:flex sm:flex-col gap-3'>
                <div className='flex flex-col gap-2'>
                <label htmlFor="name">Position</label>
                <input type="text" id="position" name="position" className=' w-80 outline-none border px-1 py-1' value={formdata.position||""}/>
                </div>
                <div className='flex flex-col gap-2'>
                <label htmlFor="name">Salary</label>
                <input type="number" id="salary" name="salary" className=' w-80 outline-none border px-1 py-1' value={formdata.salary||""}/>
                </div>
              </div>

              <div className='mt-4 lg:flex sm:flex-col gap-3 mb-3'>
                <div className='flex flex-col gap-2'>
                <label htmlFor="experience">Experience</label>
                <input type="number" id="experience" name="experience" className=' w-80 outline-none border px-1 py-1' value={formdata.experience||""}/>
                </div>
                
              </div>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 '>Edit Profile</button>
        </div>
    </div>
  )
}

export default Profile