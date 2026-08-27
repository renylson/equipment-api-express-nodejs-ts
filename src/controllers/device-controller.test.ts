import { Request, Response } from "express";
import * as DevicesService from "../services/device-service";
import * as DevicesController from "./device-controller";

jest.mock("../services/device-service");

const mockedService = DevicesService as jest.Mocked<typeof DevicesService>;

function createMockResponse() {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
}

describe("device-controller - getDevices", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve repassar o statusCode e o body retornados pelo service", async () => {
    mockedService.getDevices.mockResolvedValue({
      statusCode: 200,
      body: [{ id: 1 }],
    });

    const req = {} as Request;
    const res = createMockResponse();

    await DevicesController.getDevices(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });
});

describe("device-controller - getDeviceById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar 400 e não chamar o service quando o id da URL não é numérico", async () => {
    const req = { params: { id: "abc" } } as unknown as Request;
    const res = createMockResponse();

    await DevicesController.getDeviceById(req, res);

    expect(mockedService.getDeviceById).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("deve chamar o service com o id convertido para número", async () => {
    mockedService.getDeviceById.mockResolvedValue({
      statusCode: 200,
      body: { id: 1 },
    });

    const req = { params: { id: "1" } } as unknown as Request;
    const res = createMockResponse();

    await DevicesController.getDeviceById(req, res);

    expect(mockedService.getDeviceById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("device-controller - createDevice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve repassar req.body para o service", async () => {
    const deviceInput = { name: "Roteador 1" };
    mockedService.createDevice.mockResolvedValue({
      statusCode: 201,
      body: { message: "successful", data: deviceInput },
    });

    const req = { body: deviceInput } as Request;
    const res = createMockResponse();

    await DevicesController.createDevice(req, res);

    expect(mockedService.createDevice).toHaveBeenCalledWith(deviceInput);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe("device-controller - updateDevice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar 400 e não chamar o service quando o id da URL não é numérico", async () => {
    const req = {
      params: { id: "abc" },
      body: { name: "X" },
    } as unknown as Request;
    const res = createMockResponse();

    await DevicesController.updateDevice(req, res);

    expect(mockedService.updateDevice).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("deve chamar o service com id numérico e o body recebido", async () => {
    mockedService.updateDevice.mockResolvedValue({
      statusCode: 200,
      body: { id: 1, name: "Novo nome" },
    });

    const req = {
      params: { id: "1" },
      body: { name: "Novo nome" },
    } as unknown as Request;
    const res = createMockResponse();

    await DevicesController.updateDevice(req, res);

    expect(mockedService.updateDevice).toHaveBeenCalledWith(1, {
      name: "Novo nome",
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("device-controller - deleteDevice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar 400 e não chamar o service quando o id da URL não é numérico", async () => {
    const req = { params: { id: "abc" } } as unknown as Request;
    const res = createMockResponse();

    await DevicesController.deleteDevice(req, res);

    expect(mockedService.deleteDevice).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("deve chamar o service com o id convertido para número", async () => {
    mockedService.deleteDevice.mockResolvedValue({
      statusCode: 200,
      body: true,
    });

    const req = { params: { id: "1" } } as unknown as Request;
    const res = createMockResponse();

    await DevicesController.deleteDevice(req, res);

    expect(mockedService.deleteDevice).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
