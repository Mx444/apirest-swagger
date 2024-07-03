import { TokenModel } from "../models/Token";

export class TokenController {
  private _tokens: Array<TokenModel> = [];

  constructor() {
    this._tokens = [];
  }

  public generateAndStoreToken(userReferenceKey: number): number {
    const createToken = new TokenModel(userReferenceKey);
    this._tokens = [...this._tokens, createToken];
    return createToken.userToken;
  }

  public removeToken(tokenToRemove: TokenModel): void {
    this._tokens = this._tokens.filter((token) => token !== tokenToRemove);
  }

  public findTokenByReference(userReferenceKey: number): TokenModel | undefined {
    const findToken = this._tokens.find((token) => token.userPrimaryKey === userReferenceKey);
    return findToken;
  }

  public findReferenceByToken(tokenUser: number): TokenModel | undefined {
    const findReference = this._tokens.find((token) => token.userToken === tokenUser);

    if (!findReference) {
      throw new Error("Invalid Token");
    }
    return findReference;
  }

  get tokens(): ReadonlyArray<TokenModel> {
    return [...this._tokens];
  }
}
