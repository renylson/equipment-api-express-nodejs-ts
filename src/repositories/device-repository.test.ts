import fs from "fs/promises";
import {
  getDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
} from "./device-repository";

jest.mock("fs/promises");

const mockedFs = fs as jest.Mocked<typeof fs>;

describe("device-repository - getDevices", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve ler o arquivo e retornar a lista de devices", async () => {
    const devicesInFile = [{ id: 1, name: "Roteador 1" }];
    mockedFs.readFile.mockResolvedValue(JSON.stringify(devicesInFile) as any);

    const result = await getDevices();

    expect(result).toEqual(devicesInFile);
  });
});

describe("device-repository - getDeviceById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar o device quando o id existe na lista", async () => {
    const devicesInFile = [
      { id: 1, name: "Roteador 1" },
      { id: 2, name: "Roteador 2" },
    ];
    mockedFs.readFile.mockResolvedValue(JSON.stringify(devicesInFile) as any);

    const result = await getDeviceById(2);

    expect(result).toEqual({ id: 2, name: "Roteador 2" });
  });

  it("deve retornar null quando o id não existe na lista", async () => {
    mockedFs.readFile.mockResolvedValue(
      JSON.stringify([{ id: 1, name: "Roteador 1" }]) as any,
    );

    const result = await getDeviceById(999);

    expect(result).toBeNull();
  });
});

describe("device-repository - createDevice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve gerar id incremental sem colidir após uma lista com um id removido", async () => {
    const existingDevices = [{ id: 1 }, { id: 3 }];
    mockedFs.readFile.mockResolvedValue(
      JSON.stringify(existingDevices) as any,
    );

    const newDevice = { name: "Roteador Novo", ip: "10.0.0.1" } as any;
    const result = await createDevice(newDevice);

    expect(result.id).toBe(4);
    expect(result.createdAt).toBe(result.updatedAt);
    expect(mockedFs.writeFile).toHaveBeenCalledTimes(1);
  });
});

describe("device-repository - updateDevice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve fazer merge parcial preservando id e createdAt originais", async () => {
    const existingDevices = [
      {
        id: 1,
        name: "Roteador Antigo",
        ip: "10.0.0.1",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
      },
    ];
    mockedFs.readFile.mockResolvedValue(
      JSON.stringify(existingDevices) as any,
    );

    const partialUpdate = {
      name: "Roteador Renomeado",
      id: 999,
      createdAt: "2000-01-01T00:00:00.000Z",
    } as any;

    const result = await updateDevice(1, partialUpdate);

    expect(result?.id).toBe(1);
    expect(result?.createdAt).toBe("2023-01-01T00:00:00.000Z");
    expect(result?.name).toBe("Roteador Renomeado");
    expect(result?.ip).toBe("10.0.0.1");
  });

  it("deve retornar null quando o id não existe na lista", async () => {
    mockedFs.readFile.mockResolvedValue(
      JSON.stringify([{ id: 1 }]) as any,
    );

    const result = await updateDevice(999, { name: "X" } as any);

    expect(result).toBeNull();
    expect(mockedFs.writeFile).not.toHaveBeenCalled();
  });
});

describe("device-repository - deleteDevice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar true e persistir quando o id existe", async () => {
    mockedFs.readFile.mockResolvedValue(
      JSON.stringify([{ id: 1 }, { id: 2 }]) as any,
    );

    const result = await deleteDevice(1);

    expect(result).toBe(true);
    expect(mockedFs.writeFile).toHaveBeenCalledTimes(1);
  });

  it("deve retornar false e não escrever no arquivo quando o id não existe", async () => {
    mockedFs.readFile.mockResolvedValue(
      JSON.stringify([{ id: 1 }]) as any,
    );

    const result = await deleteDevice(999);

    expect(result).toBe(false);
    expect(mockedFs.writeFile).not.toHaveBeenCalled();
  });
});
