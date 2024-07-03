import { UserModel } from "./userModel";
import { AdModel } from "./adModel";

export class FavoriteModel {
  private _primaryKey: number;
  private _userReferenceKey: UserModel["_primaryKey"];
  private _adReferenceKey: AdModel["_primaryKey"];

  constructor(userReferenceKey: UserModel["_primaryKey"], adReferenceKey: AdModel["_primaryKey"]) {
    this._primaryKey = Math.floor(Math.random() * 1000);
    this._userReferenceKey = userReferenceKey;
    this._adReferenceKey = adReferenceKey;
  }

  get primaryKey() {
    return this._primaryKey;
  }

  set primaryKey(val: number) {
    this._primaryKey = val;
  }

  get userReferenceKey() {
    return this._userReferenceKey;
  }

  set userReferenceKey(val: UserModel["_primaryKey"]) {
    this._userReferenceKey = val;
  }

  get adReferenceKey() {
    return this._adReferenceKey;
  }

  set adReferenceKey(val: AdModel["_primaryKey"]) {
    this._adReferenceKey = val;
  }
}
