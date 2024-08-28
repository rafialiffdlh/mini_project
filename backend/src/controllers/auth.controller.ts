import { AuthService } from "../services/auth.service";
import { Request, Response, NextFunction } from "express";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.login(req);

      return res
        .status(200)
        .json({ message: "Login Success", data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.register(req);
      return res
        .status(201)
        .json({ message: "Register Success", data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
