import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    transactionType: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }

}, {timestamps: true});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;