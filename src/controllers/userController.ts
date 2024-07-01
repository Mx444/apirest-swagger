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
  private _users: UserModel[];
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
    if (this._session) {
      console.log("You are already logged in");
      return;
    }

    const existingUser = this._users.find(
      (user) => user.getUserEmail() === email || user.getUserUsername() === username,
    );

    if (existingUser) {
      console.log("Email or Username already in use");
      return;
    }

    const newUser = new UserModel(email, username, password);
    this._users = [...this._users, newUser];
    console.log("User registered successfully");
  }

  public login(username: string, password: string): User | null {
    if (this._session) {
      console.log("You are already logged in");
      return null;
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
      console.log("You need to log in first");
      return;
    }
    const userReference = this._tokenIstance.findReferenceByToken(token);
    if (!userReference) {
      console.log("Invalid Token");
      return;
    }

    const matchToken = this._tokenIstance.findTokenByReference(userReference.getTokenReferenceKeyUser());
    if (matchToken) {
      this._session = null;
      this._tokenIstance.removeToken(matchToken);
      console.log("User logged out successfully");
    } else {
      console.log("Invalid token");
    }
  }

  public editUser(token: number, type: string, newValue: string): void {
    const userToken = this._tokenIstance.findReferenceByToken(token);

    if (!userToken) {
      console.log("Invalid Token");
      return;
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
      console.log("Invalid Token");
      return;
    }

    const matchUserCredentials = this._users.find(
      (user) =>
        user.getUserUsername() === username &&
        user.getUserPassword() === password &&
        user.getUserPrimaryKey() === userToken.getTokenReferenceKeyUser(),
    );

    if (!matchUserCredentials) {
      console.log("User credentials do not match");
      return;
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
