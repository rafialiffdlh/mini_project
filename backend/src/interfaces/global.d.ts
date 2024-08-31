import { IUser, IUserDetail } from "./user.interface";
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
