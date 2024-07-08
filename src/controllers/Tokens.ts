import { TokenModel } from "../models/Token";
import { UserModel } from "../models/User";

export class TokenController {
  private _tokens: ReadonlyArray<Readonly<TokenModel>>;

  constructor() {
    this._tokens = [];
  }

  public generateAndStoreToken(userReferenceKey: UserModel["_primaryKey"]): number {
    const createToken = new TokenModel(userReferenceKey);
    this._tokens = [...this._tokens, createToken];
    return createToken.userToken;
  }

  public removeToken(tokenToRemove: number): void {
    this._tokens = this._tokens.filter((token) => token.userToken !== tokenToRemove);
  }

  public findTokenByReference(userReferenceKey: number) {
    const findToken = this._tokens.find((token) => token.userPrimaryKey === userReferenceKey);
    return findToken;
  }

  public findReferenceByToken(tokenUser: number) {
    const findReference = this._tokens.find((token) => token.userToken === tokenUser);

    if (!findReference) {
      throw new Error("Invalid Token");
    }
    return findReference;
  }

  get tokens() {
    return [...this._tokens];
  }
}
