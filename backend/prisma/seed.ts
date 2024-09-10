import prisma from "../src/prisma";
import { users, locations, venues } from "./seedData.json";

export const seedUser = async () => {
  for (let i = 0; i < users.length; i++) {
    const data = {
      ...users[i],
      gender: users[i].gender as "pria" | "wanita",
      role: users[i].role as "user" | "organizer",
      birth_date: new Date(users[i].birthDate),
    };

    const res = await prisma.$transaction(async (trx) => {
      trx.users.upsert({
        create: data,
        where: {
          id: users[i].id,
        },
        update: data,
      });
    });
    console.log(await res);
  }
};
export const seedLocation = async () => {
  for (let i = 0; i < locations.length; i++) {
    const data = {
      ...locations[i],
    };
    await prisma.$transaction(async (trx) => {
      trx.location.upsert({
        create: data,
        where: {
          id: locations[i].id,
        },
        update: data,
      });
    });
  }
};
export const seedVenue = async () => {
  for (let i = 0; i < venues.length; i++) {
    const data = {
      ...venues[i],
    };
    await prisma.$transaction(async (trx) => {
      trx.venues.upsert({
        create: data,
        where: {
          id: venues[i].id,
        },
        update: data,
      });
    });
  }
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
