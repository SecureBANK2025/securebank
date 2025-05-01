
import  {users} from "./usersInterface";
declare module 'express' {
  interface Request {
    user?: users;
  }
}