import { ServiceContainer } from "./services/servicesContainer";

const userServices = ServiceContainer.getUserController();
const tokenServices = ServiceContainer.getTokenController();
const adsServices = ServiceContainer.getAdController();
const deviceServices = ServiceContainer.getDeviceController();

//User
userServices.signup("email", "username", "password");
const user = userServices.login("username", "password");
// userServices.editUser(user?.Token!, "username", "newMario");
// console.log(userServices.getUsers());
// console.log(tokenServices.getTokens());
// userServices.logout(user?.Token!);
// console.log(userServices.getSession());
// console.log(userServices.getUsers());
// userServices.removeUser(user?.Token!, "username", "password");
// console.log(userServices.getUsers());

//Token
// console.log(tokenServices.getTokens());

//Device
// console.log(deviceServices.getDevices());
// deviceServices.removeDevice(user?.Token!, user?.IdDevice!);
// console.log(deviceServices.getDevices());

//Ads

const newAd = adsServices.createAd(user?.Token!, "titolo", "descrizione", 10, "status", "null", "phone", "url", 0);
console.log(adsServices.getAds());
const adSold = adsServices.markAsSold(user?.Token!, newAd!, 123);

console.log(adsServices.getAds());
const edit = adsServices.editAd(user?.Token!, newAd!, "title", "newTitle");
adsServices.editAd(user?.Token!, newAd!, "description", "newDescription");
console.log(adsServices.getAds());
console.log(newAd);
console.log(adSold);

//check costruttori primarykey func
