import { IUser } from "@/interfaces/user.interface";
import prisma from "../prisma";
import { Request } from "express";
export class EventService {
  static async getService(req: Request) {
    const { location, type, page = 1, limit = 10 } = req.query;
    if (location || type) {
      await prisma.events.findMany({
        include: {
          event_venue: {
            include: {
              events: {
                select: {
                  title: true,
                },
              },
              venues: {
                select: {
                  location: {
                    select: {
                      fullName: true,
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          event_venue: {
            every: {
              OR: [
                {
                  venues: {
                    location: {
                      fullName: { contains: String(location) },
                    },
                  },
                },
                { events: { category: {} } },
              ],
            },
          },
        },
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
      });
    } else {
    }
    return null;
  }

  static async getByIdService(req: Request) {
    const { id } = req.params;
    if (id) {
    } else {
    }
    return null;
  }
  static async getByQueryService(req: Request) {
    const { location, type } = req.query;
    if (location || type) {
    } else {
    }
    return null;
  }

  static async getBySearchService(req: Request) {
    const { search, limit = 10, page = 1 } = req.query;
    const data = await prisma.event_venue.findMany({
      include: {
        events: {
          select: {
            id: true,
            title: true,
            event_date: true,
            description: true,
            duration: true,
            image_src: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        venues: {
          select: {
            location: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
      where: {
        OR: [
          {
            events: {
              OR: [
                { title: { contains: String(search) } },

                { category: { name: { contains: String(search) } } },
              ],
            },
          },
          {
            venues: {
              location: {
                fullName: { contains: String(search) },
              },
            },
          },
        ],
      },

      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });
    const {} = data;
    return {};
  }

  static async createService(req: Request) {
    const { id } = req.params;
    const { title, description, event_date, duration, category } = req.body;
    if (id && (await this.checkAuthorization(req.user))) {
    } else {
    }
    return null;
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
