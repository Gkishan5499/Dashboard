import Transaction from "../model/transaction.js"

export const getTransactionSummary = async (req, res) => {
    try {
        const incomeResult = await Transaction.aggregate([
            {
                $match:{transactionType:"income"},

            },
            {
             $group:{_id:null, totalIncome:{$sum:"$amount"}}
            }

        ]);
        const expenseResult = await Transaction.aggregate([
            {
                $match:{transactionType:"expense"},
            },
            {
                $group:{_id:null, totalExpense:{$sum:"$amount"}}
            }


        ]);
        const totalIncome = incomeResult.length > 0 ? incomeResult[0].totalIncome : 0;
        const totalExpense = expenseResult.length > 0 ? expenseResult[0].totalExpense :0;

        res.status(200).json({
            success:true,
            totalIncome: totalIncome,
            totalExpense: totalExpense,
            netBalance: totalIncome - totalExpense
        })

        
    } catch (error) {
        console.error("Error fetching transaction summary:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const getTransactionsMonthlySummary = async (req, res) => {
    try {
        const result = await Transaction.aggregate([
            {
                $group:{
                    _id:{
                        month:{$month:"$date"},
                        year:{$year:"$date"},
                        type:"$transactionType"
                    },
                    totalAmount:{$sum:"$amount"}
                }
            },
               {
                  $sort:{
                    "_id.year": 1,
                    "_id.month": 1,
                    }

                
            }
        ]);
        res.status(200).json({success:true, monthlySummary:result});
        
    } catch (error) {

        console.error("Error fetching monthly transaction summary:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        
    }
}