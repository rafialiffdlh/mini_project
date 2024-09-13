import { OrganizerService } from "../services/organizer.service";
import { Request, Response, NextFunction } from "express";

export class OrganizerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await OrganizerService.createService(req);
      return res.status(201).json({ data, message: "Create Event Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await OrganizerService.updateService(req);
      return res.status(200).json({ data, message: "Update Event Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await OrganizerService.deleteService(req);
      return res.status(200).json({ message: "Delete event Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
