import express, { Request, Response } from "express";
import { ServiceContainer } from "../services/servicesContainer";

const userServices = ServiceContainer.getUserController();
const tokenServices = ServiceContainer.getTokenController();
const deviceServices = ServiceContainer.getDeviceController();
const routerDevice = express.Router();

routerDevice.get("/", async (req: Request, res: Response) => {
  res.send({ list: deviceServices.devices });
});
routerDevice.patch("/", async (req: Request, res: Response) => {
  const reqToken = req.headers.authorization;
  const token = Number(reqToken);
  const { deviceReferenceKey, newValue } = req.body;

  try {
    await deviceServices.editDeviceName(token, deviceReferenceKey, newValue);
    res.status(200).json({ message: "device updated", list: deviceServices.devices });
  } catch (error) {
    res.status(400).json({ message: "failed to update device name" });
  }
});
routerDevice.delete("/", async (req: Request, res: Response) => {
  const reqToken = req.headers.authorization;
  const token = Number(reqToken);
  const { deviceReferenceKey } = req.body;

  try {
    await deviceServices.removeDevice(token, deviceReferenceKey);
    res.status(200).json({ message: "device deleted", list: deviceServices.devices });
  } catch (error) {
    res.status(400).json({ message: "failed to delete device" });
  }
});

export default routerDevice;
