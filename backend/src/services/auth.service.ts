import prisma from "../prisma";
import { gender, Prisma, user_roles_role } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { Request } from "express";
import fs from "fs";
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
        gender: true,
        image_src: true,
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
        image: data.image_src,
        gender: gender[data.gender || "pria"],
      } as IUser;
      delete user.password;
      return generateToken(user, "2d");
    }
  }
  static async register(req: Request) {
    const { name, email, password, phone_number, role, referral_number } =
      req.body;
    const hashPassword = await hash(password, 10);
    if (referral_number) {
      const data = await prisma.users.findFirst({ where: { referral_number } });
      if (data)
        await prisma.$transaction(async (trx) => {
          await trx.referral_discount.create({
            data: {
              user_id: data.id,
              isActive: true,
              expiredAt: new Date(
                new Date().setDate(new Date().getDate() + 90)
              ),
              points: 10000,
            },
          });
        });
    }
    const data: Prisma.usersCreateInput = {
      name,
      email,
      password: hashPassword,
      phone_number,
      referral_number: new Date().getTime(),
    };

    // if (req?.file) {
    //   const image = req.file;
    //   data.image = image.filename;
    // }

    await prisma.$transaction(async (trx) => {
      const newData = await trx.users.create({ data });
      // const newData = await trx.users.create({
      //   data: {
      //     name,
      //     email,
      //     password: hashPassword,
      //     phone_number,
      //     referral_number: new Date().getTime(),
      //   },
      // });

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
    if (req.file) {
      data.image_src = req.file.filename;
    }
    console.log(req);
    if (req.user) {
      const { id } = req.user;
      const exist = await prisma.users.findUnique({
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
          image_src: data.image_src,
        },
      });

      if (
        exist.image_src &&
        data.image_src &&
        exist.image_src !== data.image_src
      )
        fs.unlink(
          __dirname + "/../public/images/avatars/" + exist.image_src,
          (err: unknown) => {
            if (err) console.log(err);
          }
        );

      const user = (await prisma.users.findUnique({
        where: {
          id,
        },
      })) as IUser;
      delete user.password;
      const token = generateToken(user, "2d");
      return token;
    } else {
      throw new ErrorHandler("Unauthorized", 401);
    }
  }
}
