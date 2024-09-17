import { PurchasesService } from "../services/purchase.service";
import { Request, Response, NextFunction } from "express";

export class PurchasesController {
  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PurchasesService.addCartService(req);
      return res.status(201).json({ data, message: "Add to cart Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async buyTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PurchasesService.buyTicketService(req);
      return res.status(200).json({ data, message: "Buy ticket Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PurchasesService.getPurchasesService(req);
      return res.status(200).json({ data, message: "Get Cart Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
