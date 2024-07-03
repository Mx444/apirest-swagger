import { FavoriteModel } from "../models/Favorite";
import { ServiceContainer } from "../services/ServicesContainer";
import { AdController } from "./Ads";
import { TokenController } from "./Tokens";

export class FavoriteController {
  private _favorites: Array<FavoriteModel> = [];
  private _tokenIstance: TokenController;
  private _adIstance: AdController;
  constructor() {
    this._favorites = [];
    this._tokenIstance = ServiceContainer.getTokenController();
    this._adIstance = ServiceContainer.getAdController();
  }

  public createFavorite(token: number, adReferenceKey: number): number | undefined {
    const userReference = this._tokenIstance.findReferenceByToken(token);
    const adReference = this._adIstance.findAdByKey(adReferenceKey);
    const isUserOwner: boolean = userReference!.userPrimaryKey === adReference!.userReferenceKey;
    if (isUserOwner === false) {
      throw new Error("Ad not found");
    }
    const createFavorite = new FavoriteModel(userReference!.userPrimaryKey, adReference!.primaryKey);
    this._favorites = [...this._favorites, createFavorite];

    return createFavorite.primaryKey;
  }

  public removeFavorite(token: number, favoriteReferenceKey: number) {
    const userReference = this._tokenIstance.findReferenceByToken(token);
    const favoriteReference = this.findReferenceByFavoriteKey(favoriteReferenceKey);
    const isUserOwner: boolean = userReference!.userPrimaryKey === favoriteReference!.userReferenceKey;
    if (isUserOwner === false) {
      throw new Error("Favorite not found");
    }
    this._favorites = this._favorites.filter((fav) => fav.primaryKey !== favoriteReference.primaryKey);
  }

  public findReferenceByFavoriteKey(favoritePrimaryKey: number) {
    const favorite = this._favorites.find((fav) => fav.primaryKey === favoritePrimaryKey);
    if (!favorite) {
      throw new Error("Favorite not found");
    }
    return favorite;
  }

  get favorites(): ReadonlyArray<FavoriteModel> {
    return [...this._favorites];
  }
}
