import mongoose, { Document } from 'mongoose';

export interface transactions extends Document {
  userId: mongoose.Types.ObjectId;
  refCode:string;
  type: "deposit" | "withdraw" | "transfer";
  amount: number;
  date: Date;
  senderAccount?: string;
  recipientAccount?: string;
  direction?: "sent" | "received"; // NEW FIELD
}