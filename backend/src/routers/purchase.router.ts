import { Router } from "express";
import { PurchasesController } from "../controllers/purchase.controller";

export class PurchaseRouter {
  private router: Router = Router();
  private PurchaseController = new PurchasesController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get("/", this.PurchaseController.get);
    this.router.post("/", this.PurchaseController.addToCart);
    this.router.patch("/", this.PurchaseController.buyTicket);
  }
  public getRouter(): Router {
    return this.router;
  }
}
