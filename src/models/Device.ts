import { UserModel } from "./User";
export class DeviceModel {
  private _userReferenceKey: UserModel["_primaryKey"];
  private _deviceReferenceKey: number;
  private _deviceName: string;

  constructor(userReferenceKey: UserModel["_primaryKey"], deviceName: string) {
    this._userReferenceKey = userReferenceKey;
    this._deviceReferenceKey = Math.floor(Math.random() * 1000);
    this._deviceName = deviceName;
  }

  get userReferenceKey(): UserModel["_primaryKey"] {
    return this._userReferenceKey;
  }

  get deviceReferenceKey(): number {
    return this._deviceReferenceKey;
  }

  get deviceName(): string {
    return this._deviceName;
  }

  set deviceName(newValue: string) {
    this._deviceName = newValue;
  }
}
