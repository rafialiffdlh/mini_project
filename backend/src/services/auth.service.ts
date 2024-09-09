import prisma from "../prisma";
import { gender, Prisma, user_roles_role } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { Request } from "express";
import { IUser, userRole, IUserModel } from "../interfaces/user.interface";
import { ErrorHandler } from "../helpers/response.helper";
import { generateToken } from "../libs/token.lib";

export class AuthService {
  static async login(req: Request) {
    const { phone_number, password, email } = req.body;
    const data = await prisma.users.findFirst({
      where: { OR: [{ phone_number: phone_number }, { email: email }] },

      select: {
        id: true,
        email: true,
        name: true,
        phone_number: true,
        user_role: { select: { role: true } },
        password: true,
      },
    });
    if (!data) {
      throw new ErrorHandler("User not found", 404);
    }
    const isMatch = await compare(password, String(data.password));
    if (!isMatch) {
      throw new ErrorHandler("Password incorrect", 400);
    } else {
      const user = {
        ...data,
        user_role: userRole[data.user_role[0].role || "user"],
      } as IUser;
      delete user.password;
      return generateToken(user);
    }
  }
  static async register(req: Request) {
    const { name, email, password, phone_number, role } = req.body;
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

    await prisma.$transaction(async (trx) => {
      const newData = await trx.users.create({ data });

      const newRole = await trx.user_roles.create({
        data: {
          user_id: newData.id,
          role: role.toLowerCase() as unknown as user_roles_role,
        },
      });
    });
    // const newData = await prisma.users.create({ data });

    // const newRole = await prisma.user_roles.create({
    //   data: {
    //     user_id: newData.id,
    //     role: role.toLowerCase() as unknown as user_roles_role,
    //   },
    // });

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
    const data = req.body as IUserModel;
    delete data.user_roles;
    console.log(req);
    if (req.user) {
      const { id } = req.user;
      const exist = await prisma.users.count({
        where: { id: id },
      });
      if (!exist) {
        throw new ErrorHandler("User not found", 404);
      }
      const hashPassword = data.password
        ? await hash(data.password, 10)
        : undefined;
      await prisma.users.update({
        where: { id: id },
        data: {
          name: data.name,
          email: data.email,
          password: hashPassword,
          phone_number: data.phone_number,
          birthDate: data.birthDate,
          gender: (data.gender as unknown as gender) || undefined,
        },
      });
    } else {
      throw new ErrorHandler("Unauthorized", 401);
    }
  }
}
