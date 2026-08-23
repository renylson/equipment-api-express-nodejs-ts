import { DeviceModel } from "../models/device-model";
import * as DevicesRepository from "../repositories/device-repository";
import * as HttpResponse from "../utils/http-statuscode-response";
import { isValidIPv4 } from "../utils/ipv4-valid";

export const getDevices = async () => {
  const data = await DevicesRepository.getDevices();
  let response = null;
  if (data !== null && data.length > 0) {
    response = HttpResponse.ok(data);
  } else {
    response = HttpResponse.noContent();
  }
  return response;
};

export const getDeviceById = async (id: number) => {
  const data = await DevicesRepository.getDeviceById(id);
  let response = null;
  if (data !== null) {
    response = HttpResponse.ok(data);
  } else {
    response = HttpResponse.notFound();
  }
  return response;
};

export const createDevice = async (device: DeviceModel) => {
  let response = null;
  if (Object.keys(device).length > 0 && isValidIPv4(device.ip)) {
    await DevicesRepository.createDevice(device);
    response = HttpResponse.created(device);
  } else {
    response = HttpResponse.badRequest();
  }
  return response;
};

export const updateDevice = async (id: number, device: DeviceModel) => {
  let response = null;
  const ipIsValid = !device.ip || isValidIPv4(device.ip);

  if (Object.keys(device).length > 0 && ipIsValid) {
    const updatedDevice = await DevicesRepository.updateDevice(id, device);
    if (updatedDevice !== null) {
      response = HttpResponse.ok(updatedDevice);
    } else {
      response = HttpResponse.notFound();
    }
  } else {
    response = HttpResponse.badRequest();
  }
  return response;
};

export const deleteDevice = async (id: number) => {
  const deletedDevice = await DevicesRepository.deleteDevice(id);
  let response = null;
  if (deletedDevice) {
    response = HttpResponse.ok(deletedDevice);
  } else {
    response = HttpResponse.notFound();
  }
  return response;
};
