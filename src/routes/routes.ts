import { Router } from "express";
import * as DevicesController from "../controllers/device-controller";

const router = Router();

router.get("/devices", DevicesController.getDevices);
router.get("/devices/:id", DevicesController.getDeviceById);
router.post("/devices", DevicesController.createDevice);
router.patch("/devices/:id", DevicesController.updateDevice);
router.delete("/devices/:id", DevicesController.deleteDevice);

export default router;
