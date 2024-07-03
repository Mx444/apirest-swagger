import { UserModel } from "./userModel";
export class AdModel {
  private _primaryKey: number;
  private _userReferenceKey: UserModel["_primaryKey"];
  private _title: string;
  private _description: string;
  private _date: Date;
  private _price: number;
  private _status: string;
  private _category: string;
  private _phone: number;
  private _lead: [];
  private _urlForImage: string;
  private _userReferenceKeyPurchased: number;

  constructor(
    userReferenceKey: UserModel["_primaryKey"],
    title: string,
    description: string,
    price: number,
    status: string,
    category: string,
    phone: number,
    urlForImage: string,
  ) {
    this._primaryKey = Math.floor(Math.random() * 1000);
    this._userReferenceKey = userReferenceKey;
    this._title = title;
    this._description = description;
    this._date = new Date();
    this._price = price;
    this._status = status;
    this._category = category;
    this._phone = phone;
    this._lead = [];
    this._urlForImage = urlForImage;
    this._userReferenceKeyPurchased = 0;
  }

  get userReferenceKey(): UserModel["_primaryKey"] {
    return this._userReferenceKey;
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

  set desciption(newValue: string) {
    this._description = newValue;
  }

  get date(): any {
    return this._date;
  }

  get price(): number {
    return this._price;
  }

  set price(newValue: number) {
    this._price = newValue;
  }
  get status(): string {
    return this._status;
  }

  set status(newValue: string) {
    this._status = newValue;
  }

  get category(): string {
    return this._category;
  }

  set category(newValue: string) {
    this._category = newValue;
  }

  get primaryKey(): number {
    return this._primaryKey;
  }

  get phone(): number {
    return this._phone;
  }

  set phone(newValue: number) {
    this._phone = newValue;
  }
  get lead(): [] {
    return this._lead;
  }

  get urlForImage(): string {
    return this._urlForImage;
  }

  set urlForImage(newValue: string) {
    this._urlForImage = newValue;
  }

  get userReferenceKeyPurchased(): number {
    return this._userReferenceKeyPurchased;
  }
  set userReferenceKeyPurchased(newValue: number) {
    this._userReferenceKeyPurchased = newValue;
  }
}
