import express, { Request, Response } from "express";
import { ServiceContainer } from "../services/servicesContainer";
import { handleError, validateToken } from "../utils/handleErrors";

const routerFavorites = express.Router();
const favoritesServices = ServiceContainer.getFavoriteController();

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add a favorite
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: your_token_here
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adReferenceKey:
 *                 type: string
 *                 example: your_ad_reference_key_here
 *     responses:
 *       200:
 *         description: Favorite added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Favorite added"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
routerFavorites.post("", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  const { adReferenceKey } = req.body;

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    favoritesServices.createFavorite(token, adReferenceKey);
    res.status(200).json({ message: "Favorite added" });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /favorites/{favoritePrimaryKey}:
 *   delete:
 *     summary: Delete a favorite
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: your_token_here
 *       - in: path
 *         name: favoritePrimaryKey
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Favorite deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Favorite deleted"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
routerFavorites.delete("/:favoritePrimaryKey", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  const favoritePrimaryKey = Number(req.params.favoritePrimaryKey);

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    favoritesServices.removeFavorite(token, favoritePrimaryKey);
    res.status(200).json({ message: "Favorite deleted" });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Retrieve the list of favorites
 *     tags:
 *       - Favorites
 *     responses:
 *       200:
 *         description: List of favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   userReferenceKey:
 *                     type: string
 *                   adReferenceKey:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */
routerFavorites.get("", (req: Request, res: Response) => {
  //users/:reference/favorites
  try {
    res.status(200).send(favoritesServices.favorites);
  } catch (error) {
    handleError(res, error);
  }
});
export default routerFavorites;
