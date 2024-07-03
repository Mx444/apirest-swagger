import { UserController } from "../controllers/Users";
import { DeviceController } from "../controllers/Devices";
import { TokenController } from "../controllers/Tokens";
import { AdController } from "../controllers/Ads";
import { ReviewController } from "../controllers/Reviews";
import { ReportController } from "../controllers/Reports";
import { FavoriteController } from "../controllers/Favorites";
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
