import express, { Request, Response } from "express";
import routerUser from "./routes/users-router";
import { ServiceContainer } from "./services/servicesContainer";

const userServices = ServiceContainer.getUserController();
const app = express();
const server = express.json();

app.use(server);
app.use("/api", routerUser);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello World");
});

app.listen(3000, () => console.log("http://localhost:3000"));
