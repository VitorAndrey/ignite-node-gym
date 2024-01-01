import { describe, beforeEach, it, expect } from "vitest";
import { CheckInsUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInsUseCase;

describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInsUseCase(checkInsRepository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
