import request from "supertest";
import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "bla bla bla",
        phone: "99999999",
        latitude: -27.4324232,
        longitude: -49.4324232,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "bla bla bla",
        phone: "99999999",
        latitude: -27.0610928,
        longitude: -49.5229501,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -27.4324232,
        longitude: -49.4324232,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym",
      }),
    ]);
  });
});
