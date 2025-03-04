import { Request, Response, NextFunction } from "express";
import usersModel from "../Models/usersModel";
import {users}  from "../Interfaces/usersInterface";
import asyncHandler from "express-async-handler";
import { deleteFingerprint } from "./FingerprintController";

export const createUser = asyncHandler(async (req: Request, res: Response, next :NextFunction) => {
    const newUser: users = await usersModel.create(req.body);
    res.status(201).json({ message: "User created successfully"});
});

export const getUsers = asyncHandler(async (req: Request, res: Response, next :NextFunction) => {
    const allUsers = await usersModel.find();
    res.status(200).json({ data : allUsers});
});

export const getUser = asyncHandler(async (req: Request, res: Response, next :NextFunction) => {
    const  user = await usersModel.findById(req.params.id);
    res.status(200).json({ data : user});
});

export const updateUser = asyncHandler(async (req: Request, res: Response, next :NextFunction) => {
    const  user = await usersModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json({ data : user});
});

export const deleteUser = asyncHandler(async (req: Request, res: Response, next :NextFunction): Promise <any> => {
    const  user = await usersModel.findById(req.params.id);
   
    if (user!.fingerId) {
        const fingerprintDeleted = await deleteFingerprint(user!.fingerId);
        
        if (fingerprintDeleted) {
           const user = await usersModel.findByIdAndDelete(req.params.id);
            return res.status(500).json({ message: "User and his finger id deleted" });
        }else{
            res.status(200).json({ massege : "Can't delete user"});
            console.log(user!.fingerId);
        }
    }
    
});