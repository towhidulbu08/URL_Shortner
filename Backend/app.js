import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectMongoDb from "./src/config/mongo.config.js";
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import auth_routes from "./src/routes/auth.routes.js";
import router from "./src/routes/shortUrl.routes.js";
import { attachUser } from "./src/utils/attachUser.js";
import { errorHandler } from "./src/utils/errorHandler.js";
dotenv.config();
connectMongoDb();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);
app.use("/api/auth", auth_routes);
app.use("/api/create", router);

app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

//GET=> Redirection
// POST=> Create short url
