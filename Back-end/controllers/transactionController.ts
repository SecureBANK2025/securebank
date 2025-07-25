import { Request, Response, NextFunction } from 'express';
import TransactionModel from '../Models/transactionModel';
import usersModel from '../Models/usersModel';
import AccountModel from '../Models/accountModel';
import customErrors from '../Utils/Errors';
import asyncHandler from "express-async-handler";
import { DateTime } from "luxon";

function generateReferenceCode(): string {
    return Math.floor(1000000 + Math.random() * 9000000).toString();
}

export const depositMoney = asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<any> => {
    const { amount , accountId } = req.body;
    // const userId = req.params.id;
    const userId = req.user?._id; // from token
    if (!userId || !amount || amount <= 0) {
        res.status(400).json({ message: "Invalid amount" });
        return;
    }

    const user = await usersModel.findById(userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    
    await user.save();
    //-----------------------> new <----------------------------
    if (!accountId) {
            return next(new customErrors("Create Account first", 400));
    }
        
    const account = await AccountModel.findById(accountId);
    if (!account) {
        return next(new customErrors("Create Account first", 400));
    }

    account.balance += amount;
    await account.save();

    const transaction = await TransactionModel.create({
        userId,
        refCode:generateReferenceCode(),
        type: "deposit",
        amount,
        date: new Date(),
    });

    res.status(200).json({
        message: "Deposit successful",
        transaction,
        balance: account.balance,
    });
});

export const withdrawMoney = asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<any> => {
    const { amount , accountId} = req.body;
    const userId = req.user?._id;

    if (!userId || !amount || amount <= 0 || amount < 50) {
        res.status(400).json({ message: "Invalid amount" });
        return;
    }
    const user = await usersModel.findById(userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    
    //--------------------------> new
    if (!accountId) {
            return next(new customErrors("No Account ID Found", 400));
        }
            
    const account = await AccountModel.findById(accountId);
    if (!account) {
            return  next(new customErrors("Create Account first", 400));
        }

    if(account.balance < amount){
        res.status(400).json({ message: "Insufficient balance" });
      return;
    }

    account.balance -= amount;
    await account.save();

     const transaction = await TransactionModel.create({
        userId,
        refCode:generateReferenceCode(),
        type: "withdraw",
        amount,
        date: new Date(),
    });

    res.status(200).json({
        message: "Withdrawal successful",
        transaction,
        balance: account.balance,
    });
});


//transferMoney 

export const transferMoney = asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const { amount , accountId , accountNum } = req.body;
    const userId = req.user?._id;

    if (!userId ||!amount || !accountNum|| amount <= 0) {
        res.status(400).json({ message: "Invalid request parameters" });
        return;
    }

     const senderAccount = await AccountModel.findById(accountId);
    const recipientAccount = await AccountModel.findOne({accountNum});

    if (!senderAccount) {
        res.status(404).json({ message: "Sender not found" });
        return;
    }
    if (!recipientAccount) {
        res.status(404).json({ message: "Recipient not found" });
        return;
    }

    if(senderAccount.accountNum == accountNum){
        res.status(404).json({ message: "invalid transfer" });
        return;
    }

     if (senderAccount.balance! < amount) {
        res.status(400).json({ message: "Insufficient balance" });
        return;
    }

    senderAccount.balance! -= amount;
    recipientAccount.balance += amount;

    await senderAccount.save();
    await recipientAccount.save();

    const egyptTime = DateTime.now().setZone("Africa/Cairo").toJSDate();
   
     await TransactionModel.create([
        {
            refCode: generateReferenceCode(),
            userId: senderAccount.userId,
            type: "transfer",
            direction:"sent",
            amount: amount,  
            date: egyptTime,
            recipientAccount: recipientAccount.accountNum, 
            
        },
        {
            refCode: generateReferenceCode(),
            userId: recipientAccount.userId,
            type: "transfer",
            direction:"received",
            amount: amount,  
            date: egyptTime,
            senderAccount: senderAccount.accountNum, 
        }
    ]);

    res.status(200).json({
        message: "Transfer successful",
        senderBalance: senderAccount.balance,
        recipientBalance: recipientAccount.balance,
    });
});

//get history of transactions

export const getTransactionHistory = asyncHandler(async (req: any, res: Response) => {
    const userId = req.user?._id;
    const transactions = await TransactionModel.find({ userId }).sort({ date: -1 });
    
    res.status(200).json({data : transactions });
});
