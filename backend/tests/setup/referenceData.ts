import { seedDatabase } from "../../prisma/seed";
import { clearReferenceData } from "./database";

export async function setupReferenceData() {
  await clearReferenceData();
  await seedDatabase();
}
