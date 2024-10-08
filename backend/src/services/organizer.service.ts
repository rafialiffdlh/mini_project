import { ITicketModel, ITicketQuery } from "@/interfaces/event.interface";
import prisma from "../prisma";
import { Request } from "express";
import { ErrorHandler } from "../helpers/response.helper";

export class OrganizerService {
  static async createService(req: Request) {
    const {
      title,
      description,
      event_date,
      end_date,
      start_time,
      end_time,
      category_id,
      venue,
      tickets,
      default_discount,
      default_discount_date,
    } = req.body;
    let venue_id: number;
    const { id } = req.user;
    let _image_src = req.file ? req.file.filename : undefined;
    const isVenueId = typeof venue === "string" || typeof venue === "number";
    console.log(isVenueId, typeof venue);

    if (isVenueId) {
      venue_id = Number(venue);
    }

    let ticketQuery: ITicketQuery = {
      createMany: {
        data: [],
      },
    };
    const ticketsData = JSON.parse(tickets) as ITicketModel[];
    ticketsData.map(({ action, ...ticket }) => {
      delete ticket.id;
      ticketQuery.createMany?.data.push({
        ...ticket,
        rest: 0,
        paidTicket: Number(ticket.price) != 0,
      });
    });
    const result = await prisma.$transaction(async (trx) => {
      if (isVenueId) {
        const newEvent = await trx.events.create({
          data: {
            title,
            description,
            event_date: new Date(event_date).toISOString(),
            end_date: end_date ? new Date(end_date).toISOString() : undefined,
            start_time,
            end_time,
            image_src: _image_src,
            category_id: Number(category_id),
            user_id: id,
            default_discount,
            default_discount_date,
          },
        });
        const result = await trx.event_venue.create({
          data: {
            event_id: newEvent.id,
            venue_id: venue_id,
            ticket_type: ticketQuery as any,
          },
        });
        console.log(result);
        return result;
      } else {
        const result = await trx.event_venue.create({
          data: {
            events: {
              create: {
                title,
                description,
                event_date: new Date(event_date).toISOString(),
                end_date: end_date
                  ? new Date(end_date).toISOString()
                  : undefined,
                start_time,
                end_time,
                image_src: _image_src,
                category_id,
                user_id: id,
                default_discount,
                default_discount_date,
              },
            },
            venues: {
              create: {
                name: venue.name,
                address: venue.address,
                lat: venue.lat,
                lon: venue.lon,
                location_id: venue.location_id,
              },
            },
            ticket_type: ticketQuery as any,
          },
        });
        return result;
      }
    });
    return result;
  }

  static async updateService(req: Request) {
    const event_venue_id = req.params.id;
    const {
      id,
      title,
      description,
      event_date,
      end_date,
      start_time,
      end_time,
      category_id,
      venue,
      tickets,
      default_discount,
      default_discount_date,
    } = req.body;
    console.log("cek id event", req.params.id, req.query.id, req.body.id);
    const user_id = req.user.id;
    let _image_src = req.file ? req.file.filename : undefined;
    const dataEvent = await prisma.event_venue.findUnique({
      where: { id: Number(id) },
      include: {
        events: {
          include: { user: true, category: true },
        },
        venues: { include: { location: true } },
        ticket_type: true,
      },
    });
    if (dataEvent) {
      console.log(tickets);
      const ticketsData = JSON.parse(tickets) as ITicketModel[];
      await prisma.$transaction(async (trx) => {
        let venue_id;
        if (typeof venue === "string" || typeof venue === "number") {
          venue_id = Number(venue);
        }
        await trx.event_venue.update({
          where: { id: Number(id) },
          data: {
            events: {
              update: {
                title,
                description,
                event_date: new Date(event_date).toISOString(),
                end_date: end_date
                  ? new Date(end_date).toISOString()
                  : undefined, //new Date(event_date).toISOString(),
                start_time,
                end_time,
                image_src: _image_src,
                category_id: Number(category_id),
                default_discount,
                default_discount_date,
              },
            },
          },
        });
        await trx.event_venue.update({
          where: { id: Number(id) },
          data: {
            venue_id: venue_id,
          },
        });
        for (let index = 0; index < ticketsData.length; index++) {
          const prevTiket = dataEvent.ticket_type.find(
            (x) => x.id === ticketsData[index].id
          );
          if (prevTiket) {
            delete ticketsData[index].action;
            await trx.ticket_type.update({
              where: { id: ticketsData[index].id },
              data: {
                ...ticketsData[index],
              },
            });
          } else {
            if (ticketsData[index].id) {
              await trx.ticket_type.delete({
                where: { id: ticketsData[index].id },
              });
            } else {
              delete ticketsData[index].action;
              delete ticketsData[index].id;
              await trx.ticket_type.create({
                data: {
                  description: ticketsData[index].description,
                  maxNumber: Number(ticketsData[index].maxNumber),
                  price: Number(ticketsData[index].price),
                  event_venue_id: id,
                  name: ticketsData[index].name,
                  rest: 0,
                  paidTicket: Number(ticketsData[index].price) != 0,
                },
              });
            }
          }
        }
        // ticketsData.map(async (ticket) => {
        //   const prevTiket = dataEvent.ticket_type.find(
        //     (x) => x.id === ticketsData[index].id
        //   );
        //   if (prevTiket) {
        //     delete ticket.action;
        //     await trx.ticket_type.update({
        //       where: { id: ticket.id },
        //       data: {
        //         ...ticket,
        //       },
        //     });
        //   } else {
        //     if (ticket.id) {
        //       await trx.ticket_type.delete({
        //         where: { id: ticket.id },
        //       });
        //     } else {
        //       delete ticket.action;
        //       delete ticket.id;
        //       await trx.ticket_type.create({
        //         data: {
        //           description: ticket.description,
        //           maxNumber: Number(ticket.maxNumber),
        //           price: Number(ticket.price),
        //           event_venue_id: id,
        //           name: ticket.name,
        //           rest: 0,
        //           paidTicket: Number(ticket.price) != 0,
        //         },
        //       });
        //     }
        //   }
        // });
      });
    } else {
      throw new ErrorHandler("Event Not Found", 404);
    }
    return null;
  }
  static async deleteService(req: Request) {
    const { id } = req.params;
    if (id) {
    } else {
    }
    return null;
  }
  static async deactivateService(req: Request) {
    const { id } = req.params;

    if (id) {
    } else {
    }
    return null;
  }
}
