import * as DevicesRepository from "../repositories/device-repository";
import {
  createDevice,
  updateDevice,
  deleteDevice,
  getDevices,
  getDeviceById,
} from "./device-service";

jest.mock("../repositories/device-repository");

const mockedRepository = DevicesRepository as jest.Mocked<
  typeof DevicesRepository
>;

describe("device-service - createDevice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve validar, persistir e retornar o device criado quando os dados são válidos", async () => {
    const deviceInput = {
      name: "Roteador 1",
      manufacturer: "Huawei",
      model: "NE40",
      ip: "192.168.1.1",
      connectionType: "ssh",
      port: 22,
      login: "user",
      password: "password",
    } as any;

    const deviceSaved = {
      ...deviceInput,
      id: 1,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
    };

    mockedRepository.createDevice.mockResolvedValue(deviceSaved);

    const response = await createDevice(deviceInput);

    expect(mockedRepository.createDevice).toHaveBeenCalledWith(deviceInput);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      message: "successful",
      data: deviceInput,
    });
  });

  it("não deve chamar o repository quando o IP é inválido", async () => {
    const deviceInput = {
      name: "Roteador 2",
      manufacturer: "Huawei",
      model: "NE40",
      ip: "999.999.999.999",
      connectionType: "ssh",
      port: 22,
      login: "user",
      password: "password",
    } as any;

    const response = await createDevice(deviceInput);

    expect(mockedRepository.createDevice).not.toHaveBeenCalled();
    expect(response.statusCode).toBe(400);
  });
});

describe("device-service - updateDevice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar badRequest e não chamar o repository quando o body está vazio", async () => {
    const response = await updateDevice(1, {} as any);

    expect(mockedRepository.updateDevice).not.toHaveBeenCalled();
    expect(response.statusCode).toBe(400);
  });

  it("deve retornar badRequest e não chamar o repository quando o ip enviado é inválido", async () => {
    const response = await updateDevice(1, {
      ip: "999.999.999.999",
    } as any);

    expect(mockedRepository.updateDevice).not.toHaveBeenCalled();
    expect(response.statusCode).toBe(400);
  });

  it("não deve barrar a atualização quando o body não envia o campo ip", async () => {
    const partialUpdate = { name: "Novo nome" } as any;
    const updatedDevice = { id: 1, name: "Novo nome" } as any;

    mockedRepository.updateDevice.mockResolvedValue(updatedDevice);

    const response = await updateDevice(1, partialUpdate);

    expect(mockedRepository.updateDevice).toHaveBeenCalledWith(
      1,
      partialUpdate,
    );
    expect(response.statusCode).toBe(200);
  });

  it("deve retornar ok com o device atualizado quando o repository encontra o id", async () => {
    const partialUpdate = { name: "Roteador Renomeado" } as any;
    const updatedDevice = {
      id: 1,
      name: "Roteador Renomeado",
      ip: "192.168.1.1",
    } as any;

    mockedRepository.updateDevice.mockResolvedValue(updatedDevice);

    const response = await updateDevice(1, partialUpdate);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(updatedDevice);
  });

  it("deve retornar notFound quando o repository não encontra o device", async () => {
    mockedRepository.updateDevice.mockResolvedValue(null);

    const response = await updateDevice(999, { name: "X" } as any);

    expect(response.statusCode).toBe(404);
  });
});

describe("device-service - deleteDevice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar ok quando o repository remove o device com sucesso", async () => {
    mockedRepository.deleteDevice.mockResolvedValue(true);

    const response = await deleteDevice(1);

    expect(mockedRepository.deleteDevice).toHaveBeenCalledWith(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(true);
  });

  it("deve retornar notFound quando o repository não encontra o device", async () => {
    mockedRepository.deleteDevice.mockResolvedValue(false);

    const response = await deleteDevice(999);

    expect(mockedRepository.deleteDevice).toHaveBeenCalledWith(999);
    expect(response.statusCode).toBe(404);
  });
});

describe("device-service - getDevices", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar ok com a lista quando existem devices cadastrados", async () => {
    const devices = [
      { id: 1, name: "Roteador 1" },
      { id: 2, name: "Roteador 2" },
    ] as any;

    mockedRepository.getDevices.mockResolvedValue(devices);

    const response = await getDevices();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(devices);
  });

  it("deve retornar noContent quando a lista está vazia", async () => {
    mockedRepository.getDevices.mockResolvedValue([]);

    const response = await getDevices();

    expect(response.statusCode).toBe(204);
    expect(response.body).toBeNull();
  });
});

describe("device-service - getDeviceById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar ok com o device quando o repository encontra o id", async () => {
    const device = { id: 1, name: "Roteador 1" } as any;

    mockedRepository.getDeviceById.mockResolvedValue(device);

    const response = await getDeviceById(1);

    expect(mockedRepository.getDeviceById).toHaveBeenCalledWith(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(device);
  });

  it("deve retornar notFound quando o repository não encontra o id", async () => {
    mockedRepository.getDeviceById.mockResolvedValue(null);

    const response = await getDeviceById(999);

    expect(response.statusCode).toBe(404);
  });
});
