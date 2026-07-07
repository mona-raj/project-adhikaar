import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,
  db_url: String(process.env.DATABASE_URL),
};
