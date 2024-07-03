import { UserModel } from "./User";
import { AdModel } from "./Ad";
export class ReviewModel {
  private _primaryKey: number;
  private _userReferenceKey: UserModel["_primaryKey"];
  private _adReferenceKey: AdModel["_primaryKey"];
  private _title: string;
  private _description: string;
  private _date: Date;
  private _rating: number;

  constructor(
    userReferenceKey: UserModel["_primaryKey"],
    adReferenceKey: AdModel["_primaryKey"],
    title: string,
    description: string,
    rating: number,
  ) {
    this._primaryKey = Math.floor(Math.random() * 1000);
    this._userReferenceKey = userReferenceKey;
    this._adReferenceKey = adReferenceKey;
    this._title = title;
    this._description = description;
    this._date = new Date();
    this._rating = rating;
  }

  get primaryKey(): number {
    return this._primaryKey;
  }

  set primaryKey(newValue: number) {
    this._primaryKey = newValue;
  }

  get userReferenceKey(): UserModel["_primaryKey"] {
    return this._userReferenceKey;
  }

  set userReferenceKey(newValue: UserModel["_primaryKey"]) {
    this._userReferenceKey = newValue;
  }

  get adReferenceKey(): AdModel["_primaryKey"] {
    return this._adReferenceKey;
  }

  set adReferenceKey(newValue: AdModel["_primaryKey"]) {
    this._adReferenceKey = newValue;
  }

  get title(): string {
    return this._title;
  }

  set title(newValue: string) {
    this._title = newValue;
  }

  get description(): string {
    return this._description;
  }

  set description(newValue: string) {
    this._description = newValue;
  }

  get date(): Date {
    return this._date;
  }

  set date(newValue: Date) {
    this._date = newValue;
  }

  get rating(): number {
    return this._rating;
  }

  set rating(newValue: number) {
    this._rating = newValue;
  }
}
