import { Request, Response, NextFunction } from "express";
export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
  } else {
    next();
  }
};
