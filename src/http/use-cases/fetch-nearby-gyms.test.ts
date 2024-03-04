import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      phone: null,
      description: null,
      latitude: -27.4324232,
      longitude: -49.4324232,
    });

    await gymsRepository.create({
      title: "Far Gym",
      phone: null,
      description: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.4324232,
      userLongitude: -49.4324232,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
