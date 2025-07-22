import express from 'express';
import { addTransactions, getTransactions } from '../controller/transaction.controller.js';
import { authMiddleware } from '../middleWare/authMiddleware.js';
import { getTransactionsMonthlySummary, getTransactionSummary } from '../controller/transactionSummary.js';

const router =  express.Router();

router.post('/', authMiddleware ,addTransactions);
router.get('/', authMiddleware, getTransactions); 
router.get('/summary',authMiddleware, getTransactionSummary);
router.get('/monthly-summary', authMiddleware, getTransactionsMonthlySummary);


export default router;