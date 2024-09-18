import {
  ITicketPurchase,
  ITicketPurchaseModel,
} from "@/interfaces/purchase.interface";
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
    const data = req.body as ITicketPurchaseModel[];
    const user_id = req.user.id;
    console.log(data[0].ticket_type);
    await prisma.$transaction(async (trx) => {
      const total = data.reduce(
        (total, curr) =>
          curr.quantity * Number(Number(curr.ticket_type.price ?? 0)) + total,
        0
      );

      const result = await trx.purchases.update({
        where: {
          id: data[0].purchase_id,
        },
        data: {
          user_id,
          isPurchased: true,
          // referal_id,
          total_price: total,
          invoice_no: `INV_${new Date().getTime()}_${data[0].purchase_id}`,
        },
      });
      await trx.tickets.updateMany({
        where: { purchase_id: data[0].purchase_id },
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
            tickets: {
              create: {
                type_id: id,

                quantity: quantity,
                isPurchased: false,
              },
            },
          },
        });
        // await trx.tickets.create({
        //   data: {
        //     type_id: id,
        //     purchase_id: data.id,
        //     quantity: quantity,
        //     isPurchased: false,
        //   },
        // });
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
