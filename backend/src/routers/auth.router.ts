import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import validator from "validator";
import { validateAuth } from "@/middlewares/authValidator.middleware";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";
import { AuthMiddleware } from "@/middlewares/auth.middleware";

export class AuthRouter {
  private router: Router = Router();
  private authController = new AuthController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.post(
      "/login",
      validateAuth(loginSchema),
      this.authController.login
    );
    this.router.post(
      "/register",
      validateAuth(registerSchema),
      this.authController.register
    );
    this.router.get("/profile", AuthMiddleware, this.authController.profile);
    this.router.patch(
      "/profile",
      AuthMiddleware,
      this.authController.updateProfile
    );
    this.router.put(
      "/profile",
      AuthMiddleware,
      this.authController.updateProfile
    );
  }
  public getRouter(): Router {
    return this.router;
  }
}
