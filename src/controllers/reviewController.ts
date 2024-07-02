import { ReviewModel } from "../models/reviewModel";
import { TokenController } from "./tokenController";
import { AdController } from "./adController";
import { ServiceContainer } from "../services/servicesContainer";
import { AdModel } from "../models/adModel";

export class ReviewController {
  private _reviews: ReviewModel[];
  private _tokenIstance: TokenController;
  private _adIstance: AdController;

  constructor() {
    this._reviews = [];
    this._tokenIstance = ServiceContainer.getTokenController();
    this._adIstance = ServiceContainer.getAdController();
  }

  public addReview(token: number, refereceKeyAd: number, title: string, description: string, rating: any): number {
    const userToken = this._tokenIstance.findReferenceByToken(token);
    if (!userToken) {
      throw new Error("Invalid Token!");
    }

    const findAd = this._adIstance.findAdByKey(refereceKeyAd);
    if (!findAd) {
      throw new Error("Ad not found");
    }

    const matchUser: boolean = userToken.getTokenReferenceKeyUser() === findAd.getAdReferenceKeyUser();
    if (!matchUser) {
      throw new Error("Invalid user");
    }

    const newReview = new ReviewModel(
      userToken.getTokenReferenceKeyUser(),
      findAd.getAdPrimaryKey(),
      title,
      description,
      rating,
    );
    this._reviews = [...this._reviews, newReview];
    return newReview.getReviewPrimaryKey();
  }
  //!
  public editReview(token: number, primaryKeyReview: number, type: string, newValue: any) {}

  public removeReview(token: number, primaryKeyReview: number): void {
    const userToken = this._tokenIstance.findReferenceByToken(token);
    if (!userToken) {
      throw new Error("Invalid Token!");
    }

    const reviewKey = this.getReferenceByReview(primaryKeyReview);
    if (!reviewKey) {
      throw new Error("Key not found!");
    }

    const matchUser: boolean = userToken.getTokenReferenceKeyUser() === reviewKey.getReviewReferenceKeyUser();
    if (!matchUser) {
      throw new Error("Invalid User");
    }

    this._reviews = this._reviews.filter((review) => review.getReviewPrimaryKey() !== primaryKeyReview);
  }

  public getReferenceByReview(primaryKeyReview: number): ReviewModel | undefined {
    return this._reviews.find((review) => review.getReviewPrimaryKey() === primaryKeyReview);
  }
}
