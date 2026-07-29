import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";

dotenv.config({
  path: envFile,
});

export const env = {
  port: Number(process.env.PORT) || 3000,
  db_url: String(process.env.DATABASE_URL),
};
