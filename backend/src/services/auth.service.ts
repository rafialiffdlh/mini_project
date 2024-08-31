import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import {} from "../config";
import { compare, hash } from "bcrypt";
import { Request } from "express";

export class AuthService {
  static async login(req: Request) {
    return null;
  }
  static async register(req: Request) {
    const { name, email, password, phone_number } = req.body;
    const hashPassword = await hash(password, 10);
    const data: Prisma.usersCreateInput = {
      name,
      email,
      password: hashPassword,
      phone_number,
    };

    // if (req?.file) {
    //   const image = req.file;
    //   data.image = image.filename;
    // }

    await prisma.users.create({ data });

    return null;
  }
}
