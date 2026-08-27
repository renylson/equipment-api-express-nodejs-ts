import { isValidIPv4 } from "./ipv4-valid";

describe("isValidIPv4", () => {
  it("retorna true para um IP válido comum", () => {
    expect(isValidIPv4("10.0.0.1")).toBe(true);
  })
  it("retorna false para um IP inválido", () => {
    expect(isValidIPv4("999.999.999.999")).toBe(false);
  })
  it("retorna false para um IP com caracteres inválidos", () => {
    expect(isValidIPv4("10.0.0.a")).toBe(false);
  })
  it("retorna false para um IP com menos de 4 octetos", () => {
    expect(isValidIPv4("10.0.0")).toBe(false);
  })
  it("retorna false para um IP com mais de 4 octetos", () => {
    expect(isValidIPv4("10.0.0.1.1")).toBe(false);
  })
  it("retorna false para um IP com octetos fora do intervalo 0-255", () => {
    expect(isValidIPv4("10.0.0.256")).toBe(false);
  })
  it("retorna false para um IP com espaços em branco", () => {
    expect(isValidIPv4("10.0.0.1 ")).toBe(false);
  });
  it("retorna false para um IP com octetos vazios", () => {
    expect(isValidIPv4("10..0.1")).toBe(false);
  });
  it("retorna false para um IP com octetos negativos", () => {
    expect(isValidIPv4("10.-1.0.1")).toBe(false);
  });
  it("retorna false para um IP com octetos com zeros à esquerda", () => {
    expect(isValidIPv4("10.00.0.1")).toBe(false);
  });
  it("retorna false para um IP com octetos com mais de 3 dígitos", () => {
    expect(isValidIPv4("10.1000.0.1")).toBe(false);
  });
  it("retorna false para um IP com octetos com caracteres especiais", () => {
    expect(isValidIPv4("10.0.0.@")).toBe(false);
  });
  it("retorna false para um IP com octetos com espaços em branco", () => {
    expect(isValidIPv4("10.0. 0.1")).toBe(false);
  });
  it("retorna true para o menor IP válido possível (0.0.0.0)", () => {
    expect(isValidIPv4("0.0.0.0")).toBe(true);
  });
  it("retorna true para o maior IP válido possível (255.255.255.255)", () => {
    expect(isValidIPv4("255.255.255.255")).toBe(true);
  });
});
