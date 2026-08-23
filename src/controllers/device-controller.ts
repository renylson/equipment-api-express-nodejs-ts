import { Request, Response } from "express";
import * as DevicesService from "../services/device-service";
import * as HttpResponseCode from "../utils/http-statuscode-response";
import { HttpResponse } from "../models/http-response-model";

export const getDevices = async (_req: Request, res: Response) => {
  const httpResponse: HttpResponse = await DevicesService.getDevices();
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getDeviceById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);

  if (Number.isNaN(id)) {
    const httpResponse: HttpResponse = await HttpResponseCode.badRequest();
    res.status(httpResponse.statusCode).json(httpResponse.body);
    return;
  }

  const httpResponse: HttpResponse = await DevicesService.getDeviceById(id);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const createDevice = async (req: Request, res: Response) => {
  const httpResponse: HttpResponse = await DevicesService.createDevice(
    req.body
  );
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const updateDevice = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);

  if (Number.isNaN(id)) {
    const httpResponse: HttpResponse = await HttpResponseCode.badRequest();
    res.status(httpResponse.statusCode).json(httpResponse.body);
    return;
  }

  const httpResponse: HttpResponse = await DevicesService.updateDevice(
    id,
    req.body
  );
  res.status(httpResponse.statusCode).json(httpResponse.body);
};



export const deleteDevice = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);

  if (Number.isNaN(id)) {
    const httpResponse: HttpResponse = await HttpResponseCode.badRequest();
    res.status(httpResponse.statusCode).json(httpResponse.body);
    return;
  }

  const httpResponse: HttpResponse = await DevicesService.deleteDevice(id);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};
