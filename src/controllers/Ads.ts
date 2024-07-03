import { AdModel } from "../models/Ad";
import { TokenController } from "./Tokens";
import { ServiceContainer } from "../services/ServicesContainer";

export class AdController {
  private _ads: Array<AdModel> = [];
  private _tokenIstance: TokenController;

  constructor() {
    this._ads = [];
    this._tokenIstance = ServiceContainer.getTokenController();
  }

  public createAd(
    token: number,
    title: string,
    description: string,
    price: number,
    status: string,
    category: string,
    phone: number,
    urlForImage: string,
  ): number {
    const userReference = this._tokenIstance.findReferenceByToken(token);

    const createAd = new AdModel(
      userReference?.userPrimaryKey!,
      title,
      description,
      price,
      status,
      category,
      phone,
      urlForImage,
    );
    this._ads = [...this._ads, createAd];

    return createAd.primaryKey;
  }

  public markAsSold(token: number, adPrimaryKey: number, userReferenceKeyPurchased: number): void {
    const userReference = this._tokenIstance.findReferenceByToken(token);
    const adReference = this.findAdByKey(adPrimaryKey);

    const isUserOwner: boolean = userReference!.userPrimaryKey === adReference!.userReferenceKey;
    if (isUserOwner && !adReference!.userReferenceKeyPurchased) {
      this._ads = this._ads.map((ad) => {
        if (ad.primaryKey === adPrimaryKey) {
          ad.userReferenceKeyPurchased = userReferenceKeyPurchased;
          return ad;
        }
        return ad;
      });
    }
  }

  public editAd(token: number, adPrimaryKey: number, type: string, newValue: any): void {
    const userReference = this._tokenIstance.findReferenceByToken(token);
    const adReference = this.findAdByKey(adPrimaryKey);
    const isUserOwner: boolean = userReference?.userPrimaryKey === adReference?.userReferenceKey;
    if (isUserOwner === false) {
      throw new Error("Ad not found");
    }

    this._ads = this._ads.map((ad) => {
      if (ad.primaryKey === adReference!.primaryKey) {
        switch (type) {
          case "title":
            ad.title = newValue;
            break;
          case "description":
            ad.desciption = newValue;
            break;
          case "price":
            ad.price = newValue;
            break;
          case "status":
            ad.status = newValue;
            break;
          case "category":
            ad.category = newValue;
            break;
          case "phone":
            ad.phone = newValue;
            break;
          case "url":
            ad.urlForImage = newValue;
            break;
          default:
            console.log("Invalid edit type");
            return ad;
        }
      }
      return ad;
    });
  }

  public deleteAd(token: number, adPrimaryKey: number): void {
    const userReference = this._tokenIstance.findReferenceByToken(token);
    const adReference = this.findAdByKey(adPrimaryKey);
    const isUserOwner: boolean = userReference?.userPrimaryKey === adReference?.userReferenceKey;
    if (isUserOwner === false) {
      throw new Error("Ad not found");
    }

    this._ads = this._ads.filter((ad) => ad.primaryKey !== adReference!.primaryKey);
  }

  public filterAdByPrice(min: number, max: number) {
    return this._ads.filter((ads) => ads.price >= min && ads.price <= max);
  }

  public filterAdByCategory(category: string) {
    return this._ads.filter((ads) => ads.category === category);
  }

  public findAdByStatus(status: string) {
    return this.ads.filter((ads) => ads.status === status);
  }

  public findAdBySold() {
    return this._ads.filter((ads) => !ads.userReferenceKeyPurchased);
  }

  public findAdByKey(adPrimaryKey: number): AdModel | undefined {
    const ad = this._ads.find((ad) => ad.primaryKey === adPrimaryKey);
    if (!ad) {
      throw new Error("Ad not found");
    }
    return ad;
  }

  get ads(): ReadonlyArray<AdModel> {
    return [...this._ads];
  }
}
