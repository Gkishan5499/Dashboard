import axios from 'axios';
import React, { useContext, useState } from 'react';
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import EmailSend from '../component/Employee/Emailsend';

const EmployeesList = () => {
  const [isEmailModal, setIsEmailModal] = useState(false);
  const [emloyeeDetails, setEmployeeDetails] = useState(null);
  const { backendUrl, items, getlist } = useContext(AppContext);

  const deleteHandle = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${backendUrl}/api/employee/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
        toast.success(res.data.message);
        await getlist();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Employees List</h1>

      <div className="overflow-hidden border rounded-lg shadow-md">
        <div className="grid grid-cols-[2fr_4fr_2fr_3fr_2fr_3fr_2fr_1fr] px-4 py-3 bg-blue-600 text-white font-semibold uppercase">
          <p>Name</p>
          <p>Email</p>
          <p>phone</p>
          <p>Designation</p>
          <p>Salary</p>
          <p>Department</p>
          <p>Join Date</p>
          <p className="text-center">Action</p>
        </div>

        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-[2fr_4fr_2fr_3fr_2fr_3fr_2fr_1fr] px-4 py-3 items-center text-gray-700 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                }`}
            >
              <Link to={`profile/${item._id}`} className="font-medium text-blue-600 hover:underline">
                {item.name}
              </Link>

              <p className='flex gap-2'>{item.email}<button className='px-1 bg-slate-600 text-white text-xs rounded-md hover:bg-slate-400'
                onClick={() => {
                  setIsEmailModal(!isEmailModal);
                   setEmployeeDetails(item);
                }}>Send mail</button></p>

              <p>{item.phone}</p>
              <p className="capitalize">{item.designation}</p>
              <p>₹{item.salary.toLocaleString()}</p>
              <p>{item.department?.name || "N/A"}</p>

              <p>{new Date(item.dateOfJoining).toLocaleDateString()}</p>
              <div className="text-center">
                <IoMdRemoveCircleOutline
                  onClick={() => deleteHandle(item._id)}
                  className="text-xl text-red-500 cursor-pointer hover:text-red-700 transition"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500">No employees found.</p>
        )}
      </div>

      {
        isEmailModal && (
          <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96 relative'>
              {/* <button className='px-2' onClick={()=>setIsModal(false)}><IoMdClose className='text-[40px] p-2 absolute top-0 right-0'/></button>
                 */}
              <div>
                <EmailSend employee={emloyeeDetails} setIsEmailModal={setIsEmailModal} isEmailModal={isEmailModal} />
              </div>

            </div>
          </div>
        )
      }



    </div>
  );
};

export default EmployeesList;
