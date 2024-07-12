import express, { Request, Response } from "express";
import { ServiceContainer } from "../services/servicesContainer";
import { handleError, validateToken } from "../utils/handleErrors";

const deviceServices = ServiceContainer.getDeviceController();
const routerDevice = express.Router();

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Get all devices
 *     tags:
 *       - Devices
 *     responses:
 *       200:
 *         description: A list of devices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 devices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 *                       status:
 *                         type: string
 */
routerDevice.get("", (req: Request, res: Response) => {
  try {
    res.send({ devices: deviceServices.devices });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /devices:
 *   patch:
 *     summary: Edit a device name
 *     tags:
 *       - Devices
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceReferenceKey:
 *                 type: string
 *                 example: deviceKey
 *               newValue:
 *                 type: string
 *                 example: new_device_name
 *     responses:
 *       200:
 *         description: Device updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Device updated
 */
routerDevice.patch("", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  const { deviceReferenceKey, newValue } = req.body;

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    deviceServices.editDeviceName(token, deviceReferenceKey, newValue);
    res.status(200).json({ message: "Device updated" });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /devices:
 *   delete:
 *     summary: Delete a device
 *     tags:
 *       - Devices
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceReferenceKey:
 *                 type: string
 *                 example: device1
 *     responses:
 *       200:
 *         description: Device deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Device deleted
 *                 list:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 *                       status:
 *                         type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
routerDevice.delete("", (req: Request, res: Response) => {
  const tokenString = req.headers.token;
  const { deviceReferenceKey } = req.body;

  const token = validateToken(tokenString, res);
  if (token === null) return;

  try {
    deviceServices.removeDevice(token, deviceReferenceKey);
    res.status(200).json({ message: "device deleted", list: deviceServices.devices });
  } catch (error) {
    handleError(res, error);
  }
});

export default routerDevice;
