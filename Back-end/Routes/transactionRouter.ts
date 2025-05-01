import express from 'express';
import { depositMoney, transferMoney,getTransactionHistory,withdrawMoney } from '../controllers/transactionController';
import { transactionValidationRules } from '../validators/transactionValidator';
import validatorMiddleware from '../validators/validatorMiddleware';
import { protectRoute } from '../controllers/authController';

const transactionRouter = express.Router();
//add protect route at the end

transactionRouter.post('/deposit', protectRoute, depositMoney); 

transactionRouter.post('/withdraw', protectRoute, withdrawMoney);
transactionRouter.post('/transfer',protectRoute , transferMoney);
transactionRouter.get('/history', protectRoute, getTransactionHistory);

export default transactionRouter;