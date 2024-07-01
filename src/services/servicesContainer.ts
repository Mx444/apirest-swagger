import { DeviceController } from "../controllers/deviceController";
import { TokenController } from "../controllers/tokenController";
import { AdController } from "../controllers/adController";

export class ServiceContainer {
  private static _deviceController: DeviceController = new DeviceController();
  private static _tokenController: TokenController = new TokenController();
  private static _adController: AdController = new AdController();

  static getDeviceController(): DeviceController {
    return this._deviceController;
  }

  static getTokenController(): TokenController {
    return this._tokenController;
  }

  static getAdController(): AdController {
    return this._adController;
  }
}
