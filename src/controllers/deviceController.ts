import { DeviceModel } from "../models/deviceModel";
import { TokenController } from "./tokenController";
import { ServiceContainer } from "../services/servicesContainer";

export class DeviceController {
  private _devices: DeviceModel[];
  private _tokenIstance: TokenController;

  constructor() {
    this._devices = [];
    this._tokenIstance = ServiceContainer.getTokenController();
  }

  public addNewDevice(referenceKeyUser: number, nameDevice: string): number {
    const newDevice = new DeviceModel(referenceKeyUser, nameDevice);
    this._devices = [...this._devices, newDevice];
    return newDevice.getDeviceId();
  }

  public editDeviceName(token: number, idDevice: number, newValue: string): DeviceModel | void {
    const referenceUserToken = this._tokenIstance.findReferenceByToken(token);
    if (!referenceUserToken) {
      throw new Error("Invalid Token");
    }

    const referenceUserDevice = this.getReferenceByIdDevice(idDevice);
    if (!referenceUserDevice) {
      throw new Error("Invalid ID");
    }

    const matchKey: boolean =
      referenceUserToken.getTokenReferenceKeyUser() === referenceUserDevice.getDeviceReferenceKeyUser();

    if (!matchKey) {
      throw new Error("User not found");
    }

    this._devices = this._devices.map((device) => {
      if (device.getDeviceId() === idDevice) {
        device.setDeviceName(newValue);
        return device;
      } else {
        return device;
      }
    });
  }

  public removeDevice(token: number, idDevice: number): void {
    const referenceUserToken = this._tokenIstance.findReferenceByToken(token);
    if (!referenceUserToken) {
      throw new Error("Invalid Token");
    }

    const referenceUserDevice = this.getReferenceByIdDevice(idDevice);
    if (!referenceUserDevice) {
      throw new Error("Invalid ID");
    }

    const matchKey: boolean =
      referenceUserToken.getTokenReferenceKeyUser() === referenceUserDevice.getDeviceReferenceKeyUser();
    if (!matchKey) {
      throw new Error("User not found");
    }

    this._devices = this._devices.filter((device) => device.getDeviceId() !== idDevice);
  }

  public getReferenceByIdDevice(idDevice: number): DeviceModel | undefined {
    return this._devices.find((device) => device.getDeviceId() === idDevice);
  }

  public getDevices(): ReadonlyArray<DeviceModel> {
    return [...this._devices];
  }
}
