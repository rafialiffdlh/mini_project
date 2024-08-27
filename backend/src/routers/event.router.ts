import { Router } from "express";
import { EventController } from "../controllers/event.controller";

export class EventRouter {
  private router: Router = Router();
  private eventController = new EventController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get("/", this.eventController.get);
    this.router.post("/", this.eventController.create);
    this.router.get("/:id", this.eventController.get);
    this.router.patch("/:id", this.eventController.update);
    this.router.put("/:id", this.eventController.update);
    this.router.delete("/:id", this.eventController.delete);
  }
  public getRouter(): Router {
    return this.router;
  }
}
