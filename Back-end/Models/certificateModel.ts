import mongoose, { Schema } from 'mongoose';
import { ICertificate } from '../Interfaces/certificateInterface';

const certificateSchema = new Schema<ICertificate>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    accountId:{type: Schema.Types.ObjectId,
        ref: 'User',},
    issuedAt: {
        type: Date,
        default: Date.now
    },
    validUntil: {
        type: Date
    },
    status: {
        type: String,
        enum: ['valid', 'revoked', 'expired'],
        default: 'valid'
    },
    type :{type :String},
    purchaseAmount: {
        type: Number,
        required:true,
        min: 5000
    },
    interestRate: {
        type: Number,
        required:  true    
    } 
}, {
    timestamps: true
});


const CertificateModel = mongoose.model<ICertificate>('Certificate', certificateSchema);

export default CertificateModel;