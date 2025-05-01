import { Schema, model } from 'mongoose';
import { transactions } from '../Interfaces/transactionInterface';
//bahy
const transactionSchema: Schema = new Schema<transactions>({
  userId: { type:  Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["deposit", "withdraw", "transfer"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  senderAccount: { type: String },
  recipientAccount: { type:  String},
  direction: { type: String, enum: ["sent", "received"]}, 
}, { timestamps: true });

const transactionModel = model<transactions>('Transaction', transactionSchema);
export default transactionModel;