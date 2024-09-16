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
      image_src,
      venue,
      tickets,
      default_discount,
      default_discount_date,
    } = req.body;
    let venue_id: number;
    const { user_id } = req.user;
    console.log("ticket", tickets);
    let _image_src: string;
    if (req.file) {
      _image_src = req.file.filename;
    }
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
    ticketsData.map((ticket) => {
      delete ticket.id;
      ticketQuery.createMany?.data.push({
        ...ticket,
      });
    });
    const result = await prisma.$transaction(async (trx) => {
      if (isVenueId) {
        const newEvent = await trx.events.create({
          data: {
            title,
            description,
            event_date: new Date(event_date).toISOString(),
            end_date: new Date(end_date).toISOString(),
            start_time,
            end_time,
            image_src: _image_src ?? image_src,
            category_id,
            user_id,
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
                end_date: new Date(end_date).toISOString(),
                start_time,
                end_time,
                image_src: _image_src ?? image_src,
                category_id,
                user_id,
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
    const { event_id } = req.params;
    const {
      title,
      description,
      event_date,
      end_date,
      start_time,
      end_time,
      category_id,
      image_src,
      venue,
      tickets,
      default_discount,
      default_discount_date,
    } = req.body;
    const { id } = req.user;
    if (
      (await prisma.events.findUnique({
        where: { id: Number(event_id) },
        select: { user_id: true },
      })) === id
    ) {
      let ticketQuery: ITicketQuery = {
        createMany: {
          data: [],
        },
      };
      const ticketsData = tickets as ITicketModel[];
      await prisma.$transaction(async (trx) => {
        await trx.event_venue.update({
          where: { id: Number(event_id) },
          data: {
            events: {
              update: {
                title,
                description,
                event_date: new Date(event_date).toISOString(),
                end_date: new Date(event_date).toISOString(),
                start_time,
                end_time,
                image_src,
                category_id,
              },
            },
          },
        });

        ticketsData.map((ticket) => {
          if (ticket.action === "create") {
          }
          delete ticket.id;
          const query: ITicketQuery = {};
        });
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
