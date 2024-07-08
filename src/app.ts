import { ServiceContainer } from "./services/ServicesContainer";

const userServices = ServiceContainer.getUserController();
const tokenServices = ServiceContainer.getTokenController();
const adsServices = ServiceContainer.getAdController();
const deviceServices = ServiceContainer.getDeviceController();
const reviewServices = ServiceContainer.getReviewController();
const reportServices = ServiceContainer.getReportController();
const favoriteServices = ServiceContainer.getFavoriteController();

userServices.signup("mariorossi@gmail.com", "mariorossi", "password");
const login = userServices.login("mariorossi", "password");
const newAd = adsServices.createAd(login.userToken, "title", "description", 10, "good", "tech", 123456789, "url");
userServices.logout(login.userToken);
userServices.signup("luciaverdi@gmail.com", "luciaverdi", "password");
const user = userServices.login("luciaverdi", "password");
adsServices.getPhone(user.userToken, newAd);
console.log(adsServices.ads);
// userServices.signup("giovanni@gmail.com", "giovanni", "password");
// userServices.signup("luca@gmail.com", "luca", "password");
// console.log(userServices.users);
// console.log(userServices.users);
// console.log(user.deviceReferenceKey);
// console.log(user.userToken);
// deviceServices.editDeviceName(user.userToken, user.deviceReferenceKey, "NewNameDevice");
// deviceServices.removeDevice(user.userToken, user.deviceReferenceKey);
// console.log(deviceServices.devices);
// console.log(userServices.session);
// console.log(tokenServices.tokens);
// userServices.logout(user.userToken);
// console.log(userServices.users);
// console.log(userServices.session);
// console.log(tokenServices.tokens);
// userServices.editUser(user.userToken, "username", "newLucia");
// userServices.removeUser(user.userToken, "newLucia", "password");
// console.log(userServices.users);
// console.log(userServices.session);
// console.log(tokenServices.tokens);
// console.log(deviceServices.devices);
// console.log(deviceServices.devices);
// const newAd = adsServices.createAd(user.userToken, "title", "description", 10, "good", "tech", 123456789, "url");
// const newAd1 = adsServices.createAd(user.userToken, "title", "description", 10, "good", "tech", 123456789, "url");
// favoriteServices.createFavorite(user.userToken, newAd);
// const fav = favoriteServices.createFavorite(user.userToken, newAd1);
// favoriteServices.removeFavorite(user.userToken, fav!);
// console.log(favoriteServices.favorites);
// const newReport = reportServices.createReport(user.userToken, newAd, "reportTitle", "reportDescription");
// reportServices.closeReport(user.userToken, newReport);
// console.log(reportServices.reports);
// adsServices.markAsSold(user.userToken, newAd, 999);
// console.log(adsServices.findAdBySold());
// adsServices.editAd(user.userToken, newAd, "title", "newTitle");
// adsServices.editAd(user.userToken, newAd, "description", "newDescription");
// const review = reviewServices.addReview(user.userToken, newAd, "review", "reviewDescription", 5);
// console.log(adsServices.ads);
// reviewServices.editReview(user.userToken, review, "title", "newTitle");
// reviewServices.removeReview(user.userToken, review);
// console.log(reviewServices.review);
