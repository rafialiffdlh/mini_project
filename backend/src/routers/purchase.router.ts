import { Router } from "express";
// import { PurchaseController } from "../controllers/purchase.controller";

export class PurchaseRouter {
  private router: Router = Router();
  //   private PurchaseController = new PurchaseController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    // this.router.get("/", this.PurchaseController.get);
    // this.router.post("/", this.PurchaseController.create);
    // this.router.get("/:id", this.PurchaseController.get);
    // this.router.patch("/:id", this.PurchaseController.update);
    // this.router.put("/:id", this.PurchaseController.update);
    // this.router.delete("/:id", this.PurchaseController.delete);
  }
  public getRouter(): Router {
    return this.router;
  }
}
