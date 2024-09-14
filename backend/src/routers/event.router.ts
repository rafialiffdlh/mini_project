import { Router } from "express";
import { EventController } from "../controllers/event.controller";

export class EventRouter {
  private router: Router = Router();
  private eventController = new EventController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    // this.router.get("/", this.eventController.get);
    this.router.get("/", this.eventController.getBySearch);
    this.router.get("/category", this.eventController.getCategories);
    this.router.get("/venue", this.eventController.getVenues);
    this.router.get("/location", this.eventController.getBySearch);
    this.router.get("/:id", this.eventController.getById);
  }
  public getRouter(): Router {
    return this.router;
  }
}
