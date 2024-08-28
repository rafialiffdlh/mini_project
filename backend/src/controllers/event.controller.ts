import { Request, Response, NextFunction } from "express";
import { EventService } from "../services/event.service";
export class EventController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await EventService.getService(req);
      return res
        .status(200)
        .json({ message: "Get Event Success", data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await EventService.createService(req);
      return res.status(201).json({ message: "Create Event Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await EventService.updateService(req);
      return res.status(200).json({ data, message: "Update Event Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await EventService.deleteService(req);
      return res.status(200).json({ message: "Delete event Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
