import express from "express";
import cors from "cors";
import { env } from "./env";
import databaseRouter from "./database.router";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/movies", databaseRouter);

app.listen(env.PORT, () => {
  console.log("server started at ", env.NOTION_TOKEN);
  console.log("server started at ", env.PORT);
});
