import React, { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom';
import { AppContext, useAuth } from '../context/AppContext';


const Login = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const {backendUrl} = useContext(AppContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = async(e)=>{
        try {
            e.preventDefault();
           const res= await axios.post(backendUrl+'/api/user/login',{email,password});
           if(res.data.success){
            login(res.data.user);
            localStorage.setItem( 'token', res.data.token );

            if(res.data.user.role === "admin"){
              navigate('/admin-dashboard');
            }
            else{
              navigate('/employee-dashboard');
            }
          }
          else{
            toast.error(res.message);
          } 
                   
        } catch (error) {
            console.log(error);
             toast.error(error.message);
        }
    }
    
  return (
<div className='min-h-screen flex items-center justify-center w-full'>
    <div className='bg-white shadow-md rounded-lg max-w-md px-8 py-6 '>
        <h1 className='text-2xl text-gray-800 mb-3 '>Admin Login</h1>
        <form onSubmit={handleSubmit}>
            <div className='min-w-72 mb-3'>
                <label htmlFor="Email" className='text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                 <input type="email" placeholder='admin@email.com'required
                  className='w-full rounded-md px-3 py-2 border border-gray-300 outline-none'
                  value={email}
                  onChange= {(e)=>setEmail(e.target.value)} />
            </div>
            <div className='min-w-72 mb-3'>
                <label htmlFor="Password" className='text-sm font-medium text-gray-700 mb-2'>Password</label>
                 <input type="password" placeholder='Password' required
                 className='w-full rounded-md px-3 py-2 border border-gray-300 outline-none'
                 value={password}
                 onChange= {(e)=>setPassword(e.target.value)}
                 />
            </div>
            <button type='submit' className="bg-gray-800 w-full text-white px-3 py-2 rounded-full">Login</button>
        </form>
    </div>
</div>
  )
}

export default Login