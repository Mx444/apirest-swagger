class ApiModel {
  private _path: string;
  private _method: string;
  private _auth: boolean;
  constructor(path: string, method: `POST` | `GET` | `PUT` | `PATCH` | `DELETE`, auth: boolean) {
    this._path = `/api/${path}`;
    this._method = method;
    this._auth = auth;
  }
}

const api = {
  //User
  signup: new ApiModel("users/signup", "POST", false),
  login: new ApiModel("users/login", "POST", false),
  logout: new ApiModel("users/logout", "POST", true),
  editUser: new ApiModel("users", "PATCH", true),
  removeUser: new ApiModel("users", "DELETE", true),

  //Devices
  addDevice: new ApiModel("devices", "POST", true),
  editDevice: new ApiModel(`devices/{Key}`, "PATCH", true),
  removeDevice: new ApiModel("devices/{Key}", "DELETE", true),
  findDevice: new ApiModel("devices/{Key}", "GET", true),

  //Ads
  createAd: new ApiModel("ads", "POST", true),
  markAsSold: new ApiModel("ads/{Key}/sold", "PATCH", true),
  editAd: new ApiModel("ads/{Key}", "PATCH", true),
  deleteAd: new ApiModel("ads/{Key}", "DELETE", true),
  filterByPrice: new ApiModel("ads/price?min={price}&max={price}", "GET", true),
  filterByCategory: new ApiModel("ads/category?category={category}", "GET", true),
  filterByStatus: new ApiModel("ads/status?status={status}", "GET", true),
  filterByNotSold: new ApiModel("ads/{0}", "GET", true),
  filterById: new ApiModel("ads/{Key}", "GET", true),
  getAllAds: new ApiModel("ads", "GET", true),
  getPhone: new ApiModel("ads/{Key}/phone", "GET", true),
};
