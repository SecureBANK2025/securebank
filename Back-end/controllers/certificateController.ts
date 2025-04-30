import { Request, Response } from "express";
import CertificateModel from "../Models/certificateModel";
import UserModel from "../Models/usersModel";
import AccountModel from "../Models/accountModel";
import customErrors from "../Utils/Errors";
import asyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";

const calculateValidUntil = (): Date => {
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);
    return endDate;
};

export const doToCertificate = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { userId, operation , accountId , certificateId} = req.body;

    

    if (!operation) {
        return res.status(400).json({success: false , message :"choose an operation " });
    }

    const user = await UserModel.findByIdAndUpdate(userId);
    if (!user) {
        return res.status(400).json({success: false , message :"user not found" });
    }

    const account = await AccountModel.findById(accountId);
    if (!account) {
        return  res.status(400).json({success: false , message :"account not found" });
    }

    const certificate = await CertificateModel.findById(certificateId);
   
    if (!certificate) {
        return res.status(400).json({success: false , message :"certificate not found" });
    }
    
    

    if (operation === "redeem") {
        const currentDate = new Date();

        
        if (certificate.validUntil <= currentDate) {
             
            const totalProfit = (certificate.purchaseAmount * certificate.interestRate) / 100;
            const totalAmount = certificate.purchaseAmount + totalProfit;
            
           
            account.balance += totalAmount;

             
            certificate.status = "expired";
            await certificate.save();
        } else {
            
            account.balance += certificate.purchaseAmount;  
 
            certificate.status = "revoked"; 
            await certificate.save();
        }

        await account.save();

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId, 
            { $pull: { certificateId: certificateId } }, 
            { new: true } 
        );
    
        if (!updatedUser) {
            return res.status(400).json({success: false , message :"Certificate not found in user's certificates" });
        }
        await user.save();

        const deleteCertificate = await CertificateModel.findByIdAndDelete (certificateId)
       
        res.status(200).json({
            success: true,
            message: "Certificate redeemed successfully",
            certificate,
            balance: account.balance,
        });
    } else {
        return new customErrors("Invalid operation", 400);
    }
});

// Buy Certificate
export const buyCertificate = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { userId, purchaseAmount , accountId  } = req.body;
    const certificateType = "Yearly";
    const interestRate = 15 ;

    // validate id and purchesAmount ------------------------><------------

     
    const user = await UserModel.findById(userId);
    if (!user) {
        return res.status(400).json({success: false , message :"user not found" });
    }
    

   
    if (!accountId) {
        return res.status(400).json({success: false , message :"account not found" });
    }
    
    const account = await AccountModel.findById( accountId );

    if (account!.balance < purchaseAmount) {
        return res.status(400).json({success: false , message :"Insufficient balance in the selected account" });
    }

    
    account!.balance -= purchaseAmount;
    await account!.save();
    
   
    const validUntil = calculateValidUntil();

    const certificate = await CertificateModel.create({
        userId,
        accountId,
        certificateType,
        issuedAt: new Date(),
        validUntil,
        status: "valid",
        purchaseAmount,
        interestRate
        }); 

    user.certificateId!.push( certificate._id  as ObjectId );
    await user.save();

    res.status(201).json({
        success: true,
        message: "Certificate purchased successfully",
        certificate,
        maturityDate: validUntil
    });
});

// Get User Certificates
export const getUserCertificates = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({success: false , message :"user id is required" });
    }

    const certificates = await CertificateModel.find({ userId });

    res.status(200).json({
        success: true,
        data: certificates
    });
});