import request from "supertest";

import app from "../../src/app";
import { describe, expect, it } from "vitest";

describe("GET /api/v1/health", () => {
  it("returns API health status", async () => {
    const response = await request(app).get("/api/v1/health");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      status: "ok",
      message: "Project Adhikaar API is running",
    });
  });
});
