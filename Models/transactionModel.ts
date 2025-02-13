import { Schema, model } from 'mongoose';
import { transactions } from '../Interfaces/transactionInterface';

const transactionSchema: Schema = new Schema<transactions>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['deposit', 'withdraw','transfer'], required: true }, 
  amount: { type: Number, required: true }, 
  date: { type: Date, default: Date.now } 
}, { timestamps: true });

const transactionModel = model<transactions>('Transaction', transactionSchema);
export default transactionModel;