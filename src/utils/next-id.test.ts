import { getNextId } from "./next-id";

describe("getNextId", () => {
  it("retorna 1 quando a lista está vazia", () => {
    expect(getNextId([])).toBe(1);
  });
  it("retorna o próximo ID quando a lista contém objetos com IDs", () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(getNextId(items)).toBe(4);
  });
  it("retorna o próximo ID mesmo quando os IDs não estão em ordem", () => {
    const items = [{ id: 3 }, { id: 1 }, { id: 2 }];
    expect(getNextId(items)).toBe(4);
  });
  it("retorna o próximo ID quando há espaços em branco entre os IDs", () => {
    const items = [{ id: 4 }, { id: 6 }, { id: 7 }];
    expect(getNextId(items)).toBe(8);
  })
});
