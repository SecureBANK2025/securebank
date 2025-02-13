import mongoose, { Document } from 'mongoose';

export interface transactions extends Document {
  userId: mongoose.Schema.Types.ObjectId; 
  receiverId: mongoose.Schema.Types.ObjectId;
  type: 'deposit' | 'withdraw' | 'transfer';
  amount: number;
  date: Date;
}
