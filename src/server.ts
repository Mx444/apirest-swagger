import express, { Request, Response } from "express";
import routerUser from "./routes/users-router";
import routerDevice from "./routes/device-router";
import { ServiceContainer } from "./services/servicesContainer";
import { setupSwagger } from "./docs/swagger";
import cors from "cors";

const userServices = ServiceContainer.getUserController();

const port = process.env.EXPRESS_PORT || 3000;
const railwayUrl = process.env.RAILWAY_URL || "http://localhost";
const app = express();

app.use(express.json());

const corsOptions = {
  origin: `*`,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

setupSwagger(app);

app.use("/auth", routerUser);
app.use("/device", routerDevice);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => console.log(`${railwayUrl}:${port}`));
