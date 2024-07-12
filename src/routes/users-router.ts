import express, { Request, Response } from "express";
import { ServiceContainer } from "../services/servicesContainer";

const userServices = ServiceContainer.getUserController();
const tokenServies = ServiceContainer.getTokenController();
const routerUser = express.Router();

const handleError = (res: Response, error: any) => {
  console.error(error);
  res.status(400).json({ error: error.message || "An error occurred" });
};

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Get list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
routerUser.get("/user", (req: Request, res: Response) => {
  try {
    res.json({
      list: userServices.users,
      session: userServices.session,
      Token: tokenServies.tokens,
    });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       400:
 *         description: Error occurred
 */
routerUser.post("/signup", (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    userServices.signup(email, username, password);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *                   type: number
 *       400:
 *         description: Error occurred
 */
routerUser.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await userServices.login(username, password);
    res.status(200).json({ message: "User logged in successfully", Token: user.userToken });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     tags:
 *       - default
 *     summary: auth/logout
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         schema:
 *           type: integer
 *         example: 716
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 *       '400':
 *         description: Authorization header missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authorization header missing"
 */

routerUser.delete("/logout", (req: Request, res: Response) => {
  const token = req.headers.authorization;
  console.log("Received token:", token);

  if (!token) {
    return res.status(400).json({ error: "Authorization header missing" });
  }

  try {
    userServices.logout(Number(token));
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /auth/user:
 *   patch:
 *     summary: Update a user
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: integer
 *         description: User's authorization token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               newValue:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Error occurred
 */
routerUser.patch("/user", (req: Request, res: Response) => {
  const token = Number(req.headers.authorization);
  const { type, newValue } = req.body;
  try {
    userServices.editUser(token, type, newValue);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /auth/user:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: integer
 *         description: User's authorization token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Error occurred
 */
routerUser.delete("/user", (req: Request, res: Response) => {
  const token = Number(req.headers.authorization);
  const { username, password } = req.body;
  try {
    userServices.removeUser(token, username, password);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
});

export default routerUser;
