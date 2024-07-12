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

  get primaryKey(): number {
    return this._primaryKey;
  }

  set primaryKey(newValue: number) {
    this._primaryKey = newValue;
  }

  get email(): string {
    return this._email;
  }

  public updateEmail(newValue: string) {
    this._email = newValue;
  }

  get username(): string {
    return this._username;
  }

  public updateUsername(newValue: string) {
    this._username = newValue;
  }

  set username(newValue: string) {
    this._username = newValue;
  }

  get password(): string {
    return this._password;
  }

  public updatePassword(newValue: string) {
    this._password = newValue;
  }
}
