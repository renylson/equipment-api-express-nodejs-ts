import { getCurrentTimestamp } from "./timestamp";

describe("getCurrentTimestamp", () => {
  it("retorna uma string no formato ISO 8601", () => {
    const timestamp = getCurrentTimestamp();
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });
});
