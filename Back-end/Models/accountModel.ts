import mongoose, { Schema, model } from "mongoose";
import { Account } from "../Interfaces/accountInterface";

const accountSchema = new Schema<Account>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { 
    type: String, 
    enum: ["current", "savings", "foreign_currency"], 
    required: true 
  },
  balance: { type: Number, default: 0 },
  currency: { type: String, required: true },
  accountNum: { type: String }, 
  IBAN: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const AccountModel = model<Account>("Accounts", accountSchema);
export default AccountModel;