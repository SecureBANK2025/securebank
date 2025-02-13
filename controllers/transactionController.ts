import { Request, Response, NextFunction } from 'express';
import TransactionModel from '../Models/transactionModel';
import usersModel from '../Models/usersModel';
import asyncHandler from "express-async-handler";
import {transactions}  from "../Interfaces/transactionInterface";

export const depositMoney = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId, amount } = req.body;

        // Validate input
        if (!userId || !amount || amount <= 0) {
             res.status(400).json({ message: "Invalid userId or amount" });
        }

        // Find the user
        const user = await usersModel.findById(userId);
        if (!user) {
             res.status(404).json({ message: "User not found" });
        }

        // Update user's balance
        if (user) {
            user.balance += amount;
            await user.save();
        }

        // Create transaction record
        const transaction = await TransactionModel.create({
            userId,
            type: "deposit",
            amount,
            date: new Date(),
        });

        res.status(200).json({
            message: "Deposit successful",
            balance: user ? user.balance : 0,
            transaction,
        });
    } catch (error) {
        next(error);
    }
});

//transferMoney

export const transferMoney = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { senderId, receiverId, amount } = req.body;

    if (!senderId || !receiverId || amount <= 0) {
            res.status(400).json({ message: "Invalid input data" });
    }

    const sender = await usersModel.findById(senderId);
    const receiver = await usersModel.findById(receiverId);

    if (!sender || !receiver) {
            res.status(404).json({ message: "Sender or receiver not found" });
    }

    if (sender && sender.balance < amount) {
            res.status(400).json({ message: "Insufficient balance" });
    }

    if (sender && receiver) {
        sender.balance -= amount;
        receiver.balance += amount;
    }

    if (sender) {
        await sender.save();
    }
    if (receiver) {
        await receiver.save();
    }

    const transaction = await TransactionModel.create({
        userId: senderId,
        receiverId: receiverId,
        type: "transfer",
        amount,
        date: new Date(),
    });

    res.status(201).json({
        message: "Transfer successful",
        senderBalance: sender ? sender.balance : 0,
        receiverBalance: receiver ? receiver.balance : 0,
        transaction,
    });
});
