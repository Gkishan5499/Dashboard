import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const TransactionFrom =({isModal, setIsModal }) =>{
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const{backendUrl} = useContext(AppContext)

  const handleSubmit = async (e) => {
  
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const res =  await axios.post(backendUrl+'/api/transaction/',
        {
          amount,
          transactionType: 'income',
          category,
          description,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(res.data.success){
        console.log('Income added successfully:', res.data);
        alert('Income added successfully!');

      }
      // Clear form
      setAmount('');
      setCategory('');
      setDescription('');
      setDate('');
      setIsModal(false) // Close modal

    } catch (err) {
      console.error(err);
      alert('Failed to add income.');
    }
  };

  if (!isModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl mb-4">Add Income</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModal(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Add Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default TransactionFrom;