import { TokenModel } from "../models/tokenModel";

export class TokenController {
  private _tokens: TokenModel[];

  constructor() {
    this._tokens = [];
  }

  public generateAndStoreToken(tokenReferenceKeyUser: number): number {
    const newToken = new TokenModel(tokenReferenceKeyUser);
    this._tokens = [...this._tokens, newToken];
    return newToken.getToken();
  }

  public getTokens(): ReadonlyArray<TokenModel> {
    return [...this._tokens];
  }

  public removeToken(tokenToRemove: TokenModel): void {
    this._tokens = this._tokens.filter((token) => token !== tokenToRemove);
  }

  public findTokenByReference(referenceKey: number): TokenModel | undefined {
    return this._tokens.find((token) => token.getTokenReferenceKeyUser() === referenceKey);
  }

  public findReferenceByToken(tokenUser: number): TokenModel | undefined {
    return this._tokens.find((token) => token.getToken() === tokenUser);
  }
}
