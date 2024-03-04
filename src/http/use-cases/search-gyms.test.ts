import { describe, beforeEach, it, expect } from "vitest";
import { SearchGymUseCase } from "./search-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Java Gym",
      description: "Best gym",
      latitude: -27.4324232,
      longitude: -49.4324232,
      phone: "9999999",
    });

    await gymsRepository.create({
      title: "Python Gym",
      description: "Best gym",
      latitude: -27.4324232,
      longitude: -49.4324232,
      phone: "9999999",
    });

    const { gyms } = await sut.execute({
      query: "Java Gym",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Java Gym" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: "Best gym",
        latitude: -27.4324232,
        longitude: -49.4324232,
        phone: "9999999",
      });
    }

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" }),
    ]);
  });
});
