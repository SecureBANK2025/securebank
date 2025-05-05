import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import usersModel from '../Models/usersModel';
import {users} from '../Interfaces/usersInterface';
import { createToken } from '../Utils/createToken';
import {enrollFingerprint, verifyFingerprint} from './FingerprintController';
import customErrors from '../Utils/Errors';
import bcrypt from 'bcryptjs';
import Jwt , {JwtPayload} from 'jsonwebtoken';
import crypto from "crypto";
import { sendOTP } from '../Utils/emailService';
import AccountModel from '../Models/accountModel';
import { AnyARecord } from 'dns';



export const signUp = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise <void> => {
    
   
    const fingerId = await enrollFingerprint();
    // const fingerId =5;
    
    if (!fingerId) {
        return  next(new customErrors("Fingerprint enrollment failed no Id found",400)); 
    }
    const user: users = await usersModel.create({...req.body , fingerId});
    
    res.status(201).json({ data: user })


});

const otpStorage = new Map<string, string>();

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise <void> => {
    
    const user = await usersModel.findOne({email:req.body.email});
    if(!user || !(await bcrypt.compare(req.body.PIN,user.PIN))){
        return next(new customErrors("Invalid Email or Password", 401)); 
    }
    const token = createToken(user._id);
    res.status(201).json({ token, message : "logged in successfully"});

});

export const biometricLogin = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise <void> => {
    
    const finger_Id = await verifyFingerprint();
    if (!finger_Id) {
        return  next(new customErrors("Fingerprint not found -auth-",400)); //eeeeeeeeeeeeeeeeeeee
    }

    const user = await usersModel.findOne({fingerId:finger_Id});
    if (!user) {
        return next(new customErrors("User not found", 404));
    }
    // if(!user || !(await bcrypt.compare(req.body.PIN,user.PIN))){
    //     return next(new customErrors("Invalid Email or PIN", 401)); 
    // }
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStorage.set(user.email, otp);
    setTimeout(() => otpStorage.delete(user.email), 5 * 60 * 1000); //5 minutes

    sendOTP(user.email, otp)
        .then(() => {
            res.status(200).json({ 
                success: true,
                message: "OTP sent successfully. Check your email.",
                email: user.email });
        })
        .catch((error) => {
            res.status(500).json({ 
                success: false, 
                error: "Failed to send OTP", 
                details: error.message });
        });
    // const token = createToken(user._id);
    // res.status(201).json({ token, message : "logged in successfully with finger"});

});

interface newRequest extends Request { user?: users; }

export const protectRoute = asyncHandler(async (req:newRequest, res: Response, next: NextFunction): Promise <any> => {
    // 1- check if token found
    let token: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else { return next(new customErrors('login first to access the application', 401)) }
    // 2- check if token not expired
    const decodedToken: any = Jwt.verify(token, process.env.JWT_SECRET_KEY!);
    // 3- check if user exist
    const currentUser = await usersModel.findById(decodedToken._id);
    if (!currentUser) { return next(new customErrors("user doesn't exist", 401)) }

    req.user = currentUser;
    next();

});

export const home = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise <void> => {
    //testing
    res.status(201).json({ message : "You are at home now."});

});

// export const logout = asyncHandler(async (req: Request, res: Response) => {
//     res.clearCookie("token", { httpOnly: true , sameSite: "strict" });
//     res.json({ success: true, message: "Logged out successfully" });
// });

export const verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return next(new customErrors("Email and OTP are required", 400));
    }

    const storedOtp = otpStorage.get(email);
    if (!storedOtp || storedOtp !== otp) {
        return next(new customErrors("Invalid or expired OTP", 401));
    }

    
    const user = await usersModel.findOne({ email });
    if (!user) {
        return next(new customErrors("User not found", 404));
    }

    const token = createToken(user._id);

    
    otpStorage.delete(email);

    res.status(200).json({ success: true, token, message: "OTP verified, logged in successfully" });
};


export const chooseAccount = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const {type} = req.body;
    const userId = req.user?._id;
  
     if (!userId) {
            res.status(400).json({ success: false, message: "user ID not found" });
            return;
    }
    const user = await usersModel.findById(userId);
    if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
    }
    const accounts = user.accounts;
 
   
    if (!accounts) {
        res.status(404).json({ success: false, message: "No accounts found for user" });
        return;
    }

    const chosenAccount = accounts!.find((account: any) => account.type === type);
    if(!chosenAccount){
        res.status(404).json({ message: "chosenAccount not found" });
        return;
    }
    res.status(200).json({ success: true , message: chosenAccount?._id });
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODBmNmE2NmI3M2E1N2JiYTJkZThkMDIiLCJpYXQiOjE3NDYwNjE0NjAsImV4cCI6MTc0NjE0Nzg2MH0.-8qcIpq37SgWLsyLTsiayQIlI1oC1iq9893if9RQ_WQ

