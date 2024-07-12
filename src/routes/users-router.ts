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
 *     tags:
 *       - User GET
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
 *     tags:
 *       - User POST
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
 *     tags:
 *       - User POST
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
routerUser.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = userServices.login(username, password);
    res.status(200).json({ message: "User logged in successfully", Token: user.userToken });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     summary: Logout a user
 *     tags:
 *       - User DELETE
 *     parameters:
 *       - in: header
 *         name: Token
 *         schema:
 *           type: number
 *         required: true
 *         description: User's authorization token
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       400:
 *         description: Error occurred
 *       401:
 *         description: Invalid token
 */
routerUser.delete("/logout", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  console.log("Received token:", tokenString);

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    userServices.logout(token);
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
 *     tags:
 *       - User PATCH
 *     parameters:
 *       - in: header
 *         name: Token
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
 *                 description: Type of field to update (email, username, or password)
 *               newValue:
 *                 type: string
 *                 description: New value for the specified field
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Error occurred
 */
routerUser.patch("/user", (req: Request, res: Response) => {
  const tokenString = Number(req.headers.token);
  const { type, newValue } = req.body;

  const token = validateToken(tokenString, res);
  if (token === null) return;

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
 *     tags:
 *       - User DELETE
 *     parameters:
 *       - in: header
 *         name: Token
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
 *       401:
 *         description: Invalid token
 */
routerUser.delete("/user", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  const { username, password } = req.body;

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    userServices.removeUser(token, username, password);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
});

const validateToken = (tokenString: any, res: Response): number | null => {
  if (!tokenString) {
    res.status(400).json({ error: "Authorization header missing" });
    return null;
  }

  const token = Number(tokenString);

  if (isNaN(token)) {
    res.status(401).json({ error: "Invalid token format - token should be a number" });
    return null;
  }

  return token;
};

export default routerUser;
