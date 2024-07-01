export class ReviewModel {
  private _primaryKey: number;
  private _referenceKeyUser: number;
  private _referenceKeyAd: number;
  private _title: string;
  private _description: string;
  private _time: any;
  private _rating: any;

  constructor(referenceKeyUser: number, referenceKeyAd: number, title: string, description: string, rating: any) {
    this._primaryKey = Math.floor(Math.random() * 1000);
    this._referenceKeyUser = referenceKeyUser;
    this._referenceKeyAd = referenceKeyAd;
    this._title = title;
    this._description = description;
    this._time = new Date();
    this._rating = rating;
  }

  public getReviewPrimaryKey(): number {
    return this._primaryKey;
  }

  public getReviewReferenceKeyUser(): number {
    return this._referenceKeyUser;
  }

  public getReviewReferenceKeyAd(): number {
    return this._referenceKeyAd;
  }

  public getReviewTitle(): string {
    return this._title;
  }

  public getReviewDescription(): string {
    return this._description;
  }

  public getReviewTime(): any {
    return this._time;
  }

  public getReviewRating(): any {
    return this._rating;
  }
}
