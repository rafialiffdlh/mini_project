import prisma from "../prisma";
import { Request } from "express";
export class PurchasesService {
  static async buyTicketService(req: Request) {
    const { user_id, event_id } = req.body;
    // const result = await prisma.purchases.create({
    //   data: {
    //     user_id,

    //     total_price,
    //   },
    // });
    // return result;
    return null;
  }

  static async addCartService(req: Request) {
    const { user_id, event_id } = req.body;
    // const result = await prisma.tickets.create({
    //   data: {
    //     user_id,
    //   },
    // });
    // return result;
    return null;
  }
}
