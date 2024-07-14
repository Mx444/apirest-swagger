import express, { Request, Response } from "express";
import { ServiceContainer } from "../services/servicesContainer";
import { handleError, validateToken } from "../utils/handleErrors";

const routerReviews = express.Router();
const reviewsServices = ServiceContainer.getReviewController();

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Retrieve all reviews
 *     description: Retrieve all reviews from the system.
 *     tags:
 *       - Reviews
 *     responses:
 *       200:
 *         description: An array of reviews
 */
routerReviews.get("/", (req: Request, res: Response) => {
  res.send(reviewsServices.review);
});

/**
 * @swagger
 * /reviews/purchases/{adReferenceKey}:
 *   post:
 *     summary: Add a new review for a purchase
 *     description: Add a new review for a specific purchase identified by the adReferenceKey.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: adReferenceKey
 *         required: true
 *         schema:
 *           type: integer
 *         description: The advertisement's reference key
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's authorization token
 *       - in: body
 *         name: ReviewData
 *         description: The review details
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - description
 *             - rating
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             rating:
 *               type: integer
 *     responses:
 *       200:
 *         description: Review added successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized access
 */
routerReviews.post("/purchases/:adReferenceKey", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  const adReferenceKey = Number(req.params.adReferenceKey);
  const { title, description, rating } = req.body;

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    reviewsServices.addReview(token, adReferenceKey, title, description, rating);
    res.status(200).json({ message: "Review added" });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /reviews/{reviewPrimaryKey}:
 *   patch:
 *     summary: Edit an existing review
 *     description: Edit the specified fields of an existing review.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: reviewPrimaryKey
 *         required: true
 *         schema:
 *           type: integer
 *         description: The primary key of the review to edit
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's authorization token
 *       - in: body
 *         name: EditData
 *         description: Data to edit in the review
 *         schema:
 *           type: object
 *           required:
 *             - type
 *             - newValue
 *           properties:
 *             type:
 *               type: string
 *             newValue:
 *               type: string
 *     responses:
 *       200:
 *         description: Review edited successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized access
 */
routerReviews.patch("/:reviewPrimaryKey", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  const reviewPrimaryKey = Number(req.params.reviewPrimaryKey);
  const { type, newValue } = req.body;

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    reviewsServices.editReview(token, reviewPrimaryKey, type, newValue);
    res.status(200).json({ message: "Review edited" });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /reviews/{reviewPrimaryKey}:
 *   delete:
 *     summary: Delete an existing review
 *     description: Delete an existing review by its primary key.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: reviewPrimaryKey
 *         required: true
 *         schema:
 *           type: integer
 *         description: The primary key of the review to delete
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's authorization token
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized access
 */
routerReviews.delete("/:reviewPrimaryKey", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  const reviewPrimaryKey = Number(req.params.reviewPrimaryKey);

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    reviewsServices.removeReview(token, reviewPrimaryKey);
    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    handleError(res, error);
  }
});

export default routerReviews;
