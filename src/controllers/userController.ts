import { UserModel } from "../models/userModel";
import { DeviceController } from "./deviceController";
import { TokenController } from "./tokenController";
import { ServiceContainer } from "../services/servicesContainer";

interface Session {
  userID: number;
  Username: string;
}

interface User {
  Token: number;
  IdDevice: number;
}

export class UserController {
  private _users: Array<UserModel> = [];
  private _session: Session | null;
  private _tokenIstance: TokenController;
  private _deviceIstance: DeviceController;

  constructor() {
    this._users = [];
    this._session = null;
    this._tokenIstance = ServiceContainer.getTokenController();
    this._deviceIstance = ServiceContainer.getDeviceController();
  }

  public signup(email: string, username: string, password: string): undefined {
    if (this._session) {
      throw new Error("You are already logged in");
    }

    const existingUser = this._users.find(
      (user) => user.getUserEmail() === email || user.getUserUsername() === username,
    );

    if (existingUser) {
      throw new Error("Email or Username already in use");
    }

    const newUser = new UserModel(email, username, password);
    this._users = [...this._users, newUser];
    console.log("User registered successfully");
  }

  public login(username: string, password: string): User {
    if (this._session) {
      throw new Error("You are already logged in");
    }

    const matchUserCredentials = this._users.find(
      (user) => user.getUserUsername() === username && user.getUserPassword() === password,
    );

    if (!matchUserCredentials) {
      throw new Error("Invalid credentials");
    }

    this._session = {
      userID: matchUserCredentials.getUserPrimaryKey(),
      Username: matchUserCredentials.getUserUsername(),
    };

    const devices = this._deviceIstance.getDevices();
    const userDevices = devices.filter(
      (device) => device.getDeviceReferenceKeyUser() === matchUserCredentials.getUserPrimaryKey(),
    );
    if (userDevices.length >= 2) {
      throw new Error("User has more than or equal to 2 devices");
    }
    const newDevice = this._deviceIstance.addNewDevice(matchUserCredentials.getUserPrimaryKey(), "");

    const userToken = this._tokenIstance.findTokenByReference(matchUserCredentials.getUserPrimaryKey());
    if (!userToken) {
      const newToken = this._tokenIstance.generateAndStoreToken(matchUserCredentials.getUserPrimaryKey());
      console.log(`New Token: ${newToken}`);
      return { Token: newToken, IdDevice: newDevice };
    }

    console.log(`Active Token: ${userToken.getToken()}`);
    return { Token: userToken.getToken(), IdDevice: newDevice };
  }

  public logout(token: number): void {
    if (!this._session) {
      throw new Error("You need to log in first");
    }
    const userReference = this._tokenIstance.findReferenceByToken(token);
    if (!userReference) {
      throw new Error("Invalid Token");
    }

    const matchToken = this._tokenIstance.findTokenByReference(userReference.getTokenReferenceKeyUser());
    if (matchToken) {
      this._session = null;
      this._tokenIstance.removeToken(matchToken);
      console.log("User logged out successfully");
    } else {
      throw new Error("Invalid token");
    }
  }

  public editUser(token: number, type: string, newValue: string): void {
    const userToken = this._tokenIstance.findReferenceByToken(token);

    if (!userToken) {
      throw new Error("Invalid Token");
    }
    this._users = this._users.map((user) => {
      if (user.getUserPrimaryKey() === userToken.getTokenReferenceKeyUser()) {
        const updatedUser = new UserModel(user.getUserEmail(), user.getUserUsername(), user.getUserPassword());
        updatedUser.setUserPrimaryKey(user.getUserPrimaryKey());

        switch (type) {
          case "email":
            updatedUser.setUserEmail(newValue);
            break;
          case "username":
            updatedUser.setUserUsername(newValue);
            break;
          case "password":
            updatedUser.setUserPassword(newValue);
            break;
          default:
            console.log("Invalid edit type");
            return user;
        }
        return updatedUser;
      }
      return user;
    });

    console.log("User updated successfully");
  }

  public removeUser(token: number, username: string, password: string): void {
    const userToken = this._tokenIstance.findReferenceByToken(token);
    if (!userToken) {
      throw new Error("Invalid Token");
    }

    const matchUserCredentials = this._users.find(
      (user) =>
        user.getUserUsername() === username &&
        user.getUserPassword() === password &&
        user.getUserPrimaryKey() === userToken.getTokenReferenceKeyUser(),
    );

    if (!matchUserCredentials) {
      throw new Error("User credentials do not match");
    }

    this._users = this._users.filter((user) => user.getUserPrimaryKey() !== userToken.getTokenReferenceKeyUser());
    this._session = null;
    this._tokenIstance.removeToken(userToken);
    console.log("User removed successfully");
  }

  public getUsers(): ReadonlyArray<UserModel> {
    return [...this._users];
  }

  public getSession(): Session | null {
    return this._session;
  }
}
