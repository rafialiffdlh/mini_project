import { Request, Response, NextFunction } from "express";
import { EventService } from "../services/event.service";
import { VenueService } from "../services/venue.service";
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

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await EventService.getByIdService(req);
      return res
        .status(200)
        .json({ message: "Get Event By Id Success", data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getBySearch(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await EventService.getBySearchService(req);
      return res
        .status(200)
        .json({ message: "Get Event By Search Success", data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req);
      const data = await VenueService.getCategoriesService(req);
      return res
        .status(200)
        .json({ message: "Get Event Category Success", data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getVenues(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await VenueService.getVenueService(req);
      return res
        .status(200)
        .json({ message: "Get Event Venue Success", data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
