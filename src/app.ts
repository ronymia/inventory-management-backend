import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

const app: Application = express();

// using cors
app.use(cors());

// parse data =================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rendering ejs
app.set("view engine", "ejs");

// here will be the default routes
app.get("/", (req: Request, res: Response) => {
  res.render("home");
});

// APPLICATION ROUTES
app.use("/api/v1/", router);

export default app;
