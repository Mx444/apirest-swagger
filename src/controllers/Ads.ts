import { AdModel } from "../models/Ad";
import { TokenController } from "./Tokens";
import { ServiceContainer } from "../services/ServicesContainer";
import { UserModel } from "../models/User";
import { TokenModel } from "../models/Token";

export class AdController {
  private _ads: ReadonlyArray<Readonly<AdModel>>;
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
          return { ...ad, _userReferenceKeyPurchased: userReferenceKeyPurchased };
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
            return { ...ad, _title: newValue };
          case "description":
            return { ...ad, _desciption: newValue };
          case "price":
            return { ...ad, _price: newValue };
          case "status":
            return { ...ad, _status: newValue };
          case "category":
            return { ...ad, _category: newValue };
          case "phone":
            return { ...ad, _phone: newValue };
          case "url":
            return { ...ad, _urlForImage: newValue };
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

  public getPhone(token: number, adPrimaryKey: number) {
    const userReference = this._tokenIstance.findReferenceByToken(token);
    const adReference = this.findAdByKey(adPrimaryKey);

    const isUserOwner: boolean = userReference?.userPrimaryKey === adReference?.userReferenceKey;
    if (isUserOwner === false) {
      const newLead = userReference.userPrimaryKey;
      this._ads = this._ads.map((ad) => {
        if (ad.primaryKey === adReference.primaryKey) {
          return { ...ad, _lead: [...ad.lead, newLead] };
        }
        return ad;
      });
      return adReference.phone;
    }
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

  public findAdByKey(adPrimaryKey: number) {
    const ad = this._ads.find((ad) => ad.primaryKey === adPrimaryKey);
    if (!ad) {
      throw new Error("Ad not found");
    }
    return ad;
  }

  get ads() {
    return [...this._ads];
  }
}
