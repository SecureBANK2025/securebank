import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import usersModel from '../Models/usersModel';
import {users} from '../Interfaces/usersInterface';
import { createToken } from '../Utils/createToken';
import {enrollFingerprint, verifyFingerprint} from './FingerprintController';
import customErrors from '../Utils/Errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import { sendOTP } from '../Utils/emailService';



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
        return  next(new customErrors("Fingerprint not found -auth-",400)); 
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
    setTimeout(() => otpStorage.delete(user.email), 2 * 60 * 1000); //2 minutes

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
