import { Router } from "express";
import { OrganizerController } from "../controllers/organizer.controller";
import { uploader } from "../libs/uploader.lib";

export class OrganizerRouter {
  private router: Router = Router();
  private organizerController = new OrganizerController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.post("/", this.organizerController.create);
    this.router.patch(
      "/:event_id",
      uploader("EVENTS", "event").single("image"),
      this.organizerController.update
    );
    this.router.put(
      "/:event_id",
      uploader("EVENTS", "event").single("image"),
      this.organizerController.update
    );
    this.router.delete("/:event_id", this.organizerController.delete);
  }
  public getRouter(): Router {
    return this.router;
  }
}
