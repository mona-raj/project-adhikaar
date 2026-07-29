import { prisma } from "../../src/database/prisma";

// export async function resetDatabase(): Promise<void> {
//   // Delete child tables first
//   await prisma.referral.deleteMany();
//   await prisma.recommendation.deleteMany();
//   await prisma.case.deleteMany();
//   await prisma.helpRequest.deleteMany();

//   // Join tables
//   await prisma.organizationService.deleteMany();

//   // Parent tables
//   await prisma.organization.deleteMany();
//   await prisma.user.deleteMany();
//   await prisma.role.deleteMany();
//   await prisma.language.deleteMany();
//   await prisma.service.deleteMany();
// }

export async function clearRuntimeData() {
  await prisma.referral.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.case.deleteMany();
  await prisma.helpRequest.deleteMany();
  await prisma.user.deleteMany();
}

export async function clearReferenceData() {
  await prisma.organizationService.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.role.deleteMany();
  await prisma.language.deleteMany();
  await prisma.service.deleteMany();
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
}
