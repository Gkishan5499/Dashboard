import Transaction from "../model/transaction.js";

export const addTransactions = async(req, res)=>{
    try {
        const { amount, transactionType, category, description, date}=req.body;
        if(!amount || !transactionType || !category || !description){
        
            return res.status(400).json({message: "All fields are required"});
        }
        const newTransaction= new Transaction({
            userId: req.user._id,  
            amount,
            transactionType,
            category,
            description,
            date: date ? new Date(date) : new Date() // Default to current date if not provided
        })
        const transaction = await newTransaction.save();
        return res.status(201).json({message: "Transaction added successfully", transaction});


    } catch (error) {
        console.error("Error adding transaction:", error);
        return res.status(500).json({message: "Internal server error"});
        
    }

};

export const getTransactions = async(req, res)=>{
    try {
        const transactions = await Transaction.find({userId:req.user.id});
        return res.status(200).json({success:true, transactions:transactions});

        
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return res.status(500).json({success:false, message: "Internal server error"});
        
    }

}
