import express, {Request, Response} from "express";
import dotenv from "dotenv";
import { database } from "./configurations";
import { HttpError } from "http-errors";
import bodyParser from "body-parser";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoutes/userRoutes";
import postRoutes from "./routes/postRoutes/postRoutes";
import config from "./configurations/config";

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/users", userRouter);
app.use("/post", postRoutes);

app.get("/", (request: Request, response: Response) => {
  response.send("Express on Vercel");
});

database
  .sync({})
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err: HttpError) => {
    console.log(err);
  });

app.listen(config.PORT, () => {
  console.log(`server running on Port ${config.PORT}`);
});
