import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export class AuthRouter {
  private router: Router = Router();
  private authController = new AuthController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.post("/login", this.authController.login);
    this.router.post("/lregister", this.authController.register);
  }
  public getRouter(): Router {
    return this.router;
  }
}
