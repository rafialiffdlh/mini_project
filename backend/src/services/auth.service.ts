import prisma from "../prisma";
import { Prisma } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { Request } from "express";
import { IUser } from "../interfaces/user.interface";
import { ErrorHandler } from "../helpers/response.helper";
import { generateToken } from "../libs/token.lib";

export class AuthService {
  static async login(req: Request) {
    const { phone_number, password } = req.body;
    const user = (await prisma.users.findFirst({
      where: { phone_number: phone_number },
    })) as IUser;
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }
    const isMatch = await compare(password, String(user.password));
    if (!isMatch) {
      throw new ErrorHandler("Password incorrect", 400);
    } else {
      delete user.password;
    }
    return generateToken(user);
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

  static async getProfile(req: Request) {
    try {
      if (req.user) {
        const { id } = req.user;
        const user = (await prisma.users.findFirst({
          where: { id: id },
        })) as IUser;
        if (!user) {
          throw new ErrorHandler("User not found", 404);
        }
        delete user.password;
        return user;
      } else {
        throw new ErrorHandler("Unauthorized", 401);
      }
    } catch (error) {
      throw new ErrorHandler(error, 500);
    }
  }

  static async updateProfile(req: Request) {
    const data = req.body as IUser;
    console.log(req);
    if (req.user) {
      const { id } = req.user;
      const user = (await prisma.users.findFirst({
        where: { id: id },
      })) as IUser;
      if (!user) {
        throw new ErrorHandler("User not found", 404);
      }

      await prisma.users.update({
        where: { id: id },
        data: data,
      });
    } else {
      throw new ErrorHandler("Unauthorized", 401);
    }
  }
}
