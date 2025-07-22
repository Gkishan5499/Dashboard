import React, { useContext, useState } from 'react'
// import TransactionForm from '../../component/TransactionComponent/TransactionForm'
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"
import TransactionForm from '../../component/TransactionComponent/TransactionForm';
import { AppContext } from '../../context/AppContext';
import ExpenseFrom from '../../component/TransactionComponent/ExpenseForm';
import { ArrowRightLeft, CameraIcon, HandCoins, Wallet, Wallet2Icon } from 'lucide-react';
import TranasactionChart from '../../component/TransactionComponent/TranasactionChart';

const Transactions = () => {
  const [isModal, setIsModal] = useState(false);
  const [isExpenseModal, setIsExpenseModal] = useState(false);

  const { transactions, transactionCount, totalIncome, totalExpense, netBalance } = useContext(AppContext);
  const rupees = "₹";


  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(dataBlob, "transactions.xlsx");
  };






  return (
    <div className='min-h-screen'>
      <div className='flex justify-between my-2'>
        <div>
          <h1 className='text-3xl font-bold text-center '>Transactions</h1>
        </div>
        <div className='flex gap-4'>
          <button className='px-4 py-1 border cursor-pointer bg-white  text-green-700 text-base shadow-md rounded-md'
            onClick={() => setIsModal(!isModal)}>
            Add Income
          </button>

          <button className='px-4 py-1 border cursor-pointer bg-white text-red-500 text-base shadow-md rounded-md'
            onClick={() => setIsExpenseModal(!isExpenseModal)}>
            Add Expense
          </button>
        </div>
      </div>


      <div className='flex flex-row  gap-5' >
        <div className='w-72 flex p-4 justify-center items-center gap-4 bg-white shadow-md rounded-lg'>
          <div className='flex'>
            <Wallet2Icon color="white" size={48} className='bg-green-600 p-3 rounded-full shadow-sm' />
          </div>
          <div className='flex-1'>
            <h3 className='text-[16px] text-gray-400 font-semibold'>Total Income</h3>
            <p className='text-[24px] font-medium my-2 mx-2'>{rupees}{totalIncome.toLocaleString('en-IN')}</p>
          </div>
        </div>


        <div className='w-72 flex p-4 justify-center items-center gap-4 bg-white shadow-md rounded-lg'>
          <div className='flex'>
            <HandCoins color="white" size={48} className='bg-red-600 p-3 rounded-full shadow-sm' />
          </div>
          <div className='flex-1'>
            <h3 className='text-[16px] text-gray-400 font-semibold'>Total Expenses</h3>
            <p className='text-[24px] font-medium my-2 mx-2'>{rupees}{totalExpense.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className='w-72 flex p-4 justify-center items-center gap-4 bg-white shadow-md rounded-lg'>
          <div className='flex'>
            <Wallet color="white" size={48} className='bg-orange-600 p-3 rounded-full shadow-sm' />
          </div>
          <div className='flex-1'>
            <h3 className='text-[16px] text-gray-400 font-semibold'>Net Profit</h3>
            <p className='text-[24px] font-medium my-2 mx-2'>{rupees}{netBalance.toLocaleString('en-IN')}</p>
          </div>
        </div>


        <div className='w-72 flex p-4 justify-center items-center gap-4 bg-white shadow-md rounded-lg'>
          <div className='flex'>
            <ArrowRightLeft color="white" size={48} className='bg-purple-600 p-3 rounded-full shadow-sm' />
          </div>
          <div className='flex-1'>
            <h3 className='text-[16px] text-gray-400 font-semibold'>Total Transactions</h3>
            <p className='text-[24px] font-medium my-2 mx-2'>{transactionCount}</p>
          </div>
        </div>

      </div>

      {/* Graph  */}

      <div className='flex flex-row my-10'>
        <TranasactionChart />
      </div>

      <div className="flex flex-col mt-16 ">
        <div className='flex justify-between mt-5 mb-4 '>
          <h1 className='text-3xl font-semibold '>All Transaction</h1>
          <button
            onClick={() => downloadExcel(transactions)}
            className="px-2 py-2 bg-gray-200 text-blue-600 rounded"
          >
           Download as Excel
          </button>
        </div>

        <div className='border shadow-sm'>
          <div className='max-h-80 overflow-y-auto relative' >
            <div className='grid grid-cols-[2fr_3fr_3fr_2fr_2fr] border-b gap-2 p-2 font-medium sticky top-0 bg-white z-10 '>
              <p>Amount</p>
              <p>Category</p>
              <p>Date</p>
              <p>Action</p>
              <p>Download</p>

            </div>
            {
              transactions.map((item, index) => (
                <div key={index} className={`grid grid-cols-[2fr_3fr_3fr_2fr_2fr] mb-2 mt-1 gap-2 p-2 font-medium
               ${item.transactionType == "income" ? 'bg-green-100' : 'bg-red-100'} `}>
                  <p>{rupees}{item.amount.toLocaleString('en-IN')}</p>
                  <p>{item.category}</p>
                  <p>{new Date(item.date).toLocaleString()}</p>
                  <p>Delete</p>
                  <p>download</p>


                </div>
              ))
            }
          </div>
        </div>
      </div>


      {
        isModal && (
          <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96 relative'>
              {/* <button className='px-2' onClick={()=>setIsModal(false)}><IoMdClose className='text-[40px] p-2 absolute top-0 right-0'/></button>
                 */}
              <div>
                <TransactionForm setIsModal={setIsModal} isModal={isModal} />
              </div>

            </div>
          </div>
        )
      }

      {
        isExpenseModal && (
          <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96 relative'>
              {/* <button className='px-2' onClick={()=>setIsModal(false)}><IoMdClose className='text-[40px] p-2 absolute top-0 right-0'/></button>
                 */}
              <div>
                <ExpenseFrom setIsExpenseModal={setIsExpenseModal} isExpenseModal={isExpenseModal} />
              </div>

            </div>
          </div>
        )
      }
    </div>


  )
}

export default Transactions