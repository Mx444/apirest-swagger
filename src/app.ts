import { UserController } from "./controllers/userController";
import { ServiceContainer } from "./services/servicesContainer";

const userServices = new UserController();
const tokenServices = ServiceContainer.getTokenController();
const adsServices = ServiceContainer.getAdController();
const deviceServices = ServiceContainer.getDeviceController();
