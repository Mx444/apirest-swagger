import { UserModel } from "./userModel";
export class TokenModel {
  private _userPrimaryKey: UserModel["_primaryKey"];
  private _userToken: number;

  constructor(userPrimaryKey: UserModel["_primaryKey"]) {
    this._userPrimaryKey = userPrimaryKey;
    this._userToken = Math.floor(Math.random() * 1000);
  }

  get userPrimaryKey(): UserModel["_primaryKey"] {
    return this._userPrimaryKey;
  }

  get userToken(): number {
    return this._userToken;
  }
}
