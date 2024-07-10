import express, { Request, Response } from "express";
import { ServiceContainer } from "../services/servicesContainer";

const userServices = ServiceContainer.getUserController();
const routerUser = express.Router();

routerUser.get("/users", (req: Request, res: Response) => {
  res.json({ list: userServices.users });
});

routerUser.post("/signup", async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const signup = userServices.signup(email, username, password);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Signup failed" });
  }
});

routerUser.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const login = userServices.login(username, password);
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(400).json({ error: "Login failed" });
  }
});
export default routerUser;
