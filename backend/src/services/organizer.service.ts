import { IUser } from "@/interfaces/user.interface";
import prisma from "../prisma";
import { Request } from "express";

export class OrganizerService {
  static async createService(req: Request) {
    const { id } = req.params;
    const {
      title,
      description,
      event_date,
      duration,
      category_id,
      image_src,
      venue,
    } = req.body;
    if (id && (await this.checkAuthorization(req.user))) {
      let venue_id: number,
        insertQuery,
        isVenueExist = Number.isInteger(venue);

      if (isVenueExist) {
        venue_id = Number(venue);
      } else {
        insertQuery = {
          data: {
            events: {
              create: {
                title,
                description,
                event_date,
                duration,
                image_src,
                category_id,
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
          },
        };
      }

      const result = await prisma.$transaction(async (trx) => {
        if (isVenueExist) {
          const { id } = await trx.events.create({
            data: {
              title,
              description,
              event_date,
              duration,
              image_src,
              category_id,
            },
          });
          await trx.event_venue.create({
            data: {
              event_id: id,
              venue_id: venue_id,
            },
          });
        } else {
          trx.event_venue.create({
            data: {
              events: {
                create: {
                  title,
                  description,
                  event_date,
                  duration,
                  image_src,
                  category_id,
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
            },
          });
        }
      });
      return result;
    }
  }

  static async updateService(req: Request) {
    const { id } = req.params;
    if (id && (await this.checkAuthorization(req.user))) {
    } else {
    }
    return null;
  }
  static async deleteService(req: Request) {
    const { id } = req.params;
    if (id && (await this.checkAuthorization(req.user))) {
    } else {
    }
    return null;
  }
  static async deactivateService(req: Request) {
    const { id } = req.params;

    if (id && (await this.checkAuthorization(req.user))) {
    } else {
    }
    return null;
  }

  private static async checkAuthorization(user?: IUser) {
    let isAuthorized = false;
    if (user) {
      isAuthorized = (user.user_role as unknown as string) === "organizer";
    }
    return isAuthorized;
  }
}
