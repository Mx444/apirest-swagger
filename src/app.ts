import { ServiceContainer } from "./services/servicesContainer";

const userServices = ServiceContainer.getUserController();
const tokenServices = ServiceContainer.getTokenController();
const adsServices = ServiceContainer.getAdController();
const deviceServices = ServiceContainer.getDeviceController();

userServices.signup("email", "username", "password");
const user = userServices.login("username", "password");

deviceServices.editDeviceName(user?.Token!, user?.IdDevice!, "newName");
console.log(deviceServices.getDevices());
