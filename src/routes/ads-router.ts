import express, { Request, Response } from "express";
import { ServiceContainer } from "../services/servicesContainer";
import { handleError, validateToken } from "../utils/handleErrors";

const routerAds = express.Router();
const adServices = ServiceContainer.getAdController();

/**
 * @swagger
 * /ads:
 *   post:
 *     summary: Create a new ad
 *     tags:
 *       - Ads
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
 *               title:
 *                 type: string
 *                 required: true
 *                 example: "New Device"
 *               description:
 *                 type: string
 *                 required: true
 *                 example: "This is a new device."
 *               price:
 *                 type: number
 *                 required: true
 *                 example: 123.45
 *               status:
 *                 type: string
 *                 required: true
 *                 example: "available"
 *               category:
 *                 type: string
 *                 required: true
 *                 example: "Electronics"
 *               phone:
 *                 type: string
 *                 required: true
 *                 example: "123-456-7890"
 *               urlForImage:
 *                 type: string
 *                 required: true
 *                 example: "http://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: Ad created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ad created"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
routerAds.post("/", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  const { title, description, price, status, category, phone, urlForImage } = req.body;

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    const newAd = adServices.createAd(token, title, description, price, status, category, phone, urlForImage);
    res.status(200).json({ message: "Ad created", Key: newAd });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /ads/price:
 *   get:
 *     summary: Retrieve ads filtered by price range
 *     tags:
 *       - Ads
 *     parameters:
 *       - in: query
 *         name: min
 *         required: true
 *         schema:
 *           type: number
 *           example: 100
 *       - in: query
 *         name: max
 *         required: true
 *         schema:
 *           type: number
 *           example: 300
 *     responses:
 *       200:
 *         description: List of ads filtered by price range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   title:
 *                     type: string
 *                   price:
 *                     type: number
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */

routerAds.get("/price", (req: Request, res: Response) => {
  const { min, max } = req.query;

  const minPrice = Number(min);
  const MaxPrice = Number(max);
  const filteredAds = adServices.filterAdByPrice(minPrice, MaxPrice);
  res.json(filteredAds);
});

export default routerAds;
