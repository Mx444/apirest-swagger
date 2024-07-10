import { DeviceModel } from "../models/Device";
import { TokenController } from "./Tokens";
import { ServiceContainer } from "../services/servicesContainer";

export class DeviceController {
  private _devices: ReadonlyArray<Readonly<DeviceModel>>;
  private _tokenIstance: TokenController;

  constructor() {
    this._devices = [];
    this._tokenIstance = ServiceContainer.getTokenController();
  }

  public addDevice(userReferenceKey: number, deviceName: string): number {
    const createDevice = new DeviceModel(userReferenceKey, deviceName);
    this._devices = [...this._devices, createDevice];
    return createDevice.deviceReferenceKey;
  }

  public editDeviceName(token: number, deviceReferenceKey: number, newValue: string): void {
    const referenceUserToken = this._tokenIstance.findReferenceByToken(token);
    const referenceUserDevice = this.findReferenceByIdDevice(deviceReferenceKey);
    const matchKey: boolean = referenceUserToken!.userPrimaryKey === referenceUserDevice!.userReferenceKey;
    if (!matchKey) {
      throw new Error("User not found");
    }

    this._devices = this._devices.map((device) => {
      if (device.deviceReferenceKey === deviceReferenceKey) {
        return { ...device, _deviceName: newValue };
      }
      return device;
    });
  }

  public removeDevice(token: number, deviceReferenceKey: number): void {
    const referenceUser = this._tokenIstance.findReferenceByToken(token);
    const referenceDevice = this.findReferenceByIdDevice(deviceReferenceKey);
    const matchKey: boolean = referenceUser?.userPrimaryKey === referenceDevice?.userReferenceKey;
    if (!matchKey) {
      throw new Error("User not found");
    }
    this._devices = this._devices.filter((device) => device.deviceReferenceKey !== referenceDevice!.deviceReferenceKey);
  }

  public findReferenceByIdDevice(deviceReferenceKey: number) {
    const findDevice = this._devices.find((device) => device.deviceReferenceKey === deviceReferenceKey);
    if (!findDevice) {
      throw new Error("Invalid Device Reference Key");
    }
    return findDevice;
  }

  get devices() {
    return [...this._devices];
  }
}
