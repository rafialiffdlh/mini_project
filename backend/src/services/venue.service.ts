import prisma from "../prisma";
import { Request } from "express";

export class VenueService {
  static async getVenueService(req: Request) {
    const { search = "", page, limit } = req.query;
    let whereQuery = {};
    if (search) {
      whereQuery = {
        include: { location: true },
        where: {
          OR: [
            { name: { contains: String(search) } },
            { location: { fullName: { contains: String(search) } } },
          ],
        },
      };
    }
    if (req.query.page || req.query.limit) {
      whereQuery = {
        ...whereQuery,
        take: Number(limit),
        skip: Number(page) * Number(limit),
      };
    }
    const data = await prisma.venues.findMany(whereQuery);
    console.log("venue", data);
    return data;
  }

  static async getLocationService(req: Request) {
    const { search = "", page, limit } = req.query;
    let whereQuery = {};
    if (location) {
      whereQuery = {
        where: {
          fullName: { contains: String(search) },
        },
      };
    }
    if (req.query.page || req.query.limit) {
      whereQuery = {
        ...whereQuery,
        take: limit ? Number(limit) : undefined,
        skip: page ? Number(page) * Number(limit) : undefined,
      };
    }
    const data = await prisma.location.findMany(whereQuery);
    console.log("location", data);
    return data;
  }

  static async getCategoriesService(req: Request) {
    const { search = "", page, limit } = req.query;
    console.log("category", req);
    let whereQuery = {};
    whereQuery = {
      where: {
        name: { contains: String(search) },
      },
    };
    if (req.query.page || req.query.limit) {
      whereQuery = {
        ...whereQuery,
        take: limit ? Number(limit) : undefined,
        skip: page ? Number(page) * Number(limit) : undefined,
      };
    }
    const data = await prisma.category.findMany(whereQuery);
    console.log("category", data);
    return data;
  }
}
