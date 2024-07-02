import { AdModel } from "../models/adModel";
import { TokenController } from "./tokenController";
import { ServiceContainer } from "../services/servicesContainer";

export class AdController {
  private _ads: AdModel[];
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
    phone: string,
    urlForImage: string,
    referenceKeyUserPurchased: number,
  ): number {
    const referenceKeyUserByToken = this._tokenIstance.findReferenceByToken(token);

    if (!referenceKeyUserByToken) {
      throw new Error("Invalid Token");
    }
    const primaryKeyAd = Math.floor(Math.random() * 1000);
    const currentDate = new Date();
    const newAd = new AdModel(
      primaryKeyAd,
      referenceKeyUserByToken?.getTokenReferenceKeyUser()!,
      title,
      description,
      currentDate,
      price,
      status,
      category,
      phone,
      urlForImage,
      referenceKeyUserPurchased,
    );

    this._ads = [...this._ads, newAd];
    return newAd.getAdPrimaryKey();
  }

  public markAsSold(token: number, primaryKeyAd: number, referenceKeyUserPurchased: number): void | number {
    const userToken = this._tokenIstance.findReferenceByToken(token);
    if (!userToken) {
      throw new Error("Invalid Token!");
    }

    const adKey = this._ads.find((key) => key.getAdPrimaryKey() === primaryKeyAd);
    if (!adKey) {
      throw new Error("Ad not Found");
    }

    const isUser: boolean = userToken.getTokenReferenceKeyUser() === adKey.getAdReferenceKeyUser();
    if (isUser && !adKey.getAdReferenceKeyUserPurchased()) {
      this._ads = this._ads.map((ad) => {
        if (ad.getAdPrimaryKey() === primaryKeyAd) {
          const updatedAd = new AdModel(
            adKey.getAdPrimaryKey(),
            adKey.getAdReferenceKeyUser(),
            adKey.getAdTitle(),
            adKey.getAdDescription(),
            adKey.getAdDate(),
            adKey.getAdPrice(),
            adKey.getAdStatus(),
            adKey.getAdCategory(),
            adKey.getAdPhone(),
            adKey.getAdUrlForImage(),
            referenceKeyUserPurchased,
          );
          return updatedAd;
        }
        return ad;
      });
      return adKey.getAdPrimaryKey();
    }
  }

  public editAd(token: number, primaryKeyAd: number, type: string, newValue: any): void | number {
    const referenceUser = this._tokenIstance.findReferenceByToken(token);
    if (!referenceUser) {
      throw new Error("Invalid Token");
    }

    const findAdAndMatchUser = this._ads.find(
      (ad) =>
        ad.getAdPrimaryKey() === primaryKeyAd &&
        ad.getAdReferenceKeyUser() === referenceUser.getTokenReferenceKeyUser(),
    );
    if (!findAdAndMatchUser) {
      throw new Error("Not Found");
    }

    this._ads = this._ads.map((ad) => {
      if (ad.getAdPrimaryKey() === primaryKeyAd) {
        const updatedAd = new AdModel(
          ad.getAdPrimaryKey(),
          ad.getAdReferenceKeyUser(),
          ad.getAdTitle(),
          ad.getAdDescription(),
          ad.getAdDate(),
          ad.getAdPrice(),
          ad.getAdStatus(),
          ad.getAdCategory(),
          ad.getAdPhone(),
          ad.getAdUrlForImage(),
          ad.getAdReferenceKeyUserPurchased(),
        );

        switch (type) {
          case "title":
            updatedAd.setAdTitle(newValue);
            break;
          case "description":
            updatedAd.setAdDesciption(newValue);
            break;
          case "price":
            updatedAd.setAdPrice(newValue);
            break;
          case "status":
            updatedAd.setAdStatus(newValue);
            break;
          case "category":
            updatedAd.setAdCategory(newValue);
            break;
          case "phone":
            updatedAd.setAdPhone(newValue);
            break;
          case "url":
            updatedAd.setAdUrlForImage(newValue);
            break;
          default:
            console.log("Invalid edit type");
            return ad;
        }
        return updatedAd;
      }
      return ad;
    });
    console.log("Ad updated successfully");
    return findAdAndMatchUser.getAdPrimaryKey();
  }

  public deleteAd(token: number, primaryKeyAd: number): void {
    const referenceUser = this._tokenIstance.findReferenceByToken(token);
    if (!referenceUser) {
      throw new Error("Invalid Token");
    }

    const findUser = this._ads.find((key) => key.getAdReferenceKeyUser() === referenceUser.getTokenReferenceKeyUser());
    if (!findUser) {
      throw new Error("User not found!");
    }

    this._ads = this._ads.filter((ad) => ad.getAdPrimaryKey() !== primaryKeyAd);
  }

  public findAdByKey(refereceKeyAd: number): AdModel | undefined {
    return this._ads.find((ads) => ads.getAdPrimaryKey() === refereceKeyAd);
  }

  public getAds(): ReadonlyArray<AdModel> {
    return [...this._ads];
  }
}
