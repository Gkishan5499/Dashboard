import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const rupee = "₹";
    const [items, setItems] = useState([]);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [projectItems, setProjectItems] = useState([]);
    const [projectCount, setProjectCount] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [transactionCount, setTransactionCount] = useState(0);
    const[totalIncome , setTotalIncome] = useState(0);
    const[totalExpense , setTotalExpense] = useState(0);
    const[netBalance , setNetBalance] = useState(0);


    // User login
    const login = (user) => {
        setUser(user);
        localStorage.setItem("token", user.token);

    };
    


    // User logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    // Verify user
    const userVerify = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            const res = await axios.get(`${backendUrl}/api/user/verify`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("User Verify Response:", res);

            if (res.data.success) {
                setUser(res.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.log("User Verify Error:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Get Employees List
    const getlist = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) return;

            const res = await axios.get(`${backendUrl}/api/employee/employee-list`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success) {
               setItems(res.data.data);
               setEmployeeCount(res.data.data.length);

            }
        } catch (error) {
            console.log("Employee List Error:", error);
        }
    };

    // Get Projects List
    const getProjects = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) return;

            const res = await axios.get(`${backendUrl}/api/project/all-projects`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success) {
                setProjectItems(res.data.project);
                setProjectCount(res.data.project.length);
            }
        } catch (error) {
            console.log("Project List Error:", error);
        }
    };

     const getTransaction = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) return;

            const res = await axios.get(`${backendUrl}/api/transaction/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success) {
                     setTransactions(res.data.transactions);
                setTransactionCount(res.data.transactions.length);
            }
        } catch (error) {
            console.log("Project List Error:", error);
        }
    };

//    Transaction Summary 

   const getTransactionSummary = async()=>{
      try {
        const token = localStorage.getItem("token");
         if(!token) return;
         const res = await axios.get(`${backendUrl}/api/transaction/summary`, {
            headers: { Authorization: `Bearer ${token}` },
         });

         if(res.data.success){
            setTotalIncome(res.data.totalIncome);
            setTotalExpense(res.data.totalExpense);
            setNetBalance(res.data.netBalance);
         }
            
        
      } catch (error) {
        console.log("Transaction Summary Error:", error);

      }
   }


    // ✅ Load Data on Mount
    useEffect(() => {
        userVerify().then(() => {
            getlist();
            getProjects();
            getTransaction();
            getTransactionSummary();
        });


    }, []);



    const value = {
        backendUrl,
        items,
        setItems,
        setEmployeeCount,
        employeeCount,
        projectItems,
        setProjectItems,
        setProjectCount,
        projectCount,
        rupee,
        user,
        login,
        logout,
        loading,
        getlist,
        transactions,
        setTransactions,
        transactionCount,
        setTransactionCount,
        totalExpense,
        totalIncome,
        netBalance
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export const useAuth = () => useContext(AppContext);
