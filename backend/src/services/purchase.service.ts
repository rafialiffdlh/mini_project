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
    const { tickets } = req.body;
    console.log(req.body);
    console.log(tickets);
    const user_id = req.user.id;
    const ticket_types = tickets as ITicketPurchase[];
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
        for (const ticket in ticket_types) {
          const prevTicket = prevPurchase.tickets.find(
            (t) => t.type_id === ticket_types[ticket].ticket_type_id
          );
          if (prevTicket) {
            await trx.tickets.update({
              where: {
                id: prevTicket.id,
              },
              data: {
                quantity:
                  ticket_types[ticket].quantity +
                  (prevTicket ? prevTicket?.quantity : 0),
              },
            });
          } else {
            await trx.tickets.create({
              data: {
                quantity: ticket_types[ticket].quantity,
                purchase_id: prevPurchase.id,
                type_id: ticket_types[ticket].ticket_type_id,
              },
            });
          }
        }
      });
    } else {
      await prisma.$transaction(async (trx) => {
        await trx.purchases.create({
          data: {
            user_id,
            isPurchased: false,
            total_price: 0,
            tickets: {
              createMany: {
                data: ticket_types.map((ticket) => {
                  return {
                    quantity: ticket.quantity,
                    type_id: ticket.ticket_type_id,
                  };
                }),
              },
            },
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
