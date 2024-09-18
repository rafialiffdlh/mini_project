import { ITicketPurchase } from "@/interfaces/purchase.interface";
import prisma from "../prisma";
import { Request } from "express";
export class PurchasesService {
  static async getPurchasesService(req: Request) {
    const user_id = req.user.id;
    const data = await prisma.purchases.findMany({
      where: {
        AND: [
          {
            user_id,
          },
          {
            isPurchased: false,
          },
        ],
      },
      include: {
        tickets: {
          select: {
            id: true,
            quantity: true,
            purchase_id: true,
            ticket_type: {
              include: {
                event_venue: {
                  include: {
                    events: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    console.log(data);
    return data;
  }
  static async buyTicketService(req: Request) {
    const { referal_id, purchase_id, total_price } = req.body;
    const user_id = req.user.id;
    await prisma.$transaction(async (trx) => {
      const result = await trx.purchases.update({
        where: {
          id: purchase_id,
        },
        data: {
          user_id,
          isPurchased: true,
          total_price,
          referal_id,
          invoice_no: `INV_${new Date().getTime()}_${purchase_id}`,
        },
      });
      await trx.tickets.updateMany({
        where: { purchase_id: purchase_id },
        data: {
          isPurchased: true,
        },
      });
      return result;
    });

    // return null;
  }

  static async addCartService(req: Request) {
    const { id, quantity, event_venue_id } = req.body;
    console.log(req.body);

    const user_id = req.user.id;

    let prevPurchase = await prisma.purchases.findFirst({
      include: { tickets: true },
      where: {
        AND: [
          {
            isPurchased: false,
          },
          { user_id: user_id },
        ],
      },
    });
    if (prevPurchase) {
      await prisma.$transaction(async (trx) => {
        const prevTicket = prevPurchase.tickets.find((t) => t.type_id === id);
        if (prevTicket) {
          await trx.tickets.update({
            where: {
              id: prevTicket.id,
            },
            data: {
              quantity: quantity + (prevTicket ? prevTicket?.quantity : 0),
            },
          });
        } else {
          await trx.tickets.create({
            data: {
              quantity: quantity,
              purchase_id: prevPurchase.id,
              type_id: id,
            },
          });
        }
      });
    } else {
      console.log(Number(id), Number(quantity));
      await prisma.$transaction(async (trx) => {
        const data = await trx.purchases.create({
          data: {
            user_id,
            isPurchased: false,
            total_price: 0,
          },
        });
        await trx.tickets.create({
          data: {
            type_id: id,
            purchase_id: data.id,
            quantity: quantity,
            isPurchased: false,
          },
        });
      });
    }

    return true;
  }

  static async removeCartService(req: Request) {
    const { purchase_id, ticket_id } = req.body;
    const result = await prisma.tickets.delete({
      where: {
        id: ticket_id,
      },
    });
    return result;
  }
}
