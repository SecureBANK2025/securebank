import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import usersModel from '../Models/usersModel';
import {users} from '../Interfaces/usersInterface';
// import {finger} from "../Interfaces/fingerPrintInterface";
// import fingerModel from '../Models/fingerPrintModel';
import { createToken } from '../Utils/createToken';
import {enrollFingerprint} from './enrollFingerprint';
import customErrors from '../Utils/Errors';


export const signUp = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise <void> => {
    
    const fingerId = await enrollFingerprint();
    if (!fingerId) {
        return  next(new customErrors("Fingerprint enrollment failed no Id found",400)); 
    }
    const user: users = await usersModel.create({...req.body , fingerId});
    const token = createToken(user._id);
    res.status(201).json({ token, data: user })


});



