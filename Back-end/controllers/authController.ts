import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import usersModel from '../Models/usersModel';
import {users} from '../Interfaces/usersInterface';
// import {finger} from "../Interfaces/fingerPrintInterface";
// import fingerModel from '../Models/fingerPrintModel';
import { createToken } from '../Utils/createToken';
import {enrollFingerprint, verifyFingerprint} from './FingerprintController';
import customErrors from '../Utils/Errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import newRequest from '../Interfaces/index';


export const signUp = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise <void> => {
    
    const fingerId = await enrollFingerprint();
    if (!fingerId) {
        return  next(new customErrors("Fingerprint enrollment failed no Id found",400)); 
    }
    const user: users = await usersModel.create({...req.body , fingerId});
    const token = createToken(user._id);
    res.status(201).json({ token, data: user })


});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise <void> => {
    
    const user = await usersModel.findOne({cardNum:req.body.cardNum});
    if(!user || !(await bcrypt.compare(req.body.password,user.password))){
        return next(new customErrors("Invalid Email or Password", 401)); 
    }
    const token = createToken(user._id);
    res.status(201).json({ token, message : "logged in successfully"});

});

export const biometricLogin = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise <void> => {
    
    const finger_Id = await verifyFingerprint();
    if (!finger_Id) {
        return  next(new customErrors("Fingerprint not found -auth-",400)); 
    }
    const user = await usersModel.findOne({fingerId:finger_Id});
    if(!user || !(await bcrypt.compare(req.body.password,user.password))){
        return next(new customErrors("Invalid Email or Password", 401)); 
    }
    const token = createToken(user._id);
    res.status(201).json({ token, message : "logged in successfully with finger"});

});

interface newRequest extends Request { user?: users; }

export const protectRoute = asyncHandler(async (req:newRequest, res: Response, next: NextFunction): Promise <void> => {
   let token :string = '';
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
   }else {return next(new customErrors("Please login first",401));}

   const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
   console.log(decodedToken);
   const activeUser = await usersModel.findById(decodedToken._id);
   if(!activeUser){return next(new customErrors("current user is not found",401))}
   req.user = activeUser;
   next();
   
});

export const home = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise <void> => {
    //testing
    res.status(201).json({ message : "You are at home now."});

});