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
      console.log("Invalid Token!");
      return -1;
    }

    const findAd = this._adIstance.findAdByKey(refereceKeyAd);
    if (!findAd) {
      console.log("Ad not found");
      return -1;
    }

    const matchUser: boolean = userToken.getTokenReferenceKeyUser() === findAd.getAdReferenceKeyUser();
    if (!matchUser) {
      console.log("Invalid user");
      return -1;
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
      console.log("Invalid Token!");
      return;
    }

    const reviewKey = this.getReferenceByReview(primaryKeyReview);
    if (!reviewKey) {
      console.log("Key not found!");
      return;
    }

    const matchUser: boolean = userToken.getTokenReferenceKeyUser() === reviewKey.getReviewReferenceKeyUser();
    if (!matchUser) {
      console.log("Invalid User");
      return;
    }

    this._reviews = this._reviews.filter((review) => review.getReviewPrimaryKey() !== primaryKeyReview);
  }

  public getReferenceByReview(primaryKeyReview: number): ReviewModel | undefined {
    return this._reviews.find((review) => review.getReviewPrimaryKey() === primaryKeyReview);
  }
}
