import { Document, Types } from "mongoose";

export interface ICertificate extends Document {
    userId: Types.ObjectId;
    accountId: Types.ObjectId;
    issuedAt: Date;
    validUntil: Date;
    type:string;
    status: "valid" | "revoked" | "expired";
    purchaseAmount: number;
    interestRate: number;
    
    
}