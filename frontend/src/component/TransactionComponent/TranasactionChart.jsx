import React, { useContext, useEffect, useState } from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import { AppContext } from '../../context/AppContext';
import axios from 'axios';


const TranasactionChart = () => {
    const[monthlySummary , setMonthlySummary] = useState([]);
    const{backendUrl} = useContext(AppContext);

    const getMonthlySummary = async()=>{
        try {
            const token = localStorage.getItem("token");
            if(!token) return;
           const res = await axios.get(`${backendUrl}/api/transaction/monthly-summary`, {
              headers: { Authorization: `Bearer ${token}` },
            });

          if(res.data.success){
            const raw = res.data.monthlySummary;

            const grouped = {};

            raw.forEach(item=>{
                const {month , year , type } = item._id;
                const key = `${year} - ${month}`;
                if(!grouped[key]){
                    grouped[key] = {
                        month: `${year}-${month >10 ? `0${month}`:month}`,
                        income: 0,
                        expense: 0
                    }
                }
                grouped[key][type] = item.totalAmount;
            });
             const chartData = Object.values(grouped);
             setMonthlySummary(chartData);


          }

           

            
        } catch (error) {
            console.log("Inter server", error);
            
        }
    }

    useEffect(()=>
    {

        getMonthlySummary();

    },[])




  return (
     <div style={{ width: "100%", height: 400 }}>
      <h2 className="text-xl mb-4">Monthly Income vs Expenses</h2>
      <ResponsiveContainer>
        <BarChart data={monthlySummary}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#4ade80" name="Income" />
          <Bar dataKey="expense" fill="#f87171" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 

export default TranasactionChart