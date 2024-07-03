import { UserController } from "../controllers/userController";
import { DeviceController } from "../controllers/deviceController";
import { TokenController } from "../controllers/tokenController";
import { AdController } from "../controllers/adController";
import { ReviewController } from "../controllers/reviewController";
import { ReportController } from "../controllers/reportController";
import { FavoriteController } from "../controllers/favoriteController";
export class ServiceContainer {
  private static _tokenController: TokenController = new TokenController();
  private static _deviceController: DeviceController = new DeviceController();
  private static _userController: UserController = new UserController();
  private static _adController: AdController = new AdController();
  private static _reviewController: ReviewController = new ReviewController();
  private static _reportController: ReportController = new ReportController();
  private static _favoriteController: FavoriteController = new FavoriteController();

  static getTokenController(): TokenController {
    return this._tokenController;
  }

  static getDeviceController(): DeviceController {
    return this._deviceController;
  }

  static getUserController(): UserController {
    return this._userController;
  }

  static getAdController(): AdController {
    return this._adController;
  }

  static getReviewController(): ReviewController {
    return this._reviewController;
  }

  static getReportController(): ReportController {
    return this._reportController;
  }

  static getFavoriteController(): FavoriteController {
    return this._favoriteController;
  }
}
