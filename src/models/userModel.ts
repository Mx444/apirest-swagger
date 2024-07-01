export class UserModel {
  private _primaryKey: number;
  private _email: string;
  private _username: string;
  private _password: string;

  constructor(email: string, username: string, password: string) {
    this._primaryKey = Math.floor(Math.random() * 1000);
    this._email = email;
    this._username = username;
    this._password = password;
  }

  public getUserPrimaryKey(): number {
    return this._primaryKey;
  }
  public setUserPrimaryKey(newValue: number) {
    this._primaryKey = newValue;
  }

  public getUserEmail(): string {
    return this._email;
  }
  public setUserEmail(newValue: string) {
    this._email = newValue;
  }

  public getUserUsername(): string {
    return this._username;
  }
  public setUserUsername(newValue: string) {
    this._username = newValue;
  }

  public getUserPassword(): string {
    return this._password;
  }
  public setUserPassword(newValue: string) {
    this._password = newValue;
  }
}
