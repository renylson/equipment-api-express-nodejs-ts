import * as statuscode from "./http-statuscode-response";

describe("statuscode", () => {
  it("deve retornar um response com status 200", async () => {
    const response = await statuscode.ok({ message: "success" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "success" });
  });
  it("deve retornar um response com status 201", async () => {
    const response = await statuscode.created({ id: 1 });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ message: "successful", data: { id: 1 } });
  });
  it("deve retornar um response com status 204", async () => {
    const response = await statuscode.noContent();
    expect(response.statusCode).toBe(204);
    expect(response.body).toBeNull();
  });
  it("deve retornar um response com status 400", async () => {
    const response = await statuscode.badRequest();
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeNull();
  });
  it("deve retornar um response com status 404", async () => {
    const response = await statuscode.notFound();
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeNull();
  });
});
