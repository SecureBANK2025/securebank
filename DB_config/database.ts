import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 
const database = ()=>{
    // console.log("Database URI:", process.env.DB);
    mongoose.connect(process.env.DB!).then(
        ()=>{
            console.log(`database connected to ${process.env.DB}`);
        }).catch(  (err:Error)=>{
            console.log(err);
        });
}


export default database ;