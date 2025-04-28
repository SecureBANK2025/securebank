import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import AccountModel from "../Models/accountModel";
import usersModel from '../Models/usersModel';
import { Types } from "mongoose";

const generateCardNumber = () => {
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
};

const generateIBAN = (userId: string) => {
    return `EG${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`;
};

export const createAccount = asyncHandler(async (req: Request, res: Response) => {
    const { type, currency } = req.body;
    const  userId  = req.params.id;

    if (!userId || !type || !currency) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    const existingAccount = await AccountModel.findOne({ userId, type });
    if (existingAccount) {
        res.status(400).json({ message: "User already has an account of this type" });
        return;
    }

    const user = await usersModel.findById(userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    const accountNum = generateCardNumber();
    const IBAN = generateIBAN(userId);

    const newAccount = await AccountModel.create({
        userId,
        type,
        balance:0,
        currency,
        accountNum,
        IBAN
    });

    user.accounts!.push({ _id: newAccount._id as Types.ObjectId, type });
    await user.save();

    res.status(201).json({ message: "Account created successfully", account: newAccount });
});

export const getUserAccounts = asyncHandler(async (req: Request, res: Response) => {
    const userId  = req.params.id;
    const accounts = await AccountModel.find({ userId });

    res.status(200).json({ data : accounts });
});