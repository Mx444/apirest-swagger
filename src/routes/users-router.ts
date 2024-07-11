import express, { Request, Response } from "express";
import { ServiceContainer } from "../services/servicesContainer";

const userServices = ServiceContainer.getUserController();
const tokenServies = ServiceContainer.getTokenController();
const routerUser = express.Router();

routerUser.get("/user", (req: Request, res: Response) => {
  res.json({ list: userServices.users, session: userServices.session, Token: tokenServies.tokens });
});

routerUser.post("/signup", async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    await userServices.signup(email, username, password);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Signup failed" || error });
  }
});

routerUser.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await userServices.login(username, password);
    res.status(200).json({ message: "User logged in successfully", Token: user.userToken });
  } catch (error) {
    res.status(400).json({ error: "Login failed" || error });
  }
});

routerUser.post("/logout", async (req: Request, res: Response) => {
  const reqToken = req.headers.authorization;
  const token = Number(reqToken);
  try {
    await userServices.logout(token);
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: "Login failed" || error });
  }
});

routerUser.patch("/user", async (req: Request, res: Response) => {
  const reqToken = req.headers.authorization;
  const token = Number(reqToken);
  const { type, newValue } = req.body;

  try {
    await userServices.editUser(token, type, newValue);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to update user" || error });
  }
});

routerUser.delete("/user", async (req: Request, res: Response) => {
  const reqToken = req.headers.authorization;
  const token = Number(reqToken);
  const { username, password } = req.body;

  try {
    await userServices.removeUser(token, username, password);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete user" || error });
  }
});

export default routerUser;
