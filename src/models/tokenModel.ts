import { UserModel } from "./userModel";

export class TokenModel {
  private _tokenReferenceKeyUser: UserModel["_primaryKey"];
  private _tokenUser: number;

  constructor(tokenReferenceKeyUser: number) {
    this._tokenReferenceKeyUser = tokenReferenceKeyUser;
    this._tokenUser = Math.floor(Math.random() * 1000);
  }

  public getTokenReferenceKeyUser(): number {
    return this._tokenReferenceKeyUser;
  }

  public getToken(): number {
    return this._tokenUser;
  }
}
