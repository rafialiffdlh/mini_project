import { Router } from "express";
// import { OrganizerController } from "../controllers/organizer.controller";

export class OrganizerRouter {
  private router: Router = Router();
  //   private organizerController = new OrganizerController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    // this.router.get("/", this.organizerController.get);
    // this.router.post("/", this.organizerController.create);
    // this.router.get("/:id", this.organizerController.get);
    // this.router.patch("/:id", this.organizerController.update);
    // this.router.put("/:id", this.organizerController.update);
    // this.router.delete("/:id", this.organizerController.delete);
  }
  public getRouter(): Router {
    return this.router;
  }
}
