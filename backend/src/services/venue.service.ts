import { IUser } from "@/interfaces/user.interface";
import prisma from "../prisma";
import { Request } from "express";
import { skip } from "node:test";

export class VenueService {
  static async getVenueService(req: Request) {
    const { search, page = 1, limit = 10 } = req.query;
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
    // await prisma.venues.findMany({

    //   where: {
    //     OR: [
    //       { name: { contains: String(search) } },
    //       { location: { fullName: { contains: String(search) } } },
    //     ],
    //   },
    // });
    const data = await prisma.venues.findMany(whereQuery);

    return data;
  }

  static async getLocationService(req: Request) {
    const { search, page = 1, limit = 10 } = req.query;
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
        take: Number(limit),
        skip: Number(page) * Number(limit),
      };
    }
    const data = await prisma.location.findMany(whereQuery);

    return data;
  }
}
