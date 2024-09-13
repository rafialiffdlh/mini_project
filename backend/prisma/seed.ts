import { user_roles_role } from "@prisma/client";
import prisma from "../src/prisma";
import { users, locations, venues, categories } from "./seedData.json";

export const seedUser = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < users.length; i++) {
      const data = {
        ...users[i],
        gender: users[i].gender as "pria" | "wanita",
        birthDate: new Date(users[i].birthDate).toISOString(),
        user_role: { create: { role: users[i].role as "user" | "organizer" } },
      } as any;
      if (
        await trx.users.findUnique({
          where: { id: users[i].id },
          select: { name: true },
        })
      )
        delete data.id;
      else {
        data.id = await trx.users.findFirst({
          where: { name: users[i].name },
          select: { id: true },
        });
      }

      delete data.role;
      await trx.users.upsert({
        create: data,
        where: {
          id: users[i].id,
        },
        update: data,
      });
    }
  });
};
export const seedLocation = async () => {
  const data = await prisma.$transaction(async (trx) => {
    for (let i = 0; i < locations.length; i++) {
      const data = {
        ...locations[i],
      };
      await trx.location.upsert({
        create: data,
        where: {
          id: locations[i].id,
        },
        update: data,
      });
    }
  });
  console.log(data);
};
export const seedVenue = async () => {
  const data = await prisma.$transaction(async (trx) => {
    for (let i = 0; i < venues.length; i++) {
      const data = {
        ...venues[i],
      };

      await trx.venues.upsert({
        create: data,
        where: {
          id: venues[i].id,
        },
        update: data,
      });
    }
  });
  console.log(data);
};

export const seedCategory = async () => {
  const data = await prisma.$transaction(async (trx) => {
    for (let i = 0; i < categories.length; i++) {
      const data = {
        ...categories[i],
      };

      await trx.category.upsert({
        create: data,
        where: {
          id: categories[i].id,
        },
        update: data,
      });
    }
  });
  console.log(data);
};

const main = async () => {
  await seedUser();
  await seedLocation();
  await seedVenue();
  await seedCategory();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
