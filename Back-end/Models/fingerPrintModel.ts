import mongoose, { Schema, Document } from 'mongoose';
import {finger} from "../Interfaces/fingerPrintInterface";



const fingerSchema:Schema = new Schema<finger>({
    userId: { type: String, required: true, trim: true },
     
    fingerId: { type: String, unique:true,required: true },
    

},{timestamps:true});


const fingerPrintModel = mongoose.model<finger>('FingerPrint', fingerSchema);

export default fingerPrintModel;