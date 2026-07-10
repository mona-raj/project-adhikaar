import { prisma } from "../src/database/prisma";

import { roles } from "./data/roles";
import { services } from "./data/services";
import { languages } from "./data/languages";
import { organizations } from "./data/organizations";

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

  const servicesByCode = new Map(
    (await prisma.service.findMany()).map((service) => [service.code, service]),
  );

  // Organizations
  for (const organization of organizations) {
    const existingOrganization = await prisma.organization.findFirst({
      where: {
        name: organization.name,
        email: organization.email,
      },
    });

    let createdOrganization;

    if (existingOrganization) {
      createdOrganization = existingOrganization;
    } else {
      createdOrganization = await prisma.organization.create({
        data: {
          name: organization.name,
          description: organization.description,
          website: organization.website,
          email: organization.email,
          phone: organization.phone,
        },
      });
    }

    for (const service of organization.services) {
      const serviceEntity = servicesByCode.get(service.serviceCode);

      if (!serviceEntity) {
        throw new Error(`Unknown service code: ${service.serviceCode}`);
      }

      await prisma.organizationService.upsert({
        where: {
          organizationId_serviceId: {
            organizationId: createdOrganization.id,
            serviceId: serviceEntity.id,
          },
        },
        update: {
          isActive: service.isActive,
          genderEligibility: service.genderEligibility,
          languages: {
            set: [],
            connect: service.languages.map((code) => ({
              code,
            })),
          },
        },
        create: {
          organization: {
            connect: {
              id: createdOrganization.id,
            },
          },
          service: {
            connect: {
              id: serviceEntity.id,
            },
          },
          isActive: service.isActive,
          genderEligibility: service.genderEligibility,
          languages: {
            connect: service.languages.map((code) => ({
              code,
            })),
          },
        },
      });
    }
  }

  console.log("Database seeded successfully.");
}

main().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
