import { userRole } from "../interfaces/user.interface";
import { ErrorHandler } from "../helpers/response.helper";
import { Request, Response, NextFunction } from "express";
export const AuthOrganizerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.user, userRole[req.user.user_role]);
    if (userRole[req.user.user_role] !== "organizer") {
      throw new ErrorHandler("unauthorized", 401);
    }
    next();
  } catch (error) {
    next(error);
  }
};
