export class AdModel {
  private _primaryKey: number;
  private _referenceKeyUser: number;
  private _title: string;
  private _description: string;
  private _date: any;
  private _price: number;
  private _status: string;
  private _category: string;
  private _phone: string;
  private _lead: [];
  private _urlForImage: string;
  private _referenceKeyUserPurchased: number;

  constructor(
    primaryKey: number,
    referenceKeyUser: number,
    title: string,
    description: string,
    date: any,
    price: number,
    status: string,
    category: string,
    phone: string,
    urlForImage: string,
    referenceKeyUserPurchased: number,
  ) {
    this._primaryKey = primaryKey;
    this._referenceKeyUser = referenceKeyUser;
    this._title = title;
    this._description = description;
    this._date = date;
    this._price = price;
    this._status = status;
    this._category = category;
    this._phone = phone;
    this._lead = [];
    this._urlForImage = urlForImage;
    this._referenceKeyUserPurchased = referenceKeyUserPurchased;
  }

  public getAdReferenceKeyUser(): number {
    return this._referenceKeyUser;
  }

  public getAdTitle(): string {
    return this._title;
  }

  public setAdTitle(newValue: string) {
    this._title = newValue;
  }

  public getAdDescription(): string {
    return this._description;
  }

  public setAdDesciption(newValue: string) {
    this._description = newValue;
  }

  public getAdDate(): any {
    return this._date;
  }

  public getAdPrice(): number {
    return this._price;
  }

  public setAdPrice(newValue: number) {
    this._price = newValue;
  }
  public getAdStatus(): string {
    return this._status;
  }

  public setAdStatus(newValue: string) {
    this._status = newValue;
  }

  public getAdCategory(): string {
    return this._category;
  }

  public setAdCategory(newValue: string) {
    this._category = newValue;
  }

  public getAdPrimaryKey(): number {
    return this._primaryKey;
  }

  public getAdPhone(): string {
    return this._phone;
  }

  public setAdPhone(newValue: string) {
    this._phone = newValue;
  }
  public getAdLead(): [] {
    return this._lead;
  }

  public getAdUrlForImage(): string {
    return this._urlForImage;
  }

  public setAdUrlForImage(newValue: string) {
    this._urlForImage = newValue;
  }

  public getAdReferenceKeyUserPurchased(): number {
    return this._referenceKeyUserPurchased;
  }
}
