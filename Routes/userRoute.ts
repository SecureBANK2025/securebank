import express from "express";
import { createUser ,getUsers,getUser,updateUser,deleteUser} from "../controllers/usersController";
import { userValidationRules } from "../validators/usersValidator";


const userRouter = express.Router();


userRouter.route('/')
.post( userValidationRules, createUser)
.get(getUsers);
userRouter.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)

export default userRouter;
