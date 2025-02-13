import { Request, Response, NextFunction } from "express";
import usersModel from "../Models/usersModel";
import {users}  from "../Interfaces/usersInterface";
import asyncHandler from "express-async-handler";

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

export const deleteUser = asyncHandler(async (req: Request, res: Response, next :NextFunction) => {
    const  user = await usersModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ massege : "User deleted"});
});