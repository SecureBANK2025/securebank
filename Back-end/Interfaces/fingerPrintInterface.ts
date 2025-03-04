import{Document}from 'mongoose';


export interface finger extends Document{
    userId: string;
    fingerId: string;
}