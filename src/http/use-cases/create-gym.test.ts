import { CreateGymUseCase } from "./create-gym";
import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Java Gym",
      phone: null,
      description: null,
      latitude: -27.4324232,
      longitude: -49.4324232,
    });

    expect(gym.id).toBeTruthy();
  });
});
