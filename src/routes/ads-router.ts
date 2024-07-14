import express, { Request, Response } from "express";
import { ServiceContainer } from "../services/servicesContainer";
import { handleError, validateToken } from "../utils/handleErrors";

const routerAds = express.Router();
const adServices = ServiceContainer.getAdController();

/**
 * @swagger
 * /ads:
 *   get:
 *     summary: Retrieve the list of ads
 *     tags:
 *       - Ads
 *     responses:
 *       200:
 *         description: List of ads
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       status:
 *                         type: string
 *                       category:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       urlForImage:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
routerAds.get("/", (req: Request, res: Response) => {
  try {
    const ads = adServices.ads;
    res.status(200).send({ list: ads });
  } catch (error) {
    handleError(res, error);
  }
});

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
 * /ads/sold/{adPrimaryKey}:
 *   patch:
 *     summary: Mark an ad as sold
 *     tags:
 *       - Ads
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: your_token_here
 *       - in: path
 *         name: adPrimaryKey
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userReferenceKeyPurchased:
 *                 type: number
 *                 required: true
 *                 example: 123
 *     responses:
 *       200:
 *         description: Ad marked as sold
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ad marked as sold"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
routerAds.patch("/sold/:adPrimaryKey", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  const adPrimaryKey = Number(req.params.adPrimaryKey);
  const userReferenceKeyPurchased = Number(req.body.userReferenceKeyPurchased);

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    adServices.markAsSold(token, adPrimaryKey, userReferenceKeyPurchased);
    res.status(200).json({ message: "Ad marked as sold" });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /ads/{adPrimaryKey}:
 *   patch:
 *     summary: Edit an ad
 *     tags:
 *       - Ads
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: your_token_here
 *       - in: path
 *         name: adPrimaryKey
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 required: true
 *                 example: "price"
 *               newValue:
 *                 type: string
 *                 required: true
 *                 example: "150"
 *     responses:
 *       200:
 *         description: Ad updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ad updated"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
routerAds.patch("/:adPrimaryKey", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  const adPrimaryKey = Number(req.params.adPrimaryKey);
  const { type, newValue } = req.body;

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    adServices.editAd(token, adPrimaryKey, type, newValue);
    res.status(200).json({ message: "Ad updated" });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /ads/{adPrimaryKey}:
 *   delete:
 *     summary: Delete an ad
 *     tags:
 *       - Ads
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: your_token_here
 *       - in: path
 *         name: adPrimaryKey
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Ad deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ad deleted"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
routerAds.delete("/:adPrimaryKey", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  const adPrimaryKey = Number(req.params.adPrimaryKey);

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    adServices.deleteAd(token, adPrimaryKey);
    res.status(200).json({ message: "Ad deleted" });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /ads/{adPrimaryKey}:
 *   get:
 *     summary: Retrieve phone number for a specific ad
 *     tags:
 *       - Ads
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: your_token_here
 *       - in: path
 *         name: adPrimaryKey
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Phone number retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 phone:
 *                   type: string
 *                   example: "123-456-7890"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
routerAds.get("/:adPrimaryKey", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  const adPrimaryKey = Number(req.params.adPrimaryKey);

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    const phoneNumber = adServices.getPhone(token, adPrimaryKey);
    res.status(200).json({ phone: phoneNumber });
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
  res.status(200).json(filteredAds);
});

/**
 * @swagger
 * /ads/category:
 *   get:
 *     summary: Retrieve ads filtered by category
 *     tags:
 *       - Ads
 *     parameters:
 *       - in: query
 *         name: term
 *         required: true
 *         schema:
 *           type: string
 *           example: "Electronics"
 *     responses:
 *       200:
 *         description: List of ads filtered by category
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
 *                   category:
 *                     type: string
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
routerAds.get("/category", (req: Request, res: Response) => {
  const { term } = req.query;

  const filteredAds = adServices.filterAdByCategory(String(term));
  res.status(200).json(filteredAds);
});

/**
 * @swagger
 * /ads/status:
 *   get:
 *     summary: Retrieve ads filtered by status
 *     tags:
 *       - Ads
 *     parameters:
 *       - in: query
 *         name: term
 *         required: true
 *         schema:
 *           type: string
 *           example: "available"
 *     responses:
 *       200:
 *         description: List of ads filtered by status
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
 *                   status:
 *                     type: string
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
routerAds.get("/status", (req: Request, res: Response) => {
  const { term } = req.query;

  const filteredAds = adServices.findAdByStatus(String(term));
  res.status(200).json(filteredAds);
});

/**
 * @swagger
 * /ads/sold:
 *   get:
 *     summary: Retrieve ads that are sold
 *     tags:
 *       - Ads
 *     responses:
 *       200:
 *         description: List of sold ads
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
 *                   status:
 *                     type: string
 *                   sold:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Internal server error
 */
routerAds.get("/sold", (req: Request, res: Response) => {
  try {
    const filteredAds = adServices.findAdBySold();
    res.status(200).json(filteredAds);
  } catch (error) {
    handleError(res, error);
  }
});

export default routerAds;
