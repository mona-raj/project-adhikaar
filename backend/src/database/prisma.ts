import { env } from "../config/env";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = env.db_url ?? "";

if (!env.db_url) {
  throw new Error("DATABASE_URL is not configured.");
}

const adapter = new PrismaBetterSqlite3({
  url: env.db_url,
});

export const prisma = new PrismaClient({
  adapter,
});
