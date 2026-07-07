import { prisma } from "../src/database/prisma";

import { roles } from "./data/roles";
import { services } from "./data/services";
import { languages } from "./data/languages";

async function main() {
  console.log("Seeding database...");

  // Roles
  await Promise.all(
    roles.map((role) =>
      prisma.role.upsert({
        where: {
          name: role.name,
        },
        update: {
          description: role.description,
        },
        create: role,
      }),
    ),
  );

  // Services
  await Promise.all(
    services.map((service) =>
      prisma.service.upsert({
        where: {
          code: service.code,
        },
        update: {
          name: service.name,
          description: service.description,
        },
        create: service,
      }),
    ),
  );

  // Languages
  await Promise.all(
    languages.map((language) =>
      prisma.language.upsert({
        where: {
          code: language.code,
        },
        update: {
          name: language.name,
        },
        create: language,
      }),
    ),
  );

  console.log("Database seeded successfully.");
}

main().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
