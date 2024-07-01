export class DeviceModel {
  private _referenceKeyUser: number;
  private _idDevice: number;
  private _nameDevice: string;

  constructor(referenceKeyUser: number, nameDevice: string) {
    this._referenceKeyUser = referenceKeyUser;
    this._idDevice = Math.floor(Math.random() * 1000);
    this._nameDevice = nameDevice;
  }

  public getDeviceReferenceKeyUser(): number {
    return this._referenceKeyUser;
  }

  public getDeviceId(): number {
    return this._idDevice;
  }

  public getDeviceName(): string {
    return this._nameDevice;
  }

  public setDeviceName(newValue: string) {
    this._nameDevice = newValue;
  }
}
