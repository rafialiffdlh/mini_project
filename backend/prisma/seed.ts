import { user_roles_role } from "@prisma/client";
import prisma from "../src/prisma";
import { users, locations, venues } from "./seedData.json";

export const seedUser = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < users.length; i++) {
      const data = {
        ...users[i],
        gender: users[i].gender as "pria" | "wanita",
        birthDate: new Date(users[i].birthDate).toISOString(),
        user_role: { create: { role: users[i].role as "user" | "organizer" } },
      } as any;
      delete data.id;
      delete data.role;
      // const res = await prisma.$transaction(async (trx) => {
      await trx.users.upsert({
        where: {
          id: users[i].id || 0,
        },
        update: data,
        create: data,
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

const main = async () => {
  await seedUser();
  await seedLocation();
  await seedVenue();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
