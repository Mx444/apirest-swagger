import express, { Request, Response } from "express";
import { ServiceContainer } from "../services/servicesContainer";

const userServices = ServiceContainer.getUserController();
const tokenServies = ServiceContainer.getTokenController();
const routerUser = express.Router();

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Get user list
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   type: array
 *                   items:
 *                     type: object
 *                 session:
 *                   type: object
 *                 Token:
 *                   type: array
 *                   items:
 *                     type: string
 */
routerUser.get("/user", (req: Request, res: Response) => {
  res.json({ list: userServices.users, session: userServices.session, Token: tokenServies.tokens });
});

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Signup failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
routerUser.post("/signup", async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    await userServices.signup(email, username, password);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Signup failed" || error });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 Token:
 *                   type: string
 *       400:
 *         description: Login failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
routerUser.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await userServices.login(username, password);
    res.status(200).json({ message: "User logged in successfully", Token: user.userToken });
  } catch (error) {
    res.status(400).json({ error: "Login failed" || error });
  }
});

/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     summary: User Logout
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: integer
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Logout failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
routerUser.delete("/logout", async (req: Request, res: Response) => {
  const reqToken = req.headers.authorization;
  const token = Number(reqToken);
  try {
    await userServices.logout(token);
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: "Login failed" || error });
  }
});

/**
 * @swagger
 * /auth/user:
 *   patch:
 *     summary: Update user information
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - newValue
 *             properties:
 *               type:
 *                 type: string
 *               newValue:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Failed to update user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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

/**
 * @swagger
 * /auth/user:
 *   delete:
 *     summary: Delete user
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Failed to delete user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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
