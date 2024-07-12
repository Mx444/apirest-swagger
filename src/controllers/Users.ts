import { UserModel } from "../models/User";
import { DeviceController } from "./Devices";
import { TokenController } from "./Tokens";
import { ServiceContainer } from "../services/servicesContainer";
import { TokenModel } from "../models/Token";
import { DeviceModel } from "../models/Device";

interface Session {
  username: UserModel["username"];
  userPrimaryKey: UserModel["_primaryKey"];
}

interface Token {
  userToken: TokenModel["_userToken"];
  deviceReferenceKey: DeviceModel["_deviceReferenceKey"];
}

export class UserController {
  private _users: ReadonlyArray<Readonly<UserModel>>;
  private _session: Session | null;
  private _tokenIstance: TokenController;
  private _deviceIstance: DeviceController;

  constructor() {
    this._users = [];
    this._session = null;
    this._tokenIstance = ServiceContainer.getTokenController();
    this._deviceIstance = ServiceContainer.getDeviceController();
  }

  public signup(email: string, username: string, password: string): void {
    this.checkNotLoggedIn();
    const existingCredentials = this._users.find((user) => user.email === email || user.username === username);
    if (existingCredentials) {
      throw new Error("Email or Username already in use");
    }
    const createUser = new UserModel(email, username, password);
    this._users = [...this._users, createUser];
  }

  public login(username: string, password: string): Token {
    this.checkNotLoggedIn();
    const user = this._users.find((user) => user.username === username && user.password === password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    this._session = {
      username: user.username,
      userPrimaryKey: user.primaryKey,
    };
    const devices = this._deviceIstance.devices;
    const deviceLimit = devices.filter((device) => device.userReferenceKey === user.primaryKey);
    if (deviceLimit.length >= 2) {
      throw new Error("User has more than or equal to 2 devices");
    }
    const createDevice = this._deviceIstance.addDevice(user.primaryKey, "default");
    const findUserToken = this._tokenIstance.findTokenByReference(user.primaryKey);
    if (!findUserToken) {
      const createToken = this._tokenIstance.generateAndStoreToken(user.primaryKey);
      return { userToken: createToken, deviceReferenceKey: createDevice };
    }
    return { userToken: findUserToken.userToken, deviceReferenceKey: createDevice };
  }

  public logout(token: TokenModel["_userToken"]): void {
    this.checkLoggedIn();
    const userReference = this._tokenIstance.findReferenceByToken(token);
    this._session = null;
    this._tokenIstance.removeToken(userReference.userToken);
  }

  public editUser(token: TokenModel["_userToken"], type: string, newValue: string) {
    this.checkLoggedIn();
    const userReference = this._tokenIstance.findReferenceByToken(token);

    this._users = this._users.map((user) => {
      if (user.primaryKey === userReference.userPrimaryKey) {
        switch (type) {
          case "email":
            user.updateEmail(newValue);
            break;
          case "username":
            this._session = {
              username: newValue,
              userPrimaryKey: user.primaryKey,
            };
            user.updateUsername(newValue);
            break;
          case "password":
            user.updatePassword(newValue);
            break;
          default:
            console.log("Invalid edit type");
            return user;
        }
      }
      return user;
    });
  }

  public removeUser(token: TokenModel["_userToken"], username: string, password: string): void {
    this.checkLoggedIn();
    const userReference = this._tokenIstance.findReferenceByToken(token);

    const matchCredentials = this._users.find(
      (user) =>
        user.username === username && user.password === password && user.primaryKey === userReference?.userPrimaryKey,
    );
    if (!matchCredentials) {
      throw new Error("User credentials do not match");
    }

    this._users = this._users.filter((user) => user.primaryKey !== userReference?.userPrimaryKey);
    this._session = null;
    this._tokenIstance.removeToken(userReference.userToken);
  }

  get users() {
    return [...this._users];
  }

  get session(): Session | null {
    return this._session;
  }

  private checkNotLoggedIn(): void {
    if (this._session) {
      throw new Error("Already logged in");
    }
  }

  private checkLoggedIn(): void {
    if (!this._session) {
      throw new Error("Not logged in");
    }
  }
}
