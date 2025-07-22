import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

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
   
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendUrl}/api/project/add`,
        { name, description, budget,weblink, numberOfEmp, projectCompletion, startDate, endDate },
        { 
          headers: {
            'Content-Type': 'application/json',
            token,
          },
        }
      );

      if (res.data.success) {
        console.log(res.data.project);
        toast.success(res.data.message);
        setName('');
        setDescription('');
        setBudget(0);
        setNumberOfEmp(0);
        setProjectCompletion("#");
        setWeblink('');
        setStartDate('');
        setEndDate('');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the project.");
    }
  };

  return (
    <div className='flex flex-col gap-3 justify-center  items-center'>
      <h1 className='text-2xl font-semibold mb-3'>Add New Project</h1>

      <form onSubmit={handleSubmit} className='max-w-2xl'>

        <div className='w-full grid grid-cols gap-2 md:grid-cols-2 lg:grid-cols-2'>
          <div>
        <div className='mb-3'>
          <label htmlFor='name' className='text-sm text-gray-600 font-medium'>Project Name</label>
          <input type='text' id='name' className='w-full px-3 py-2 mt-2 border border-gray-300 outline-none' required 
            value={name} onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='description' className='text-sm text-gray-600 font-medium'>Description</label>
          <textarea id='description' className='w-full h-48 px-3 py-2 mt-2 border border-gray-300 outline-none' required 
            value={description} onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className='mb-3'>
          <label htmlFor='budget' className='text-sm text-gray-600 font-medium'>Budget</label>
          <input type='number' id='budget' className='w-full px-3 py-2 mt-2 border border-gray-300 outline-none' required 
            value={budget} onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>

   
       </div>

        <div>

     <div className='mb-3'>
          <label htmlFor='numberOfEmp' className='text-sm text-gray-600 font-medium'>Number of Employees</label>
          <input type='number' id='numberOfEmp' className='w-full px-3 py-2 mt-2 border border-gray-300 outline-none' required 
            value={numberOfEmp} onChange={(e) => setNumberOfEmp(Number(e.target.value))}
          />
        </div>


        <div className='mb-3'>
          <label htmlFor='weblink' className='text-sm text-gray-600 font-medium'>Website Link</label>
          <input type='text' id='weblink' className='w-full px-3 py-2 mt-2 border border-gray-300 outline-none' required 
            value={weblink} onChange={(e) => setWeblink(e.target.value)}
          />
        </div>
 
        
        
        <div className='mb-3'>
          <select id='projectCompletion' className='w-full px-3 py-2 mt-2 border border-gray-300 outline-none' 
            required 
            value={projectCompletion} 
            onChange={(e) => setProjectCompletion(e.target.value)}
          >
               <option value="#">Select Option</option>
               <option value="Pending">Pending</option>
               <option value="Running">Running</option>
               <option value="Completed">Completed</option>

          </select>

        </div>


        <div className='mb-3'>
          <label htmlFor='startDate' className='text-sm text-gray-600 font-medium'>Start Date</label>
          <input type='date' id='startDate' className='w-full px-3 py-2 mt-2 border border-gray-300 outline-none' required 
            value={startDate} onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='endDate' className='text-sm text-gray-600 font-medium'>End Date</label>
          <input type='date' id='endDate' className='w-full px-3 py-2 mt-2 border border-gray-300 outline-none' required 
            value={endDate} onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

       
        </div>

        </div>
         <button type='submit' className='w-full px-5 py-2 rounded-md bg-gray-800 text-sm text-white'>Submit</button>
      </form>
    </div>
  );
};

export default Projects;
