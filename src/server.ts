import express, { Request, Response } from "express";
import routerUser from "./routes/users-router";
import routerDevice from "./routes/device-router";
import { ServiceContainer } from "./services/servicesContainer";

const userServices = ServiceContainer.getUserController();
const port = process.env.EXPRESS_PORT || 3000;
const railwayUrl = process.env.RAILWAY_URL || "http://localhost";
const app = express();
const server = express.json();

app.use(server);

app.use("/auth", routerUser);
app.use("/device", routerDevice);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => console.log(`${railwayUrl}:${port}`));
