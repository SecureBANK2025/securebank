import { Request, Response, NextFunction } from 'express';
import TransactionModel from '../Models/transactionModel';
import usersModel from '../Models/usersModel';
import asyncHandler from "express-async-handler";

export const depositMoney = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { amount } = req.body;
    const userId = req.params.id;

    if (!userId || !amount || amount <= 0) {
        res.status(400).json({ message: "Invalid amount" });
        return;
    }

    const user = await usersModel.findById(userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    user.balance += amount;
    await user.save();

    const transaction = await TransactionModel.create({
        userId,
        type: "deposit",
        amount,
        date: new Date(),
    });

    res.status(200).json({
        message: "Deposit successful",
        transaction,
        balance: user.balance,
    });
});

export const withdrawMoney = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { amount } = req.body;
    const userId = req.params.id;

    if (!userId || !amount || amount <= 0) {
        res.status(400).json({ message: "Invalid amount" });
        return;
    }
    const user = await usersModel.findById(userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

     if (user.balance! < amount) {
        res.status(400).json({ message: "Insufficient balance" });
        return;
    }

     user.balance! -= amount;
    await user.save();

     const transaction = await TransactionModel.create({
        userId,
        type: "withdraw",
        amount,
        date: new Date(),
    });

    res.status(200).json({
        message: "Withdrawal successful",
        transaction,
        balance: user.balance,
    });
});


//transferMoney

export const transferMoney = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { amount, username } = req.body;
    const senderId = req.params.id;
     
    if (!senderId || !username || !amount || amount <= 0) {
        res.status(400).json({ message: "Invalid request parameters" });
        return;
    }

     const sender = await usersModel.findById(senderId);
    const recipient = await usersModel.findOne({ username: username });

    if (!sender) {
        res.status(404).json({ message: "Sender not found" });
        return;
    }
    if (!recipient) {
        res.status(404).json({ message: "Recipient not found" });
        return;
    }

     if (sender.balance! < amount) {
        res.status(400).json({ message: "Insufficient balance" });
        return;
    }

     sender.balance! -= amount;
     recipient.balance += amount;

    await sender.save();
    await recipient.save();

     await TransactionModel.create([
        {
            userId: sender._id,
            type: "transfer",
            direction:"sent",
            amount: amount,  
            date: new Date(),
            receiverId: recipient._id, 
            
        },
        {
            userId: recipient._id,
            type: "transfer",
            direction:"received",
            amount: amount,  
            date: new Date(),
            receiverId: sender._id, 
            
        }
    ]);

    res.status(200).json({
        message: "Transfer successful",
        senderBalance: sender.balance,
        recipientBalance: recipient.balance,
    });
});

//get history of transactions

export const getTransactionHistory = asyncHandler(async (req: Request, res: Response) => {
    const  userId  = req.params.id; 
    const transactions = await TransactionModel.find({ userId }).sort({ date: -1 });
    
    res.status(200).json({data : transactions });
});
