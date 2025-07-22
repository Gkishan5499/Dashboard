import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { AppContext } from '../../context/AppContext';


const EmailSend =({isEmailModal, setIsEmailModal , employee}) =>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
//   const{backendUrl} = useContext(AppContext)
  

//   const handleSubmit = async (e) => {
  
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem('token');

//       const res =  await axios.post(backendUrl+'/api/transaction/',
//         {
//           amount,
//           transactionType: 'expense',
//           category,
//           description,
//           date,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if(res.data.success){
//         console.log('Expense added successfully:', res.data);
//         alert('Expense added successfully!');

//       }
//       // Clear form
//       setAmount('');
//       setCategory('');
//       setDescription('');
//       setDate('');
//       setIsExpenseModal(false) // Close modal

//     } catch (err) {
//       console.error(err);
//       alert('Failed to add income.');
//     }
//   };

  if (!isEmailModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl mb-4">Send Email</h2>
        <form  className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter-Name"
            value={employee.name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={employee.email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2"
            required
          />

           <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2"
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2"
            required
          />

         

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEmailModal(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
             Send Mail
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EmailSend;