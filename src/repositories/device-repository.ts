import { DeviceModel } from "../models/device-model";
import fs from "fs/promises";
import { getCurrentTimestamp } from "../utils/timestamp";
import { getNextId } from "../utils/next-id";

const databaseFilePath = "./src/data/database.json";

export const getDevices = async (): Promise<DeviceModel[]> => {
  const data = await fs.readFile(databaseFilePath, "utf-8");
  const devices: DeviceModel[] = JSON.parse(data);
  return devices;
};

export const getDeviceById = async (
  id: number,
): Promise<DeviceModel | null> => {
  const devices = await getDevices();
  const device = devices.find((d) => d.id === id);
  return device || null;
};

export const createDevice = async (
  device: DeviceModel,
): Promise<DeviceModel> => {
  const devices = await getDevices();

  const nextId = getNextId(devices);
  device.id = nextId;

  const timestamp = getCurrentTimestamp();
  device.createdAt = timestamp;
  device.updatedAt = timestamp;

  devices.push(device);
  await fs.writeFile(
    databaseFilePath,
    JSON.stringify(devices, null, 2),
    "utf-8",
  );
  return device;
};

export const updateDevice = async (
  id: number,
  device: DeviceModel,
): Promise<DeviceModel | null> => {
  const devices = await getDevices();
  const index = devices.findIndex((d) => d.id === id);

  if (index === -1) {
    return null;
  }

  const oldDevice = devices[index];

  const mergedDevice: DeviceModel = {
    ...oldDevice,
    ...device,
    id: oldDevice.id,
    createdAt: oldDevice.createdAt,
    updatedAt: getCurrentTimestamp(),
  };

  devices[index] = mergedDevice;
  await fs.writeFile(
    databaseFilePath,
    JSON.stringify(devices, null, 2),
    "utf-8",
  );
  return mergedDevice;
};

export const deleteDevice = async (id: number): Promise<boolean> => {
  const devices = await getDevices();
  const index = devices.findIndex((d) => d.id === id);
  if (index === -1) {
    return false;
  }
  devices.splice(index, 1);
  await fs.writeFile(
    databaseFilePath,
    JSON.stringify(devices, null, 2),
    "utf-8",
  );
  return true;
};
