import { UserModel } from "./userModel";
import { AdModel } from "./adModel";

export class ReportModel {
  private _primaryKey: number;
  private _userReferenceKey: UserModel["_primaryKey"];
  private _adReferenceKey: AdModel["_primaryKey"];
  private _title: string;
  private _description: string;
  private _closed: boolean;

  constructor(
    userReferenceKey: UserModel["_primaryKey"],
    adReferenceKey: AdModel["_primaryKey"],
    title: string,
    desciption: string,
  ) {
    this._primaryKey = Math.floor(Math.random() * 1000);
    this._userReferenceKey = userReferenceKey;
    this._adReferenceKey = adReferenceKey;
    this._title = title;
    this._description = desciption;
    this._closed = false;
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

  get title() {
    return this._title;
  }

  set title(val: string) {
    this._title = val;
  }

  get description() {
    return this._description;
  }

  set description(val: string) {
    this._description = val;
  }

  get closed() {
    return this._closed;
  }

  set closed(val: boolean) {
    this._closed = val;
  }
}
