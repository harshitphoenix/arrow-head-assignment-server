import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  DATABASE_ID: process.env.DATABASE_ID,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
